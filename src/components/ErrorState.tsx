import React from 'react';
import { AlertCircle, RotateCcw, Search } from 'lucide-react';

interface ErrorStateProps {
  errorMessage: string;
  query: string;
  onRetry: () => void;
  onClear: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage,
  query,
  onRetry,
  onClear,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-2xl border border-rose-200 p-8 shadow-sm text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-zinc-950">Unable to Complete Market Research</h3>
        <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
          {errorMessage || `We encountered an issue looking up pricing data for "${query}".`}
        </p>

        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mt-6 text-left text-xs text-zinc-600 space-y-1.5">
          <p className="font-semibold text-zinc-800">Helpful suggestions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Ensure the item name is specific (e.g. add dimensions: "12mm" or "2 inch").</li>
            <li>Check for spelling errors or non-standard brand abbreviations.</li>
            <li>Physical items, construction supplies, or commercial electronics yield the best results.</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>New Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
