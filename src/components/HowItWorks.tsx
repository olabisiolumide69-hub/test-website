import React from 'react';
import { Search, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/displayData';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5 text-violet-600" />,
  Cpu: <Cpu className="w-5 h-5 text-violet-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-violet-600" />,
};

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-white scroll-mt-16"
      aria-labelledby="how-it-works-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-4 border border-violet-100">
            <span>How it works</span>
          </div>
          <h2
            id="how-it-works-title"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 text-balance"
          >
            A price estimate in three steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
            From natural-language queries to empirical supplier ranges without manual catalog hunting.
          </p>
        </div>

        {/* 3 Step Cards with Clean Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-8 rounded-2xl bg-[#FAFAFC] border border-zinc-200/80 hover:border-violet-300 hover:shadow-lg hover:shadow-purple-950/5 transition-all duration-200 flex flex-col justify-between text-left group"
            >
              <div>
                {/* Step Index & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                    {iconMap[step.iconName] || <Search className="w-5 h-5 text-violet-600" />}
                  </div>
                  <span className="text-2xl font-black text-zinc-300 group-hover:text-violet-400 transition-colors tabular-nums">
                    {step.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connecting line helper on desktop */}
              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden lg:flex items-center gap-1 mt-6 text-xs font-semibold text-zinc-400 group-hover:text-violet-600 transition-colors">
                  <span>Next step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
