import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, ArrowRight, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  isLoading?: boolean;
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'default' | 'large';
  suggestedQueries?: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  isLoading = false,
  onSearch,
  placeholder = 'Search a product or material…',
  size = 'large',
  suggestedQueries = [
    '12mm plywood',
    'cement board',
    'samsung a55',
    'stainless steel pipe 2 inch',
  ],
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && !isLoading) {
      onSearch(trimmed);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (isLoading) return;
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const isLarge = size === 'large';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white rounded-2xl md:rounded-3xl border border-zinc-200/90 shadow-xl shadow-purple-900/10 hover:border-violet-300 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/15 transition-all duration-200 ${
          isLarge ? 'p-2 md:p-2.5' : 'p-1.5'
        }`}
      >
        {/* Leading Search Icon */}
        <div className="pl-3.5 pr-2 text-zinc-400 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-zinc-400" />
          )}
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 text-base md:text-lg font-medium focus:outline-none py-2 px-1 disabled:opacity-60"
          aria-label="Product or material search input"
        />

        {/* Submit CTA Button */}
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={`shrink-0 inline-flex items-center justify-center gap-2 font-semibold text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed rounded-xl md:rounded-2xl transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md hover:shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
            isLarge ? 'px-5 md:px-7 py-3 text-sm md:text-base' : 'px-4 py-2 text-sm'
          }`}
        >
          {isLoading ? (
            <span>Researching…</span>
          ) : (
            <>
              <span>Find Price</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
            </>
          )}
        </button>
      </form>

      {/* Suggested Quick Searches */}
      {suggestedQueries && suggestedQueries.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-zinc-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span>Try:</span>
          </span>
          {suggestedQueries.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
