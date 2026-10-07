import React, { useEffect, useRef, useState } from 'react';
import { LARGE_VALUE_METRICS } from '../data/displayData';

function useCounter(target: number, duration = 1800, shouldStart = false, isDecimal = false) {
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
      const easeOut = 1 - Math.pow(1 - progress, 3);

      if (isDecimal) {
        setCount(parseFloat((easeOut * target).toFixed(1)));
      } else {
        setCount(Math.floor(easeOut * target));
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldStart, isDecimal]);

  return count;
}

const MetricDisplay: React.FC<{
  metric: (typeof LARGE_VALUE_METRICS)[0];
  inView: boolean;
}> = ({ metric, inView }) => {
  const isDecimal = metric.value % 1 !== 0;
  const count = useCounter(metric.value, 1800, inView, isDecimal);

  return (
    <div className="py-8 sm:py-12 border-b md:border-b-0 md:border-r last:border-0 border-zinc-200/80 px-4 sm:px-8 text-center flex flex-col justify-between">
      <div>
        <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 tabular-nums">
          <span>{count}</span>
          <span className="text-violet-600">{metric.suffix}</span>
        </div>
        <h3 className="mt-4 text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
          {metric.label}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 max-w-xs mx-auto leading-relaxed">
          {metric.detail}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] font-medium text-zinc-600">
        <span>{metric.placeholderNote}</span>
      </div>
    </div>
  );
};

export const LargeNumberSection: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-white"
      aria-label="Value Metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-3xl bg-[#FAFAFC] border border-zinc-200/80 shadow-xs">
          {LARGE_VALUE_METRICS.map((metric, idx) => (
            <MetricDisplay key={idx} metric={metric} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
