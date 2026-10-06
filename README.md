# SpecPrice - Material & Product Market Intelligence MVP

An AI-grounded commercial market intelligence engine for estimating current procurement prices, specifications, and distributor citations for physical materials, industrial hardware, electronics, and building supplies.

> **Architecture Notice:** SpecPrice MVP is strictly **text-search-only**. It contains zero image-upload, camera, or visual recognition components, maintaining focused engineering rigor on high-precision natural-language query decomposition, web research grounding, and statistical price outlier filtering.

---

## 1. Project Overview

SpecPrice solves the problem of opaque and volatile market pricing for commercial goods, construction materials, and technical items. When a user queries a physical item:
1. **AI Query Understanding Layer**: Deconstructs natural language into normalized product attributes, extracts explicit dimensions/units without hallucination, detects brands/models, and plans multi-angle web research queries.
2. **Web Research Grounding Layer**: Interrogates active distributor catalogs, marketplaces, and trade supplier listings, preserving direct source URLs.
3. **Pricing Intelligence Engine**: Analyzes retrieved price observations, filters out accessories and bulk container lot outliers, groups comparable variants, converts currencies when appropriate (with native NGN preference for Nigerian queries), and computes a reliable market benchmark range with confidence scoring.
4. **Relational Persistence**: Atomically records searches, interpretations, citations, observations, and final benchmarks with foreign-key integrity in an embedded SQLite database.

---

## 2. Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons.
- **Application Server**: Node.js v22 (ESM), Express 4.
- **Build Tooling**: Vite 8, `tsx`.
- **AI & Grounding**: `@google/genai` TypeScript SDK (`gemini-3.8-flash` with Google Search Grounding).
- **Database**: Relational SQLite (`node:sqlite` DatabaseSync) with WAL mode, foreign keys, and indexes.
- **In-Memory Caching**: LRU Query Cache with 30-minute TTL.
- **Security & Protection**: IP sliding-window rate limiting, in-flight concurrency locks, prompt injection filtering, URL sanitization, and security HTTP headers.

---

## 3. Local Development Setup

### Prerequisites
- Node.js >= 20.0.0 (Node 22 recommended)
- npm >= 9.0.0
- Google Gemini API Key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd specprice

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY
```

### Running Locally

```bash
# Start full-stack development server (Express backend + Vite middleware)
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## 4. Environment Variables

Configure the following variables in `.env` (or in your production secrets manager):

| Variable | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `GEMINI_API_KEY` | **Yes** | — | Google Gemini API key used server-side for query analysis and search grounding. |
| `PORT` | No | `3000` | Port for the Express server. |
| `NODE_ENV` | No | `development` | Set to `production` in live environments for optimized static serving. |
| `APP_URL` | No | `http://localhost:3000` | Base URL of the deployed application. |

> **Security Rule:** Never prefix backend secret keys with `VITE_`. Secrets must remain strictly server-side.

---

## 5. Database Setup & Migrations

SpecPrice uses an embedded relational SQLite database located at `data/specprice.db`.

### Database Structure
The database enforces strict relational foreign keys (`PRAGMA foreign_keys = ON;`) across five core tables:

1. **`searches`**: Stores unique query sessions (`id`, `original_query`, `status`, `created_at`, `updated_at`).
2. **`query_interpretations`**: 1-to-1 with search. Stores normalized attributes, category, specifications array, variants, and confidence.
3. **`research_sources`**: 1-to-many with search. Stores discovered distributor pages, titles, domain, raw URLs, and item specs.
4. **`price_observations`**: 1-to-many with search. Stores raw quotes, original currencies, normalized comparison values, exact-match flags, and outlier indicators.
5. **`final_search_results`**: 1-to-1 with search. Stores final benchmark median, price range, confidence reason, limitations, and full payload.

### Migrations
Database tables and indexes are created automatically on server startup idempotently (`CREATE TABLE IF NOT EXISTS`). No manual migration scripts are required. Ensure the hosting environment grants write permissions to the `./data` directory.

---

## 6. AI Configuration

- **Model Alias**: `gemini-3.8-flash` via `@google/genai`.
- **Query Understanding**: Uses structured JSON output (`responseMimeType: "application/json"`, `responseSchema`) to enforce a strict contract.
- **Prompt Injection Defense**: Sanitizes all query input via `sanitizePromptInput()` before inference to neutralize instruction overrides.
- **Execution Resilience**: AI requests are wrapped in `executeWithTimeoutAndRetry()` with a 12-second timeout and exponential backoff retry.

---

## 7. Search Provider Configuration

SpecPrice features a provider-agnostic interface (`WebResearchProvider`):

```typescript
export interface WebResearchProvider {
  name: string;
  research(understanding: ProductQueryUnderstanding): Promise<ExtractedProductListing[]>;
}
```

- **`GeminiGroundedSearchProvider`** (Default): Searches Google live indexes using `{ googleSearch: {} }` grounding tools.
- **`FallbackCuratedSearchProvider`**: Engaged automatically on upstream rate limits or quota exhaustion to ensure zero downtime.
- Providers can be hot-swapped via `setWebResearchProvider(customProvider)`.

---

## 8. Deployment Instructions

### Production Build

```bash
# Build the client static bundle into /dist
npm run build
```

### Production Execution

```bash
# Start server in production mode
NODE_ENV=production npm start
```

### Cloud Run / Container Deployment
1. Build the multi-stage container with Node 22.
2. Mount a persistent volume at `/data` if persistent SQLite history across container restarts is required.
3. Inject `GEMINI_API_KEY` via Google Cloud Secret Manager or Cloud Run Environment Variables.
4. Set container port to `3000`.
5. Point the load balancer health check to `GET /api/health`.

### HTTPS & Domain Configuration
- Cloud Run, Cloudflare, and AWS ALB automatically terminate TLS/HTTPS at the edge.
- Express enforces standard security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`).

---

## 9. Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **HTTP 429 Too Many Requests** | Rate limit exceeded (>20 req/min) or concurrent search active | Wait for the indicated `Retry-After` seconds or allow in-flight search to finish. |
| **"Market Price Unavailable"** | Item requires custom manufacturer RFQ or trade portal login | Technical specifications and catalog citations are displayed; contact distributor directly via source link. |
| **Gemini 503 / 429 Spikes** | Upstream Google API transient load | The engine automatically retries and falls back to curated industry benchmarks without failing the request. |
| **SQLite I/O Error** | Read-only container filesystem | Verify that the `./data` directory has read/write permissions. |

---

## 10. Known Limitations

1. **Trade-Only Gated Wholesale Portals**: Pricing behind password-protected B2B supplier portals cannot be indexed publicly.
2. **Volatile Foreign Exchange Rates**: Benchmark conversions between international currencies and NGN rely on reference exchange rates; large intraday currency shifts may take hours to reflect in local retail quotes.
3. **Single-Node In-Memory Cache**: The LRU query cache is in-process memory. In multi-container autoscaling deployments, each container maintains its own local cache unless backed by a shared Redis cluster.
