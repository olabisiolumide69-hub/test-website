import React from 'react';
import { ProductResearchResult } from '../types/product';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { Layers, ShieldCheck, Tag, HelpCircle, FileText } from 'lucide-react';

interface PriceResultCardProps {
  result: ProductResearchResult;
}

export const PriceResultCard: React.FC<PriceResultCardProps> = ({ result }) => {
  const currencySymbol = result.currency === 'USD' ? '$' : `${result.currency} `;

  const formatPrice = (val: number | null | undefined) => {
    if (val === null || val === undefined) return 'N/A';
    return `${currencySymbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const hasRange =
    result.priceRange &&
    result.priceRange.min !== null &&
    result.priceRange.max !== null;

  return (
    <div className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-8 shadow-sm text-left space-y-6">
      {/* Product Title & Category */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
            {result.category || 'Product & Material'}
          </span>
          <span className="text-xs text-zinc-400">
            Researched: {result.researchedAt || 'Live Benchmark'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          {result.productName}
        </h2>

        {result.shortDescription && (
          <p className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed">
            {result.shortDescription}
          </p>
        )}
      </div>

      {/* Primary Estimated Market Price Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50/70 via-white to-purple-50/40 border border-violet-100/90 shadow-2xs">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Estimated Market Price Range
        </span>

        <div className="flex flex-wrap items-baseline gap-3">
          {hasRange ? (
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tabular-nums tracking-tight">
              {result.priceRange.min === result.priceRange.max
                ? formatPrice(result.priceRange.min)
                : `${formatPrice(result.priceRange.min)} – ${formatPrice(result.priceRange.max)}`}
            </span>
          ) : result.estimatedPrice ? (
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tabular-nums tracking-tight">
              ~{formatPrice(result.estimatedPrice)}
            </span>
          ) : (
            <span className="text-2xl font-bold text-zinc-400">
              Pricing Quote on Request
            </span>
          )}

          {result.unitOfMeasure && (
            <span className="text-sm font-medium text-zinc-500">
              {result.unitOfMeasure}
            </span>
          )}
        </div>

        {/* Median Benchmark Pill */}
        {result.priceRange?.median !== null && result.priceRange?.median !== undefined && (
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
            <span className="font-semibold text-violet-700">Median Estimate:</span>
            <span className="font-bold text-zinc-900 tabular-nums">
              {formatPrice(result.priceRange.median)}
            </span>
            <span className="text-zinc-400">· Central market consensus</span>
          </div>
        )}
      </div>

      {/* Confidence Indicator Component */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Data Reliability
        </h3>
        <ConfidenceIndicator
          level={result.confidenceLevel}
          reason={result.confidenceReason}
        />
      </div>

      {/* Key Specifications Grid */}
      {result.specifications && result.specifications.length > 0 && (
        <div className="pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-violet-600" />
            <h3 className="text-sm font-bold text-zinc-900">
              Technical Specifications & Trade Dimensions
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {result.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 flex flex-col justify-center"
              >
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                  {spec.name}
                </span>
                <span className="text-xs font-bold text-zinc-900 mt-0.5">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Commercial Variants & Brands */}
      {(result.variants?.length > 0 || result.commonBrands?.length > 0) && (
        <div className="pt-4 border-t border-zinc-100 space-y-4">
          {result.commonBrands && result.commonBrands.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
                Common Manufacturers & Brands
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.commonBrands.map((brand, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200/60"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.variants && result.variants.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
                Commercial Grades & Variations
              </span>
              <div className="space-y-2">
                {result.variants.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-zinc-50/80 border border-zinc-200/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-zinc-800">{v.name}</span>
                      <span className="text-zinc-500 ml-2">{v.detail}</span>
                    </div>
                    {v.priceDelta && (
                      <span className="font-semibold text-violet-700 shrink-0">
                        {v.priceDelta}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Assumptions & Uncertainty Notes */}
      {(result.assumptions?.length > 0 || result.uncertaintyNotes?.length > 0) && (
        <div className="pt-4 border-t border-zinc-100 text-xs text-zinc-500 space-y-2">
          {result.assumptions?.map((assumption, idx) => (
            <p key={idx} className="flex items-start gap-1.5">
              <span className="text-violet-600 font-bold">·</span>
              <span>{assumption}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
