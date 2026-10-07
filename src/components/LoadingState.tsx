import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  currentQuery?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ currentQuery }) => {
  return (
    <div
      className="w-full max-w-7xl mx-auto py-8 space-y-6"
      role="status"
      aria-label="Loading price intelligence"
    >
      {/* Status banner with shimmer */}
      <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-violet-50/80 border border-violet-100 text-violet-800 text-sm font-medium">
        <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
        <span>
          Researching current pricing for{' '}
          <strong className="font-semibold text-zinc-900">
            "{currentQuery || 'product'}"
          </strong>
          …
        </span>
      </div>

      {/* Grid of Skeleton Cards with Shimmer Effect */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Price Result Card Skeleton (2 cols) */}
        <div className="lg:col-span-2 p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-xs space-y-6 relative overflow-hidden">
          {/* Shimmer gradient line */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100/70 to-transparent animate-shimmer" />

          {/* Category & Title skeleton */}
          <div className="space-y-3">
            <div className="w-28 h-4 bg-zinc-200 rounded-md" />
            <div className="w-3/4 h-8 bg-zinc-200 rounded-lg" />
            <div className="w-full h-4 bg-zinc-100 rounded-md" />
          </div>

          {/* Big Price Range Banner Skeleton */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-3">
            <div className="w-36 h-3 bg-zinc-200 rounded" />
            <div className="w-64 h-12 bg-zinc-300 rounded-lg" />
            <div className="w-48 h-3 bg-zinc-200 rounded" />
          </div>

          {/* Confidence Skeleton */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/60 space-y-3">
            <div className="w-40 h-4 bg-zinc-200 rounded" />
            <div className="w-full h-2.5 bg-zinc-200 rounded-full" />
            <div className="w-2/3 h-3 bg-zinc-100 rounded" />
          </div>

          {/* Specs Skeleton */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <div className="w-44 h-4 bg-zinc-200 rounded" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-zinc-100 rounded-lg" />
              <div className="h-16 bg-zinc-100 rounded-lg" />
              <div className="h-16 bg-zinc-100 rounded-lg" />
              <div className="h-16 bg-zinc-100 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Column: Source List Skeleton (1 col) */}
        <div className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zinc-100/70 to-transparent animate-shimmer" />
          <div className="w-36 h-5 bg-zinc-200 rounded" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-zinc-200/60 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="w-28 h-4 bg-zinc-200 rounded" />
                  <div className="w-16 h-4 bg-zinc-300 rounded" />
                </div>
                <div className="w-40 h-3 bg-zinc-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
