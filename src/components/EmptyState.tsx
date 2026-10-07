import React from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_QUERIES } from '../data/displayData';

interface EmptyStateProps {
  onSelectExample: (query: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectExample }) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-16 px-4 text-center">
      {/* Search Icon Illustration */}
      <div className="w-16 h-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mx-auto mb-6 text-violet-600 shadow-sm">
        <Search className="w-8 h-8" />
      </div>

      <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
        Search for a product or material to get started
      </h3>

      <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-md mx-auto">
        Enter raw lumber, industrial piping, fasteners, consumer devices, or hardware to receive market price ranges, confidence scores, and source citations.
      </p>

      {/* Suggested Quick Starters */}
      <div className="mt-8 pt-8 border-t border-zinc-200/60">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-4">
          Popular Benchmark Examples
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SAMPLE_QUERIES.map((query) => (
            <button
              key={query}
              type="button"
              onClick={() => onSelectExample(query)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-700 bg-white hover:bg-violet-50 hover:text-violet-900 hover:border-violet-300 rounded-xl border border-zinc-200 shadow-2xs transition-all duration-150 cursor-pointer"
            >
              <span>{query}</span>
              <ArrowRight className="w-3 h-3 text-zinc-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
