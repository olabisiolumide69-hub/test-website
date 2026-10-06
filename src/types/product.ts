export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'ESTIMATED';

export interface SpecificationItem {
  name: string;
  value: string;
  category?: string;
}

export interface SourcePriceQuote {
  retailer: string;
  price: number | null;
  currency: string;
  unit: string;
  url: string;
  inStock?: boolean;
  notes?: string;
  title?: string;
  retrievedAt?: string;
  isExactMatch?: boolean;
  isOutlier?: boolean;
}

export interface ProductVariant {
  name: string;
  detail: string;
  priceDelta?: string;
}

export interface ProductQueryUnderstanding {
  name: string;
  category: string;
  description: string;
  brand: string | null;
  model: string | null;
  material: string | null;
  specifications: string[];
  possible_variants: string[];
  search_queries: string[];
  confidence: number;
  uncertainties: string[];
}

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

export interface ProductResearchResult {
  id: string;
  query: string;
  productName: string;
  category: string;
  shortDescription: string;
  brand?: string | null;
  model?: string | null;
  unitOfMeasure: string;
  currency: string;
  estimatedPrice: number | null;
  priceRange: {
    min: number | null;
    max: number | null;
    median: number | null;
  };
  confidenceLevel: ConfidenceLevel;
  confidenceReason: string;
  specifications: SpecificationItem[];
  commonBrands: string[];
  variants: ProductVariant[];
  sourcePrices: SourcePriceQuote[];
  sourcesCount?: number;
  isPriceUnavailable?: boolean;
  assumptions: string[];
  uncertaintyNotes: string[];
  researchedAt: string;
  queryUnderstanding?: ProductQueryUnderstanding;
  pricingIntelligence?: PricingIntelligenceResult;
}
