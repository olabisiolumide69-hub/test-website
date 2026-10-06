import React from 'react';
import { ConfidenceLevel } from '../types/product';
import { ShieldCheck, AlertTriangle, HelpCircle, TrendingUp, Info } from 'lucide-react';

interface PriceOverviewCardProps {
  productName: string;
  category: string;
  shortDescription: string;
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
    median: number;
  };
  currency: string;
  unitOfMeasure: string;
  confidenceLevel: ConfidenceLevel;
  confidenceReason: string;
  researchedAt: string;
}

export const PriceOverviewCard: React.FC<PriceOverviewCardProps> = ({
  productName,
  category,
  shortDescription,
  estimatedPrice,
  priceRange,
  currency,
  unitOfMeasure,
  confidenceLevel,
  confidenceReason,
  researchedAt,
}) => {
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getConfidenceBadge = (level: ConfidenceLevel) => {
    switch (level) {
      case 'HIGH':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
          label: 'High Confidence (Multiple Verified Sources)',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          label: 'Medium Confidence (Moderate Variance)',
        };
      case 'LOW':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
          label: 'Low Confidence (Limited Public Data)',
        };
      case 'ESTIMATED':
      default:
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <HelpCircle className="w-4 h-4 text-blue-600" />,
          label: 'Estimated Baseline (Preliminary Benchmark)',
        };
    }
  };

  const badge = getConfidenceBadge(confidenceLevel);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
      {/* Category & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-3 py-1 rounded-md">
          {category}
        </span>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>{researchedAt}</span>
        </div>
      </div>

      {/* Title & Short Description */}
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mb-2">
        {productName}
      </h2>
      <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
        {shortDescription}
      </p>

      {/* Main Pricing Matrix */}
      <div className="bg-zinc-50/80 rounded-xl p-5 sm:p-6 border border-zinc-200/90 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Market Benchmark Estimate */}
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-zinc-200 pb-5 md:pb-0 md:pr-6">
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-zinc-700" />
            <span>Estimated Market Benchmark</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              {formatMoney(estimatedPrice)}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-medium">
            Pricing unit: <span className="text-zinc-700">{unitOfMeasure}</span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-2 italic">
            *Indicative market median. Not an exact merchant quote.
          </p>
        </div>

        {/* Observed Price Range */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Observed Market Range
            </span>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <span className="text-[11px] text-zinc-400 block font-medium">LOW END</span>
                <span className="text-lg font-bold text-zinc-900">
                  {formatMoney(priceRange.min)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <span className="text-[11px] text-zinc-400 block font-medium">MEDIAN</span>
                <span className="text-lg font-bold text-zinc-900">
                  {formatMoney(priceRange.median)}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-zinc-200">
                <span className="text-[11px] text-zinc-400 block font-medium">HIGH END</span>
                <span className="text-lg font-bold text-zinc-900">
                  {formatMoney(priceRange.max)}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Range Bar */}
          <div className="mt-4 pt-3 border-t border-zinc-200/60">
            <div className="flex justify-between text-[11px] text-zinc-500 mb-1.5 font-medium">
              <span>Wholesale / Budget Entry</span>
              <span>Premium / Heavy-Duty Tier</span>
            </div>
            <div className="w-full bg-zinc-200 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-zinc-400 h-full w-[25%]" title="Low Range"></div>
              <div className="bg-zinc-900 h-full w-[45%]" title="Median Cluster"></div>
              <div className="bg-zinc-400 h-full w-[30%]" title="High Range"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Pill & Reason */}
      <div className="mt-4 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-zinc-50/50 border-zinc-200">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium ${badge.bg}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </div>
        </div>
        <p className="text-zinc-600 sm:text-right text-xs max-w-md">
          {confidenceReason}
        </p>
      </div>
    </div>
  );
};
