import { ExtractedProductListing } from '../research/researchTypes.ts';
import { ProductQueryUnderstanding } from '../queryUnderstandingService.ts';

export interface ObservedPricePoint {
  source: string;
  seller: string | null;
  url: string;
  originalPrice: number;
  originalCurrency: string;
  normalizedPrice: number;
  normalizedCurrency: string;
  isExactMatch: boolean;
  variantNote?: string;
  isOutlier?: boolean;
}

export interface PricingIntelligenceResult {
  currency: string;
  minPrice: number | null;
  maxPrice: number | null;
  estimatedPrice: number | null;
  confidence: 'low' | 'medium' | 'high';
  priceObservations: ObservedPricePoint[];
  methodology: string;
  limitations: string[];
}

// Representative exchange rates for cross-currency normalization when required
const FX_RATES_TO_USD: Record<string, number> = {
  USD: 1.0,
  NGN: 1 / 1500, // ~1500 NGN per USD benchmark
  EUR: 1.08,
  GBP: 1.28,
  CAD: 0.73,
  AUD: 0.65,
};

/**
 * Normalizes price to target currency using FX benchmark.
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = FX_RATES_TO_USD[fromCurrency] || 1.0;
  const toRate = FX_RATES_TO_USD[toCurrency] || 1.0;
  const usdVal = amount * fromRate;
  const converted = usdVal / toRate;
  return Math.round(converted * 100) / 100;
}

/**
 * Determines whether a listing is an exact product match or a distinct variant
 * based on specifications extracted during query understanding.
 */
export function evaluateProductMatch(
  listing: ExtractedProductListing,
  understanding: ProductQueryUnderstanding
): { isExactMatch: boolean; variantNote?: string } {
  const listingText = `${listing.title} ${listing.product} ${listing.specifications.join(' ')}`.toLowerCase();
  const querySpecs = understanding.specifications || [];

  for (const spec of querySpecs) {
    const s = spec.toLowerCase();
    // If query specifies e.g. "12mm" but listing explicitly says "18mm" or "6mm"
    if (s.includes('12mm') && !listingText.includes('12mm') && !listingText.includes('15/32') && !listingText.includes('1/2')) {
      return { isExactMatch: false, variantNote: 'Different thickness/dimension than requested' };
    }
    if (s.includes('marine') && !listingText.includes('marine') && !listingText.includes('exterior')) {
      return { isExactMatch: false, variantNote: 'Standard interior grade rather than specified marine grade' };
    }
    if (s.includes('256gb') && listingText.includes('128gb')) {
      return { isExactMatch: false, variantNote: 'Different storage capacity variant (128GB vs 256GB)' };
    }
    if (s.includes('316') && listingText.includes('304') && !listingText.includes('316')) {
      return { isExactMatch: false, variantNote: 'Grade 304 alloy rather than specified Grade 316' };
    }
  }

  return { isExactMatch: true };
}

/**
 * Detects statistical outliers (e.g., accessory pricing like a $5 case for a $400 phone,
 * or full truckload / bulk MOQ rates).
 */
export function identifyOutliers(prices: number[]): { median: number; isOutlier: (p: number) => boolean } {
  if (prices.length < 3) {
    return {
      median: prices.length > 0 ? prices[0] : 0,
      isOutlier: () => false,
    };
  }

  const sorted = [...prices].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Prices that are < 25% of median (likely accessory/part) or > 4x median (likely bulk container / bundle)
  return {
    median,
    isOutlier: (p: number) => p < median * 0.25 || p > median * 4.0,
  };
}

/**
 * Primary pricing intelligence calculation engine.
 * Synthesizes retrieved price observations into an honest benchmark range,
 * assigns confidence, and lists commercial limitations.
 */
