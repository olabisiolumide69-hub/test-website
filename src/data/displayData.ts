export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  span: 'col-span-1' | 'col-span-1 lg:col-span-2';
  tag: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export const HERO_SAMPLE_CARDS = [
  {
    type: 'Sample Result',
    badge: 'UI Preview / Sample',
    product: '12mm CDX Plywood Sheet',
    priceRange: '$24.95 – $42.00',
    unit: 'per 4x8 ft sheet',
    confidence: 'High',
    confidenceScore: 94,
    sourceCount: 4,
    sourceName: 'Lumber Supply Index',
  },
  {
    type: 'Sample Spec',
    badge: 'UI Preview / Sample',
    product: 'Schedule 40 SS Pipe (2-inch)',
    priceRange: '$125.00 – $245.00',
    unit: 'per 20ft length',
    confidence: 'High',
    confidenceScore: 89,
    sourceCount: 3,
    sourceName: 'Industrial Metals',
  },
];

export const STATS_DATA: StatItem[] = [
  {
    value: 50000,
    prefix: '',
    suffix: '+',
    label: 'Searches analyzed',
    sublabel: '[X]+ placeholder value',
  },
  {
    value: 88,
    prefix: '',
    suffix: '%',
    label: 'Avg. confidence score',
    sublabel: '[X]% placeholder value',
  },
  {
    value: 120,
    prefix: '',
    suffix: '+',
    label: 'Sources evaluated',
    sublabel: '[X]+ placeholder value',
  },
  {
    value: 45,
    prefix: '',
    suffix: '+',
    label: 'Material categories',
    sublabel: '[X] placeholder value',
  },
];

export const LARGE_VALUE_METRICS = [
  {
    value: 120,
    suffix: '+',
    label: 'Sources analyzed',
    detail: 'Aggregated supplier catalogs, industrial distributors, and trade indexes.',
    placeholderNote: '[X]+ sources placeholder',
  },
  {
    value: 2.4,
    suffix: 's',
    label: 'Average research time',
    detail: 'Sub-second vector query comprehension and pricing consensus calculation.',
    placeholderNote: '[X] sec placeholder',
  },
  {
    value: 85,
    suffix: '%',
    label: 'Confidence threshold',
    detail: 'Minimum statistical variance required before issuing a high-confidence range.',
    placeholderNote: '[X]% threshold placeholder',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    step: '01',
    title: 'Search',
    description: 'Enter the product, material grade, or dimension you want to research.',
    iconName: 'Search',
  },
  {
    step: '02',
    title: 'AI Research',
    description: 'The system gathers relevant pricing information from available sources and supplier lists.',
    iconName: 'Cpu',
  },
  {
    step: '03',
    title: 'Price Estimate',
    description: 'Receive an estimated price range, verified source references, and an empirical confidence level.',
    iconName: 'TrendingUp',
  },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'price-range',
    title: 'Price Range',
    description: 'Displays estimated low and high market pricing alongside median benchmarks, capturing realistic market spreads instead of a misleading single number.',
    span: 'col-span-1 lg:col-span-2',
    tag: 'Dynamic Spectrum',
  },
  {
    id: 'source-transparency',
    title: 'Source Transparency',
    description: 'Inspect the exact distributor quotes, direct merchant links, and observation timestamps behind every estimate.',
    span: 'col-span-1',
    tag: 'Verifiable Proof',
  },
  {
    id: 'confidence-indicator',
    title: 'Confidence Indicator',
    description: 'Clearly communicates how reliable the available pricing information appears based on source volume and variance.',
    span: 'col-span-1',
    tag: 'Empirical Reliability',
  },
  {
    id: 'fast-search',
    title: 'Fast Search',
    description: 'Built around a simple text-first search experience. No complex configuration or cumbersome parametric forms.',
    span: 'col-span-1',
    tag: 'Text-First UX',
  },
  {
    id: 'clean-results',
    title: 'Clean Results',
    description: 'Zero clutter, clickbait, or sponsored affiliate promotions. Delivers straightforward, actionable procurement intelligence.',
    span: 'col-span-1',
    tag: 'Zero Clutter',
  },
  {
    id: 'responsive-experience',
    title: 'Responsive Experience',
    description: 'Seamlessly calibrated for mobile job-site checks, tablet warehouse inspections, and desktop procurement workflows.',
    span: 'col-span-1 lg:col-span-2',
    tag: 'Any Device',
  },
];

export const TRUST_SOURCES = [
  { name: 'Marketplace', category: 'Broad Goods' },
  { name: 'Retailer', category: 'Consumer Supply' },
  { name: 'Supplier', category: 'Trade Distribution' },
  { name: 'Manufacturer', category: 'Direct OEM' },
  { name: 'Public Data', category: 'Industry Indexes' },
];

export const SAMPLE_QUERIES = [
  '12mm plywood',
  'cement board',
  'samsung a55',
  'industrial safety helmet',
  'stainless steel pipe 2 inch',
];
