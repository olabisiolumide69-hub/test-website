/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PriceOverviewCard } from './components/PriceOverviewCard';
import { SpecsTable } from './components/SpecsTable';
import { VariantsList } from './components/VariantsList';
import { SourcesList } from './components/SourcesList';
import { AssumptionsBanner } from './components/AssumptionsBanner';
import { QueryUnderstandingCard } from './components/QueryUnderstandingCard';
import { SearchHistory } from './components/SearchHistory';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { MethodologyModal } from './components/MethodologyModal';
import { ProductResearchResult } from './types/product';
import { searchProductApi, ClientValidationError, ServerApiError } from './api/searchClient';
import { Shield } from 'lucide-react';

export default function App() {
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [result, setResult] = useState<ProductResearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  // Real search request flow: validates input, sends to server-side endpoint, handles errors
  const handleSearch = useCallback(
    async (queryToSearch: string) => {
      const trimmed = queryToSearch ? queryToSearch.trim() : '';
      if (!trimmed) {
        setErrorMessage('Search query cannot be empty. Please enter a product or material.');
        return;
      }

      // If already loading this exact query, prevent duplicate submission
      if (isLoading && activeQuery === trimmed) {
        return;
      }

      setActiveQuery(trimmed);
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await searchProductApi(trimmed);
        setResult(data);
        setErrorMessage(null);
      } catch (err: any) {
        console.error('Search failed:', err);
        const userMessage =
          err instanceof ClientValidationError || err instanceof ServerApiError
            ? err.message
            : 'An unexpected network error occurred while researching this product.';
        setErrorMessage(userMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, activeQuery]
  );

  const handleReset = useCallback(() => {
    setActiveQuery('');
    setResult(null);
    setErrorMessage(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50/70 text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Application Bar */}
      <Header
        onReset={handleReset}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* Hero & Search Header */}
      <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 bg-white shadow-2xs">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold mb-4 border border-zinc-200">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span>Server-Side Request Flow • Private Keys Secured</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Research Real Market Prices & Specs for Physical Items
          </h1>

          {/* Short Supporting Description */}
          <p className="mt-3 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Enter any material, tool, device, or industrial component.
            Get instant market price estimates, verified sources, and technical specifications.
          </p>

          {/* Large Search Input with Live Validation */}
          <div className="mt-8">
            <SearchBar
              initialQuery={activeQuery}
              isLoading={isLoading}
              onSearch={handleSearch}
            />

            {/* Recent Inquiries Persisted Drawer */}
            <SearchHistory
              activeQuery={activeQuery}
              onSelectSearch={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Loading State */}
        {isLoading && <LoadingSkeleton currentQuery={activeQuery} />}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <ErrorState
            errorMessage={errorMessage}
            query={activeQuery}
            onRetry={() => handleSearch(activeQuery)}
            onClear={handleReset}
          />
        )}

        {/* Empty State (Initial view) */}
        {!isLoading && !errorMessage && !result && (
          <EmptyState onSelectExample={handleSearch} />
        )}

        {/* Results View */}
        {!isLoading && !errorMessage && result && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Quick Breadcrumb / Query Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-200 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 font-medium">
                <span>Search Query:</span>
                <span className="font-bold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200">
                  "{result.query}"
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-zinc-600 hover:text-zinc-900 underline font-medium cursor-pointer"
              >
                Clear Results
              </button>
            </div>

            {/* Price Overview Card */}
            <PriceOverviewCard
              productName={result.productName}
              category={result.category}
              shortDescription={result.shortDescription}
              brand={result.brand}
              model={result.model}
              estimatedPrice={result.estimatedPrice}
              priceRange={result.priceRange}
              currency={result.currency}
              unitOfMeasure={result.unitOfMeasure}
              confidenceLevel={result.confidenceLevel}
              confidenceReason={result.confidenceReason}
              researchedAt={result.researchedAt}
              sourcesCount={result.sourcesCount}
              isPriceUnavailable={result.isPriceUnavailable}
            />

            {/* AI Query Interpretation & Search Plan Card */}
            <QueryUnderstandingCard understanding={result.queryUnderstanding} />

            {/* Two-Column Grid: Specifications & Variants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SpecsTable specifications={result.specifications} />
              <VariantsList
                commonBrands={result.commonBrands}
                variants={result.variants}
              />
            </div>

            {/* Verified Sources & Retailer Quotes */}
            <SourcesList
              sourcePrices={result.sourcePrices}
              currency={result.currency}
            />

            {/* Assumptions & Uncertainty Disclosure */}
            <AssumptionsBanner
              assumptions={result.assumptions}
              uncertaintyNotes={result.uncertaintyNotes}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            SpecPrice MVP • Text-Based Market Intelligence Engine
          </p>
          <div className="flex items-center gap-4 text-zinc-600">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-zinc-900 underline"
            >
              Methodology
            </button>
            <span>•</span>
            <span>No Image Upload</span>
            <span>•</span>
            <span>Provider-Agnostic Backend</span>
          </div>
        </div>
      </footer>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
