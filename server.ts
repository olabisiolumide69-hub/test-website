import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchProduct, validateAndNormalizeQuery, SearchValidationError } from './server/services/productSearchService.ts';
import { understandProductQuery } from './server/services/queryUnderstandingService.ts';
import { executeProductResearch } from './server/services/research/researchProvider.ts';
import { calculatePricingIntelligence } from './server/services/pricing/pricingEngine.ts';
import { searchDb } from './server/db/database.ts';
import { createRateLimiter } from './server/middleware/rateLimiter.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  // Security Headers Middleware
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    next();
  });

  // Middleware for parsing JSON requests
  app.use(express.json({ limit: '500kb' }));

  // Cost Control & Rate Limiting for search execution (20 requests/minute per IP, no concurrent hammering)
  const searchRateLimiter = createRateLimiter({
    windowMs: 60000,
    maxRequests: 20,
    allowConcurrent: false,
  });

  // Basic API Health Endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'SpecPrice Search API',
      timestamp: new Date().toISOString(),
    });
  });

  // Dedicated Query Understanding Endpoint
  app.post('/api/understand-query', async (req: Request, res: Response) => {
    try {
      const { query } = req.body || {};
      const normalized = validateAndNormalizeQuery(query);
      const understanding = await understandProductQuery(normalized);

      res.json({
        success: true,
        data: understanding,
      });
    } catch (err: any) {
      if (err && typeof err.status === 'number' && typeof err.message === 'string') {
        res.status(err.status).json({
          success: false,
          error: err.message,
        });
        return;
      }

      console.error('Error in /api/understand-query:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Failed to understand query.',
      });
    }
  });

  // Dedicated Product Research Endpoint
  app.post('/api/research', searchRateLimiter, async (req: Request, res: Response) => {
    try {
      const { query, understanding: providedUnderstanding } = req.body || {};
      let understanding = providedUnderstanding;

      if (!understanding) {
        const normalized = validateAndNormalizeQuery(query);
        understanding = await understandProductQuery(normalized);
      }

      const researchReport = await executeProductResearch(understanding);

      res.json({
        success: true,
        data: researchReport,
      });
    } catch (err: any) {
      if (err && typeof err.status === 'number' && typeof err.message === 'string') {
        res.status(err.status).json({
          success: false,
          error: err.message,
        });
        return;
      }

      console.error('Error in /api/research:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Failed to conduct product web research.',
      });
    }
  });

  // Dedicated Pricing Intelligence Endpoint
  app.post('/api/pricing-intelligence', async (req: Request, res: Response) => {
    try {
      const { query, understanding: providedUnderstanding, listings: providedListings } = req.body || {};
      let understanding = providedUnderstanding;

      if (!understanding) {
        const normalized = validateAndNormalizeQuery(query);
        understanding = await understandProductQuery(normalized);
      }

      let listings = providedListings;
      if (!listings) {
        const researchReport = await executeProductResearch(understanding);
        listings = researchReport.listings;
      }

      const pricingResult = calculatePricingIntelligence(understanding, listings);

      res.json({
        success: true,
        data: pricingResult,
      });
    } catch (err: any) {
      if (err && typeof err.status === 'number' && typeof err.message === 'string') {
        res.status(err.status).json({
          success: false,
          error: err.message,
        });
        return;
      }

      console.error('Error in /api/pricing-intelligence:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Failed to calculate pricing intelligence.',
      });
    }
  });

  // Recent Searches Endpoint
  app.get('/api/searches/recent', (_req: Request, res: Response) => {
    try {
      const recent = searchDb.getRecentSearches(10);
      res.json({
        success: true,
        data: recent,
      });
    } catch (err: any) {
      console.error('Error in /api/searches/recent:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve recent searches.',
      });
    }
  });

  // Get Search Hierarchy by ID
  app.get('/api/searches/:id', (req: Request, res: Response) => {
    try {
      const searchRecord = searchDb.getSearchById(req.params.id);
      if (!searchRecord) {
        res.status(404).json({
          success: false,
          error: `Search with ID "${req.params.id}" not found.`,
        });
        return;
      }

      res.json({
        success: true,
        data: searchRecord,
      });
    } catch (err: any) {
      console.error('Error in /api/searches/:id:', err);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve search record.',
      });
    }
  });

  // Secure Product Search Endpoint
  app.post('/api/search', searchRateLimiter, async (req: Request, res: Response) => {
    try {
      const { query } = req.body || {};
      const result = await searchProduct(query);

      res.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      if (err && typeof err.status === 'number' && typeof err.message === 'string') {
        res.status(err.status).json({
          success: false,
          error: err.message,
        });
        return;
      }

      console.error('Unhandled server error in /api/search:', err);
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred while processing your search. Please try again.',
      });
    }
  });

  // Setup Vite in development or static file serving in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`SpecPrice server running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
