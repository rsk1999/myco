'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import {
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Check
} from 'lucide-react';

const SKIN_TYPES = ['All', 'All Skin Types', 'Oily & Acne Prone', 'Dry & Sensitive', 'Aging Skin'] as const;

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

export const Catalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedSkinType,
    setSelectedSkinType,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [minRating, setMinRating] = useState<number>(0);

  // Advanced Filtering and Sorting Pipeline
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
        const matchesSkin = selectedSkinType === 'All' || prod.skinType === selectedSkinType;
        const matchesPrice = prod.price <= maxPrice;
        const matchesRating = prod.rating >= minRating;
        const matchesSearch =
          searchQuery.trim() === '' ||
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.keyIngredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSkin && matchesPrice && matchesRating && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSkinType, maxPrice, minRating, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSkinType('All');
    setMaxPrice(2500);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('relevance');
  };

  const isFiltered =
    selectedCategory !== 'All' ||
    selectedSkinType !== 'All' ||
    maxPrice < 2500 ||
    minRating > 0 ||
    searchQuery !== '';

  return (
    <section id="catalog" className="py-6 bg-[#f1f2f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid: Left Filter Sidebar (Flipkart Style) + Right Product List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* ================= LEFT SIDEBAR FILTERS ================= */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded border border-stone-200 shadow-xs sticky top-24">
              
              {/* Header Filter Title */}
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <span className="font-black text-sm uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#55715c]" />
                  Filters
                </span>
                {isFiltered && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-[#55715c] font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear All
                  </button>
                )}
              </div>

              <div className="p-4 space-y-6 text-xs">
                
                {/* 1. Category Filter */}
                <div>
                  <h4 className="font-extrabold text-stone-900 uppercase text-[11px] tracking-wider mb-2.5">
                    Categories
                  </h4>
                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-2.5 py-1.5 rounded transition flex items-center justify-between font-medium ${
                          selectedCategory === cat
                            ? 'bg-[#eef2ee] text-[#55715c] font-bold'
                            : 'text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Price Range Slider */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-extrabold text-stone-900 uppercase text-[11px] tracking-wider">
                      Max Budget
                    </h4>
                    <span className="font-black text-xs text-[#55715c]">₹{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="2500"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#6d8b74] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>₹500</span>
                    <span>₹1,500</span>
                    <span>₹2,500</span>
                  </div>
                </div>

                {/* 3. Skin Concern Target */}
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-extrabold text-stone-900 uppercase text-[11px] tracking-wider mb-2.5">
                    Skin Concern
                  </h4>
                  <div className="space-y-1.5">
                    {SKIN_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSkinType(type)}
                        className={`w-full text-left px-2.5 py-1.5 rounded transition flex items-center justify-between font-medium ${
                          selectedSkinType === type
                            ? 'bg-[#eef2ee] text-[#55715c] font-bold'
                            : 'text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span>{type}</span>
                        {selectedSkinType === type && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Customer Rating Threshold */}
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-extrabold text-stone-900 uppercase text-[11px] tracking-wider mb-2.5">
                    Customer Ratings
                  </h4>
                  <div className="space-y-1.5">
                    {[4.8, 4.5, 4.0].map((star) => (
                      <button
                        key={star}
                        onClick={() => setMinRating(minRating === star ? 0 : star)}
                        className={`w-full text-left px-2.5 py-1.5 rounded transition flex items-center gap-2 font-medium ${
                          minRating === star
                            ? 'bg-[#eef2ee] text-[#55715c] font-bold'
                            : 'text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span className="flex items-center gap-1 font-bold">
                          {star}★ & above
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* ================= RIGHT PRODUCT SHOWCASE ================= */}
          <main className="lg:col-span-9 space-y-3">
            
            {/* Top Toolbar (Sorting & Search status) */}
            <div className="bg-white rounded border border-stone-200 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-black text-lg text-stone-900">
                  {selectedCategory === 'All' ? 'All Botanical Formulations' : selectedCategory}
                </h1>
                <p className="text-xs text-stone-500">
                  Showing <strong>{filteredAndSortedProducts.length}</strong> verified items
                </p>
              </div>

              {/* Sorting Bar (Flipkart Style Horizontal Tabs / Dropdown) */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-bold uppercase text-[10px] flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3" /> Sort By:
                </span>
                
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    onClick={() => setSortBy('relevance')}
                    className={`px-2.5 py-1 rounded transition font-semibold ${
                      sortBy === 'relevance'
                        ? 'bg-[#55715c] text-white font-bold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Popular
                  </button>
                  <button
                    onClick={() => setSortBy('price-asc')}
                    className={`px-2.5 py-1 rounded transition font-semibold ${
                      sortBy === 'price-asc'
                        ? 'bg-[#55715c] text-white font-bold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => setSortBy('price-desc')}
                    className={`px-2.5 py-1 rounded transition font-semibold ${
                      sortBy === 'price-desc'
                        ? 'bg-[#55715c] text-white font-bold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => setSortBy('rating')}
                    className={`px-2.5 py-1 rounded transition font-semibold ${
                      sortBy === 'rating'
                        ? 'bg-[#55715c] text-white font-bold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Customer Rating
                  </button>
                  <button
                    onClick={() => setSortBy('discount')}
                    className={`px-2.5 py-1 rounded transition font-semibold ${
                      sortBy === 'discount'
                        ? 'bg-[#55715c] text-white font-bold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Discount
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded border border-stone-200 p-12 text-center my-4">
                <h3 className="font-bold text-base text-stone-800">No products match your criteria.</h3>
                <p className="text-xs text-stone-500 mt-1">Try adjusting the price slider or resetting filters.</p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 px-4 py-2 bg-[#6d8b74] text-white font-bold rounded text-xs shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </section>
  );
};
