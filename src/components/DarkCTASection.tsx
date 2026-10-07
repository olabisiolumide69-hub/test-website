import React from 'react';
import { ArrowRight, Search } from 'lucide-react';

interface DarkCTASectionProps {
  onCTAClick: () => void;
}

export const DarkCTASection: React.FC<DarkCTASectionProps> = ({ onCTAClick }) => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#090A15] text-white">
      {/* Subtle purple ambient lighting or glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[850px] h-[350px] bg-gradient-to-r from-violet-600/25 via-purple-600/20 to-indigo-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Section Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
          Pricing information without the research rabbit hole.
        </h2>

        {/* Supporting Copy */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          Stop tab-switching through dozens of contractor supply sites and outdated PDFs.
          SpecPrice extracts, synthesizes, and normalizes market pricing into clear, transparent ranges.
        </p>

        {/* Primary Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onCTAClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 rounded-xl shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Search className="w-4 h-4" />
            <span>Start a Price Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle reassurance note */}
        <p className="mt-4 text-xs text-zinc-300">
          Instant search · Free evaluation · No account required
        </p>
      </div>
    </section>
  );
};
