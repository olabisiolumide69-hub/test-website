import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ProductResearchResult } from '../../src/types/product.ts';
import { ProductQueryUnderstanding } from '../services/queryUnderstandingService.ts';
import { WebResearchReport } from '../services/research/researchTypes.ts';
import { PricingIntelligenceResult } from '../services/pricing/pricingEngine.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const DATA_DIR = path.resolve(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.resolve(DATA_DIR, 'specprice.db');

export interface PersistedSearchRecord {
  search: {
    id: string;
    originalQuery: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  queryInterpretation: any;
  researchSources: any[];
  priceObservations: any[];
  finalResult: any;
}

export interface RecentSearchSummary {
  id: string;
  query: string;
  productName: string;
  category: string;
  estimatedPrice: number | null;
  currency: string;
  confidenceLevel: string;
  sourcesCount: number;
  createdAt: string;
}

class SearchDatabase {
  private db: DatabaseSync;

  constructor() {
    this.db = new DatabaseSync(DB_PATH);
    this.initSchema();
  }

  private initSchema() {
    // Enable WAL mode and foreign keys for data integrity
    this.db.exec('PRAGMA foreign_keys = ON;');

    this.db.exec(`
      -- 1. Searches table
      CREATE TABLE IF NOT EXISTS searches (
        id TEXT PRIMARY KEY,
        original_query TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_searches_created_at ON searches(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_searches_query ON searches(original_query);

      -- 2. Query Interpretations table
      CREATE TABLE IF NOT EXISTS query_interpretations (
        id TEXT PRIMARY KEY,
        search_id TEXT NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
        normalized_name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        brand TEXT,
        model TEXT,
        material TEXT,
        specifications TEXT NOT NULL,
        possible_variants TEXT NOT NULL,
        search_queries TEXT NOT NULL,
        confidence REAL NOT NULL,
        uncertainties TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_query_interpretations_search_id ON query_interpretations(search_id);

      -- 3. Research Sources table
      CREATE TABLE IF NOT EXISTS research_sources (
        id TEXT PRIMARY KEY,
        search_id TEXT NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
        source_domain TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        seller TEXT,
        brand TEXT,
        product_title TEXT NOT NULL,
        availability TEXT,
        specifications TEXT NOT NULL,
        retrieved_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_research_sources_search_id ON research_sources(search_id);
      CREATE INDEX IF NOT EXISTS idx_research_sources_url ON research_sources(url);

      -- 4. Price Observations table
      CREATE TABLE IF NOT EXISTS price_observations (
        id TEXT PRIMARY KEY,
        search_id TEXT NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
        source_id TEXT REFERENCES research_sources(id) ON DELETE SET NULL,
        source_name TEXT NOT NULL,
        original_price REAL NOT NULL,
        original_currency TEXT NOT NULL,
        normalized_price REAL NOT NULL,
        normalized_currency TEXT NOT NULL,
        is_exact_match INTEGER NOT NULL,
        variant_note TEXT,
        is_outlier INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_price_observations_search_id ON price_observations(search_id);
      CREATE INDEX IF NOT EXISTS idx_price_observations_match ON price_observations(is_exact_match);

      -- 5. Final Search Results table
      CREATE TABLE IF NOT EXISTS final_search_results (
        id TEXT PRIMARY KEY,
        search_id TEXT UNIQUE NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
        product_name TEXT NOT NULL,
        category TEXT NOT NULL,
        short_description TEXT NOT NULL,
        currency TEXT NOT NULL,
        estimated_price REAL,
        min_price REAL,
        max_price REAL,
        confidence_level TEXT NOT NULL,
        confidence_reason TEXT NOT NULL,
        sources_count INTEGER NOT NULL,
        is_price_unavailable INTEGER NOT NULL,
        structured_payload TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_final_results_search_id ON final_search_results(search_id);
      CREATE INDEX IF NOT EXISTS idx_final_results_product ON final_search_results(product_name);
    `);
  }

