import React from 'react';
import { FeatureItem } from '../data/displayData';
import {
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';

interface FeatureCardProps {
  feature: FeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const renderVisualMockup = () => {
    switch (feature.id) {
      case 'price-range':
        return (
          <div className="mt-6 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
              <span className="font-medium">Market Low: $24.95</span>
              <span className="font-semibold text-violet-700">Median: $32.50</span>
              <span className="font-medium">Market High: $42.00</span>
            </div>
            {/* Visual Range Bar */}
            <div className="relative w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
              <div className="absolute left-[15%] right-[20%] top-0 bottom-0 bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-500 rounded-full" />
              <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-violet-700 shadow-xs" />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Wholesale Bulk Discount Range</span>
              <span>Retail Single-Unit Benchmark</span>
            </div>
          </div>
        );

      case 'source-transparency':
        return (
          <div className="mt-6 space-y-2">
            <div className="p-2.5 rounded-lg bg-white border border-zinc-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-zinc-800">Distributor Catalog</span>
              </div>
              <span className="text-zinc-500 tabular-nums">$31.45 · Cited</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-zinc-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-zinc-800">Wholesale Trade Index</span>
              </div>
              <span className="text-zinc-500 tabular-nums">$29.98 · Cited</span>
            </div>
          </div>
        );

      case 'confidence-indicator':
        return (
          <div className="mt-6 p-4 rounded-xl bg-white border border-zinc-200/80">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-violet-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-violet-600" />
                High Confidence (94%)
              </span>
              <span className="text-zinc-500 font-normal">Low Variance</span>
            </div>
            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
              <div className="bg-violet-600 h-full rounded-full w-[94%]" />
            </div>
            <p className="mt-2 text-[11px] text-zinc-500 leading-normal">
              Based on consistent pricing data from multiple active suppliers.
            </p>
          </div>
        );

      case 'fast-search':
        return (
          <div className="mt-6 p-3 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-zinc-600">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-zinc-800">"12mm plywood"</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 font-medium text-[10px]">
              0.4s parsing
            </span>
          </div>
        );

      case 'clean-results':
        return (
          <div className="mt-6 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No popups, affiliate links, or banner clutter</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standardized unit measurements & currency</span>
            </div>
          </div>
        );

      case 'responsive-experience':
        return (
          <div className="mt-6 p-4 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-around text-xs text-zinc-600">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-violet-600" />
              <span className="font-medium">Mobile Field PWA</span>
            </div>
            <span className="text-zinc-300">|</span>
            <span className="font-medium">Tablet Warehouse View</span>
            <span className="text-zinc-300">|</span>
            <span className="font-medium">Desktop Procurement</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`p-7 sm:p-8 rounded-2xl bg-[#FAFAFC] border border-zinc-200/80 hover:border-violet-300 hover:shadow-xl hover:shadow-purple-950/5 transition-all duration-200 flex flex-col justify-between text-left ${feature.span}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">
            {feature.tag}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-2.5">
          {feature.title}
        </h3>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {renderVisualMockup()}
    </div>
  );
};
