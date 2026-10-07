import React, { useEffect, useRef, useState } from 'react';
import { STATS_DATA, StatItem } from '../data/displayData';

function useCounter(target: number, duration = 1600, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldStart]);

  return count;
}

const StatCard: React.FC<{ item: StatItem; inView: boolean }> = ({ item, inView }) => {
  const currentCount = useCounter(item.value, 1500, inView);

  const formattedNumber =
    item.value >= 1000
      ? currentCount.toLocaleString()
      : currentCount.toString();

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:border-violet-200 hover:shadow-md hover:shadow-purple-950/5 transition-all duration-200 text-left">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 tabular-nums">
          {item.prefix || ''}
          {formattedNumber}
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold text-violet-600">
          {item.suffix}
        </span>
      </div>
      <div className="mt-2">
        <span className="text-sm font-semibold text-zinc-800 block">
          {item.label}
        </span>
        <span className="text-[11px] font-medium text-zinc-600 block mt-0.5">
          {item.sublabel}
        </span>
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-16 bg-[#FAF9FD] border-y border-zinc-200/60"
      aria-label="Platform Statistics Benchmark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Context Caption */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-zinc-500">
          <span className="font-semibold uppercase tracking-wider text-zinc-400">
            Platform Benchmarks
          </span>
          <span className="italic text-zinc-600">
            * Values are illustrative UI placeholders pending production volume telemetry
          </span>
        </div>

        {/* 4 Compact Rounded Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS_DATA.map((item, idx) => (
            <StatCard key={idx} item={item} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
