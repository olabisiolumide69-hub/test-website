import React from 'react';
import { X, ShieldCheck, Scale, AlertTriangle, FileText } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-zinc-900" />
            <h3 className="text-lg font-bold text-zinc-950">
              Pricing Methodology & Confidence System
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs sm:text-sm text-zinc-600 mt-5 leading-relaxed">
          <div>
            <h4 className="font-bold text-zinc-900 text-sm mb-1">
              1. Grounded Market Research (Zero AI Hallucination)
            </h4>
            <p>
              SpecPrice never creates prices out of thin air. The system queries active online catalogs, industrial suppliers, building supply yards, and retail channels to capture live quotes and technical spec sheets.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 text-sm mb-1">
              2. Benchmark Range Synthesis
            </h4>
            <p>
              Observed prices are normalized into low-end, median, and high-end brackets. The estimated benchmark reflects the typical single-unit or contractor median, accounting for volume discounts, brand prestige, and material grade variance.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 text-sm mb-1">
              3. Confidence Scoring
            </h4>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-emerald-700">HIGH:</span>
                <span>Supported by ≥3 independent commercial sources with consistent specifications.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-amber-700">MEDIUM:</span>
                <span>Supported by 1-2 verified sources or items with broad variance between budget and commercial tiers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-rose-700">LOW:</span>
                <span>Custom industrial fabrications or scarce public listings where estimates are indicative only.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 text-sm mb-1">
              4. Commercial Exclusions
            </h4>
            <p>
              Unless explicitly noted in assumptions, prices do not include destination freight surcharges, import tariffs, or local municipal sales taxes.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-zinc-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-xl transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
