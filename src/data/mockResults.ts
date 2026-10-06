import { ProductResearchResult } from '../types/product';

/**
 * Isolated mock data repository for frontend demonstration.
 * In the next phase, this will be swapped with the live backend API (/api/search).
 */
export const MOCK_PRODUCTS: Record<string, ProductResearchResult> = {
  '12mm plywood': {
    id: 'mock-12mm-plywood',
    query: '12mm plywood',
    productName: '12mm CDX Hardwood / Softwood Plywood Sheet',
    category: 'Building Materials & Sheet Goods',
    shortDescription:
      'Standard structural grade 12mm (1/2-inch nominal) 4ft x 8ft plywood panel, commonly specified for sheathing, subflooring, cabinetry backing, and general framing construction.',
    unitOfMeasure: 'per 4ft x 8ft sheet (1.22m x 2.44m)',
    currency: 'USD',
    estimatedPrice: 32.5,
    priceRange: {
      min: 24.95,
      max: 42.0,
      median: 32.5,
    },
    confidenceLevel: 'HIGH',
    confidenceReason:
      'Aggregated from 5 active national building supply chains and regional lumber yards with consistent specification matching.',
    specifications: [
      { name: 'Nominal Thickness', value: '12 mm (0.472 in / ~1/2 in)' },
      { name: 'Standard Dimensions', value: '4 ft x 8 ft (1220 mm x 2440 mm)' },
      { name: 'Core Grade', value: 'CDX / Exterior Sheathing or Birch Core' },
      { name: 'Moisture Rating', value: 'Exterior Grade Phenolic Glue (Type I/II)' },
      { name: 'Average Weight', value: 'approx. 42 - 46 lbs (19 - 21 kg) per sheet' },
      { name: 'Applications', value: 'Subflooring, roof sheathing, wall bracing, crating' },
    ],
    commonBrands: ['Weyerhaeuser', 'Georgia-Pacific', 'Roseburg Forest Products', 'Arauco'],
    variants: [
      { name: 'Sanded BC Pine (Cabinet grade)', detail: 'Smoother face veneer for painting/joinery', priceDelta: '+$8 - $14 / sheet' },
      { name: 'Baltic Birch Multi-ply', detail: 'High-ply void-free core for precision CNC woodworking', priceDelta: '+$28 - $45 / sheet' },
      { name: 'Marine Grade 12mm', detail: 'Water-resistant tropical hardwoods with zero core gaps', priceDelta: '+$55 - $80 / sheet' },
    ],
    sourcePrices: [
      {
        retailer: 'Home Depot',
        price: 29.98,
        currency: 'USD',
        unit: 'sheet',
        url: 'https://homedepot.com',
        inStock: true,
        notes: '15/32 in. x 4 ft. x 8 ft. Category Sheathing',
      },
      {
        retailer: "Lowe's Home Improvement",
        price: 31.45,
        currency: 'USD',
        unit: 'sheet',
        url: 'https://lowes.com',
        inStock: true,
        notes: '12mm Pine CDX Plywood panel',
      },
      {
        retailer: '84 Lumber',
        price: 33.2,
        currency: 'USD',
        unit: 'sheet',
        url: 'https://84lumber.com',
        inStock: true,
        notes: 'Contractor bundle rate (min 10 sheets)',
      },
      {
        retailer: 'Menards',
        price: 27.89,
        currency: 'USD',
        unit: 'sheet',
        url: 'https://menards.com',
        inStock: true,
        notes: 'Promotional contractor rebate applied',
      },
    ],
    assumptions: [
      'Assumes standard untreated CDX exterior grade 4ft x 8ft panel.',
      'Pricing excludes job-site pallet delivery and local sales tax.',
      'Unit price based on individual sheet purchase; volume contractor discounts typically 8-15% lower.',
    ],
    uncertaintyNotes: [
      'Lumber commodity indices fluctuate weekly based on regional harvest and transportation costs.',
      'Hardwood birch imports carry significant variance based on port of entry.',
    ],
    researchedAt: 'Live Research Benchmark',
  },
  'cement board': {
    id: 'mock-cement-board',
    query: 'cement board',
    productName: '1/2-inch Cement Backer Board (Tile Substrate)',
    category: 'Masonry & Wet-Area Building Supplies',
    shortDescription:
      'High-durability cementitious substrate sheet reinforced with alkali-resistant fiberglass mesh, engineered for tile underlayment in showers, kitchens, and wet areas.',
    unitOfMeasure: 'per 3ft x 5ft panel (914mm x 1524mm)',
    currency: 'USD',
    estimatedPrice: 14.8,
    priceRange: {
      min: 12.25,
      max: 18.5,
      median: 14.8,
    },
    confidenceLevel: 'HIGH',
    confidenceReason:
      'Broadly stocked standardized construction product across major national DIY and professional distributor channels.',
    specifications: [
      { name: 'Thickness', value: '1/2 in (12.7 mm) or 1/4 in (6.35 mm)' },
      { name: 'Standard Sheet Size', value: '3 ft x 5 ft (36 in x 60 in)' },
      { name: 'Composition', value: 'Portland cement, aggregate, and fiberglass scrim' },
      { name: 'Fire Rating', value: 'Non-combustible (ASTM E136)' },
      { name: 'Water Resistance', value: 'Impervious to moisture rot and mold degradation' },
    ],
    commonBrands: ['HardieBacker (James Hardie)', 'Durock (USG)', 'WonderBoard Lite', 'Permabase'],
    variants: [
      { name: '1/4-inch Floor Underlayment', detail: 'Thinner profile intended for floor tile transitions', priceDelta: '-$2.00 / panel' },
      { name: 'HydroDefense Waterproof Coated', detail: 'Integrated waterproof surface barrier', priceDelta: '+$4.50 / panel' },
    ],
    sourcePrices: [
      {
        retailer: 'The Home Depot',
        price: 13.97,
        currency: 'USD',
        unit: 'panel',
        url: 'https://homedepot.com',
        inStock: true,
        notes: 'HardieBacker 0.5-in x 36-in x 60-in Cement Board',
      },
      {
        retailer: "Lowe's",
        price: 14.68,
        currency: 'USD',
        unit: 'panel',
        url: 'https://lowes.com',
        inStock: true,
        notes: 'USG Durock 0.5-in x 3-ft x 5-ft Cement Board',
      },
      {
        retailer: 'ABC Supply Co.',
        price: 15.2,
        currency: 'USD',
        unit: 'panel',
        url: 'https://abcsupply.com',
        inStock: true,
        notes: 'Commercial trade supplier inventory',
      },
    ],
    assumptions: [
      'Standard 3ft x 5ft panel size (common bathroom wall format).',
      'Does not include joint alkali-resistant tape or thin-set mortar required for install.',
    ],
    uncertaintyNotes: [
      'Weights may require freight surcharge for deliveries exceeding 1 ton.',
    ],
    researchedAt: 'Live Research Benchmark',
  },
  'samsung a55': {
    id: 'mock-samsung-a55',
    query: 'Samsung A55',
    productName: 'Samsung Galaxy A55 5G Smartphone (128GB / 256GB)',
    category: 'Consumer Electronics & Mobile Devices',
    shortDescription:
      'Mid-range Android smartphone featuring a 6.6-inch 120Hz Super AMOLED display, Exynos 1480 processor, aluminum frame, and IP67 water/dust resistance.',
    unitOfMeasure: 'per unlocked device (MSRP / retail)',
    currency: 'USD',
    estimatedPrice: 389.0,
    priceRange: {
      min: 349.99,
      max: 449.0,
      median: 389.0,
    },
    confidenceLevel: 'HIGH',
    confidenceReason:
      'Extensive global electronics retailer availability, established official carrier listings, and stable market pricing.',
    specifications: [
      { name: 'Processor', value: 'Samsung Exynos 1480 (4nm octa-core)' },
      { name: 'Display', value: '6.6" FHD+ Super AMOLED, 120Hz, Gorilla Glass Victus+' },
      { name: 'RAM / Storage', value: '8GB RAM + 128GB / 256GB Storage (microSD expandable)' },
      { name: 'Rear Cameras', value: '50MP Main (OIS) + 12MP Ultra-wide + 5MP Macro' },
      { name: 'Battery & Charging', value: '5,000 mAh with 25W fast charging' },
      { name: 'Build & Durability', value: 'Metal frame, glass back, IP67 water/dust rating' },
    ],
    commonBrands: ['Samsung'],
    variants: [
      { name: '128GB / 8GB RAM Base Model', detail: 'Standard storage tier', priceDelta: 'Baseline (~$360 - $390)' },
      { name: '256GB / 8GB RAM Model', detail: 'Expanded storage tier', priceDelta: '+$40 - $60' },
    ],
    sourcePrices: [
      {
        retailer: 'Amazon',
        price: 364.99,
        currency: 'USD',
        unit: 'device',
        url: 'https://amazon.com',
        inStock: true,
        notes: 'Unlocked International Version Dual SIM',
      },
      {
        retailer: 'B&H Photo Video',
        price: 389.0,
        currency: 'USD',
        unit: 'device',
        url: 'https://bhphotovideo.com',
        inStock: true,
        notes: 'GSM Unlocked Factory Sealed',
      },
      {
        retailer: 'Samsung Official Online Store',
        price: 439.99,
        currency: 'USD',
        unit: 'device',
        url: 'https://samsung.com',
        inStock: true,
        notes: 'Direct MSRP list price prior to trade-in promotions',
      },
    ],
    assumptions: [
      'Prices reflect factory-unlocked new units without carrier financing contracts.',
      'Excludes trade-in incentives or carrier billing bill-credits.',
    ],
    uncertaintyNotes: [
      'In regions where the A55 has no direct US carrier carrier lock-in, international import models carry varying manufacturer warranty coverage.',
    ],
    researchedAt: 'Live Research Benchmark',
  },
  'industrial safety helmet': {
    id: 'mock-safety-helmet',
    query: 'industrial safety helmet',
    productName: 'ANSI Type I / Type II Industrial Hard Hat & Climbing Safety Helmet',
    category: 'Personal Protective Equipment (PPE)',
    shortDescription:
      'Rigid construction head protection featuring high-density polyethylene (HDPE) or ABS shell, 4-point/6-point ratcheting suspension, and chin strap for elevated work.',
    unitOfMeasure: 'per individual helmet',
    currency: 'USD',
    estimatedPrice: 38.0,
    priceRange: {
      min: 18.5,
      max: 95.0,
      median: 38.0,
    },
    confidenceLevel: 'MEDIUM',
    confidenceReason:
      'Wide price bracket spanning basic cap-style hard hats ($18) up to European climbing-style safety helmets with integrated visors ($85+).',
    specifications: [
      { name: 'Certifications', value: 'ANSI/ISEA Z89.1-2014, CSA Z94.1, EN 397' },
      { name: 'Electrical Class', value: 'Class E (Electrical up to 20,000V) or Class C (Vented)' },
      { name: 'Shell Material', value: 'High-Density Polyethylene (HDPE) / ABS / Polycarbonate' },
      { name: 'Suspension System', value: '6-point rapid ratchet dial adjustment' },
      { name: 'Weight', value: '380 g - 470 g depending on chin strap & ventilation' },
    ],
    commonBrands: ['3M (SecureFit)', 'MSA Safety (V-Gard)', 'Petzl (Vertex)', 'Klein Tools', 'Honeywell / Fibre-Metal'],
    variants: [
      { name: 'Standard Full-Brim Hard Hat (Class E)', detail: 'General construction 360-degree sun/debris brim', priceDelta: '$18 - $30' },
      { name: 'Climbing Style Safety Helmet with Chin Strap', detail: 'Work-at-heights low-profile non-vented', priceDelta: '$45 - $85' },
      { name: 'Vented Style with Eye Visor Attachment', detail: 'Hot weather high-ventilation industrial style', priceDelta: '$65 - $115' },
    ],
    sourcePrices: [
      {
        retailer: 'Grainger Industrial Supply',
        price: 36.5,
        currency: 'USD',
        unit: 'item',
        url: 'https://grainger.com',
        inStock: true,
        notes: '3M SecureFit Safety Helmet with 4-Point Ratchet',
      },
      {
        retailer: 'Fastenal',
        price: 24.95,
        currency: 'USD',
        unit: 'item',
        url: 'https://fastenal.com',
        inStock: true,
        notes: 'MSA V-Gard Slotted Cap Style Hard Hat',
      },
      {
        retailer: 'Zoro Industrial Tools',
        price: 42.15,
        currency: 'USD',
        unit: 'item',
        url: 'https://zoro.com',
        inStock: true,
        notes: 'Klein Tools Vented Hard Hat with Headlamp Mount',
      },
    ],
    assumptions: [
      'Reflects single unit purchase; bulk safety pack carton rates (12-24 units) offer 20-30% volume discounts.',
    ],
    uncertaintyNotes: [
      'Safety helmets with integrated flip-down face shields or hearing protection brackets significantly increase final package costs.',
    ],
    researchedAt: 'Live Research Benchmark',
  },
  'office chair': {
    id: 'mock-office-chair',
    query: 'office chair',
    productName: 'Ergonomic Mesh Mid-Back / High-Back Task Office Chair',
    category: 'Commercial Furniture & Office Seating',
    shortDescription:
      'Adjustable ergonomic work chair with breathable elastomeric mesh backrest, pneumatic height adjustment, adjustable lumbar support, and synchronized tilt mechanism.',
    unitOfMeasure: 'per assembled / boxed chair',
    currency: 'USD',
    estimatedPrice: 215.0,
    priceRange: {
      min: 99.0,
      max: 680.0,
      median: 215.0,
    },
    confidenceLevel: 'MEDIUM',
    confidenceReason:
      'Broad category ranging from budget consumer flat-pack task chairs ($99) to certified commercial ergonomic task seating ($400-$700+).',
    specifications: [
      { name: 'Mechanism', value: 'Synchro-tilt with tilt-lock and tension knob' },
      { name: 'Seat Material', value: 'High-density molded foam with fabric or full mesh' },
      { name: 'Backrest', value: 'Breathable composite mesh with adjustable lumbar support' },
      { name: 'Weight Capacity', value: 'Standard BIFMA rated: 275 - 300 lbs (125 - 136 kg)' },
      { name: 'Armrests', value: '3D adjustable (height, depth, pivot angle)' },
      { name: 'Base & Casters', value: 'Heavy-duty 5-star nylon or aluminum base with nylon twin-wheel casters' },
    ],
    commonBrands: ['Steelcase', 'Herman Miller', 'HON', 'Branch', 'Ticova', 'SIHOO'],
    variants: [
      { name: 'Budget Consumer Task Chair', detail: 'Basic mesh, fixed lumbar, 1D armrests', priceDelta: '$95 - $149' },
      { name: 'Mid-Tier Ergonomic Workstation Chair', detail: '3D arms, dynamic lumbar, aluminum base', priceDelta: '$190 - $350' },
      { name: 'Premium Commercial Certified (Steelcase Series 1/Gesture)', detail: '12-year 24/7 commercial warranty', priceDelta: '$480 - $980+' },
    ],
    sourcePrices: [
      {
        retailer: 'Staples Business',
        price: 189.99,
        currency: 'USD',
        unit: 'chair',
        url: 'https://staples.com',
        inStock: true,
        notes: 'Union & Scale FlexFit Hyken Mesh Task Chair',
      },
      {
        retailer: 'Amazon Commercial',
        price: 169.99,
        currency: 'USD',
        unit: 'chair',
        url: 'https://amazon.com',
        inStock: true,
        notes: 'Ticova Ergonomic High-Back Mesh Chair',
      },
      {
        retailer: 'Wayfair Professional',
        price: 249.0,
        currency: 'USD',
        unit: 'chair',
        url: 'https://wayfair.com',
        inStock: true,
        notes: 'Commercial Grade Mid-Back Ergonomic Chair',
      },
    ],
    assumptions: [
      'Reflects mid-tier ergonomic specification with adjustable lumbar and multi-directional arms.',
      'Delivered flat-pack (requires 15-20 min assembly); fully assembled delivery adds $40-60.',
    ],
    uncertaintyNotes: [
      'Extremely high price dispersion between consumer import products and commercial architectural contract seating.',
    ],
    researchedAt: 'Live Research Benchmark',
  },
  'stainless steel pipe 2 inch': {
    id: 'mock-ss-pipe-2inch',
    query: 'stainless steel pipe 2 inch',
    productName: '2-inch Nominal Bore Stainless Steel Pipe (Grade 304 / 316, Schedule 40)',
    category: 'Industrial Metals & Piping Systems',
    shortDescription:
      'Seamless or welded austenitic stainless steel pipe with 2.375-inch (60.3mm) outer diameter, engineered for chemical, sanitary food grade, structural, or fluid conveyance systems.',
    unitOfMeasure: 'per 20-foot (6.1 meter) standard stick length',
    currency: 'USD',
    estimatedPrice: 168.0,
    priceRange: {
      min: 125.0,
      max: 245.0,
      median: 168.0,
    },
    confidenceLevel: 'HIGH',
    confidenceReason:
      'Directly cross-referenced with major industrial metal service centers and distributor catalog price sheets.',
    specifications: [
      { name: 'Nominal Pipe Size (NPS)', value: '2 inch' },
      { name: 'Outside Diameter (OD)', value: '2.375 in (60.3 mm)' },
      { name: 'Wall Thickness', value: 'Schedule 40: 0.154 in (3.91 mm) / Schedule 10: 0.109 in (2.77 mm)' },
      { name: 'Material Grades', value: 'ASTM A312 TP304/304L (General) or TP316/316L (Marine/Acid)' },
      { name: 'Manufacturing Type', value: 'Welded (ERW) or Seamless' },
      { name: 'Standard Length', value: '20 ft (6.1 m) random lengths with plain beveled ends' },
    ],
    commonBrands: ['Outokumpu', 'Sandvik / Alleima', 'Plymouth Tube', 'Webco Industries'],
    variants: [
      { name: 'Grade 304 Welded Schedule 40', detail: 'Standard commercial grade fluid conveyance', priceDelta: '$135 - $175 / 20ft' },
      { name: 'Grade 316L Seamless Schedule 40', detail: 'Molybdenum-alloyed corrosion & marine grade', priceDelta: '+$75 - $120 / 20ft' },
      { name: 'Sanitary Food Grade Tube (Polished ID/OD)', detail: '3-A Sanitary standard finish for dairy/brewery', priceDelta: '+$90 - $140 / 20ft' },
    ],
    sourcePrices: [
      {
        retailer: 'McMaster-Carr',
        price: 184.5,
        currency: 'USD',
        unit: '20ft pipe',
        url: 'https://mcmaster.com',
        inStock: true,
        notes: 'Multipurpose 304 Stainless Steel Pipe, Unthreaded, 2" Pipe Size',
      },
      {
        retailer: 'OnlineMetals.com',
        price: 162.2,
        currency: 'USD',
        unit: '20ft pipe',
        url: 'https://onlinemetals.com',
        inStock: true,
        notes: 'Stainless Steel Round Tube/Pipe 304 Welded',
      },
      {
        retailer: 'Ryerson Metal Service Centers',
        price: 148.0,
        currency: 'USD',
        unit: '20ft pipe',
        url: 'https://ryerson.com',
        inStock: true,
        notes: 'Commercial trade bundle mill quote (per stick)',
      },
    ],
    assumptions: [
      'Reflects standard Grade 304 Schedule 40 plain-end pipe in 20-foot standard stick length.',
      'Industrial freight / flatbed delivery rates apply due to physical 20-foot shipping length.',
    ],
    uncertaintyNotes: [
      'Global nickel and chromium surcharge indexes cause weekly mill base price adjustments.',
      'Seamless manufacturing commands a 35-50% price premium over welded tube.',
    ],
    researchedAt: 'Live Research Benchmark',
  },
};

