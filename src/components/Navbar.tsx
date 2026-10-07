import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';

interface NavbarProps {
  onTrySearchClick: () => void;
  onNavigateHome: () => void;
  isResultsView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTrySearchClick,
  onNavigateHome,
  isResultsView = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isResultsView) {
      onNavigateHome();
      // Allow slight delay for view transition before anchor scrolling
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090A15]/95 backdrop-blur-md border-b border-white/10 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg py-1 px-1.5 -ml-1.5"
          aria-label="SpecPrice Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="font-extrabold text-sm tracking-tighter">SP</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors">
            SpecPrice
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300"
          aria-label="Primary navigation"
        >
          <button
            onClick={() => handleLinkClick('#how-it-works')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-white"
          >
            How it works
          </button>
          <button
            onClick={() => handleLinkClick('#features')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-white"
          >
            Features
          </button>
          <button
            onClick={() => handleLinkClick('#sources')}
            className="hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:text-white"
          >
            Sources
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onTrySearchClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 rounded-lg shadow-sm hover:shadow-md hover:shadow-violet-600/30 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Try Search</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#090A15] border-b border-white/10 space-y-3">
          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => handleLinkClick('#how-it-works')}
              className="px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              How it works
            </button>
            <button
              onClick={() => handleLinkClick('#features')}
              className="px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Features
            </button>
            <button
              onClick={() => handleLinkClick('#sources')}
              className="px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Sources
            </button>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onTrySearchClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Try Search</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
