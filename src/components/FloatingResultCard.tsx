import React from 'react';
import { ShieldCheck, Tag, ExternalLink } from 'lucide-react';

interface FloatingResultCardProps {
  type: string;
  badge: string;
  product: string;
  priceRange: string;
  unit: string;
  confidence: string;
  confidenceScore: number;
  sourceCount: number;
  sourceName: string;
  className?: string;
  driftDirection?: 'normal' | 'reverse';
}

export const FloatingResultCard: React.FC<FloatingResultCardProps> = ({
  type,
  badge,
  product,
  priceRange,
  unit,
  confidence,
  confidenceScore,
  sourceCount,
  sourceName,
  className = '',
  driftDirection = 'normal',
}) => {
  const animationClass =
    driftDirection === 'normal' ? 'animate-float-slow' : 'animate-float-reverse';

  return (
    <div
      className={`p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-lg shadow-purple-950/10 text-left transition-transform duration-300 hover:scale-[1.02] select-none pointer-events-none sm:pointer-events-auto ${animationClass} ${className}`}
      aria-hidden="true"
    >
      {/* Header with Clear UI Preview Label */}
      <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-zinc-100 text-[11px]">
        <span className="font-semibold text-violet-700 tracking-wide uppercase">
          {type}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 font-medium border border-zinc-200/60">
          {badge}
        </span>
      </div>

      {/* Product Name */}
      <div className="mb-2">
        <span className="text-[11px] font-medium text-zinc-600 block uppercase tracking-wider">
          Product
        </span>
        <h4 className="text-sm font-bold text-zinc-900 truncate">
          {product}
        </h4>
      </div>

      {/* Estimated Price Range */}
      <div className="mb-2.5">
        <span className="text-[11px] font-medium text-zinc-600 block uppercase tracking-wider">
          Estimated Price
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-extrabold text-zinc-950 tabular-nums">
            {priceRange}
          </span>
          <span className="text-[11px] text-zinc-600 truncate">
            {unit}
          </span>
        </div>
      </div>

      {/* Confidence & Source Footnote */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
          <span className="font-medium text-zinc-700">
            {confidence} ({confidenceScore}%)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-600">
          <Tag className="w-3 h-3 text-zinc-600" />
          <span>{sourceCount} sources</span>
        </div>
      </div>
    </div>
  );
};
