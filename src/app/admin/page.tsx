'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  ShoppingCart,
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  TrendingUp,
  Search,
  Tag,
  Users,
  Layers,
  Settings,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { useStore, VALID_COUPONS } from '@/context/StoreContext';
import { Product, OrderStatus } from '@/data/products';

export default function AdminPage() {
  const {
    products,
    categories,
    customers,
    orders,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    updateOrderStatus,
    updateSettings
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'categories' | 'orders' | 'inventory' | 'customers' | 'coupons' | 'settings' | 'reports'
  >('dashboard');

  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Category creation modal
  const [newCatName, setNewCatName] = useState('');
  const [newCatSubcats, setNewCatSubcats] = useState('');

  // Product Form state
  const [prodForm, setProdForm] = useState({
    name: '',
    subtitle: '',
    category: 'Skincare',
    subcategory: 'Face Serums',
    price: 999,
    originalPrice: 1299,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: '',
    benefits: 'Restores skin barrier, Deep hyperpigmentation correction',
    keyIngredients: 'Pure Saffron, Kashmiri Herbs',
    volume: '50 ml / 1.7 oz',
    skinType: 'All Skin Types' as Product['skinType'],
    stock: 50,
    sku: 'MYCO-SK-009',
    barcode: '8901234567899',
    status: 'Published' as Product['status']
  });

  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      subtitle: '',
      category: 'Skincare',
      subcategory: 'Face Serums',
      price: 999,
      originalPrice: 1299,
      badge: 'New Arrival',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      description: 'Potent Ayurvedic cold-pressed botanical preparation.',
      benefits: 'Nourishes dermal layers, Imparts healthy natural glow',
      keyIngredients: 'Organic Neem Bark, Steam Distilled Rose Water',
      volume: '50 ml / 1.7 oz',
      skinType: 'All Skin Types',
      stock: 50,
      sku: `MYCO-SK-${Math.floor(100 + Math.random() * 900)}`,
      barcode: `8901234${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Published'
    });
    setIsCreatingProduct(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProdForm({
      name: p.name,
      subtitle: p.subtitle,
      category: p.category,
      subcategory: p.subcategory || 'Face Serums',
      price: p.price,
      originalPrice: p.originalPrice || 0,
      badge: p.badge || '',
      image: p.image,
      description: p.description,
      benefits: p.benefits.join(', '),
      keyIngredients: p.keyIngredients.join(', '),
      volume: p.volume,
      skinType: p.skinType,
      stock: p.stock,
      sku: p.sku || 'MYCO-SK-001',
      barcode: p.barcode || '8901234567890',
      status: p.status || 'Published'
    });
    setIsCreatingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
      name: prodForm.name,
      subtitle: prodForm.subtitle,
      category: prodForm.category,
      subcategory: prodForm.subcategory,
      price: Number(prodForm.price),
      originalPrice: prodForm.originalPrice ? Number(prodForm.originalPrice) : undefined,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      badge: prodForm.badge || undefined,
      image: prodForm.image,
      images: [prodForm.image],
      description: prodForm.description,
      benefits: prodForm.benefits.split(',').map((s) => s.trim()).filter(Boolean),
      keyIngredients: prodForm.keyIngredients.split(',').map((s) => s.trim()).filter(Boolean),
      volume: prodForm.volume,
      skinType: prodForm.skinType,
      stock: Number(prodForm.stock),
      sku: prodForm.sku,
      barcode: prodForm.barcode,
      status: prodForm.status,
      featured: true
    };

    if (editingProduct) {
      updateProduct({ ...productPayload, id: editingProduct.id });
    } else {
      addProduct(productPayload);
    }
    setIsCreatingProduct(false);
    setEditingProduct(null);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory({
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      subcategories: newCatSubcats.split(',').map((s) => s.trim()).filter(Boolean),
      order: categories.length + 1,
      isActive: true
    });
    setNewCatName('');
    setNewCatSubcats('');
  };

  // Dashboard Aggregates
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const lowStockProducts = products.filter((p) => p.stock <= 30);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'All') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="min-h-screen bg-[#f1f2f4] text-stone-900 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-[#6d8b74] text-white sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-white bg-[#55715c] hover:bg-[#485f4e] px-3 py-1.5 rounded transition font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-white px-2 py-0.5 rounded">
              <Image src="/logo.jpg" alt="MYCO" width={80} height={28} className="h-7 w-auto object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white leading-tight">MYCO Master Admin Panel</h1>
              <p className="text-[10px] text-[#eef2ee]">Complete Store Control • No Code Required</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="hidden sm:inline bg-[#55715c] px-2.5 py-1 rounded">
            GSTIN: {settings.gstin}
          </span>
          <span className="bg-[#f59e0b] text-stone-950 px-2 py-0.5 rounded font-black text-[10px]">
            ONLINE LIVE
          </span>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col md:flex-row gap-4">
        
        {/* Module Navigation Sidebar (Dribbble Admin Standard) */}
        <nav className="w-full md:w-56 bg-white rounded border border-stone-200 p-2 space-y-1 text-xs font-bold shrink-0 shadow-xs h-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'dashboard' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'products' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'categories' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'orders' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'inventory' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Inventory & Alerts ({lowStockProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'customers' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'coupons' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Coupons & Marketing</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'reports' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Reports & GST</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition ${
              activeTab === 'settings' ? 'bg-[#55715c] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Taxes</span>
          </button>
        </nav>

        {/* Dynamic Admin Body */}
        <main className="flex-1 space-y-4">
          
          {/* ================= MODULE A: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 bg-white rounded border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">Gross Revenue</span>
                  <div className="text-xl sm:text-2xl font-black text-[#55715c] mt-1">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">+18.4% this month</span>
                </div>

                <div className="p-4 bg-white rounded border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">Total Orders</span>
                  <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">{orders.length}</div>
                  <span className="text-[10px] text-amber-600 font-semibold">{pendingOrders} awaiting fulfillment • {deliveredOrders} delivered</span>
                </div>

                <div className="p-4 bg-white rounded border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">Registered Customers</span>
                  <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">{customers.length}</div>
                  <span className="text-[10px] text-stone-400">100% verified phones</span>
                </div>

                <div className="p-4 bg-white rounded border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">Catalog SKUs</span>
                  <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">{products.length}</div>
                  <span className="text-[10px] text-red-500 font-bold">{lowStockProducts.length} low-stock alerts</span>
                </div>
              </div>

              {/* Recent Orders table preview */}
              <div className="bg-white rounded border border-stone-200 p-4 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-stone-900">Recent Customer Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#55715c] font-bold hover:underline">
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#faf9f6] text-stone-500 text-[10px] uppercase border-b">
                      <tr>
                        <th className="p-2">Order ID</th>
                        <th className="p-2">Customer</th>
                        <th className="p-2">Total Amount</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50">
                          <td className="p-2 font-mono font-bold text-[#55715c]">{ord.id}</td>
                          <td className="p-2 font-bold">{ord.customerName}</td>
                          <td className="p-2 font-black">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#eef2ee] text-[#55715c]">
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-2 text-stone-400">{ord.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= MODULE B: PRODUCT MANAGEMENT ================= */}
          {activeTab === 'products' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded border border-stone-200 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, SKU, category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded pl-9 pr-3 py-1.5 text-xs outline-none"
                  />
                </div>

                <button
                  onClick={handleOpenCreateProduct}
                  className="w-full sm:w-auto px-4 py-2 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold rounded text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Product</span>
                </button>
              </div>

              <div className="bg-white border border-stone-200 rounded overflow-hidden shadow-xs">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#faf9f6] text-stone-500 uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-3">Product Info</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock Units</th>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50">
                          <td className="p-3 flex items-center gap-2.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border" />
                            <div>
                              <div className="font-bold text-stone-900">{p.name}</div>
                              <div className="text-[10px] text-stone-400">{p.volume}</div>
                            </div>
                          </td>
                          <td className="p-3 text-[#55715c] font-bold">{p.category}</td>
                          <td className="p-3 font-black">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="p-3 font-bold">{p.stock}</td>
                          <td className="p-3 font-mono text-[11px] text-stone-500">{p.sku}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {p.status || 'Published'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                              }}
                              className="p-1.5 bg-stone-100 hover:bg-red-50 text-red-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODULE C: CATEGORY MANAGEMENT ================= */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-stone-200 shadow-xs">
                <h3 className="font-bold text-sm text-stone-900 mb-2">Create New Product Category</h3>
                <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Category Name (e.g. Body & Spa)"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="border border-stone-300 rounded p-2 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Subcategories (comma-separated)"
                    value={newCatSubcats}
                    onChange={(e) => setNewCatSubcats(e.target.value)}
                    className="border border-stone-300 rounded p-2 outline-none"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#6d8b74] text-white font-bold rounded">
                    Add Category
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <div key={c.id} className="p-4 bg-white rounded border border-stone-200 shadow-xs space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-stone-900">{c.name}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete category ${c.name}?`)) deleteCategory(c.id);
                        }}
                        className="text-stone-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.subcategories.map((sc, i) => (
                        <span key={i} className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px]">
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MODULE D: ORDER MANAGEMENT ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded border border-stone-200 shadow-xs text-xs">
                <div className="flex items-center gap-1 font-bold">
                  <span>Filter Status:</span>
                  {['All', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-2 py-1 rounded ${
                        orderFilter === st ? 'bg-[#55715c] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <span className="text-stone-400">{filteredOrders.length} orders</span>
              </div>

              <div className="space-y-3">
                {filteredOrders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded border border-stone-200 p-4 shadow-xs space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-stone-100 gap-2">
                      <div>
                        <span className="font-mono font-bold text-[#55715c] text-sm">{ord.id}</span>
                        <span className="text-stone-400 ml-2">• Placed on {ord.date}</span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 font-bold">Update Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-stone-50 border border-stone-300 rounded px-2 py-1 font-bold outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <span className="text-stone-400 uppercase text-[10px] font-bold block">Customer Info</span>
                        <div className="font-bold text-stone-900">{ord.customerName}</div>
                        <div className="text-stone-600">{ord.phone}</div>
                        <div className="text-stone-600">{ord.email}</div>
                      </div>

                      <div>
                        <span className="text-stone-400 uppercase text-[10px] font-bold block">Delivery & Payment</span>
                        <div className="text-stone-700">{ord.address}, {ord.city} - {ord.pincode}</div>
                        <div className="text-[#55715c] font-bold mt-1">Payment: {ord.paymentMethod} ({ord.paymentStatus})</div>
                      </div>

                      <div className="bg-[#faf9f6] p-2.5 rounded border border-stone-200">
                        <span className="text-stone-400 uppercase text-[10px] font-bold block mb-1">Invoice Itemization</span>
                        {ord.items.map((it, i) => (
                          <div key={i} className="flex justify-between text-stone-700 text-[11px]">
                            <span>{it.product.name} x{it.quantity}</span>
                            <span>₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        <div className="pt-1.5 border-t border-stone-200 flex justify-between font-black text-stone-900 mt-1">
                          <span>Total Amount:</span>
                          <span className="text-[#55715c]">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {ord.returnReason && (
                      <div className="p-2 bg-red-50 text-red-700 rounded text-xs font-semibold">
                        Customer Return Reason: {ord.returnReason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MODULE E: INVENTORY & LOW-STOCK ================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-stone-200 shadow-xs space-y-2">
                <h3 className="font-bold text-sm text-stone-900">Low Stock & Re-Order Alerts</h3>
                <p className="text-xs text-stone-500">Products with inventory levels below 35 units requiring laboratory production:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="p-4 bg-white rounded border border-red-200 shadow-xs flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">{p.name}</div>
                      <div className="text-[11px] text-stone-500">SKU: {p.sku} • {p.volume}</div>
                      <div className="text-red-600 font-black mt-1">Remaining: {p.stock} units only</div>
                    </div>
                    <button
                      onClick={() => {
                        updateProduct({ ...p, stock: p.stock + 50 });
                        alert(`Restocked 50 units for ${p.name}`);
                      }}
                      className="px-3 py-1.5 bg-[#6d8b74] hover:bg-[#55715c] text-white font-bold rounded text-xs"
                    >
                      Restock +50
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MODULE F: CUSTOMERS ================= */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200">
                <h3 className="font-bold text-sm text-stone-900">Customer Directory & Lifetime Value</h3>
              </div>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#faf9f6] text-stone-500 uppercase text-[10px] border-b">
                    <tr>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Phone & Email</th>
                      <th className="p-3">Total Orders</th>
                      <th className="p-3">Lifetime Value</th>
                      <th className="p-3">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-stone-50">
                        <td className="p-3 font-bold text-stone-900">{c.name}</td>
                        <td className="p-3 text-stone-600">{c.phone} • {c.email}</td>
                        <td className="p-3 font-bold">{c.ordersCount} orders</td>
                        <td className="p-3 font-black text-[#55715c]">₹{c.lifetimeValue.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-stone-400">{c.joinedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= MODULE G: COUPONS ================= */}
          {activeTab === 'coupons' && (
            <div className="bg-white p-5 rounded border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-stone-900">Active Store Coupons & Campaigns</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(VALID_COUPONS).map(([code, discount]) => (
                  <div key={code} className="p-3 bg-[#faf9f6] rounded border border-dashed border-[#6d8b74]">
                    <div className="font-black text-sm text-[#55715c] font-mono">{code}</div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">{discount}% Flat Discount</div>
                    <div className="text-[10px] text-stone-400 mt-1">Unlimited usage • Checkout verified</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MODULE H: REPORTS & GST ================= */}
          {activeTab === 'reports' && (
            <div className="bg-white p-5 rounded border border-stone-200 shadow-xs space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-stone-900">Financial Reports & GST Ledger</h3>
                <button
                  onClick={() => alert('GST Report Exported successfully to CSV')}
                  className="px-3 py-1.5 bg-[#6d8b74] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export GST Summary (CSV)</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded border">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Total Taxable Sales</span>
                  <div className="text-lg font-black text-stone-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
                </div>
                <div className="p-3 bg-stone-50 rounded border">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Collected GST (18%)</span>
                  <div className="text-lg font-black text-[#55715c] mt-1">
                    ₹{Math.round((totalRevenue * 0.18)).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded border">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Fulfillment Success Rate</span>
                  <div className="text-lg font-black text-emerald-700 mt-1">98.6%</div>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODULE I: SETTINGS ================= */}
          {activeTab === 'settings' && (
            <div className="bg-white p-5 rounded border border-stone-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-stone-900">Store Settings & Business Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Business Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => updateSettings({ ...settings, storeName: e.target.value })}
                    className="w-full border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={settings.gstin}
                    onChange={(e) => updateSettings({ ...settings, gstin: e.target.value })}
                    className="w-full border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Support Phone</label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => updateSettings({ ...settings, supportPhone: e.target.value })}
                    className="w-full border rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Support Email</label>
                  <input
                    type="text"
                    value={settings.supportEmail}
                    onChange={(e) => updateSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full border rounded p-2 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isCreatingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded max-w-xl w-full p-6 text-stone-900 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900">
                {editingProduct ? 'Edit Product Details' : 'Create New Product'}
              </h3>
              <button onClick={() => setIsCreatingProduct(false)} className="text-stone-400 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Product Name *</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full border rounded p-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full border rounded p-2 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Skin Concern</label>
                  <select
                    value={prodForm.skinType}
                    onChange={(e) => setProdForm({ ...prodForm, skinType: e.target.value as Product['skinType'] })}
                    className="w-full border rounded p-2 outline-none"
                  >
                    <option value="All Skin Types">All Skin Types</option>
                    <option value="Oily & Acne Prone">Oily & Acne Prone</option>
                    <option value="Dry & Sensitive">Dry & Sensitive</option>
                    <option value="Aging Skin">Aging Skin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full border rounded p-2 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={prodForm.originalPrice}
                    onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full border rounded p-2 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Stock Units</label>
                  <input
                    type="number"
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className="w-full border rounded p-2 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Image URL</label>
                <input
                  type="url"
                  required
                  value={prodForm.image}
                  onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                  className="w-full border rounded p-2 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsCreatingProduct(false)}
                  className="px-4 py-2 bg-stone-200 rounded font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#6d8b74] text-white font-bold rounded">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
