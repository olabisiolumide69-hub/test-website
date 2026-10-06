import React from 'react';
import { SpecificationItem } from '../types/product';
import { Sliders } from 'lucide-react';

interface SpecsTableProps {
  specifications: SpecificationItem[];
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ specifications }) => {
  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Sliders className="w-5 h-5 text-zinc-800" />
        <h3 className="text-lg font-bold text-zinc-950">Technical Specifications</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/75">
              <th className="py-3 px-4 font-semibold text-zinc-700 w-1/3">Specification</th>
              <th className="py-3 px-4 font-semibold text-zinc-700">Standard Value / Industry Metric</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {specifications.map((item, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                <td className="py-3 px-4 font-medium text-zinc-700 align-top">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-zinc-900 font-mono text-xs sm:text-sm">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
