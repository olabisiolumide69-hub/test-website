import React from 'react';
import { Loader2, CheckCircle2, Globe, Calculator, BrainCircuit } from 'lucide-react';

interface LoadingSkeletonProps {
  currentQuery: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ currentQuery }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" aria-busy="true" aria-live="polite">
      {/* Search Progress Status Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-zinc-900 text-white rounded-xl">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900">
                Investigating Market for "{currentQuery}"
              </h3>
              <p className="text-xs text-zinc-500">
                Coordinating AI query understanding, web research, and pricing intelligence...
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
            Live Research Pipeline Active
          </span>
        </div>

        {/* 4-Stage Pipeline Progress Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-6">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <div className="text-xs">
              <p className="font-semibold text-zinc-900">1. Query Analysis</p>
              <p className="text-zinc-500">Extracting specs</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/80 border border-blue-200">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold animate-pulse">
              2
            </div>
            <div className="text-xs">
              <p className="font-semibold text-blue-950">2. Web Research</p>
              <p className="text-blue-700">Checking catalogs</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200 opacity-75">
            <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div className="text-xs">
              <p className="font-semibold text-zinc-800">3. Price Extraction</p>
              <p className="text-zinc-500">Gathering quotes</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200 opacity-60">
            <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-xs font-bold">
              4
            </div>
            <div className="text-xs">
              <p className="font-semibold text-zinc-800">4. Pricing Engine</p>
              <p className="text-zinc-500">Filtering outliers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Skeleton Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-zinc-200 rounded w-40"></div>
          <div className="h-4 bg-zinc-100 rounded w-28"></div>
        </div>

        <div className="h-8 bg-zinc-200 rounded w-1/2"></div>
        <div className="h-4 bg-zinc-100 rounded w-4/5"></div>

        <div className="h-32 bg-zinc-100 rounded-xl w-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="h-28 bg-zinc-100 rounded-xl"></div>
          <div className="h-28 bg-zinc-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
