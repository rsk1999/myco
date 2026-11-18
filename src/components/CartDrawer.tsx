'use client';

import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Tag,
  Gift,
  CreditCard,
  Banknote
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order } from '@/data/products';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    discountTotal,
    shippingFee,
    gstAmount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings,
    createOrder
  } = useStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Online UPI / Card' | 'WhatsApp Invoiced'>('Online UPI / Card');

  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    phone: '+91 98765 43210',
    email: 'ananya@example.com',
    address: 'Villa 14, Palm Grove, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    state: 'Maharashtra',
    notes: ''
  });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ text: res.message, success: res.success });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill in your name, phone number, pincode, and delivery address.');
      return;
    }

    const order = createOrder({
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      state: formData.state,
      paymentMethod,
      notes: formData.notes
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setPlacedOrder(order);
    setOrderComplete(true);
  };

  const handleWhatsAppInquiry = () => {
    const itemsList = cart
      .map(
        (item) =>
          `• ${item.product.name} ${item.selectedVariant ? `(${item.selectedVariant.name})` : ''} x${item.quantity}`
      )
      .join('%0A');

    const couponNote = appliedCoupon ? `%0A*Promo Code:* ${appliedCoupon.code} (-₹${discountTotal})` : '';

    const text = `*New Order Inquiry - MYCO Botanicals*%0A%0A*Selected Items:*%0A${itemsList}${couponNote}%0A%0A*Subtotal:* ₹${cartSubtotal}%0A*GST (18% Included):* ₹${gstAmount}%0A*Delivery:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}%0A*Total Amount Payable:* ₹${cartTotal}%0A*Payment Mode:* ${paymentMethod}%0A%0APlease confirm express courier dispatch details.`;
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  const progressPercent = Math.min(100, Math.round((cartSubtotal / settings.freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, settings.freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 text-stone-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 bg-[#6d8b74] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-white" />
              <h2 className="text-sm font-bold uppercase tracking-wider">
                {orderComplete ? 'Order Placed' : isCheckingOut ? 'Express Delivery Checkout' : `Shopping Cart (${cart.length})`}
              </h2>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
                setOrderComplete(false);
              }}
              className="p-1 text-white hover:bg-[#55715c] rounded transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gamified Free Shipping Bar */}
          {!orderComplete && (
            <div className="bg-[#eef2ee] text-[#55715c] px-4 py-2 border-b border-stone-200 text-xs">
              <div className="flex items-center justify-between font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#f59e0b]" />
                  {amountNeeded === 0
                    ? '🎉 Free Pan-India Express Delivery Unlocked!'
                    : `Add ₹${amountNeeded.toLocaleString('en-IN')} more for FREE Express Shipping`}
                </span>
                <span className="text-[10px]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#6d8b74] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f1f2f4]">
            
            {orderComplete && placedOrder ? (
              <div className="text-center py-8 space-y-4 bg-white p-5 rounded border border-stone-200 shadow-xs">
                <div className="w-14 h-14 bg-[#eef2ee] border border-[#6d8b74] rounded-full flex items-center justify-center mx-auto text-[#55715c]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-900">Order Successfully Confirmed!</h3>
                <p className="text-stone-500 text-xs leading-relaxed">
                  Thank you, <strong>{placedOrder.customerName}</strong>. Your order ID is <span className="font-mono font-bold text-[#55715c]">{placedOrder.id}</span>.
                </p>

                {/* Tracking & Invoice box */}
                <div className="p-3.5 bg-[#faf9f6] rounded border border-stone-200 text-left text-xs space-y-1.5 text-stone-700">
                  <div className="flex justify-between items-center pb-1.5 border-b border-stone-200">
                    <span className="font-bold text-[#55715c]">Order Status: {placedOrder.status}</span>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-stone-200">
                      AWB: {placedOrder.trackingId}
                    </span>
                  </div>
                  <div><strong>Shipping to:</strong> {placedOrder.address}, {placedOrder.city} - {placedOrder.pincode}</div>
                  <div><strong>Payment Mode:</strong> {placedOrder.paymentMethod} ({placedOrder.paymentStatus})</div>
                  <div><strong>Amount Paid / Payable:</strong> ₹{placedOrder.totalAmount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-stone-500 pt-1">
                    GSTIN: {settings.gstin} • Invoice auto-generated with 18% GST (₹{placedOrder.gstAmount}).
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Receive Instant WhatsApp Tracking Updates
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckingOut(false);
                      setOrderComplete(false);
                    }}
                    className="w-full py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs bg-white p-4 rounded border border-stone-200">
                <div className="font-bold text-stone-900 text-sm pb-1 border-b border-stone-100 flex items-center justify-between">
                  <span>Delivery Address</span>
                  <span className="text-[11px] text-[#55715c] font-normal">Step 2 of 2</span>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-600 font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-stone-600 font-bold">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-stone-600 font-bold">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-600 font-bold">Complete Street Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-stone-600 font-bold">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded px-2.5 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-stone-600 font-bold">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded px-2.5 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-stone-600 font-bold">State *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded px-2.5 py-2 text-stone-900 outline-none focus:border-[#6d8b74]"
                    />
                  </div>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <label className="text-stone-700 font-bold block">Select Payment Method:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Online UPI / Card')}
                      className={`p-2.5 rounded border text-left flex items-center gap-1.5 transition ${
                        paymentMethod === 'Online UPI / Card'
                          ? 'border-[#6d8b74] bg-[#eef2ee] font-bold text-[#55715c]'
                          : 'border-stone-300 bg-white text-stone-600'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Instant UPI / Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-2.5 rounded border text-left flex items-center gap-1.5 transition ${
                        paymentMethod === 'COD'
                          ? 'border-[#6d8b74] bg-[#eef2ee] font-bold text-[#55715c]'
                          : 'border-stone-300 bg-white text-stone-600'
                      }`}
                    >
                      <Banknote className="w-3.5 h-3.5" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-[#f59e0b] hover:bg-amber-400 text-stone-950 font-black rounded uppercase tracking-wider shadow"
                  >
                    Confirm & Pay (₹{cartTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </form>
            ) : cart.length > 0 ? (
              <div className="space-y-3">
                {/* Coupon Box */}
                <div className="bg-white p-3 rounded border border-stone-200 shadow-xs">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code &lsquo;{appliedCoupon.code}&rsquo; Active ({appliedCoupon.discountPercent}% Off)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-red-500 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. FESTIVE20, MYCO10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 bg-stone-50 border border-stone-300 rounded px-2.5 py-1 text-xs outline-none focus:border-[#6d8b74] uppercase font-bold"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold rounded text-xs"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponFeedback && (
                    <div
                      className={`text-[10px] font-bold mt-1.5 ${
                        couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {couponFeedback.text}
                    </div>
                  )}
                </div>

                {/* Items List */}
                {cart.map((item) => {
                  const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedVariant?.id || 'std'}`}
                      className="flex gap-3 p-3 bg-white rounded border border-stone-200 shadow-xs"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded object-cover border border-stone-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{item.product.name}</h4>
                        <div className="text-[11px] text-stone-500">
                          {item.selectedVariant ? item.selectedVariant.name : item.product.volume}
                        </div>
                        
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-extrabold text-sm text-stone-900">
                            ₹{unitPrice.toLocaleString('en-IN')}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-[11px] line-through text-stone-400">
                              ₹{item.product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-stone-300 rounded bg-stone-50">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                            className="text-stone-400 hover:text-red-600 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-stone-500 space-y-2 bg-white rounded p-6">
                <ShoppingCart className="w-12 h-12 mx-auto text-stone-300" />
                <p className="text-sm font-bold text-stone-800">Your ritual cart is empty!</p>
                <p className="text-xs text-stone-400">Explore authentic formulations to revitalize your skin.</p>
              </div>
            )}

          </div>

          {/* Cart Footer Bar with Itemized GST & Charges */}
          {!orderComplete && cart.length > 0 && !isCheckingOut && (
            <div className="p-4 border-t border-stone-200 bg-white space-y-2 text-xs">
              <div className="flex justify-between items-center text-stone-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):</span>
                <span className="font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between items-center text-emerald-800 font-bold">
                  <span>Promo Discount ({appliedCoupon.code}):</span>
                  <span>-₹{discountTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-stone-600">
                <span>Estimated GST (18% included):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center text-stone-600">
                <span>Shipping Delivery:</span>
                <span className={`font-bold ${shippingFee === 0 ? 'text-[#55715c]' : 'text-stone-900'}`}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Payable:</span>
                <span className="text-lg font-black text-[#55715c]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3 bg-[#f59e0b] hover:bg-amber-400 text-stone-950 font-black rounded uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2 bg-[#eef2ee] hover:bg-[#dce6dc] text-[#55715c] font-bold rounded text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Order Desk</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
