import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface AssumptionsBannerProps {
  assumptions: string[];
  uncertaintyNotes: string[];
}

export const AssumptionsBanner: React.FC<AssumptionsBannerProps> = ({
  assumptions,
  uncertaintyNotes,
}) => {
  if (
    (!assumptions || assumptions.length === 0) &&
    (!uncertaintyNotes || uncertaintyNotes.length === 0)
  ) {
    return null;
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-7 text-sm">
      <div className="flex items-center gap-2 mb-4 text-amber-900 font-bold text-base">
        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
        <h3>Commercial Assumptions & Market Uncertainty Disclosure</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-700">
        {/* Baseline Assumptions */}
        {assumptions && assumptions.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <span>Baseline Procurement Assumptions</span>
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-zinc-700">
              {assumptions.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Factors of Uncertainty */}
        {uncertaintyNotes && uncertaintyNotes.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <span>Factors of Market Variance</span>
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-zinc-700">
              {uncertaintyNotes.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-amber-200/60 text-xs text-amber-800 flex items-center gap-2">
        <HelpCircle className="w-4 h-4 flex-shrink-0" />
        <span>
          Prices provided represent indicative market benchmarks derived from public data and do not constitute a binding quote or purchase offer.
        </span>
      </div>
    </div>
  );
};
