'use client';

import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  FileText,
  RotateCcw
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const CustomerAccountModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { customers, orders, wishlist, products, addToCart, requestOrderReturn } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses'>('orders');
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('');
  const [returnSuccess, setReturnSuccess] = useState(false);

  if (!isOpen) return null;

  const currentCustomer = customers[0] || {
    id: 'cust-demo',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    addresses: [],
    ordersCount: 2,
    lifetimeValue: 4897,
    joinedDate: '12 Sep 2026'
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (returnOrderId && returnReason) {
      requestOrderReturn(returnOrderId, returnReason);
      setReturnSuccess(true);
      setTimeout(() => {
        setReturnOrderId(null);
        setReturnReason('');
        setReturnSuccess(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white border border-stone-200 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl text-stone-900 flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-4 bg-[#6d8b74] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/30">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">{currentCustomer.name}</h2>
                <p className="text-xs text-[#eef2ee]">{currentCustomer.email} • {currentCustomer.phone}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-white hover:bg-[#55715c] rounded">
              ✕
            </button>
          </div>

          {/* Navigation Bar inside Customer Portal */}
          <div className="flex border-b border-stone-200 bg-[#faf9f6] text-xs font-bold px-4 pt-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'orders' ? 'border-[#6d8b74] text-[#55715c]' : 'border-transparent text-stone-500'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Purchase History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'wishlist' ? 'border-[#6d8b74] text-[#55715c]' : 'border-transparent text-stone-500'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Wishlist ({wishlistedProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'addresses' ? 'border-[#6d8b74] text-[#55715c]' : 'border-transparent text-stone-500'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                activeTab === 'profile' ? 'border-[#6d8b74] text-[#55715c]' : 'border-transparent text-stone-500'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile & Rewards</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#f1f2f4]">
            
            {/* TAB 1: ORDER HISTORY & TRACKING */}
            {activeTab === 'orders' && (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded border border-stone-200 p-4 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-100 gap-2">
                      <div>
                        <span className="font-mono font-bold text-[#55715c] text-sm">{ord.id}</span>
                        <span className="text-stone-400 text-xs ml-2">• Placed on {ord.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'Shipped'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-800'
                        }`}>
                          {ord.status}
                        </span>
                        {ord.trackingId && (
                          <span className="font-mono text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            AWB: {ord.trackingId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-1.5 text-xs">
                      {ord.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-stone-700">
                          <span>{item.product.name} (x{item.quantity})</span>
                          <span className="font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    {/* Timeline & Actions */}
                    <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <div className="text-stone-500">
                        Total Amount: <strong className="text-stone-900">₹{ord.totalAmount.toLocaleString('en-IN')}</strong> ({ord.paymentMethod})
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {ord.status === 'Delivered' && (
                          <button
                            onClick={() => setReturnOrderId(ord.id)}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded flex items-center gap-1 text-[11px]"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Return Item</span>
                          </button>
                        )}
                        <a
                          href={`https://wa.me/919876543210?text=Hello%20MYCO,%20please%20send%20invoice%20PDF%20for%20Order%20${ord.id}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold rounded flex items-center gap-1 text-[11px]"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Download GST Invoice</span>
                        </a>
                      </div>
                    </div>

                    {/* Return Modal trigger */}
                    {returnOrderId === ord.id && (
                      <form onSubmit={handleReturnSubmit} className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-xs space-y-2">
                        <span className="font-bold text-red-900 block">Request Return / Refund for {ord.id}:</span>
                        <input
                          type="text"
                          required
                          placeholder="Reason (e.g. skin irritation, damaged box, wrong volume)"
                          value={returnReason}
                          onChange={(e) => setReturnReason(e.target.value)}
                          className="w-full bg-white border border-red-300 rounded p-1.5 outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setReturnOrderId(null)}
                            className="px-3 py-1 bg-stone-200 text-stone-700 rounded font-bold"
                          >
                            Cancel
                          </button>
                          <button type="submit" className="px-3 py-1 bg-red-600 text-white rounded font-bold">
                            Submit Return Request
                          </button>
                        </div>
                        {returnSuccess && <div className="text-emerald-700 font-bold">Return request logged! Our logistics team will call you within 24h.</div>}
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="p-3 bg-white rounded border border-stone-200 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded border" />
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="font-bold text-stone-900 truncate">{p.name}</div>
                          <div className="text-stone-500 text-[11px]">₹{p.price.toLocaleString('en-IN')}</div>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="px-3 py-1.5 bg-[#6d8b74] text-white font-bold rounded text-xs"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-stone-400 text-xs">
                    <Heart className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                    No saved formulations in your wishlist yet.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-3 text-xs">
                {currentCustomer.addresses.map((addr) => (
                  <div key={addr.id} className="p-4 bg-white rounded border border-stone-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-900">{addr.label} Address</span>
                      {addr.isDefault && <span className="bg-[#eef2ee] text-[#55715c] font-bold px-2 py-0.5 rounded text-[10px]">Default</span>}
                    </div>
                    <div className="text-stone-600">{addr.address}</div>
                    <div className="text-stone-600">{addr.city}, {addr.state} - {addr.pincode}</div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white p-5 rounded border border-stone-200 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-stone-500 font-bold block">Customer Full Name</label>
                    <div className="font-bold text-stone-900 mt-1">{currentCustomer.name}</div>
                  </div>
                  <div>
                    <label className="text-stone-500 font-bold block">Primary Email</label>
                    <div className="text-stone-900 mt-1">{currentCustomer.email}</div>
                  </div>
                  <div>
                    <label className="text-stone-500 font-bold block">Mobile Phone</label>
                    <div className="text-stone-900 mt-1">{currentCustomer.phone}</div>
                  </div>
                  <div>
                    <label className="text-stone-500 font-bold block">MYCO Tier & Lifetime Value</label>
                    <div className="text-[#55715c] font-bold mt-1">₹{currentCustomer.lifetimeValue.toLocaleString('en-IN')} (Gold Ritualist)</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
