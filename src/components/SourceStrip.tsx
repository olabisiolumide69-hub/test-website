import React from 'react';
import { TRUST_SOURCES } from '../data/displayData';
import { Database, Store, Building2, Factory, Globe2 } from 'lucide-react';

const genericIcons: Record<string, React.ReactNode> = {
  Marketplace: <Globe2 className="w-5 h-5" />,
  Retailer: <Store className="w-5 h-5" />,
  Supplier: <Building2 className="w-5 h-5" />,
  Manufacturer: <Factory className="w-5 h-5" />,
  'Public Data': <Database className="w-5 h-5" />,
};

export const SourceStrip: React.FC = () => {
  return (
    <section
      id="sources"
      className="py-14 sm:py-16 bg-[#FAF9FD] border-t border-zinc-200/70 scroll-mt-16"
      aria-label="Supported Source Types"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-8">
          Continuous market intelligence gathered across multi-tier channels
        </p>

        {/* Horizontal Grayscale Placeholder Marks */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16">
          {TRUST_SOURCES.map((source) => (
            <div
              key={source.name}
              className="flex items-center gap-2.5 text-zinc-600 hover:text-zinc-900 transition-colors py-2 px-3 rounded-lg border border-transparent hover:border-zinc-200/60 hover:bg-white"
            >
              <div className="text-zinc-600">
                {genericIcons[source.name] || <Building2 className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold tracking-tight text-zinc-800">
                  {source.name}
                </span>
                <span className="block text-[10px] text-zinc-600">
                  {source.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-zinc-600 max-w-xl mx-auto">
          Generic source categories representing public catalog indexes and trade distributors. No unverified third-party endorsements.
        </p>
      </div>
    </section>
  );
};
