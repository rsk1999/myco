'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingCart,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Heart,
  User
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CustomerAccountModal } from './CustomerAccountModal';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  return (
    <>
      {/* Top Strip Announcement */}
      <div className="bg-[#55715c] text-white text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold bg-[#88a47c] px-2 py-0.5 rounded text-[10px]">MYCO PLUS</span>
            <span>100% Certified Organic Ayurvedic Formulations • Free Pan-India Delivery Above ₹999</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#d1e0d3]" />
              Support: +91 98765 43210
            </span>
            <span>Same-Day Dispatch Guarantee</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#6d8b74] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-white hover:bg-[#55715c] rounded"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo Brand Area */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-white px-2 py-1 rounded shadow-xs flex items-center">
              <Image
                src="/logo.jpg"
                alt="MYCO Global Distributors Limited"
                width={120}
                height={36}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for kumkumadi serum, neem face wash, night crème, tea elixirs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#faf9f6] text-stone-900 placeholder-stone-500 text-sm px-4 py-2.5 rounded-sm outline-none focus:ring-2 focus:ring-[#88a47c] shadow-inner"
              />
              <button
                className="absolute right-0 top-0 bottom-0 px-4 bg-[#55715c] hover:bg-[#455c4b] text-white rounded-r-sm flex items-center justify-center transition"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Header Action Items */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Customer Account Button */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#d1e0d3] transition bg-white/10 px-2.5 py-1.5 rounded"
            >
              <User className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">My Account</span>
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold hover:text-[#d1e0d3] transition"
            >
              <Heart className="w-4 h-4 text-red-200 fill-red-200" />
              <span>Wishlist ({wishlistCount})</span>
            </button>

            {/* Merchant Admin Hub */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 text-xs font-semibold hover:text-[#d1e0d3] transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Hub</span>
            </Link>

            {/* Cart Button with Flipkart Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 font-semibold text-sm hover:text-[#d1e0d3] transition relative"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f59e0b] text-stone-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products, serums, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-stone-900 placeholder-stone-500 text-xs px-3 py-2 rounded outline-none"
            />
            <button className="absolute right-2 text-stone-600">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="bg-[#faf9f6] border-b border-stone-200 text-stone-700 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setSelectedCategory('All')}
                className="hover:text-[#55715c] transition"
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedCategory('Skincare')}
                className="hover:text-[#55715c] transition"
              >
                Skincare & Serums
              </button>
              <button
                onClick={() => setSelectedCategory('Haircare')}
                className="hover:text-[#55715c] transition"
              >
                Hair Oils & Tonics
              </button>
              <button
                onClick={() => setSelectedCategory('Wellness & Teas')}
                className="hover:text-[#55715c] transition"
              >
                Organic Wellness Teas
              </button>
              <button
                onClick={() => setSelectedCategory('Body & Oils')}
                className="hover:text-[#55715c] transition"
              >
                Body Polishes & De-Tan
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-[#7d6b5c] text-[11px]">
              <span className="flex items-center gap-1 font-bold text-[#55715c]">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                Use Code &lsquo;FESTIVE20&rsquo; for 20% Off
              </span>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-stone-800 p-4 space-y-3 border-b border-stone-300 text-sm font-semibold">
            <button
              onClick={() => { setSelectedCategory('All'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1 hover:text-[#55715c]"
            >
              All Products
            </button>
            <button
              onClick={() => { setSelectedCategory('Skincare'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1 hover:text-[#55715c]"
            >
              Skincare
            </button>
            <button
              onClick={() => { setSelectedCategory('Haircare'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1 hover:text-[#55715c]"
            >
              Haircare
            </button>
            <button
              onClick={() => { setSelectedCategory('Wellness & Teas'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1 hover:text-[#55715c]"
            >
              Wellness Teas
            </button>
            <button
              onClick={() => { setSelectedCategory('Body & Oils'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-1 hover:text-[#55715c]"
            >
              Body & Oils
            </button>
            <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => { setAccountModalOpen(true); setMobileMenuOpen(false); }}
                className="text-left font-bold text-[#55715c]"
              >
                My Account & Orders
              </button>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#55715c] font-bold block"
              >
                Admin Merchant Hub
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Account Modal Portal */}
      <CustomerAccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </>
  );
};
