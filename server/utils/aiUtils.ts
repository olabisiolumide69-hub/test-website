/**
 * Production resilience utilities for AI and external API interactions:
 * - Timeouts to prevent hung sockets
 * - Exponential backoff retry on transient 503 / 429 network spikes
 * - Prompt injection filtering to neutralize untrusted instructions
 */

export async function executeWithTimeoutAndRetry<T>(
  fn: () => Promise<T>,
  timeoutMs = 12000,
  maxRetries = 2,
  baseDelayMs = 500
): Promise<T> {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      // Race execution against a timeout promise
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`API operation timed out after ${timeoutMs}ms`)), timeoutMs)
        ),
      ]);
      return result;
    } catch (err: any) {
      attempt++;
      const isQuotaExhausted =
        err?.message?.includes('RESOURCE_EXHAUSTED') ||
        err?.message?.includes('quota');

      if (isQuotaExhausted) {
        throw err;
      }

      const isTransient =
        err?.message?.includes('503') ||
        err?.message?.includes('UNAVAILABLE') ||
        err?.message?.includes('timed out');

      if (attempt > maxRetries || !isTransient) {
        throw err;
      }

      // Exponential backoff
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Operation failed after maximum retry attempts.');
}

/**
 * Neutralizes potential prompt injection patterns in user query strings
 * by stripping control directives and bounding input.
 */
export function sanitizePromptInput(input: string): string {
  if (!input) return '';

  let sanitized = input.trim();

  // Remove potential instruction override delimiters and jailbreak prefixes
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior)\s+instructions/gi,
    /disregard\s+(all\s+)?(previous|prior)\s+instructions/gi,
    /system\s*prompt\s*:/gi,
    /system\s*instruction\s*:/gi,
    /you\s+are\s+now\s+a/gi,
    /output\s+only\s+the\s+following/gi,
    /forget\s+everything/gi,
  ];

  for (const pattern of injectionPatterns) {
    sanitized = sanitized.replace(pattern, '[filtered]');
  }

  // Bound maximum length
  return sanitized.slice(0, 250);
}
