import React from 'react';
import { Search, ShieldAlert, Sparkles, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  onOpenMethodology?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenMethodology }) => {
  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onReset?.()}
          title="Return to homepage"
        >
          <div className="h-10 w-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-zinc-800 transition-colors">
            SP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-zinc-950">
                SpecPrice
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                MVP v1.0
              </span>
            </div>
            <p className="text-xs text-zinc-500 hidden sm:block">
              Market Intelligence & Price Benchmarks
            </p>
          </div>
        </div>

        {/* Status & Navigation */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-600 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200/80">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Text-Only Search Pipeline</span>
          </div>

          <button
            type="button"
            onClick={onOpenMethodology}
            className="text-xs font-medium text-zinc-700 hover:text-zinc-950 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200"
          >
            Pricing Methodology
          </button>
        </div>
      </div>
    </header>
  );
};
