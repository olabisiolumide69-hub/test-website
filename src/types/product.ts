export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'ESTIMATED';

export interface SpecificationItem {
  name: string;
  value: string;
  category?: string;
}

export interface SourcePriceQuote {
  retailer: string;
  price: number;
  currency: string;
  unit: string;
  url: string;
  inStock?: boolean;
  notes?: string;
}

export interface ProductVariant {
  name: string;
  detail: string;
  priceDelta?: string;
}

export interface ProductResearchResult {
  id: string;
  query: string;
  productName: string;
  category: string;
  shortDescription: string;
  unitOfMeasure: string;
  currency: string;
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
    median: number;
  };
  confidenceLevel: ConfidenceLevel;
  confidenceReason: string;
  specifications: SpecificationItem[];
  commonBrands: string[];
  variants: ProductVariant[];
  sourcePrices: SourcePriceQuote[];
  assumptions: string[];
  uncertaintyNotes: string[];
  researchedAt: string;
}
