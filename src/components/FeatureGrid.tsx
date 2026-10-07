import React from 'react';
import { FEATURES_DATA } from '../data/displayData';
import { FeatureCard } from './FeatureCard';

export const FeatureGrid: React.FC = () => {
  return (
    <section
      id="features"
      className="py-20 md:py-28 bg-white border-t border-zinc-200/70 scroll-mt-16"
      aria-labelledby="features-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-4 border border-violet-100">
            <span>Features</span>
          </div>
          <h2
            id="features-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 text-balance"
          >
            Built for empirical market clarity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Traditional web searches force you through ad banners and outdated blogs.
            SpecPrice isolates verifiable commercial price intelligence.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
