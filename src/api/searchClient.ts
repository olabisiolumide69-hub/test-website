import { ProductResearchResult } from '../types/product';

export const CLIENT_MAX_QUERY_LENGTH = 200;

export interface SearchApiResponse {
  success: boolean;
  data?: ProductResearchResult;
  error?: string;
}

export class ClientValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientValidationError';
  }
}

export class ServerApiError extends Error {
  public status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ServerApiError';
    this.status = status;
  }
}

let activeAbortController: AbortController | null = null;
let lastSubmittedQuery: string | null = null;
let lastSubmittedTimestamp = 0;

/**
 * Client-side interface to execute searchProduct against the backend endpoint.
 * Decouples frontend UI from backend AI services and handles validation,
 * aborting previous requests, duplicate click prevention, and HTTP errors.
 */
export async function searchProductApi(rawQuery: string): Promise<ProductResearchResult> {
  const trimmed = (rawQuery || '').trim();

  // 1. Validate not empty
  if (!trimmed) {
    throw new ClientValidationError('Please enter a product or material name to search.');
  }

  // 2. Validate max query length
  if (trimmed.length > CLIENT_MAX_QUERY_LENGTH) {
    throw new ClientValidationError(
      `Query is too long (${trimmed.length} characters). Please keep your search under ${CLIENT_MAX_QUERY_LENGTH} characters.`
    );
  }

  // 3. Prevent duplicate submission if the same search is already actively running
  if (activeAbortController && lastSubmittedQuery === trimmed) {
    throw new ClientValidationError('A search for this item is already in progress.');
  }

  const now = Date.now();
  lastSubmittedQuery = trimmed;
  lastSubmittedTimestamp = now;

  // Cancel any ongoing search request
  if (activeAbortController) {
    activeAbortController.abort();
  }

  activeAbortController = new AbortController();
  const signal = activeAbortController.signal;

  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: trimmed }),
      signal,
    });

    let payload: SearchApiResponse;
    try {
      payload = await response.json();
    } catch {
      throw new ServerApiError(
        'Server returned an unreadable response format. Please try again later.',
        response.status
      );
    }

    if (!response.ok || !payload.success || !payload.data) {
      const errorMessage = payload.error || `Search request failed with status ${response.status}.`;
      throw new ServerApiError(errorMessage, response.status);
    }

    return payload.data;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new ClientValidationError('Search was cancelled due to a new request.');
    }
    if (err instanceof ClientValidationError || err instanceof ServerApiError) {
      throw err;
    }
    // Network errors (e.g. server offline or connection lost)
    throw new ServerApiError(
      'Unable to connect to the search server. Please verify your internet connection.',
      0
    );
  } finally {
    activeAbortController = null;
  }
}
