export interface ProductVariant {
  id: string;
  name: string; // e.g. "30 ml", "50 ml", "100 ml"
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  images: string[];
  description: string;
  benefits: string[];
  keyIngredients: string[];
  volume: string;
  skinType: 'All Skin Types' | 'Oily & Acne Prone' | 'Dry & Sensitive' | 'Aging Skin';
  stock: number;
  sku: string;
  barcode?: string;
  featured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  status: 'Published' | 'Draft';
  variants?: ProductVariant[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  items: CartItem[];
  subtotal: number;
  shippingCharges: number;
  gstAmount: number; // 18% standard cosmetic GST
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: 'COD' | 'Online UPI / Card' | 'WhatsApp Invoiced';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  status: OrderStatus;
  date: string;
  trackingId?: string;
  courierPartner?: string;
  timeline: OrderTimeline[];
  notes?: string;
  returnReason?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  bannerImage: string;
  subcategories: string[];
  order: number;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: {
    id: string;
    label: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    isDefault: boolean;
  }[];
  ordersCount: number;
  lifetimeValue: number;
  joinedDate: string;
  isBlocked: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  usageCount: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  gstin: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  gstRatePercent: number;
  currency: string;
  codEnabled: boolean;
  upiEnabled: boolean;
}

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-skincare',
    name: 'Skincare',
    slug: 'skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Face Serums', 'Face Cleansers', 'Night Crèmes', 'Clay Mud Masks'],
    order: 1,
    isActive: true
  },
  {
    id: 'cat-haircare',
    name: 'Haircare',
    slug: 'haircare',
    image: 'https://images.unsplash.com/photo-1608248597359-573e86c071d0?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1608248597359-573e86c071d0?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Scalp Oils', 'Herbal Cleansers', 'Root Tonics'],
    order: 2,
    isActive: true
  },
  {
    id: 'cat-wellness',
    name: 'Wellness & Teas',
    slug: 'wellness-teas',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['Adaptogenic Teas', 'Detox Blends', 'Ayurvedic Churnas'],
    order: 3,
    isActive: true
  },
  {
    id: 'cat-body',
    name: 'Body & Oils',
    slug: 'body-oils',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
    subcategories: ['De-Tan Body Oils', 'Exfoliating Polishes', 'Body Butters'],
    order: 4,
    isActive: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'myco-serum-01',
    name: 'Kumkumadi Radiance Miracle Elixir',
    subtitle: 'Infused with Pure Saffron & 24K Botanical Herbs',
    category: 'Skincare',
    subcategory: 'Face Serums',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 128,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-573e86c071d0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An ancient Ayurvedic miracle formulation processed over 21 days with pure Kashmiri Saffron, Sandalwood, and Lotus extracts. Visibly brightens dull complexion, fades hyperpigmentation, and imparts a natural golden luminescence.',
    benefits: ['Boosts skin elasticity & collagen', 'Deep hyperpigmentation correction', 'Intense cellular nourishment', 'Non-comedogenic golden finish'],
    keyIngredients: ['Kashmiri Saffron (Crocus Sativus)', 'Wild Red Sandalwood', 'Blue Lotus Extract', 'Pure Goat Milk Infusion'],
    volume: '30 ml / 1.0 fl oz',
    skinType: 'All Skin Types',
    stock: 45,
    sku: 'MYCO-SK-001',
    barcode: '8901234567890',
    featured: true,
    isBestSeller: true,
    status: 'Published',
    variants: [
      { id: 'v1', name: '30 ml (Standard)', price: 1499, originalPrice: 1999, stock: 35, sku: 'MYCO-SK-001-30' },
      { id: 'v2', name: '50 ml (Luxe Ritual)', price: 2199, originalPrice: 2899, stock: 10, sku: 'MYCO-SK-001-50' }
    ]
  },
  {
    id: 'myco-cleanse-02',
    name: 'Neem & Tulsi Purifying Gel Cleanser',
    subtitle: 'Clarifying Deep-Pore Botanic Face Wash',
    category: 'Skincare',
    subcategory: 'Face Cleansers',
    price: 649,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 94,
    badge: 'Acne Control',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567928815116-f6d0774b74e6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A sulfate-free organic clarifying wash with wild harvested Neem bark and Holy Basil (Tulsi). Effectively dissolves excess sebum and environmental pollutants without stripping vital barrier moisture.',
    benefits: ['Clear persistent breakouts & blemishes', 'Calms active redness and irritation', 'Maintains 5.5 natural skin pH balance', 'Free from parabens, SLS, & synthetic fragrances'],
    keyIngredients: ['Organic Neem Bark', 'Steam-distilled Holy Tulsi', 'Aloe Barbadensis Leaf Juice', 'Tea Tree Leaf Oil'],
    volume: '150 ml / 5.1 fl oz',
    skinType: 'Oily & Acne Prone',
    stock: 60,
    sku: 'MYCO-SK-002',
    barcode: '8901234567891',
    featured: true,
    isNewArrival: false,
    status: 'Published'
  },
  {
    id: 'myco-cream-03',
    name: 'Shatadhouta Ghrita Luxe Night Crème',
    subtitle: '100x Water-Washed A2 Ghee Botanical Infusion',
    category: 'Skincare',
    subcategory: 'Night Crèmes',
    price: 1899,
    originalPrice: 2499,
    rating: 5.0,
    reviewCount: 82,
    badge: 'Royal Ayurvedic',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Created through a sacred Vedic ritual of whipping pure organic A2 cow ghee 100 times in a consecrated copper vessel with pure copper water. Ultra-cooling, silky, and sinks instantly into seven dermal layers.',
    benefits: ['Restores compromised skin barrier', 'Supreme overnight cellular repair', 'Reduces fine lines and oxidative aging', 'Cooling relief for rosacea and eczema-prone skin'],
    keyIngredients: ['100-times Washed A2 Ghee', 'Vetiver (Khus) Extract', 'Rose Water (Gulab Jal)', 'Licorice Root'],
    volume: '50 g / 1.7 oz',
    skinType: 'Dry & Sensitive',
    stock: 28,
    sku: 'MYCO-SK-003',
    barcode: '8901234567892',
    featured: true,
    isBestSeller: true,
    status: 'Published'
  },
  {
    id: 'myco-hair-04',
    name: 'Bhringraj & Rosemary Scalp Revitalizer',
    subtitle: 'Cold-Pressed Root Energizing Herbal Oil',
    category: 'Haircare',
    subcategory: 'Scalp Oils',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 156,
    badge: 'Hair Regrowth',
    image: 'https://images.unsplash.com/photo-1608248597359-573e86c071d0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597359-573e86c071d0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Potent hair-growth elixir slow-cooked with fresh Bhringraj, Brahmi, Amla, and French Rosemary essence in organic Sesame and Coconut oils. Awaken dormant follicles and prevent premature greying.',
    benefits: ['Dramatically halts hair fall', 'Stimulates dense new baby hair growth', 'Eliminates stubborn dandruff & dry scalp itch', 'Deep root strengthening'],
    keyIngredients: ['Keshraj Bhringraj (False Daisy)', 'Rosemary Leaf Extract', 'Indian Gooseberry (Amla)', 'Virgin Black Seed (Kalonji) Oil'],
    volume: '100 ml / 3.4 fl oz',
    skinType: 'All Skin Types',
    stock: 80,
    sku: 'MYCO-HC-001',
    barcode: '8901234567893',
    featured: true,
    status: 'Published'
  },
  {
    id: 'myco-tea-05',
    name: 'Ashwagandha Gold Serenity Herbal Infusion',
    subtitle: 'KSM-66 Adaptogenic Stress Relief & Glow Tea',
    category: 'Wellness & Teas',
    subcategory: 'Adaptogenic Teas',
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 67,
    badge: 'Vitality Blend',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A deeply restorative whole-herb tisane uniting organic Ashwagandha root, Chamomile blossoms, Cardamom, and antioxidant-rich Moringa. Cultivates inner equilibrium that shines outwardly as radiant skin.',
    benefits: ['Lowers stress hormone (cortisol)', 'Promotes restorative deep sleep cycles', 'Boosts cellular immunity & skin glow', 'Caffeine-free organic blend'],
    keyIngredients: ['Organic Ashwagandha (KSM-66)', 'Chamomile Petals', 'Green Cardamom Pods', 'Moringa Oleifera Leaf'],
    volume: '100 g / 3.5 oz (50 Cups)',
    skinType: 'All Skin Types',
    stock: 35,
    sku: 'MYCO-WN-001',
    barcode: '8901234567894',
    featured: false,
    isNewArrival: true,
    status: 'Published'
  },
  {
    id: 'myco-body-06',
    name: 'Wild Turmeric & Bakuchiol Body Glow Polish',
    subtitle: 'Gentle Exfoliating Butter with Natural Retinol Alternative',
    category: 'Body & Oils',
    subcategory: 'Exfoliating Polishes',
    price: 1099,
    originalPrice: 1399,
    rating: 4.7,
    reviewCount: 49,
    badge: 'Skin Smoothing',
    image: 'https://images.unsplash.com/photo-1556228722-d0b5d92ceec8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228722-d0b5d92ceec8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Rich foaming body polish enriched with Kasturi Manjal (Wild Curcuma), gentle walnut microspheres, and Plant-derived Bakuchiol. Smooths strawberry skin, elbows, and uneven hyperpigmented body patches.',
    benefits: ['Buffs away stubborn keratosis pilaris', 'Brightens dark knees, elbows & neck', 'Infuses lasting 48-hour hydration', 'Non-staining golden glow formula'],
    keyIngredients: ['Kasturi Manjal (Wild Turmeric)', 'Bakuchiol (Natural Retinol)', 'Raw Shea Butter', 'Sweet Almond Oil'],
    volume: '200 g / 7.0 oz',
    skinType: 'All Skin Types',
    stock: 52,
    sku: 'MYCO-BO-001',
    barcode: '8901234567895',
    featured: false,
    status: 'Published'
  },
  {
    id: 'myco-mask-07',
    name: 'Sandalwood & Multani Clay Clarifying Mud Mask',
    subtitle: 'Detoxifying Vedic Facial Clay with Rose Hydrosol',
    category: 'Skincare',
    subcategory: 'Clay Mud Masks',
    price: 749,
    originalPrice: 949,
    rating: 4.8,
    reviewCount: 71,
    badge: 'Detox Ritual',
    image: 'https://images.unsplash.com/photo-1567928815116-f6d0774b74e6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1567928815116-f6d0774b74e6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ancient Ayurvedic therapeutic mud enriched with Pure Mysore Sandalwood powder and fuller’s earth. Purges deep clogged pores, tightens texture, and leaves facial contours refreshed and firm.',
    benefits: ['Instant tightening of open pores', 'Absorbs deep cellular toxins', 'Even skin tone & matte luminescence', 'Non-drying gentle botanical formulation'],
    keyIngredients: ['Pure Mysore Sandalwood', 'Multani Mitti (Fuller Earth)', 'Steam Damask Rose Water', 'Turmeric Rhizome'],
    volume: '100 g / 3.5 oz',
    skinType: 'Oily & Acne Prone',
    stock: 40,
    sku: 'MYCO-SK-004',
    barcode: '8901234567896',
    featured: true,
    status: 'Published'
  },
  {
    id: 'myco-oil-08',
    name: 'Nalpamaradi Golden Radiance Body Oil',
    subtitle: 'Traditional Bridal De-Tan & Skin Brightening Therapy',
    category: 'Body & Oils',
    subcategory: 'De-Tan Body Oils',
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 110,
    badge: 'De-Tan Luxury',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Prescribed in ancient texts of Sahasrayogam. Processed with the bark of 4 sacred Ficus trees (Nalpamara) and organic turmeric. Celebrated as the ultimate bridal glow ritual to reverse sun tanning and uneven body tones.',
    benefits: ['Reverses stubborn sun tan & sun spots', 'Evens complex skin discoloration', 'Intense botanical nourishment', 'Leaves skin silky and luminescent'],
    keyIngredients: ['Four Sacred Ficus Barks', 'Raw Turmeric (Haridra)', 'Sesame Seed Oil', 'Indian Gooseberry (Amla)'],
    volume: '200 ml / 6.7 fl oz',
    skinType: 'All Skin Types',
    stock: 33,
    sku: 'MYCO-BO-002',
    barcode: '8901234567897',
    featured: true,
    isBestSeller: true,
    status: 'Published'
  }
];

