'use client';

import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, toggleWishlist, isInWishlist } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white border border-stone-200 hover:border-[#6d8b74] rounded transition-all duration-200 hover:shadow-lg flex flex-col justify-between p-3 relative">
      
      {/* Top Badges Area */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {discountPercent > 0 && (
          <span className="bg-[#f59e0b] text-stone-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 shadow-xs hover:bg-white text-stone-400 hover:text-red-500 transition"
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden bg-stone-50 rounded mb-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Quick View Button */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="absolute bottom-2 right-2 p-1.5 bg-white/90 text-stone-700 hover:text-[#55715c] rounded shadow-xs opacity-0 group-hover:opacity-100 transition"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Brand & Volume Header */}
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
          <span className="font-bold text-[#55715c] uppercase text-[10px] tracking-wide">
            MYCO Authenticated
          </span>
          <span>{product.volume}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setSelectedProduct(product)}
          className="font-bold text-sm text-stone-900 hover:text-[#55715c] cursor-pointer line-clamp-2 leading-snug transition"
        >
          {product.name}
        </h3>

        {/* Rating Pill (Flipkart Green Tag) */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="inline-flex items-center gap-0.5 bg-[#55715c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star className="w-3 h-3 fill-white" />
          </span>
          <span className="text-xs text-stone-400">({product.reviewCount})</span>
        </div>

        {/* Skin Type & Category Badges */}
        <div className="mt-2 text-[11px] text-stone-500 line-clamp-1">
          For: <span className="text-stone-700 font-medium">{product.skinType}</span>
        </div>
      </div>

      {/* Pricing and Action Button */}
      <div className="pt-3 mt-3 border-t border-stone-100">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-black text-stone-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs line-through text-stone-400">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-[#55715c]">
              {discountPercent}% off
            </span>
          )}
        </div>

        <div className="text-[10px] text-stone-500 mb-2.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Delivery in 2-3 Days • Free Shipping</span>
        </div>

        {/* Add to Cart Flipkart Style */}
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold text-xs rounded uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-98 shadow-xs"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};
