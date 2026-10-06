import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    onSearch(trimmed);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center shadow-lg hover:shadow-xl focus-within:shadow-xl transition-all duration-200 rounded-2xl bg-white border border-zinc-200 focus-within:border-zinc-900 overflow-hidden">
          <div className="pl-5 pr-3 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
            <Search className="w-6 h-6" aria-hidden="true" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Search material, product, or physical object (e.g., 12mm plywood, Samsung A55)..."
            aria-label="Search material, product, or item"
            className="w-full py-4 sm:py-5 pr-24 sm:pr-32 text-base sm:text-lg bg-transparent text-zinc-900 placeholder-zinc-400 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed font-normal"
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
              disabled={!query.trim() || isLoading}
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
      </form>

      {/* Suggestion Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
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