export const CATEGORIES = ['All', 'Skincare', 'Haircare', 'Wellness & Teas', 'Body & Oils'] as const;

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'myco-serum-01',
    author: 'Pooja Bhatt',
    rating: 5,
    date: '14 Nov 2026',
    comment: 'Within 2 weeks my stubborn dark spots around cheeks have lightened remarkably. Non-sticky, smells divine like fresh saffron!',
    verified: true
  },
  {
    id: 'rev-02',
    productId: 'myco-serum-01',
    author: 'Dr. Sameer Khan',
    rating: 5,
    date: '02 Nov 2026',
    comment: 'Clinical level botanical concentration. Sinks in immediately without clogging pores. Worth every rupee.',
    verified: true
  },
  {
    id: 'rev-03',
    productId: 'myco-cleanse-02',
    author: 'Aarti Menon',
    rating: 5,
    date: '10 Nov 2026',
    comment: 'Leaves my combination oily skin clean without stripping moisture. The natural holy tulsi scent is invigorating.',
    verified: true
  },
  {
    id: 'rev-04',
    productId: 'myco-cream-03',
    author: 'Kavita Verma',
    rating: 5,
    date: '08 Nov 2026',
    comment: 'The 100x washed ghee crème is sheer magic on winter dry skin. My skin woke up glowing and plump like baby skin.',
    verified: true
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    addresses: [
      {
        id: 'addr-1',
        label: 'Home',
        address: 'Villa 14, Palm Grove, Bandra West',
        city: 'Mumbai',
        pincode: '400050',
        state: 'Maharashtra',
        isDefault: true
      }
    ],
    ordersCount: 3,
    lifetimeValue: 4897,
    joinedDate: '12 Sep 2026',
    isBlocked: false
  },
  {
    id: 'cust-102',
    name: 'Rohit Deshmukh',
    email: 'rohit@example.com',
    phone: '+91 98220 11223',
    addresses: [
      {
        id: 'addr-2',
        label: 'Apartment',
        address: 'Flat 402, Green Meadows, Koregaon Park',
        city: 'Pune',
        pincode: '411001',
        state: 'Maharashtra',
        isDefault: true
      }
    ],
    ordersCount: 2,
    lifetimeValue: 2798,
    joinedDate: '01 Oct 2026',
    isBlocked: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-7821',
    customerName: 'Ananya Sharma',
    phone: '+91 98765 43210',
    email: 'ananya@example.com',
    address: 'Villa 14, Palm Grove, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    state: 'Maharashtra',
    items: [{ product: INITIAL_PRODUCTS[0], quantity: 1 }],
    subtotal: 1499,
    shippingCharges: 0,
    gstAmount: 228,
    discountAmount: 0,
    totalAmount: 1499,
    paymentMethod: 'Online UPI / Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '16 Nov 2026',
    trackingId: 'DLV-882910',
    courierPartner: 'Delhivery Express',
    timeline: [
      { status: 'Confirmed', timestamp: '16 Nov 2026, 10:30 AM', note: 'Order paid via UPI' },
      { status: 'Packed', timestamp: '16 Nov 2026, 02:15 PM', note: 'Handcrafted small-batch verified' },
      { status: 'Shipped', timestamp: '17 Nov 2026, 09:00 AM', note: 'Dispatched via Delhivery Express' },
      { status: 'Delivered', timestamp: '18 Nov 2026, 03:45 PM', note: 'Delivered to recipient with OTP confirmation' }
    ]
  },
  {
    id: 'ORD-8942',
    customerName: 'Rohit Deshmukh',
    phone: '+91 98220 11223',
    email: 'rohit@example.com',
    address: 'Flat 402, Green Meadows, Koregaon Park',
    city: 'Pune',
    pincode: '411001',
    state: 'Maharashtra',
    items: [
      { product: INITIAL_PRODUCTS[1], quantity: 2 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 }
    ],
    subtotal: 2197,
    shippingCharges: 0,
    gstAmount: 335,
    discountAmount: 219,
    couponCode: 'MYCO10',
    totalAmount: 1978,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    status: 'Shipped',
    date: '17 Nov 2026',
    trackingId: 'BART-994102',
    courierPartner: 'Bluedart Air',
    timeline: [
      { status: 'Confirmed', timestamp: '17 Nov 2026, 11:15 AM', note: 'COD order confirmed via phone' },
      { status: 'Packed', timestamp: '17 Nov 2026, 04:30 PM', note: 'Consignment packed with security seal' },
      { status: 'Shipped', timestamp: '18 Nov 2026, 10:00 AM', note: 'In transit to Pune hub' }
    ]
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'MYCO',
  tagline: 'Ancient Botanical & Ayurvedic Skincare Luxury',
  supportPhone: '+91 98765 43210',
  supportEmail: 'care@mycobotanicals.com',
  address: 'MYCO Botanical Labs & Distributorship, Mumbai / New Delhi, India',
  gstin: '27AABCM9876M1Z5',
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  gstRatePercent: 18,
  currency: 'INR (₹)',
  codEnabled: true,
  upiEnabled: true
};
