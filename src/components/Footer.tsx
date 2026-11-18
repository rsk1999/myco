'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { StaticPagesModal } from './StaticPagesModal';

export const Footer: React.FC = () => {
  const [modalPage, setModalPage] = useState<'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'shipping' | 'return' | null>(null);

  return (
    <>
      <footer className="bg-[#1b2b20] text-stone-300 text-xs mt-8">
        {/* Top Assistance Bar */}
        <div className="bg-[#2a3e31] py-4 border-b border-stone-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#6d8b74] text-white rounded">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block">PAN-INDIA & EXPRESS SHIPPING</span>
                <span className="text-[11px] text-stone-400">Fast tracking on every delivery with free shipping above ₹999</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone-300 text-xs">
              <Phone className="w-4 h-4 text-[#88a47c]" />
              <span>Customer Care: <strong>+91 98765 43210</strong> (10 AM - 7 PM IST)</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Logo & About */}
            <div className="lg:col-span-2 space-y-3">
              <div className="bg-white p-2 rounded inline-block">
                <Image
                  src="/logo.jpg"
                  alt="MYCO Global Distributors Limited"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-stone-400 text-xs leading-relaxed max-w-sm mt-2">
                <strong>MYCO</strong> honors sacred ancient formulations, crafting clinically verified, small-batch herbal elixirs, organic cleansers, and adaptogenic wellness teas for radiant skin.
              </p>
              <div className="pt-2 text-xs text-[#88a47c] flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>GoDaddy Web Hosting Plus & AutoSSL Verified</span>
              </div>
            </div>

            {/* Departments */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Departments
              </h4>
              <ul className="space-y-1.5 text-stone-400">
                <li><Link href="/#catalog" className="hover:text-white transition">Skincare & Serums</Link></li>
                <li><Link href="/#catalog" className="hover:text-white transition">Hair Growth Elixirs</Link></li>
                <li><Link href="/#catalog" className="hover:text-white transition">Vedic Face Washes</Link></li>
                <li><Link href="/#catalog" className="hover:text-white transition">Herbal & Green Teas</Link></li>
                <li><Link href="/#catalog" className="hover:text-white transition">Body Radiance Oils</Link></li>
              </ul>
            </div>

            {/* Essential Policies & Information */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Customer Care & Policy
              </h4>
              <ul className="space-y-1.5 text-stone-400">
                <li><button onClick={() => setModalPage('about')} className="hover:text-white transition">About MYCO</button></li>
                <li><button onClick={() => setModalPage('faq')} className="hover:text-white transition">FAQs & Regimens</button></li>
                <li><button onClick={() => setModalPage('shipping')} className="hover:text-white transition">Shipping Policy</button></li>
                <li><button onClick={() => setModalPage('return')} className="hover:text-white transition">Returns & Refunds</button></li>
                <li><button onClick={() => setModalPage('contact')} className="hover:text-white transition">Contact Us</button></li>
              </ul>
            </div>

            {/* Headquarters */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                Registered Office
              </h4>
              <div className="space-y-2 text-stone-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#88a47c] shrink-0 mt-0.5" />
                  <span>MYCO Organics, Mumbai & New Delhi, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#88a47c] shrink-0" />
                  <span>care@mycobotanicals.com</span>
                </div>
                <div className="pt-2">
                  <Link href="/admin" className="text-[#f59e0b] hover:text-amber-300 font-bold transition">
                    Admin Merchant Hub →
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Legal bar */}
          <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <div>
              © 2026 MYCO Botanicals. All rights reserved. GSTIN: 27AABCM9876M1Z5.
            </div>
            <div className="flex gap-4">
              <button onClick={() => setModalPage('privacy')} className="hover:text-stone-300">Privacy Policy</button>
              <button onClick={() => setModalPage('terms')} className="hover:text-stone-300">Terms of Service</button>
              <button onClick={() => setModalPage('return')} className="hover:text-stone-300">Cancellation Policy</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Static Pages Modal */}
      {modalPage && (
        <StaticPagesModal
          isOpen={!!modalPage}
          page={modalPage}
          onClose={() => setModalPage(null)}
        />
      )}
    </>
  );
};