  /**
   * Persists a full search lifecycle with foreign-key relations
   * between Search -> Query Interpretation -> Research Sources -> Price Observations -> Final Result.
   */
  public saveSearch(data: {
    query: string;
    understanding: ProductQueryUnderstanding;
    researchReport: WebResearchReport;
    pricingResult: PricingIntelligenceResult;
    finalResult: ProductResearchResult;
  }): string {
    const searchId = data.finalResult.id || `search_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date().toISOString();
    const status = data.finalResult.isPriceUnavailable ? 'PRICE_UNAVAILABLE' : 'COMPLETED';

    // 1. Insert Search
    const insertSearch = this.db.prepare(`
      INSERT INTO searches (id, original_query, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        status = excluded.status,
        updated_at = excluded.updated_at
    `);
    insertSearch.run(searchId, data.query, status, now, now);

    // 2. Insert Query Interpretation
    const interpId = `interp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const insertInterp = this.db.prepare(`
      INSERT INTO query_interpretations (
        id, search_id, normalized_name, category, description,
        brand, model, material, specifications, possible_variants,
        search_queries, confidence, uncertainties, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertInterp.run(
      interpId,
      searchId,
      data.understanding.name,
      data.understanding.category,
      data.understanding.description,
      data.understanding.brand || null,
      data.understanding.model || null,
      data.understanding.material || null,
      JSON.stringify(data.understanding.specifications || []),
      JSON.stringify(data.understanding.possible_variants || []),
      JSON.stringify(data.understanding.search_queries || []),
      data.understanding.confidence || 0,
      JSON.stringify(data.understanding.uncertainties || []),
      now
    );

    // 3. Insert Research Sources and keep url-to-id mapping
    const urlToSourceId = new Map<string, string>();
    const insertSource = this.db.prepare(`
      INSERT INTO research_sources (
        id, search_id, source_domain, title, url,
        seller, brand, product_title, availability,
        specifications, retrieved_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (let i = 0; i < data.researchReport.listings.length; i++) {
      const l = data.researchReport.listings[i];
      const sourceId = `src_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 6)}`;
      urlToSourceId.set(l.url, sourceId);

      insertSource.run(
        sourceId,
        searchId,
        l.source,
        l.title,
        l.url,
        l.seller || null,
        l.brand || null,
        l.product,
        l.availability || null,
        JSON.stringify(l.specifications || []),
        l.retrievedAt || now
      );
    }

    // 4. Insert Price Observations
    const insertObservation = this.db.prepare(`
      INSERT INTO price_observations (
        id, search_id, source_id, source_name,
        original_price, original_currency, normalized_price, normalized_currency,
        is_exact_match, variant_note, is_outlier, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (let i = 0; i < data.pricingResult.priceObservations.length; i++) {
      const obs = data.pricingResult.priceObservations[i];
      const obsId = `obs_${Date.now()}_${i}_${Math.random().toString(36).slice(2, 6)}`;
      const sourceId = urlToSourceId.get(obs.url) || null;

      insertObservation.run(
        obsId,
        searchId,
        sourceId,
        obs.source,
        obs.originalPrice,
        obs.originalCurrency,
        obs.normalizedPrice,
        obs.normalizedCurrency,
        obs.isExactMatch ? 1 : 0,
        obs.variantNote || null,
        obs.isOutlier ? 1 : 0,
        now
      );
    }

    // 5. Insert Final Search Result
    const finalResultId = `res_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const insertFinal = this.db.prepare(`
      INSERT INTO final_search_results (
        id, search_id, product_name, category, short_description,
        currency, estimated_price, min_price, max_price,
        confidence_level, confidence_reason, sources_count,
        is_price_unavailable, structured_payload, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertFinal.run(
      finalResultId,
      searchId,
      data.finalResult.productName,
      data.finalResult.category,
      data.finalResult.shortDescription,
      data.finalResult.currency,
      data.finalResult.estimatedPrice,
      data.finalResult.priceRange.min,
      data.finalResult.priceRange.max,
      data.finalResult.confidenceLevel,
      data.finalResult.confidenceReason,
      data.finalResult.sourcesCount || 0,
      data.finalResult.isPriceUnavailable ? 1 : 0,
      JSON.stringify(data.finalResult),
      now
    );

    return searchId;
  }

  /**
   * Retrieves a full search hierarchy with all relational children.
   */
  public getSearchById(searchId: string): PersistedSearchRecord | null {
    const searchRow: any = this.db.prepare('SELECT * FROM searches WHERE id = ?').get(searchId);
    if (!searchRow) return null;

    const interpRow: any = this.db
      .prepare('SELECT * FROM query_interpretations WHERE search_id = ?')
      .get(searchId);

    const sourcesRows: any[] = this.db
      .prepare('SELECT * FROM research_sources WHERE search_id = ?')
      .all(searchId);

    const obsRows: any[] = this.db
      .prepare('SELECT * FROM price_observations WHERE search_id = ?')
      .all(searchId);

    const finalRow: any = this.db
      .prepare('SELECT * FROM final_search_results WHERE search_id = ?')
      .get(searchId);

    return {
      search: {
        id: searchRow.id,
        originalQuery: searchRow.original_query,
        status: searchRow.status,
        createdAt: searchRow.created_at,
        updatedAt: searchRow.updated_at,
      },
      queryInterpretation: interpRow
        ? {
            ...interpRow,
            specifications: JSON.parse(interpRow.specifications || '[]'),
            possible_variants: JSON.parse(interpRow.possible_variants || '[]'),
            search_queries: JSON.parse(interpRow.search_queries || '[]'),
            uncertainties: JSON.parse(interpRow.uncertainties || '[]'),
          }
        : null,
      researchSources: sourcesRows.map((s) => ({
        ...s,
        specifications: JSON.parse(s.specifications || '[]'),
      })),
      priceObservations: obsRows.map((o) => ({
        ...o,
        is_exact_match: Boolean(o.is_exact_match),
        is_outlier: Boolean(o.is_outlier),
      })),
      finalResult: finalRow
        ? {
            ...finalRow,
            is_price_unavailable: Boolean(finalRow.is_price_unavailable),
            structured_payload: JSON.parse(finalRow.structured_payload || '{}'),
          }
        : null,
    };
  }

  /**
   * Retrieves list of recent searches for quick navigation.
   */
  public getRecentSearches(limit = 10): RecentSearchSummary[] {
    const rows: any[] = this.db
      .prepare(`
        SELECT
          s.id,
          s.original_query as query,
          COALESCE(f.product_name, s.original_query) as productName,
          COALESCE(f.category, 'General') as category,
          f.estimated_price as estimatedPrice,
          COALESCE(f.currency, 'USD') as currency,
          COALESCE(f.confidence_level, 'MEDIUM') as confidenceLevel,
          COALESCE(f.sources_count, 0) as sourcesCount,
          s.created_at as createdAt
        FROM searches s
        LEFT JOIN final_search_results f ON s.id = f.search_id
        ORDER BY s.created_at DESC
        LIMIT ?
      `)
      .all(limit);

    return rows.map((r) => ({
      id: r.id,
      query: r.query,
      productName: r.productName,
      category: r.category,
      estimatedPrice: r.estimatedPrice !== null ? Number(r.estimatedPrice) : null,
      currency: r.currency,
      confidenceLevel: r.confidenceLevel,
      sourcesCount: Number(r.sourcesCount),
      createdAt: r.createdAt,
    }));
  }
}

// Global singleton instance
export const searchDb = new SearchDatabase();
