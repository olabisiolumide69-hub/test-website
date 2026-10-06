import React from 'react';
import { SourcePriceQuote } from '../types/product';
import { ExternalLink, ShoppingBag, CheckCircle2, Calendar, AlertCircle } from 'lucide-react';

interface SourcesListProps {
  sourcePrices: SourcePriceQuote[];
  currency: string;
}

export const SourcesList: React.FC<SourcesListProps> = ({ sourcePrices, currency }) => {
  if (!sourcePrices || sourcePrices.length === 0) return null;

  const formatPrice = (val: number | null, cur: string) => {
    if (val === null || val === undefined || isNaN(val)) return 'Quote Required';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur || currency || 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-zinc-800" />
          <h3 className="text-lg font-bold text-zinc-950">Source Citations & Price Points</h3>
        </div>
        <span className="text-xs text-zinc-500 font-medium">
          {sourcePrices.length} verified {sourcePrices.length === 1 ? 'citation' : 'citations'}
        </span>
      </div>

      <p className="text-xs text-zinc-500 mb-5">
        Direct web citations retrieved from active distributors and marketplaces. Each price point links to its original source.
      </p>

      <div className="space-y-3">
        {sourcePrices.map((src, idx) => {
          const date = formatDate(src.retrievedAt);

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                src.isOutlier
                  ? 'border-amber-200 bg-amber-50/40'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                {/* Title & Seller */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900">{src.retailer}</span>
                  {src.inStock && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Catalog Verified
                    </span>
                  )}
                  {src.isOutlier && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      <AlertCircle className="w-3 h-3 text-amber-700" />
                      Statistical Outlier
                    </span>
                  )}
                  {src.isExactMatch === false && (
                    <span className="text-[11px] font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                      Variant Comparison
                    </span>
                  )}
                </div>

                {/* Listing Title */}
                {src.title && (
                  <p className="text-xs font-medium text-zinc-700 line-clamp-2">
                    {src.title}
                  </p>
                )}

                {/* Notes & Date */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
                  {src.notes && src.notes !== src.title && (
                    <span className="italic">{src.notes}</span>
                  )}
                  {date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      Retrieved: {date}
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Link */}
              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                <div className="text-right">
                  <span className="font-extrabold text-base text-zinc-950 block">
                    {formatPrice(src.price, src.currency)}
                  </span>
                  {src.price !== null && (
                    <span className="text-[11px] text-zinc-400">/{src.unit}</span>
                  )}
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                  title={`View original page on ${src.retailer}`}
                >
                  <span>Visit Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
