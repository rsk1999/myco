'use client';

import React from 'react';
import { Sun, Moon, Flame, CheckCircle2 } from 'lucide-react';

export const RitualSection: React.FC = () => {
  return (
    <section id="ayurveda-ritual" className="py-12 bg-white border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eef2ee] text-[#55715c] text-xs font-bold uppercase tracking-wider rounded mb-2">
            MYCO Wellness Protocols
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            The Three-Fold Skin Ritual (Dinacharya)
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Authentic Vedic formulations prescribed for sunrise, midday, and sunset restorative skin cycles.
          </p>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Step 1 */}
          <div className="bg-[#faf9f6] border border-stone-200 rounded p-6 relative">
            <div className="w-10 h-10 rounded bg-[#eef2ee] text-[#55715c] flex items-center justify-center font-bold mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#7d6b5c] uppercase tracking-wider">
              Step 1 • Morning
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-1 mb-2">
              Deep Clarifying Cleanse
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dissolve nocturnal oil and dead skin build-up with cold-pressed Neem bark and steam-distilled Holy Basil. Restores balanced pH 5.5.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-[#55715c] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Neem & Tulsi Purifying Gel</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#faf9f6] border border-stone-200 rounded p-6 relative">
            <div className="w-10 h-10 rounded bg-[#eef2ee] text-[#55715c] flex items-center justify-center font-bold mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#7d6b5c] uppercase tracking-wider">
              Step 2 • Midday
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-1 mb-2">
              Antioxidant Saffron Defense
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Infuse dermal cells with pure Kashmiri saffron and 24K therapeutic botanicals. Guards against oxidative aging and blue light stress.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-[#55715c] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Kumkumadi Radiance Elixir</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#faf9f6] border border-stone-200 rounded p-6 relative">
            <div className="w-10 h-10 rounded bg-[#eef2ee] text-[#55715c] flex items-center justify-center font-bold mb-4">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-[#7d6b5c] uppercase tracking-wider">
              Step 3 • Night
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-1 mb-2">
              100x Washed Ghee Barrier Repair
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Washed 100 times in sacred copper vessels with pure copper water. Instantly cools micro-inflammation and promotes overnight cellular regeneration.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-[#55715c] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Shatadhouta Ghrita Crème</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
