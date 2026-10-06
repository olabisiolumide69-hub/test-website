import React from 'react';
import { SourcePriceQuote } from '../types/product';
import { ExternalLink, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface SourcesListProps {
  sourcePrices: SourcePriceQuote[];
  currency: string;
}

export const SourcesList: React.FC<SourcesListProps> = ({ sourcePrices, currency }) => {
  if (!sourcePrices || sourcePrices.length === 0) return null;

  const formatPrice = (val: number, cur: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur || currency || 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-zinc-800" />
          <h3 className="text-lg font-bold text-zinc-950">Source Citations & Price Points</h3>
        </div>
        <span className="text-xs text-zinc-500 font-medium">
          {sourcePrices.length} verified listings
        </span>
      </div>

      <p className="text-xs text-zinc-500 mb-5">
        Observed direct quotes retrieved from active distributors and retailers. Click to verify source directly.
      </p>

      <div className="space-y-3">
        {sourcePrices.map((src, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-900">{src.retailer}</span>
                {src.inStock && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Catalog Listed
                  </span>
                )}
              </div>
              {src.notes && (
                <p className="text-xs text-zinc-600 italic">{src.notes}</p>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
              <div className="text-right">
                <span className="font-extrabold text-base text-zinc-950 block">
                  {formatPrice(src.price, src.currency)}
                </span>
                <span className="text-[11px] text-zinc-400">/{src.unit}</span>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-lg transition-colors"
                title={`Visit ${src.retailer}`}
              >
                <span>View Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
