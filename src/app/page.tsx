'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { apis } from '@/data/apis';
import { categories as initialCategories } from '@/data/categories';
import { ApiEntry } from '@/data/types';
import { getCategoriesWithCounts } from '@/lib/utils';
import { useSearch } from '@/hooks/useSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategoryTabs } from '@/components/CategoryTabs';
import { FilterBar } from '@/components/FilterBar';
import { ApiCard } from '@/components/ApiCard';
import { ApiDetailModal } from '@/components/ApiDetailModal';
import { Footer } from '@/components/Footer';
import { SearchX, Heart, RotateCcw } from 'lucide-react';
import { ApiCardSkeleton } from '@/components/ApiCardSkeleton';

export default function Home() {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedApi, setSelectedApi] = useState<ApiEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Custom Hooks
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    query,
    setQuery,
    categoryId,
    setCategoryId,
    pricing,
    setPricing,
    auth,
    setAuth,
    difficulty,
    setDifficulty,
    sortBy,
    setSortBy,
    results,
    clearFilters,
    hasActiveFilters,
  } = useSearch(apis);
  
  // Simulate loading state to test api card skeleton, update logic when backend is added
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [query, categoryId, pricing, auth, difficulty, sortBy]);

  // Dynamic category counts based on current dataset
  const categoriesWithCounts = useMemo(
    () => getCategoriesWithCounts(initialCategories, apis),
    []
  );

  // Filter by favorites if toggle is active
  const displayedApis = useMemo(() => {
    if (showOnlyFavorites) {
      return results.filter((api) => isFavorite(api.id));
    }
    return results;
  }, [results, showOnlyFavorites, isFavorite]);

  // Modal open & close
  const handleSelectApi = (api: ApiEntry) => {
    setSelectedApi(api);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Quick filter clicks from HeroSection
  const handleSelectQuickFilter = (filter: {
    auth?: 'none';
    pricing?: 'free';
    difficulty?: 'easy';
  }) => {
    if (filter.auth !== undefined) setAuth(filter.auth);
    if (filter.pricing !== undefined) setPricing(filter.pricing);
    if (filter.difficulty !== undefined) setDifficulty(filter.difficulty);
  };

  const handleResetAll = () => {
    clearFilters();
    setShowOnlyFavorites(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-blue-500 selection:text-white transition-colors">
      {/* Top Navigation */}
      <Navbar
        totalApis={apis.length}
        totalFavorites={favorites.length}
        showOnlyFavorites={showOnlyFavorites}
        onToggleFavorites={() => setShowOnlyFavorites((prev) => !prev)}
      />

      {/* Hero Section with Search Input */}
      <HeroSection
        query={query}
        onQueryChange={setQuery}
        onSelectQuickFilter={handleSelectQuickFilter}
      />

      {/* Category Pills Bar */}
      <CategoryTabs
        categories={categoriesWithCounts}
        selectedCategoryId={categoryId}
        onSelectCategory={setCategoryId}
        totalApisCount={apis.length}
      />

      {/* Filter Options Bar */}
      <FilterBar
        pricing={pricing}
        onPricingChange={setPricing}
        auth={auth}
        onAuthChange={setAuth}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        hasActiveFilters={hasActiveFilters || showOnlyFavorites}
        onClearFilters={handleResetAll}
        resultsCount={displayedApis.length}
      />

      {/* Main Grid Content */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
        {showOnlyFavorites && (
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-rose-800 dark:text-rose-300">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
              <span>Menampilkan API Favorit yang Disimpan ({displayedApis.length})</span>
            </div>
            <button
              onClick={() => setShowOnlyFavorites(false)}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Lihat Semua API
            </button>
          </div>
        )}

        {/* API Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ApiCardSkeleton key={index} />
            ))}
          </div>
        ) : displayedApis.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedApis.map((api) => (
              <ApiCard
                key={api.id}
                api={api}
                isFavorite={isFavorite(api.id)}
                onToggleFavorite={toggleFavorite}
                onSelect={handleSelectApi}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="my-16 flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 max-w-md mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 mb-4">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Tidak Ada API yang Cocok
            </h3>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              Coba sesuaikan kata kunci pencarian atau hapus filter kategori/harga/otentikasi yang aktif.
            </p>
            <button
              onClick={handleResetAll}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}
      </main>

      {/* Interactive Detail Modal */}
      <ApiDetailModal
        api={selectedApi}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFavorite={selectedApi ? isFavorite(selectedApi.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
