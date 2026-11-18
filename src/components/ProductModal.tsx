'use client';

import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Check,
  Layers,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductVariant } from '@/data/products';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    getProductReviews,
    addReview
  } = useStore();

  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!selectedProduct) return null;

  const reviews = getProductReviews(selectedProduct.id);
  const isWishlisted = isInWishlist(selectedProduct.id);

  const activePrice = selectedVariant ? selectedVariant.price : selectedProduct.price;
  const activeOriginalPrice = selectedVariant ? selectedVariant.originalPrice : selectedProduct.originalPrice;
  const activeStock = selectedVariant ? selectedVariant.stock : selectedProduct.stock;

  const discountPercent = activeOriginalPrice
    ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
    : 0;

  const images = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [selectedProduct.image];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    addReview(selectedProduct.id, newReviewAuthor, newReviewRating, newReviewComment);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white border border-stone-200 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl text-stone-900">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-3 right-3 z-10 p-1.5 text-stone-400 hover:text-stone-900 bg-white/90 rounded-full hover:bg-stone-100 transition shadow"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Gallery Left Column (5 Cols) */}
            <div className="md:col-span-5 bg-stone-50 p-4 flex flex-col justify-between">
              <div>
                <div className="relative aspect-square rounded overflow-hidden bg-white border border-stone-200 flex items-center justify-center shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[selectedImageIndex] || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-cover"
                  />
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-[#f59e0b] text-stone-950 text-[10px] px-2 py-0.5 rounded font-black shadow-xs">
                      {discountPercent}% OFF
                    </div>
                  )}

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`absolute bottom-2 right-2 p-2 rounded-full shadow border transition ${
                      isWishlisted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-stone-400 border-stone-200 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                {/* Multiple Thumbnails Carousel Bar */}
                {images.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-12 h-12 rounded border overflow-hidden shrink-0 transition ${
                          selectedImageIndex === idx ? 'border-[#6d8b74] ring-2 ring-[#88a47c]' : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Stock status indicator */}
              <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] flex items-center justify-between">
                <span className="text-stone-500">Stock Availability:</span>
                <span className={`font-bold ${activeStock > 0 ? 'text-[#55715c]' : 'text-red-600'}`}>
                  {activeStock > 0 ? `In Stock (${activeStock} units)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Details & Specs Right Column (7 Cols) */}
            <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#55715c] font-bold uppercase">
                  <span>{selectedProduct.category} • {selectedProduct.subcategory || 'Luxury Ritual'}</span>
                  <span className="text-stone-400 font-mono text-[10px]">SKU: {selectedProduct.sku}</span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mt-1 leading-snug">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedProduct.subtitle}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-0.5 bg-[#55715c] text-white text-xs font-bold px-2 py-0.5 rounded">
                    <span>{selectedProduct.rating}</span>
                    <Star className="w-3 h-3 fill-white" />
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    {selectedProduct.reviewCount} Ratings & Verified Customer Reviews
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-stone-100">
                  <span className="text-2xl font-black text-stone-900">
                    ₹{activePrice.toLocaleString('en-IN')}
                  </span>
                  {activeOriginalPrice && (
                    <span className="text-sm line-through text-stone-400">
                      ₹{activeOriginalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-sm font-bold text-[#55715c]">
                      {discountPercent}% off
                    </span>
                  )}
                </div>

                {/* Product Variants Selector */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#55715c]" />
                      Select Volume / Variant:
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedProduct.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded border text-xs font-bold transition flex items-center gap-1.5 ${
                            (selectedVariant ? selectedVariant.id === v.id : false)
                              ? 'border-[#6d8b74] bg-[#eef2ee] text-[#55715c]'
                              : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          <span>{v.name}</span>
                          <span className="text-[10px] text-stone-500 font-normal">₹{v.price}</span>
                          {(selectedVariant ? selectedVariant.id === v.id : false) && <Check className="w-3 h-3 text-[#55715c]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Tabs: Details, Specifications, Reviews */}
                <div className="flex border-b border-stone-200 mt-4 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1.5 px-2 transition border-b-2 ${
                      activeTab === 'details'
                        ? 'border-[#6d8b74] text-[#55715c]'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Benefits & Ritual
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1.5 px-2 transition border-b-2 ${
                      activeTab === 'specs'
                        ? 'border-[#6d8b74] text-[#55715c]'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-1.5 px-2 transition border-b-2 flex items-center gap-1 ${
                      activeTab === 'reviews'
                        ? 'border-[#6d8b74] text-[#55715c]'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <span>Reviews ({reviews.length})</span>
                  </button>
                </div>

                {activeTab === 'details' && (
                  <div className="space-y-2 mt-2.5 text-xs text-stone-600 max-h-48 overflow-y-auto pr-1">
                    <p className="leading-relaxed font-light">{selectedProduct.description}</p>
                    <div className="pt-1 space-y-1">
                      <span className="font-bold text-stone-800 block text-[11px]">Primary Clinical Benefits:</span>
                      {selectedProduct.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-stone-600">
                          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-1.5 mt-2.5 text-xs text-stone-600 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2 p-2 bg-[#faf9f6] rounded border border-stone-200">
                      <div><strong className="text-stone-800">Skin Type:</strong> {selectedProduct.skinType}</div>
                      <div><strong className="text-stone-800">Volume:</strong> {selectedProduct.volume}</div>
                      <div><strong className="text-stone-800">SKU Code:</strong> {selectedProduct.sku}</div>
                      <div><strong className="text-stone-800">Barcode:</strong> {selectedProduct.barcode || 'N/A'}</div>
                    </div>
                    <div className="p-2 bg-[#faf9f6] rounded border border-stone-200">
                      <strong className="text-stone-800 block mb-1">Botanical Key Ingredients:</strong>
                      <div className="flex flex-wrap gap-1">
                        {selectedProduct.keyIngredients.map((ing, i) => (
                          <span key={i} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[10px]">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-2.5 mt-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
                    {reviews.length > 0 ? (
                      reviews.map((r) => (
                        <div key={r.id} className="p-2.5 bg-[#faf9f6] rounded border border-stone-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900">{r.author}</span>
                            <span className="text-[10px] text-stone-400">{r.date}</span>
                          </div>
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-stone-600 text-[11px] leading-relaxed">{r.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-stone-400 text-center py-3">No reviews yet. Be the first customer to review!</p>
                    )}

                    <form onSubmit={handleReviewSubmit} className="pt-2 border-t border-stone-200 space-y-1.5">
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="bg-white border border-stone-300 rounded p-1 text-xs outline-none"
                        />
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="bg-white border border-stone-300 rounded p-1 text-xs outline-none font-bold"
                        >
                          <option value={5}>5 Stars ★★★★★</option>
                          <option value={4}>4 Stars ★★★★☆</option>
                          <option value={3}>3 Stars ★★★☆☆</option>
                        </select>
                      </div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Write your review experience..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded p-1 text-xs outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-[#55715c] hover:bg-[#435948] text-white font-bold rounded text-[11px]"
                      >
                        Submit Verified Review
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    addToCart(selectedProduct, 1, selectedVariant);
                    setSelectedProduct(null);
                  }}
                  className="py-3 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold rounded uppercase tracking-wider text-xs shadow flex items-center justify-center gap-1.5 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, 1, selectedVariant);
                    setSelectedProduct(null);
                  }}
                  className="py-3 bg-[#f59e0b] hover:bg-amber-400 text-stone-950 font-black rounded uppercase tracking-wider text-xs shadow flex items-center justify-center gap-1.5 transition"
                >
                  <span>BUY NOW</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
