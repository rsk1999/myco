'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Product,
  CartItem,
  Order,
  Review,
  CategoryItem,
  Customer,
  StoreSettings,
  OrderStatus,
  ProductVariant,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_CATEGORIES,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS
} from '../data/products';

interface StoreContextType {
  products: Product[];
  categories: CategoryItem[];
  customers: Customer[];
  orders: Order[];
  reviews: Review[];
  settings: StoreSettings;
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  selectedProduct: Product | null;
  searchQuery: string;
  selectedCategory: string;
  selectedSkinType: string;
  appliedCoupon: { code: string; discountPercent: number } | null;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Product Detail Modal
  setSelectedProduct: (product: Product | null) => void;

  // Filtering
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedSkinType: (skinType: string) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Reviews
  addReview: (productId: string, author: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Admin & Store Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  addCategory: (category: Omit<CategoryItem, 'id'>) => void;
  updateCategory: (category: CategoryItem) => void;
  deleteCategory: (id: string) => void;

  createOrder: (orderData: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    paymentMethod: 'COD' | 'Online UPI / Card' | 'WhatsApp Invoiced';
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  requestOrderReturn: (orderId: string, reason: string) => void;

  updateSettings: (newSettings: StoreSettings) => void;

  // Computed Values for Cart & Checkout
  cartSubtotal: number;
  discountTotal: number;
  shippingFee: number;
  gstAmount: number;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_KEY = 'myco_products_v3';
const CATEGORIES_KEY = 'myco_categories_v3';
const CUSTOMERS_KEY = 'myco_customers_v3';
const ORDERS_KEY = 'myco_orders_v3';
const SETTINGS_KEY = 'myco_settings_v3';
const CART_KEY = 'myco_cart_v3';
const WISHLIST_KEY = 'myco_wishlist_v3';
const REVIEWS_KEY = 'myco_reviews_v3';

export const VALID_COUPONS: Record<string, number> = {
  'FESTIVE20': 20,
  'MYCO10': 10,
  'FIRST15': 15,
  'AYURVEDA25': 25
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(PRODUCTS_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CATEGORIES_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CUSTOMERS_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CUSTOMERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ORDERS_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(REVIEWS_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_REVIEWS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SETTINGS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CART_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkinType, setSelectedSkinType] = useState('All');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(updated);
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const match = cart.find(
      (item) => item.product.id === product.id && item.selectedVariant?.id === variant?.id
    );
    let newCart: CartItem[];
    if (match) {
      newCart = cart.map((item) =>
        item.product.id === product.id && item.selectedVariant?.id === variant?.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity, selectedVariant: variant }];
    }
    saveCart(newCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    const newCart = cart.filter(
      (item) => !(item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId))
    );
    saveCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    const newCart = cart.map((item) =>
      item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)
        ? { ...item, quantity }
        : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (VALID_COUPONS[upper]) {
      setAppliedCoupon({ code: upper, discountPercent: VALID_COUPONS[upper] });
      return { success: true, message: `Promo code ${upper} applied! (${VALID_COUPONS[upper]}% Off)` };
    }
    return { success: false, message: 'Invalid promo code. Try "FESTIVE20" or "MYCO10"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addReview = (productId: string, author: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author,
      rating,
      date: 'Just now',
      comment,
      verified: true
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
  };

  const getProductReviews = (productId: string) => reviews.filter((r) => r.productId === productId);

  // Admin Products
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newP: Product = { ...p, id: `myco-${Date.now()}` };
    const updated = [newP, ...products];
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  };

  const updateProduct = (p: Product) => {
    const updated = products.map((item) => (item.id === p.id ? p : item));
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  };

  // Admin Categories
  const addCategory = (c: Omit<CategoryItem, 'id'>) => {
    const newC: CategoryItem = { ...c, id: `cat-${Date.now()}` };
    const updated = [...categories, newC];
    setCategories(updated);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
  };

  const updateCategory = (c: CategoryItem) => {
    const updated = categories.map((cat) => (cat.id === c.id ? c : cat));
    setCategories(updated);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
  };

  // Orders
  const createOrder = (orderData: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    paymentMethod: 'COD' | 'Online UPI / Card' | 'WhatsApp Invoiced';
    notes?: string;
  }): Order => {
    const sub = cart.reduce((sum, item) => {
      const p = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      return sum + p * item.quantity;
    }, 0);
    const disc = appliedCoupon ? Math.round((sub * appliedCoupon.discountPercent) / 100) : 0;
    const ship = sub >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee;
    const gst = Math.round(((sub - disc) * settings.gstRatePercent) / 100);
    const total = sub - disc + ship;

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      pincode: orderData.pincode,
      state: orderData.state,
      items: cart,
      subtotal: sub,
      shippingCharges: ship,
      gstAmount: gst,
      discountAmount: disc,
      couponCode: appliedCoupon?.code,
      totalAmount: total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      status: 'Confirmed',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      trackingId: `MYCO-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      courierPartner: 'Delhivery Express',
      notes: orderData.notes,
      timeline: [
        {
          status: 'Confirmed',
          timestamp: new Date().toLocaleString('en-IN'),
          note: `Order placed via ${orderData.paymentMethod}`
        }
      ]
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

    // Update customer stats
    const existingCust = customers.find((c) => c.phone === orderData.phone || c.email === orderData.email);
    let newCustList: Customer[];
    if (existingCust) {
      newCustList = customers.map((c) =>
        c.id === existingCust.id
          ? { ...c, ordersCount: c.ordersCount + 1, lifetimeValue: c.lifetimeValue + total }
          : c
      );
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: orderData.customerName,
        phone: orderData.phone,
        email: orderData.email,
        addresses: [
          {
            id: `addr-${Date.now()}`,
            label: 'Primary',
            address: orderData.address,
            city: orderData.city,
            pincode: orderData.pincode,
            state: orderData.state,
            isDefault: true
          }
        ],
        ordersCount: 1,
        lifetimeValue: total,
        joinedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        isBlocked: false
      };
      newCustList = [newCust, ...customers];
    }
    setCustomers(newCustList);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(newCustList));

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          timeline: [
            ...o.timeline,
            {
              status,
              timestamp: new Date().toLocaleString('en-IN'),
              note: note || `Order updated to ${status}`
            }
          ]
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  const requestOrderReturn = (orderId: string, reason: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Returned' as OrderStatus,
          returnReason: reason,
          timeline: [
            ...o.timeline,
            {
              status: 'Returned' as OrderStatus,
              timestamp: new Date().toLocaleString('en-IN'),
              note: `Return requested: ${reason}`
            }
          ]
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  const updateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  // Computations
  const cartSubtotal = cart.reduce((sum, item) => {
    const p = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return sum + p * item.quantity;
  }, 0);
  const discountTotal = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100) : 0;
  const shippingFee = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0 ? 0 : settings.standardShippingFee;
  const gstAmount = Math.round(((cartSubtotal - discountTotal) * settings.gstRatePercent) / 100);
  const cartTotal = Math.max(0, cartSubtotal - discountTotal + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        customers,
        orders,
        reviews,
        settings,
        cart,
        wishlist,
        isCartOpen,
        selectedProduct,
        searchQuery,
        selectedCategory,
        selectedSkinType,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setIsCartOpen,
        toggleWishlist,
        isInWishlist,
        setSelectedProduct,
        setSearchQuery,
        setSelectedCategory,
        setSelectedSkinType,
        applyCoupon,
        removeCoupon,
        addReview,
        getProductReviews,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        createOrder,
        updateOrderStatus,
        requestOrderReturn,
        updateSettings,
        cartSubtotal,
        discountTotal,
        shippingFee,
        gstAmount,
        cartTotal,
        cartCount,
        wishlistCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
