import React, { useState } from 'react';
import { ProductResearchResult } from '../types/product';
import { SearchBar } from './SearchBar';
import { PriceResultCard } from './PriceResultCard';
import { SourceList } from './SourceList';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import {
  ArrowLeft,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface SearchResultsProps {
  query: string;
  result: ProductResearchResult | null;
  isLoading: boolean;
  errorMessage: string | null;
  onSearch: (query: string) => void;
  onBackToHome: () => void;
  onReset: () => void;
}

export type PreviewStateOverride =
  | 'normal'
  | 'loading'
  | 'empty'
  | 'no-results'
  | 'error'
  | 'low-confidence';

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  result,
  isLoading,
  errorMessage,
  onSearch,
  onBackToHome,
  onReset,
}) => {
  const [stateOverride, setStateOverride] = useState<PreviewStateOverride>('normal');

  // Handle simulated state switches for UI testing and evaluation
  const effectiveLoading = stateOverride === 'loading' || isLoading;
  const effectiveEmpty = stateOverride === 'empty' || (!result && !query && !isLoading);
  const effectiveNoResults = stateOverride === 'no-results';
  const effectiveError = stateOverride === 'error' || (!effectiveLoading && !effectiveNoResults && Boolean(errorMessage));

  // Prepare result with potential low-confidence override if testing that state
  const effectiveResult: ProductResearchResult | null =
    result && stateOverride === 'low-confidence'
      ? {
          ...result,
          confidenceLevel: 'LOW',
          confidenceReason:
            'Limited and conflicting pricing found across suppliers (variance > 45%). Use caution when quoting.',
        }
      : result;

  return (
    <div className="min-h-screen bg-[#FAF9FD] text-zinc-900 flex flex-col">
      {/* Top Search Header Bar */}
      <div className="bg-white border-b border-zinc-200/80 sticky top-16 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={onBackToHome}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-zinc-100 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Centered Compact Search Bar */}
          <div className="w-full max-w-2xl">
            <SearchBar
              initialQuery={query}
              onSearch={(q) => {
                setStateOverride('normal');
                onSearch(q);
              }}
              isLoading={effectiveLoading}
              size="default"
              placeholder="Search another product or material…"
            />
          </div>

          {/* Quick Clear */}
          <button
            type="button"
            onClick={onReset}
            className="hidden md:inline-flex text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Evaluation State Switcher Toolbar */}
        <div className="border-t border-zinc-100 bg-zinc-50/70 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
              <Sliders className="w-3.5 h-3.5 text-violet-600" />
              <span>Preview States:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {(
                [
                  { id: 'normal', label: 'Live Result' },
                  { id: 'loading', label: 'Loading Shimmer' },
                  { id: 'empty', label: 'Empty State' },
                  { id: 'low-confidence', label: 'Low Confidence' },
                  { id: 'no-results', label: 'No Results' },
                  { id: 'error', label: 'Error' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStateOverride(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    stateOverride === tab.id
                      ? 'bg-violet-600 text-white font-semibold shadow-2xs'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Loading State */}
        {effectiveLoading && <LoadingState currentQuery={query} />}

        {/* Empty State */}
        {!effectiveLoading && effectiveEmpty && (
          <EmptyState
            onSelectExample={(q) => {
              setStateOverride('normal');
              onSearch(q);
            }}
          />
        )}

        {/* No Results State */}
        {!effectiveLoading && !effectiveEmpty && effectiveNoResults && (
          <ErrorState
            errorMessage="No verified listings met the minimum consistency threshold."
            query={query}
            onRetry={() => {
              setStateOverride('normal');
              onSearch(query);
            }}
            onClear={onReset}
            isNoResults={true}
            onSelectExample={(q) => {
              setStateOverride('normal');
              onSearch(q);
            }}
          />
        )}

        {/* Error State */}
        {!effectiveLoading && !effectiveEmpty && !effectiveNoResults && effectiveError && (
          <ErrorState
            errorMessage={errorMessage || 'Could not connect to supplier index.'}
            query={query}
            onRetry={() => {
              setStateOverride('normal');
              onSearch(query);
            }}
            onClear={onReset}
            onSelectExample={(q) => {
              setStateOverride('normal');
              onSearch(q);
            }}
          />
        )}

        {/* Success / Result State: Two-Panel Desktop Layout */}
        {!effectiveLoading &&
          !effectiveEmpty &&
          !effectiveNoResults &&
          !effectiveError &&
          effectiveResult && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Query Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-600">Searched:</span>
                  <span className="font-bold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200">
                    "{effectiveResult.query}"
                  </span>
                  <span>·</span>
                  <span>{effectiveResult.sourcesCount || effectiveResult.sourcePrices.length} citations analyzed</span>
                </div>
              </div>

              {/* Desktop 2-Panel Layout:
                  Left: Main Result Panel (PriceResultCard)
                  Right: Sources / Additional information Panel (SourceList) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Result Panel on Left (7 cols) */}
                <div className="lg:col-span-7">
                  <PriceResultCard result={effectiveResult} />
                </div>

                {/* Sources & Additional Info Panel on Right (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <SourceList
                    sourcePrices={effectiveResult.sourcePrices}
                    currency={effectiveResult.currency}
                  />
                </div>
              </div>
            </div>
          )}
      </main>
    </div>
  );
};
