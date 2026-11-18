'use client';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Catalog } from '../components/Catalog';
import { DoshaQuiz } from '../components/DoshaQuiz';
import { RitualSection } from '../components/RitualSection';
import { CartDrawer } from '../components/CartDrawer';
import { ProductModal } from '../components/ProductModal';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f1f2f4] text-stone-900 flex flex-col selection:bg-[#6d8b74] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Catalog />
        <DoshaQuiz />
        <RitualSection />
      </main>
      <Footer />
      <CartDrawer />
      <ProductModal />
    </div>
  );
}
