import React from 'react';
import { ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { SourcePriceQuote } from '../types/product';

interface SourceItemProps {
  source: SourcePriceQuote;
  currency: string;
}

export const SourceItem: React.FC<SourceItemProps> = ({ source, currency }) => {
  const formattedPrice =
    source.price !== null && source.price !== undefined
      ? `${currency === 'USD' ? '$' : currency + ' '}${source.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : 'Quote on request';

  return (
    <div className="p-4 rounded-xl bg-white border border-zinc-200/80 hover:border-violet-300 hover:shadow-xs transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-zinc-900">
            {source.retailer || 'Verified Distributor'}
          </span>
          {source.inStock && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Available
            </span>
          )}
        </div>

        {source.notes && (
          <p className="text-xs text-zinc-500 line-clamp-1">{source.notes}</p>
        )}

        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-zinc-400" />
            <span>{source.retrievedAt || 'Recently observed'}</span>
          </span>
          <span>·</span>
          <span>Unit: {source.unit || 'Standard'}</span>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
        <div className="text-right">
          <span className="text-base font-extrabold text-zinc-950 tabular-nums">
            {formattedPrice}
          </span>
        </div>

        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400 rounded px-1"
          >
            <span>Visit source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <span>Direct index</span>
          </span>
        )}
      </div>
    </div>
  );
};