/**
 * Normalizes query string to match known keys or generate dynamic fallback mock.
 */
export function getMockResearchResult(query: string): ProductResearchResult {
  const normalized = query.trim().toLowerCase();

  // Direct exact or partial match against mock dictionary
  for (const [key, result] of Object.entries(MOCK_PRODUCTS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return {
        ...result,
        query: query.trim(),
      };
    }
  }

  // Dynamic realistic fallback for any entered custom product query
  const words = query.trim().split(/\s+/);
  const capitalized = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return {
    id: `mock-${Date.now()}`,
    query: query.trim(),
    productName: `${capitalized} (Market Baseline Benchmark)`,
    category: 'Commercial & Industrial Products',
    shortDescription: `Standard market baseline estimate for "${query.trim()}". Analysis synthesizes prevailing supplier list prices, common material grades, and technical trade dimensions.`,
    unitOfMeasure: 'per standard unit',
    currency: 'USD',
    estimatedPrice: 75.0,
    priceRange: {
      min: 48.0,
      max: 115.0,
      median: 75.0,
    },
    confidenceLevel: 'ESTIMATED',
    confidenceReason:
      'Preliminary benchmark estimate generated for custom query preview. Live backend search integration will ground this across live retail and distributor citations.',
    specifications: [
      { name: 'Item / Material Name', value: capitalized },
      { name: 'Standard Trade Class', value: 'Commercial Grade' },
      { name: 'Procurement Cycle', value: 'Standard off-the-shelf distributor availability' },
      { name: 'Common Package Format', value: 'Individually packaged or standard contractor bundle' },
    ],
    commonBrands: ['Leading Industry Brands', 'Regional Distributors', 'OEM Manufacturers'],
    variants: [
      { name: 'Standard Grade', detail: 'General commercial utility specification', priceDelta: 'Baseline' },
      { name: 'Heavy-Duty / Industrial', detail: 'Reinforced specifications for continuous operational use', priceDelta: '+$25 - $45' },
    ],
    sourcePrices: [
      {
        retailer: 'National Supply Index',
        price: 69.5,
        currency: 'USD',
        unit: 'unit',
        url: 'https://example.com/supplier',
        inStock: true,
        notes: 'Commercial trade catalog baseline quote',
      },
      {
        retailer: 'Industrial Marketplace',
        price: 82.0,
        currency: 'USD',
        unit: 'unit',
        url: 'https://example.com/distributor',
        inStock: true,
        notes: 'Direct list price benchmark',
      },
    ],
    assumptions: [
      'Assumes standard single unit retail/contractor pricing.',
      'Local sales tax, customs duties, and courier freight not included.',
    ],
    uncertaintyNotes: [
      'Custom or non-standard dimensions will alter pricing beyond this preliminary range.',
    ],
    researchedAt: 'Live Research Benchmark',
  };
}
