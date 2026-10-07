import React from 'react';
import { SourcePriceQuote } from '../types/product';
import { SourceItem } from './SourceItem';
import { Link2, Info } from 'lucide-react';

interface SourceListProps {
  sourcePrices: SourcePriceQuote[];
  currency: string;
}

export const SourceList: React.FC<SourceListProps> = ({ sourcePrices, currency }) => {
  if (!sourcePrices || sourcePrices.length === 0) {
    return (
      <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-6 text-center text-zinc-500">
        <Info className="w-6 h-6 mx-auto mb-2 text-zinc-400" />
        <p className="text-sm font-medium">No live source quotes indexed yet.</p>
        <p className="text-xs text-zinc-400 mt-1">
          Quotes will appear as distributor catalogs are queried.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#FAFAFC] border border-zinc-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-zinc-200/60">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-violet-600" />
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
            Verified Source Quotes
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60">
          {sourcePrices.length} {sourcePrices.length === 1 ? 'source' : 'sources'}
        </span>
      </div>

      <div className="space-y-3">
        {sourcePrices.map((source, idx) => (
          <SourceItem
            key={`${source.retailer}-${idx}`}
            source={source}
            currency={currency}
          />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-200/60 text-xs text-zinc-400 text-center">
        <span>
          Citations link directly to public web listings and wholesale catalogs.
        </span>
      </div>
    </div>
  );
};
