export interface ExtractedProductListing {
  source: string;
  title: string;
  url: string;
  seller: string | null;
  brand: string | null;
  product: string;
  price: number | null;
  currency: string | null;
  availability: string | null;
  specifications: string[];
  retrievedAt: string;
}

export interface WebResearchReport {
  query: string;
  searchedQueries: string[];
  totalResultsFound: number;
  listings: ExtractedProductListing[];
  retrievedAt: string;
  notes?: string[];
}
