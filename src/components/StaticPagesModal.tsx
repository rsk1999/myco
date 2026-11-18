'use client';

import React, { useState } from 'react';
import {
  Mail,
  Sparkles,
  Phone,
  Send,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const StaticPagesModal: React.FC<{
  isOpen: boolean;
  page: 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'shipping' | 'return';
  onClose: () => void;
}> = ({ isOpen, page, onClose }) => {
  const { settings } = useStore();
  const [contactSent, setContactSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Are MYCO formulations 100% natural and cruelty-free?',
      a: 'Yes. All MYCO preparations are AYUSH certified, cruelty-free, and formulated using classical Vedic scriptures with organic Kashmiri saffron, wild-harvested herbs, and 100x washed A2 cow ghee.'
    },
    {
      q: 'How long does Pan-India delivery take?',
      a: 'Orders are dispatched within 24 hours from our Mumbai & New Delhi central labs. Metro deliveries take 24–48 hours, while rest of India arrives within 2–4 business days with live Delhivery & Bluedart tracking.'
    },
    {
      q: 'What is the return and refund policy?',
      a: 'We offer an unconditional 7-day return guarantee if you experience skin incompatibility or in the rare event of transit damage. Simply log a return in your customer account or message our WhatsApp desk.'
    },
    {
      q: 'Are your products safe for acne-prone and sensitive skin?',
      a: 'Every formulation is non-comedogenic and dermatologically tested. Our Neem & Tulsi Gel Cleanser and Sandalwood Multani Mud Mask are particularly effective for active breakouts and inflamed skin.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white border border-stone-200 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl text-stone-900 flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="p-4 bg-[#6d8b74] text-white flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-200" />
              {page === 'about' && 'About MYCO Botanicals'}
              {page === 'contact' && 'Contact Support Desk'}
              {page === 'faq' && 'Frequently Asked Questions (FAQ)'}
              {page === 'privacy' && 'Privacy Policy & Data Security'}
              {page === 'terms' && 'Terms and Conditions'}
              {page === 'shipping' && 'Shipping & Delivery Policy'}
              {page === 'return' && 'Returns, Refunds & Cancellation Policy'}
            </h2>
            <button onClick={onClose} className="p-1 text-white hover:bg-[#55715c] rounded">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-stone-700 leading-relaxed bg-[#fbf9f5]">
            
            {/* ABOUT US */}
            {page === 'about' && (
              <div className="space-y-3">
                <h3 className="text-base font-black text-stone-900">5,000 Years of Vedic Purity in Every Drop</h3>
                <p>
                  At <strong>MYCO</strong>, we bridge timeless Ayurvedic wisdom from the ancient scriptures of Charaka Samhita with modern dermatological standards. Every small batch is concocted using sacred Kashmir Crocus Sativus (saffron), cold-pressed botanicals, and 100-times copper-washed A2 cow ghee.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white rounded border border-stone-200 text-center">
                    <span className="font-black text-[#55715c] text-sm block">100% Herbal</span>
                    <span className="text-[10px] text-stone-500">Zero Synthetic Dyes</span>
                  </div>
                  <div className="p-3 bg-white rounded border border-stone-200 text-center">
                    <span className="font-black text-[#55715c] text-sm block">Small Batch</span>
                    <span className="text-[10px] text-stone-500">Preservative Free</span>
                  </div>
                  <div className="p-3 bg-white rounded border border-stone-200 text-center">
                    <span className="font-black text-[#55715c] text-sm block">GMP Certified</span>
                    <span className="text-[10px] text-stone-500">AYUSH Approved</span>
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT US */}
            {page === 'contact' && (
              <div className="space-y-4">
                <p>Have inquiries regarding your order, ingredients, or need personalized skin regimen guidance?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-white rounded border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#55715c]" />
                      Direct WhatsApp / Phone
                    </div>
                    <div className="text-stone-600">{settings.supportPhone} (10 AM - 7 PM IST)</div>
                  </div>

                  <div className="p-3.5 bg-white rounded border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#55715c]" />
                      Email Inquiries
                    </div>
                    <div className="text-stone-600">{settings.supportEmail}</div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSent(true);
                  }}
                  className="bg-white p-4 rounded border border-stone-200 space-y-2.5"
                >
                  <span className="font-bold text-stone-800 block">Send Us a Direct Message:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" required placeholder="Your Name" className="border border-stone-300 rounded p-2 text-xs" />
                    <input type="email" required placeholder="Your Email" className="border border-stone-300 rounded p-2 text-xs" />
                  </div>
                  <textarea rows={3} required placeholder="Your question or feedback..." className="w-full border border-stone-300 rounded p-2 text-xs" />
                  <button type="submit" className="px-4 py-2 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold rounded text-xs flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                  {contactSent && <div className="text-emerald-700 font-bold">Thank you! Your message has been sent to our care desk.</div>}
                </form>
              </div>
            )}

            {/* FAQ */}
            {page === 'faq' && (
              <div className="space-y-2">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-white rounded border border-stone-200 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-3 text-left font-bold text-stone-900 flex justify-between items-center text-xs"
                    >
                      <span>{f.q}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="p-3 pt-0 text-stone-600 text-xs border-t border-stone-50 bg-[#faf9f6]">
                        {f.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* SHIPPING POLICY */}
            {page === 'shipping' && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-stone-900 text-sm">Pan-India Courier & Delivery Timelines</h4>
                <p>We provide <strong>FREE express delivery</strong> on all orders above ₹999. Orders below ₹999 incur a flat ₹99 standard shipping fee.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Metro Cities (Mumbai, Delhi NCR, Bangalore, Pune):</strong> 24–48 hours.</li>
                  <li><strong>Tier 2 & 3 Cities:</strong> 2–4 business days.</li>
                  <li><strong>Rest of India / Remote pin codes:</strong> 3–6 business days via SpeedPost or Delhivery Air.</li>
                </ul>
              </div>
            )}

            {/* RETURN POLICY */}
            {page === 'return' && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-stone-900 text-sm">7-Day Customer Satisfaction Return Policy</h4>
                <p>We take pride in our Ayurvedic preparations. If you are unsatisfied or receive a damaged jar:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>You can request an instant return within 7 calendar days of delivery from your Customer Account modal.</li>
                  <li>Our courier partners will arrange reverse pickup directly from your doorstep at zero cost.</li>
                  <li>Refunds for prepaid orders are credited back to the original UPI/card within 3–5 working days. COD refunds are processed via instant UPI transfer.</li>
                </ul>
              </div>
            )}

            {/* PRIVACY & TERMS */}
            {(page === 'privacy' || page === 'terms') && (
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">Secure Data & Merchant Policies</h4>
                <p>
                  MYCO respects customer confidentiality. Your personal information, delivery addresses, and payment details are processed under 256-bit SSL encryption. We never sell or share customer data with third-party advertisers.
                </p>
                <p>
                  All purchases are subject to Indian consumer protection laws and standard cosmetic safety regulations under AYUSH licensing guidelines.
                </p>
              </div>
            )}

          </div>

          <div className="p-3 bg-white border-t border-stone-200 flex justify-end">
            <button onClick={onClose} className="px-4 py-1.5 bg-[#6d8b74] text-white font-bold rounded text-xs">
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
