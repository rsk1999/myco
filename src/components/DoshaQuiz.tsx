'use client';

import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    description: string;
    dosha: 'Vata' | 'Pitta' | 'Kapha';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'How does your skin naturally feel 30 minutes after washing?',
    options: [
      { label: 'Tight, Dry, or Rough', description: 'Tends to flake or develop dry patches easily', dosha: 'Vata' },
      { label: 'Warm, Sensitive, or Reddish', description: 'Prone to breakouts, sun sensitivity, irritation', dosha: 'Pitta' },
      { label: 'Oily, Heavy, or Congested', description: 'Enlarged pores, excess shine around T-zone', dosha: 'Kapha' }
    ]
  },
  {
    id: 2,
    question: 'How does your skin react to climate shifts or stress?',
    options: [
      { label: 'Becomes dehydrated & dull', description: 'Loses glow quickly in cold or air-conditioned environments', dosha: 'Vata' },
      { label: 'Flushes red or active acne breakouts', description: 'Reacts quickly to spicy foods, heat, and stress', dosha: 'Pitta' },
      { label: 'Holds fluid or develops clogged blackheads', description: 'Pores get sluggish and congested', dosha: 'Kapha' }
    ]
  },
  {
    id: 3,
    question: 'What is your primary skincare transformation goal?',
    options: [
      { label: 'Deep Cellular Nourishment & Anti-Aging', description: 'Repair skin barrier, smooth fine lines, restore elasticity', dosha: 'Vata' },
      { label: 'Calm Active Redness & Brighten Pigmentation', description: 'Clear inflammation and achieve uniform glass complexion', dosha: 'Pitta' },
      { label: 'Pore Clarifying & Sebum Regulation', description: 'Detoxify impurities and achieve clean matte luminescence', dosha: 'Kapha' }
    ]
  }
];

export const DoshaQuiz: React.FC = () => {
  const { products, addToCart } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<('Vata' | 'Pitta' | 'Kapha')[]>([]);
  const [result, setResult] = useState<'Vata' | 'Pitta' | 'Kapha' | null>(null);

  const handleSelect = (dosha: 'Vata' | 'Pitta' | 'Kapha') => {
    const nextAnswers = [...answers, dosha];
    setAnswers(nextAnswers);
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant dosha
      const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
      nextAnswers.forEach((d) => counts[d]++);
      const dominant = Object.keys(counts).reduce((a, b) =>
        counts[a as keyof typeof counts] >= counts[b as keyof typeof counts] ? a : b
      ) as 'Vata' | 'Pitta' | 'Kapha';
      setResult(dominant);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  // Recommendations according to Dosha
  const getRecommendedProducts = (dosha: 'Vata' | 'Pitta' | 'Kapha') => {
    if (dosha === 'Vata') {
      return products.filter((p) => p.id === 'myco-cream-03' || p.id === 'myco-serum-01');
    }
    if (dosha === 'Pitta') {
      return products.filter((p) => p.id === 'myco-serum-01' || p.id === 'myco-cleanse-02');
    }
    return products.filter((p) => p.id === 'myco-mask-07' || p.id === 'myco-cleanse-02');
  };

  const doshaDescriptions = {
    Vata: {
      title: 'Vata Predominant (Air & Space Element)',
      desc: 'Your skin requires deep lipids, warm botanical infusions, and 100x washed ghee to lock in moisture and counteract atmospheric dryness.',
      ritualName: 'Deep Cellular Restorative Ritual'
    },
    Pitta: {
      title: 'Pitta Predominant (Fire & Water Element)',
      desc: 'Your skin thrives on cooling herbal elixirs, saffron, sandalwood, and steam-distilled rose to soothe dermal heat and erase stubborn discoloration.',
      ritualName: 'Cooling Radiance & Anti-Blemish Ritual'
    },
    Kapha: {
      title: 'Kapha Predominant (Earth & Water Element)',
      desc: 'Your skin responds best to clarifying neem, multani mitti mud masks, and warm herbal tea tonics to detoxify congested pores and stimulate circulation.',
      ritualName: 'Detoxifying Clarifying & Matte Ritual'
    }
  };

  return (
    <section className="py-12 bg-white border-t border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Container */}
        <div className="bg-[#faf9f6] border border-stone-200 rounded-lg p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eef2ee] text-[#55715c] text-[11px] font-extrabold uppercase tracking-wider rounded">
              <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
              Interactive Ayurvedic Skin Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
              Discover Your Vedic Dosha Skin Profile
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Answer 3 clinical diagnostic questions to receive your tailored morning & evening botanical regimen.
            </p>
          </div>

          {!result ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-bold mb-2">
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#6d8b74] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question & Options */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  {QUESTIONS[currentStep].question}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt.dosha)}
                      className="text-left p-4 bg-white border border-stone-200 hover:border-[#6d8b74] rounded transition hover:shadow-xs group flex items-start justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-stone-900 group-hover:text-[#55715c]">
                          {opt.label}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {opt.description}
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-[#6d8b74] group-hover:bg-[#eef2ee] text-[#55715c] shrink-0 mt-0.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#eef2ee] text-[#55715c] rounded-full flex items-center justify-center mx-auto border border-[#6d8b74]">
                <Sparkles className="w-8 h-8 text-[#55715c]" />
              </div>

              <div>
                <span className="text-xs font-black text-[#55715c] uppercase tracking-widest">
                  Diagnostic Result
                </span>
                <h3 className="text-2xl font-black text-stone-900 mt-1">
                  {doshaDescriptions[result].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mt-2 leading-relaxed">
                  {doshaDescriptions[result].desc}
                </p>
              </div>

              {/* Recommended Bundle Products */}
              <div className="pt-4 border-t border-stone-200 text-left">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-extrabold text-sm text-stone-900">
                    Recommended {doshaDescriptions[result].ritualName}:
                  </h4>
                  <button
                    onClick={resetQuiz}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getRecommendedProducts(result).map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-white border border-stone-200 rounded flex gap-3 items-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-14 object-cover rounded border border-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-stone-900 truncate">{prod.name}</div>
                        <div className="text-[11px] text-stone-500">{prod.volume}</div>
                        <div className="font-black text-xs text-[#55715c] mt-0.5">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="px-3 py-1.5 bg-[#6d8b74] hover:bg-[#55715c] text-white text-xs font-bold rounded shrink-0 shadow-xs"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>

                {/* Bundle 1-Click Action */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      getRecommendedProducts(result).forEach((p) => addToCart(p));
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-[#f59e0b] hover:bg-amber-400 text-stone-950 font-black rounded uppercase tracking-wider text-xs shadow flex items-center justify-center gap-2 mx-auto"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Add Complete {result} Ritual to Cart</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
