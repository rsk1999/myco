'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Zap } from 'lucide-react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="bg-white border-b border-stone-200">
      
      {/* Flipkart-Style Mega Promotion Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Main Super Banner */}
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#6d8b74] via-[#55715c] to-[#3f5344] text-white p-6 sm:p-10 shadow-sm">
          {/* Subtle logo watermarking */}
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
            <Image
              src="/logo.jpg"
              alt="MYCO"
              width={250}
              height={250}
              className="h-64 w-auto object-contain"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#f59e0b] text-stone-950 px-3 py-1 rounded font-extrabold text-[11px] tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5 fill-stone-950" />
                CELEBRATING PURE VEDIC RADIANCE
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Authentic Botanical Skincare & Luxury Elixirs.
              </h1>
              
              <p className="text-sm sm:text-base text-[#eef2ee] max-w-xl font-normal leading-relaxed">
                Handcrafted Ayurvedic preparations infused with pure Kashmiri saffron, 100x water-washed ghee, and KSM-66 botanicals. Cruelty-free, preservative-free, and dermatologically verified.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="px-6 py-3 bg-[#f59e0b] hover:bg-amber-400 text-stone-950 font-bold rounded text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 transition"
                >
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ayurveda-ritual"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded text-xs uppercase tracking-wider border border-white/20 transition"
                >
                  Discover Rituals
                </a>
              </div>
            </div>

            {/* Right Banner Spotlight Product */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white rounded-lg p-3 text-stone-900 shadow-md max-w-xs w-full text-center">
                <div className="relative aspect-square rounded overflow-hidden bg-stone-100 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
                    alt="Kumkumadi Elixir"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#f59e0b] text-stone-950 text-[10px] font-black px-2 py-0.5 rounded">
                    HOT DEAL 25% OFF
                  </span>
                </div>
                <div className="text-xs font-bold text-[#55715c] uppercase">Top Rated Formula</div>
                <div className="font-bold text-sm text-stone-900 line-clamp-1">Kumkumadi Radiance Elixir</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-sm line-through text-stone-400">₹1,999</span>
                  <span className="text-lg font-extrabold text-[#55715c]">₹1,499</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Flipkart-Style 4 Value Trust Props */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3 bg-[#faf9f6] rounded border border-stone-200">
            <div className="p-2 bg-[#eef2ee] text-[#55715c] rounded">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Fast Pan-India Delivery</div>
              <div className="text-[11px] text-stone-500">Free shipping above ₹999</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#faf9f6] rounded border border-stone-200">
            <div className="p-2 bg-[#eef2ee] text-[#55715c] rounded">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">100% Genuine Brands</div>
              <div className="text-[11px] text-stone-500">Authentic certified ingredients</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#faf9f6] rounded border border-stone-200">
            <div className="p-2 bg-[#eef2ee] text-[#55715c] rounded">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Ayurvedic Formulations</div>
              <div className="text-[11px] text-stone-500">ISO & GMP Certified</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#faf9f6] rounded border border-stone-200">
            <div className="p-2 bg-[#eef2ee] text-[#55715c] rounded">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Easy Customer Checkout</div>
              <div className="text-[11px] text-stone-500">Instant order confirmation</div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
