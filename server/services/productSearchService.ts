import { ProductResearchResult } from '../../src/types/product';
import { getMockResearchResult } from '../../src/data/mockResults';
import { understandProductQuery, ProductQueryUnderstanding } from './queryUnderstandingService.ts';
import { executeProductResearch } from './research/researchProvider.ts';
import { calculatePricingIntelligence } from './pricing/pricingEngine.ts';
import { searchDb } from '../db/database.ts';
import { queryCache } from './cache.ts';

export const MAX_QUERY_LENGTH = 200;

export interface SearchValidationError {
  status: number;
  message: string;
}

/**
 * Common interface for any future AI or search provider
 * (e.g., Gemini Grounded, Claude, Custom Scraping Pipeline).
 */
export interface ProductSearchProvider {
  name: string;
  search(normalizedQuery: string, understanding: ProductQueryUnderstanding): Promise<ProductResearchResult>;
}

/**
 * Baseline provider that combines structured AI query understanding
 * with benchmark pricing data until full web grounding execution is enabled.
 */
class BaselineSearchProvider implements ProductSearchProvider {
  name = 'AIUnderstandingStagingProvider';

  async search(normalizedQuery: string, understanding: ProductQueryUnderstanding): Promise<ProductResearchResult> {
    const baseResult = getMockResearchResult(normalizedQuery);

    // Execute web research with active provider
    const researchReport = await executeProductResearch(understanding);

    // Merge AI-understood specifications and queries
    const mergedSpecs = [...baseResult.specifications];
    for (const spec of understanding.specifications) {
      if (!mergedSpecs.some(s => s.value.toLowerCase().includes(spec.toLowerCase()))) {
        mergedSpecs.push({
          name: 'Query Identified Spec',
          value: spec,
        });
      }
    }

    // Incorporate specs discovered during web research
    for (const listing of researchReport.listings) {
      for (const spec of listing.specifications) {
        if (!mergedSpecs.some(s => s.value.toLowerCase().includes(spec.toLowerCase()))) {
          mergedSpecs.push({
            name: `${listing.source} Spec`,
            value: spec,
          });
        }
      }
    }

    // Stage 3: Pricing Intelligence Calculation
    const pricingResult = calculatePricingIntelligence(understanding, researchReport.listings);

    // Map extracted listings & pricing observations into sourcePrices with rich attribution
    const liveSourcePrices = researchReport.listings.length > 0
      ? researchReport.listings.map((l) => {
          const matchingObs = pricingResult.priceObservations.find((o) => o.url === l.url);
          return {
            retailer: l.seller || l.source,
            title: l.title,
            price: l.price,
            currency: l.currency || pricingResult.currency,
            unit: 'unit',
            url: l.url,
            inStock: l.availability ? !l.availability.toLowerCase().includes('out') : true,
            notes: matchingObs?.variantNote || l.availability || undefined,
            retrievedAt: l.retrievedAt,
            isExactMatch: matchingObs ? matchingObs.isExactMatch : true,
            isOutlier: matchingObs?.isOutlier || false,
          };
        })
      : baseResult.sourcePrices;

    // Collect brands discovered from listings
    const discoveredBrands = new Set(baseResult.commonBrands);
    if (understanding.brand) discoveredBrands.add(understanding.brand);
    for (const l of researchReport.listings) {
      if (l.brand) discoveredBrands.add(l.brand);
    }

    const finalCurrency = pricingResult.currency || baseResult.currency;
    const finalEstimatedPrice = pricingResult.estimatedPrice;
    const isPriceUnavailable = finalEstimatedPrice === null;

    const finalPriceRange = {
      min: pricingResult.minPrice,
      max: pricingResult.maxPrice,
      median: finalEstimatedPrice,
    };

    const finalConfidence = pricingResult.confidence.toUpperCase() as any;
    const combinedLimitations = Array.from(
      new Set([...baseResult.assumptions, ...pricingResult.limitations])
    );

    const validPriceSourcesCount = pricingResult.priceObservations.filter(
      (o) => !o.isOutlier && o.normalizedPrice > 0
    ).length;

    const finalResult: ProductResearchResult = {
      ...baseResult,
      id: `search_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      productName: understanding.name || baseResult.productName,
      category: understanding.category || baseResult.category,
      shortDescription: understanding.description || baseResult.shortDescription,
      brand: understanding.brand,
      model: understanding.model,
      commonBrands: Array.from(discoveredBrands),
      specifications: mergedSpecs,
      sourcePrices: liveSourcePrices,
      sourcesCount: validPriceSourcesCount,
      isPriceUnavailable,
      currency: finalCurrency,
      estimatedPrice: finalEstimatedPrice,
      priceRange: finalPriceRange,
      confidenceLevel: finalConfidence,
      confidenceReason: pricingResult.methodology,
      assumptions: combinedLimitations,
      variants: understanding.possible_variants.length > 0
        ? understanding.possible_variants.map(v => ({ name: v, detail: 'Identified variant specification' }))
        : baseResult.variants,
      uncertaintyNotes: understanding.uncertainties.length > 0
        ? Array.from(new Set([...baseResult.uncertaintyNotes, ...understanding.uncertainties]))
        : baseResult.uncertaintyNotes,
      queryUnderstanding: understanding,
      pricingIntelligence: pricingResult,
    };

    // Persist search and all related relational tables
    try {
      searchDb.saveSearch({
        query: normalizedQuery,
        understanding,
        researchReport,
        pricingResult,
        finalResult,
      });
    } catch (dbErr) {
      console.warn('Failed to persist search to database:', dbErr);
    }

    return finalResult;
  }
}

// Active provider instance
let currentProvider: ProductSearchProvider = new BaselineSearchProvider();

/**
 * Allows switching the AI provider implementation without changing callers.
 */
export function setProductSearchProvider(provider: ProductSearchProvider) {
  currentProvider = provider;
}

/**
 * Validates and normalizes raw user queries.
 */
export function validateAndNormalizeQuery(rawQuery: unknown): string {
  if (typeof rawQuery !== 'string') {
    const err: SearchValidationError = {
      status: 400,
      message: 'Invalid query format. A string query is required.',
    };
    throw err;
  }

  const trimmed = rawQuery.trim();

  if (trimmed.length === 0) {
    const err: SearchValidationError = {
      status: 400,
      message: 'Search query cannot be empty. Please enter a product or material name.',
    };
    throw err;
  }

  if (trimmed.length > MAX_QUERY_LENGTH) {
    const err: SearchValidationError = {
      status: 400,
      message: `Query exceeds maximum length of ${MAX_QUERY_LENGTH} characters (provided ${trimmed.length} characters).`,
    };
    throw err;
  }

  // Collapse consecutive whitespace to single space
  const normalized = trimmed.replace(/\s+/g, ' ');
  return normalized;
}

/**
 * Clean backend abstraction: searchProduct(query)
 * 1. Validates query
 * 2. Interprets query with understandProductQuery(query)
 * 3. Delegates research stage to configured provider
 */
export async function searchProduct(query: unknown): Promise<ProductResearchResult> {
  const normalizedQuery = validateAndNormalizeQuery(query);

  // Intentional test trigger for verifying network/server failure handling
  if (normalizedQuery.toLowerCase() === 'simulate-server-error') {
    const err: SearchValidationError = {
      status: 500,
      message: 'Simulated internal server error in search processing pipeline.',
    };
    throw err;
  }

  // Cost Control & Performance: Check in-memory query cache with 30-min TTL
  const cachedResult = queryCache.get(normalizedQuery);
  if (cachedResult) {
    return cachedResult;
  }

  // Stage 1: AI Query Understanding Layer
  const understanding = await understandProductQuery(normalizedQuery);

  // Stage 2: Delegate to provider (with attached understanding and research)
  const result = await currentProvider.search(normalizedQuery, understanding);

  // Store in query cache
  queryCache.set(normalizedQuery, result);

  return result;
}
