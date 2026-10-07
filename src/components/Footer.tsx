import React from 'react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateSection: (hash: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateSection,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080913] text-zinc-400 border-t border-white/10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Short Product Description */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                <span className="font-extrabold text-xs">SP</span>
              </div>
              <span className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors">
                SpecPrice
              </span>
            </button>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              AI-grounded market price discovery and technical specification analysis for materials, industrial hardware, and physical commercial products.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigateSection('#how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('#features')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('#sources')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Indexed Sources
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#disclaimer"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors"
                >
                  Methodology & Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {currentYear} SpecPrice Inc. All rights reserved.</p>
          <p>Market intelligence gathered for procurement benchmarking.</p>
        </div>
      </div>
    </footer>
  );
};