export function calculatePricingIntelligence(
  understanding: ProductQueryUnderstanding,
  listings: ExtractedProductListing[]
): PricingIntelligenceResult {
  const limitations: string[] = [];

  // Filter listings with valid positive numbers
  const validListings = listings.filter(
    (l) => typeof l.price === 'number' && !isNaN(l.price) && l.price > 0
  );

  // If no valid prices retrieved
  if (validListings.length === 0) {
    return {
      currency: 'USD',
      minPrice: null,
      maxPrice: null,
      estimatedPrice: null,
      confidence: 'low',
      priceObservations: [],
      methodology: 'Price Unavailable: No verified direct prices could be extracted from public distributor listings.',
      limitations: [
        'No active retail or distributor price tags could be verified from retrieved pages.',
        'Item may require a custom vendor RFQ (Request for Quote), trade account, or contractor login.',
      ],
    };
  }

  // Determine target currency (prefer NGN for Nigeria-focused searches, otherwise dominant currency)
  const isNigeriaFocused =
    understanding.name.toLowerCase().includes('nigeria') ||
    understanding.search_queries.some((q) => q.toLowerCase().includes('nigeria')) ||
    validListings.filter((l) => l.currency === 'NGN').length >= validListings.length * 0.4;

  let targetCurrency = 'USD';
  if (isNigeriaFocused) {
    targetCurrency = 'NGN';
  } else {
    // Pick dominant currency
    const currencyCounts: Record<string, number> = {};
    for (const l of validListings) {
      const c = l.currency || 'USD';
      currencyCounts[c] = (currencyCounts[c] || 0) + 1;
    }
    targetCurrency = Object.keys(currencyCounts).reduce((a, b) =>
      currencyCounts[a] > currencyCounts[b] ? a : b
    );
  }

  // Build price observations with currency normalization and variant matching
  const rawObservations: ObservedPricePoint[] = [];

  for (const l of validListings) {
    const origCurr = l.currency || targetCurrency;
    const origPrice = l.price!;
    const normPrice = convertCurrency(origPrice, origCurr, targetCurrency);
    const { isExactMatch, variantNote } = evaluateProductMatch(l, understanding);

    rawObservations.push({
      source: l.source,
      seller: l.seller,
      url: l.url,
      originalPrice: origPrice,
      originalCurrency: origCurr,
      normalizedPrice: normPrice,
      normalizedCurrency: targetCurrency,
      isExactMatch,
      variantNote,
      isOutlier: false,
    });
  }

  // Check for different variants
  const hasMultipleVariants = rawObservations.some((o) => !o.isExactMatch);
  if (hasMultipleVariants) {
    limitations.push('Retrieved listings contain differing specifications/grades. Exact match filtered where possible.');
  }

  // Detect outliers on normalized prices
  const normalizedVals = rawObservations.map((o) => o.normalizedPrice);
  const { isOutlier } = identifyOutliers(normalizedVals);

  let outlierCount = 0;
  for (const obs of rawObservations) {
    if (isOutlier(obs.normalizedPrice)) {
      obs.isOutlier = true;
      outlierCount++;
    }
  }

  if (outlierCount > 0) {
    limitations.push(`${outlierCount} listing(s) identified as statistical outliers (e.g. bulk lot or accessory) and excluded from median calculation.`);
  }

  // Candidate prices for calculating representative benchmark:
  // Prefer exact matches that are not outliers
  let candidateObservations = rawObservations.filter((o) => o.isExactMatch && !o.isOutlier);

  // If no exact matches remain, use non-outlier variants
  if (candidateObservations.length === 0) {
    candidateObservations = rawObservations.filter((o) => !o.isOutlier);
    if (candidateObservations.length > 0) {
      limitations.push('No exact specification match was found; estimate is derived from adjacent product variants.');
    }
  }

  // If all were flagged as outliers, fall back to all observations
  if (candidateObservations.length === 0) {
    candidateObservations = rawObservations;
  }

  const finalPrices = candidateObservations.map((o) => o.normalizedPrice).sort((a, b) => a - b);
  const minPrice = finalPrices[0];
  const maxPrice = finalPrices[finalPrices.length - 1];

  // Calculate median / representative price
  let estimatedPrice: number;
  const count = finalPrices.length;
  if (count === 1) {
    estimatedPrice = finalPrices[0];
  } else if (count % 2 === 1) {
    estimatedPrice = finalPrices[Math.floor(count / 2)];
  } else {
    estimatedPrice = Math.round(((finalPrices[count / 2 - 1] + finalPrices[count / 2]) / 2) * 100) / 100;
  }

  // Confidence assessment
  let confidence: 'low' | 'medium' | 'high' = 'medium';

  // Rule 1: Single price observation
  if (candidateObservations.length === 1) {
    confidence = 'low';
    limitations.push('Estimate is based on a single verified market listing; variance across competing suppliers is unknown.');
  }
  // Rule 2: Conflicting sources / high dispersion (e.g. max/min > 2.5)
  else if (maxPrice / minPrice > 2.5) {
    confidence = 'low';
    limitations.push('High price dispersion observed across retrieved merchants (>2.5x variance).');
  }
  // Rule 3: Robust data (>= 3 observations, exact matches, low dispersion)
  else if (candidateObservations.length >= 3 && candidateObservations.every((o) => o.isExactMatch)) {
    confidence = 'high';
  } else {
    confidence = 'medium';
  }

  // Notes on currency conversion if any observations had different currency
  const convertedCount = rawObservations.filter((o) => o.originalCurrency !== targetCurrency).length;
  if (convertedCount > 0) {
    limitations.push(
      `${convertedCount} price quote(s) converted to ${targetCurrency} using reference FX benchmarks for comparison.`
    );
  }

  const methodology =
    candidateObservations.length === 1
      ? `Single-Source Quote: Market baseline referenced directly from ${candidateObservations[0].source}.`
      : `Median Cluster Benchmark: Synthesized across ${candidateObservations.length} comparable merchant listings in ${targetCurrency}.`;

  return {
    currency: targetCurrency,
    minPrice,
    maxPrice,
    estimatedPrice,
    confidence,
    priceObservations: rawObservations,
    methodology,
    limitations,
  };
}
