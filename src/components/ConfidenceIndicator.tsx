import React from 'react';
import { ConfidenceLevel } from '../types/product';
import { ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';

interface ConfidenceIndicatorProps {
  level: ConfidenceLevel | 'HIGH' | 'MEDIUM' | 'LOW' | 'ESTIMATED';
  reason?: string;
  isDetailed?: boolean;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  level,
  reason,
  isDetailed = true,
}) => {
  const normalizedLevel = (level || 'MEDIUM').toUpperCase();

  let percentage = 70;
  let label = 'Medium Confidence';
  let badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
  let barColor = 'bg-amber-500';
  let icon = <AlertTriangle className="w-4 h-4 text-amber-600" />;

  if (normalizedLevel === 'HIGH') {
    percentage = 94;
    label = 'High Confidence';
    badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    barColor = 'bg-emerald-600';
    icon = <ShieldCheck className="w-4 h-4 text-emerald-600" />;
  } else if (normalizedLevel === 'LOW') {
    percentage = 38;
    label = 'Low Confidence';
    badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
    barColor = 'bg-rose-500';
    icon = <AlertTriangle className="w-4 h-4 text-rose-600" />;
  } else if (normalizedLevel === 'ESTIMATED') {
    percentage = 60;
    label = 'Estimated Benchmark';
    badgeColor = 'bg-violet-50 text-violet-800 border-violet-200';
    barColor = 'bg-violet-600';
    icon = <HelpCircle className="w-4 h-4 text-violet-600" />;
  }

  return (
    <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-4">
      {/* Header with Segmented indicator & Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-bold text-zinc-900">{label}</span>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}
        >
          {percentage}% match index
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden my-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Brief explanation */}
      <p className="text-xs text-zinc-600 leading-relaxed mt-2">
        {reason ||
          'Confidence reflects the amount and consistency of available pricing information.'}
      </p>

      {/* Low Confidence Warning Notice if applicable */}
      {normalizedLevel === 'LOW' && (
        <div className="mt-3 p-3 rounded-lg bg-rose-50/80 border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>
            <strong>Caution:</strong> Limited or inconsistent pricing sources were found for this query. The price spread may be wide or unverified. Consider refining dimensions or brand.
          </p>
        </div>
      )}
    </div>
  );
};
