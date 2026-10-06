import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  timestamps: number[];
  inFlight: boolean;
}

const clientRecords = new Map<string, RateLimitRecord>();

// Clean up stale client records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of clientRecords.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < 60000);
    if (record.timestamps.length === 0 && !record.inFlight) {
      clientRecords.delete(ip);
    }
  }
}, 300000);

export interface RateLimitOptions {
  windowMs?: number; // default: 60,000 ms (1 min)
  maxRequests?: number; // default: 20 requests per window
  allowConcurrent?: boolean; // default: false (prevent multiple simultaneous expensive searches per IP)
}

/**
 * Production rate limiting middleware to prevent API abuse, denial-of-service,
 * and runaway external API cost.
 */
export function createRateLimiter(options: RateLimitOptions = {}) {
  const windowMs = options.windowMs || 60000;
  const maxRequests = options.maxRequests || 20;
  const allowConcurrent = options.allowConcurrent ?? false;

  return (req: Request, res: Response, next: NextFunction): void => {
    // Determine client identifier (trusted reverse-proxy header or socket IP)
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '127.0.0.1';

    const now = Date.now();
    let record = clientRecords.get(ip);

    if (!record) {
      record = { timestamps: [], inFlight: false };
      clientRecords.set(ip, record);
    }

    // Clean timestamps outside the sliding window
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

    // 1. Prevent concurrent expensive searches from the same client
    if (!allowConcurrent && record.inFlight) {
      res.status(429).json({
        success: false,
        error: 'A search request is already being processed for your session. Please wait for it to complete.',
      });
      return;
    }

    // 2. Enforce request rate limit
    if (record.timestamps.length >= maxRequests) {
      const oldest = record.timestamps[0];
      const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      res.status(429).json({
        success: false,
        error: `Search rate limit reached. Please wait ${retryAfterSec} second${retryAfterSec > 1 ? 's' : ''} before submitting another query.`,
      });
      return;
    }

    // Record request and track in-flight state
    record.timestamps.push(now);
    record.inFlight = true;

    // Release in-flight flag when response completes
    const releaseLock = () => {
      record.inFlight = false;
      res.removeListener('finish', releaseLock);
      res.removeListener('close', releaseLock);
    };

    res.on('finish', releaseLock);
    res.on('close', releaseLock);

    next();
  };
}
