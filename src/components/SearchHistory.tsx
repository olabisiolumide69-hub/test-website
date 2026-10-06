import React, { useEffect, useState } from 'react';
import { History, Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { RecentSearchSummary } from '../../server/db/database.ts';

interface SearchHistoryProps {
  onSelectSearch: (query: string) => void;
  activeQuery: string;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  onSelectSearch,
  activeQuery,
}) => {
  const [history, setHistory] = useState<RecentSearchSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/searches/recent');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setHistory(json.data);
        }
      }
    } catch {
      // Ignore background history fetch errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [activeQuery]);

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 pt-3 border-t border-zinc-150">
      <div className="flex items-center justify-between gap-2 mb-2 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[11px]">
          <History className="w-3.5 h-3.5 text-zinc-400" />
          <span>Recent Market Researches</span>
        </div>
        <button
          type="button"
          onClick={fetchHistory}
          className="text-zinc-400 hover:text-zinc-700 p-1 rounded"
          title="Refresh history"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.slice(0, 5).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectSearch(item.query)}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-xs transition-colors shadow-2xs"
          >
            <span className="font-medium text-zinc-800 group-hover:text-zinc-950">
              {item.productName || item.query}
            </span>
            {item.estimatedPrice !== null && (
              <span className="font-semibold text-zinc-500 text-[11px]">
                ({item.currency === 'USD' ? '$' : item.currency + ' '}
                {new Intl.NumberFormat().format(Math.round(item.estimatedPrice))})
              </span>
            )}
            <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};
