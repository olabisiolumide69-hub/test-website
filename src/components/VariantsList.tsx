import React from 'react';
import { ProductVariant } from '../types/product';
import { Layers, Tag } from 'lucide-react';

interface VariantsListProps {
  commonBrands: string[];
  variants: ProductVariant[];
}

export const VariantsList: React.FC<VariantsListProps> = ({ commonBrands, variants }) => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Layers className="w-5 h-5 text-zinc-800" />
        <h3 className="text-lg font-bold text-zinc-950">Brands & Common Variants</h3>
      </div>

      {/* Common Brands */}
      {commonBrands && commonBrands.length > 0 && (
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2.5">
            Key Manufacturers & Commercial Brands
          </span>
          <div className="flex flex-wrap gap-2">
            {commonBrands.map((brand, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 font-medium text-xs border border-zinc-200"
              >
                <Tag className="w-3 h-3 text-zinc-500" />
                {brand}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Variants / Sub-types */}
      {variants && variants.length > 0 && (
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2.5">
            Grades & Variant Pricing Shifts
          </span>
          <div className="space-y-3">
            {variants.map((v, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-zinc-150 bg-zinc-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900">{v.name}</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">{v.detail}</p>
                </div>
                {v.priceDelta && (
                  <span className="self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded bg-zinc-200 text-zinc-800 whitespace-nowrap">
                    {v.priceDelta}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
