import React from 'react';
import { AlertCircle, RotateCcw, Search, ArrowRight } from 'lucide-react';
import { SAMPLE_QUERIES } from '../data/displayData';

interface ErrorStateProps {
  errorMessage: string;
  query: string;
  onRetry: () => void;
  onClear: () => void;
  isNoResults?: boolean;
  onSelectExample?: (query: string) => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage,
  query,
  onRetry,
  onClear,
  isNoResults = false,
  onSelectExample,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto py-16 px-4 text-center">
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm ${
          isNoResults
            ? 'bg-amber-50 border border-amber-200 text-amber-600'
            : 'bg-rose-50 border border-rose-200 text-rose-600'
        }`}
      >
        {isNoResults ? (
          <Search className="w-8 h-8" />
        ) : (
          <AlertCircle className="w-8 h-8" />
        )}
      </div>

      {/* Headline */}
      <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
        {isNoResults
          ? 'We couldn’t find enough pricing information for this search.'
          : 'Unable to complete price research'}
      </h3>

      {/* Explanation */}
      <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
        {isNoResults
          ? 'Try refining your query with more standard commercial terminology, specific measurements (e.g., "12mm" instead of "thin"), or common brand/model designations.'
          : errorMessage || 'An unexpected error occurred while processing your request. Please try again.'}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors cursor-pointer"
        >
          <span>Clear & Return</span>
        </button>
      </div>

      {/* Suggested Queries */}
      <div className="mt-10 pt-6 border-t border-zinc-200/60 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 block mb-3">
          Or try one of these standard items:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SAMPLE_QUERIES.slice(0, 3).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (onSelectExample) {
                  onSelectExample(item);
                } else {
                  onClear();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
