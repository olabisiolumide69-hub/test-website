import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { CLIENT_MAX_QUERY_LENGTH } from '../api/searchClient';

interface SearchBarProps {
  initialQuery?: string;
  isLoading: boolean;
  onSearch: (query: string) => void;
  suggestions?: string[];
}

export const DEFAULT_SUGGESTIONS = [
  '12mm plywood',
  'cement board',
  'Samsung A55',
  'industrial safety helmet',
  'office chair',
  'stainless steel pipe 2 inch',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  isLoading,
  onSearch,
  suggestions = DEFAULT_SUGGESTIONS,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [validationHint, setValidationHint] = useState<string | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const trimmed = query.trim();
  const isOverLimit = query.length > CLIENT_MAX_QUERY_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!trimmed) {
      setValidationHint('Please enter a product, material, or item name.');
      return;
    }

    if (isOverLimit) {
      setValidationHint(`Query cannot exceed ${CLIENT_MAX_QUERY_LENGTH} characters.`);
      return;
    }

    setValidationHint(null);
    onSearch(trimmed);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading) return;
    setQuery(suggestion);
    setValidationHint(null);
    onSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    setValidationHint(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (validationHint) {
      setValidationHint(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group" noValidate>
        <div
          className={`relative flex items-center shadow-lg hover:shadow-xl focus-within:shadow-xl transition-all duration-200 rounded-2xl bg-white border ${
            isOverLimit
              ? 'border-rose-400 focus-within:border-rose-500'
              : 'border-zinc-200 focus-within:border-zinc-900'
          } overflow-hidden`}
        >
          <div className="pl-5 pr-3 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
            <Search className="w-6 h-6" aria-hidden="true" />
          </div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Search material, product, or physical object (e.g., 12mm plywood, Samsung A55)..."
            aria-label="Search material, product, or item"
            className="w-full py-4 sm:py-5 pr-28 sm:pr-36 text-base sm:text-lg bg-transparent text-zinc-900 placeholder-zinc-400 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed font-normal"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {query && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search input"
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || isOverLimit}
              aria-label="Execute search"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 text-white disabled:text-zinc-400 font-medium text-sm rounded-xl transition-colors shadow-sm disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Character Count & Validation Warnings */}
        <div className="flex items-center justify-between px-2 pt-2 text-xs">
          {validationHint ? (
            <div className="flex items-center gap-1 text-rose-600 font-medium animate-in fade-in duration-150">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{validationHint}</span>
            </div>
          ) : (
            <div />
          )}

          {query.length > 140 && (
            <span
              className={`font-mono text-[11px] ${
                isOverLimit ? 'text-rose-600 font-bold' : 'text-zinc-400'
              }`}
            >
              {query.length} / {CLIENT_MAX_QUERY_LENGTH} chars
            </span>
          )}
        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mr-1">
          Try Examples:
        </span>
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSuggestionClick(item)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
