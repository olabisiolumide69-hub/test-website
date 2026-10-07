import React from 'react';
import { SearchBar } from './SearchBar';
import { FloatingResultCard } from './FloatingResultCard';
import { HERO_SAMPLE_CARDS } from '../data/displayData';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, isLoading = false }) => {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-32 bg-[#090A15] text-white">
      {/* Visual Atmosphere Background:
          Deep near-black/navy at top -> Rich violet/purple glow through middle -> Soft lavender fading down to white */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Deep navy base */}
        <div className="absolute inset-0 bg-[#090A15]" />

        {/* Rich violet/purple radial glow in center */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[500px] bg-gradient-to-b from-violet-600/30 via-purple-700/20 to-transparent blur-[120px] rounded-full" />

        {/* Ambient secondary glow */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-fuchsia-600/15 blur-[100px] rounded-full" />

        {/* Soft lavender fade out at bottom toward white */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#EDE9FE]/10 to-[#FAF8FF]/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Label Above Headline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-violet-200 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>AI-powered price discovery</span>
        </div>

        {/* Large Bold Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] text-balance">
          Real market prices for materials & physical goods.
        </h1>

        {/* Short Supporting Text */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          Enter any raw material, industrial component, or commercial product.
          Receive an estimated price range, verified sources, and confidence level in seconds.
        </p>

        {/* Interactive Search Box Area */}
        <div className="mt-10 sm:mt-12 relative max-w-4xl mx-auto">
          {/* Main Search Bar */}
          <div className="relative z-20">
            <SearchBar
              onSearch={onSearch}
              isLoading={isLoading}
              size="large"
              placeholder="Search a product or material…"
            />
          </div>

          {/* Floating UI Sample Cards - Desktop / Tablet Decorative Elements */}
          <div className="hidden lg:block absolute -left-12 -top-8 w-72 z-10 pointer-events-none xl:pointer-events-auto">
            <FloatingResultCard
              {...HERO_SAMPLE_CARDS[0]}
              driftDirection="normal"
            />
          </div>

          <div className="hidden lg:block absolute -right-12 -bottom-10 w-72 z-10 pointer-events-none xl:pointer-events-auto">
            <FloatingResultCard
              {...HERO_SAMPLE_CARDS[1]}
              driftDirection="reverse"
            />
          </div>
        </div>

        {/* Subtle Footnote */}
        <div className="mt-10 text-xs text-zinc-400 max-w-md mx-auto">
          <span>Text-only search · Unbiased price aggregation · No sponsor distortion</span>
        </div>
      </div>
    </section>
  );
};
