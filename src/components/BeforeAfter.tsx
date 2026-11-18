'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <section className="py-12 bg-[#faf9f6] border-t border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1 bg-[#eef2ee] text-[#55715c] px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
              Clinical Evidence • 28 Days
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              Visible Botanical Transformation. Real Results.
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Drag the interactive slider to inspect dermatologically recorded skin barrier revitalization and pigmentation fade after 4 weeks of twice-daily Kumkumadi Radiance Miracle Elixir ritual.
            </p>

            {/* Metrics points */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3 rounded border border-stone-200 shadow-xs">
                <div className="text-2xl font-black text-[#55715c]">94.8%</div>
                <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                  Reported visible pigmentation reduction
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-stone-200 shadow-xs">
                <div className="text-2xl font-black text-[#55715c]">98.2%</div>
                <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                  Measured dermal barrier hydration boost
                </div>
              </div>
            </div>

            <div className="text-[11px] text-stone-400 font-medium">
              * Independent 28-day blinded clinical test on 45 participants aged 24-52.
            </div>
          </div>

          {/* Right Interactive Slider */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden select-none cursor-ew-resize border border-stone-300 shadow-md bg-stone-100"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80"
                alt="After 28 Days Radiant Complexion"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <span className="absolute top-3 right-3 bg-[#55715c] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                DAY 28 (AFTER)
              </span>

              {/* Before Image (Foreground with Clip Path) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                  alt="Day 1 Skin with Blemishes"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 sepia-25 pointer-events-none"
                />
                <span className="absolute top-3 left-3 bg-stone-900/80 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                  DAY 1 (BEFORE)
                </span>
              </div>

              {/* Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#55715c] text-white border-2 border-white flex items-center justify-center shadow-lg">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-stone-500 mt-2 font-medium flex items-center justify-center gap-1">
              <span>← Drag or hover to compare Before vs. After results →</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
