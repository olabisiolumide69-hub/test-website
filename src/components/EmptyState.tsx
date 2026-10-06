import React from 'react';
import { PackageSearch, Hammer, Cpu, Layers, HardHat, Compass } from 'lucide-react';

interface EmptyStateProps {
  onSelectExample: (query: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectExample }) => {
  const categories = [
    {
      title: 'Building & Sheet Materials',
      icon: <Layers className="w-5 h-5 text-amber-700" />,
      examples: ['12mm plywood', 'cement board', 'drywall 5/8 inch', 'OSB 7/16 sheet'],
    },
    {
      title: 'Industrial & Piping',
      icon: <Hammer className="w-5 h-5 text-blue-700" />,
      examples: ['stainless steel pipe 2 inch', 'copper pipe 1/2 inch', 'rebar #4 20ft'],
    },
    {
      title: 'Commercial Hardware & PPE',
      icon: <HardHat className="w-5 h-5 text-orange-700" />,
      examples: ['industrial safety helmet', 'harness fall protection', 'steel toe boots'],
    },
    {
      title: 'Electronics & Commercial Gear',
      icon: <Cpu className="w-5 h-5 text-emerald-700" />,
      examples: ['Samsung A55', 'office chair', 'barcode scanner USB', 'laser distance meter'],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-10 shadow-sm text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-700 mb-5">
          <PackageSearch className="w-7 h-7" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
          Instant Market Intelligence for Any Physical Item
        </h3>
        <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
          Type any material, raw supply, industrial hardware, or consumer product.
          SpecPrice extracts current retailer prices, specifications, and market ranges with verified citations.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                {cat.icon}
                <span className="font-semibold text-sm text-zinc-900">{cat.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.examples.map((ex, exIdx) => (
                  <button
                    key={exIdx}
                    type="button"
                    onClick={() => onSelectExample(ex)}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:border-zinc-400 font-medium transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quality Notice */}
        <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <Compass className="w-4 h-4 text-zinc-400" />
          <span>
            Search queries are parsed for dimensions, grades, and standard commercial units.
          </span>
        </div>
      </div>
    </div>
  );
};
