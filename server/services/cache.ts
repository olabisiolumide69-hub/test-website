import { ProductResearchResult } from '../../src/types/product.ts';

interface CacheEntry {
  result: ProductResearchResult;
  expiresAt: number;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_ENTRIES = 500;

class QueryResultCache {
  private cache = new Map<string, CacheEntry>();

  private normalizeKey(query: string): string {
    return query.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  public get(query: string): ProductResearchResult | null {
    const key = this.normalizeKey(query);
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  public set(query: string, result: ProductResearchResult): void {
    const key = this.normalizeKey(query);

    // Evict oldest entry if exceeding size limit
    if (this.cache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      result,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const queryCache = new QueryResultCache();
