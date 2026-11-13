"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, MessageSquare, Download, Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import WhatsAppModal from "@/components/WhatsAppModal";
import { PRODUCTS, CATEGORIES, FINISHES, Product } from "@/data/products";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "All Collections";
  const initialFilter = searchParams.get("filter") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFinish, setSelectedFinish] = useState("All Finishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== "All Collections" && item.category !== selectedCategory) {
        return false;
      }
      // Finish filter
      if (
        selectedFinish !== "All Finishes" &&
        !item.finish.some((f) => f.toLowerCase() === selectedFinish.toLowerCase())
      ) {
        return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }
      // New filter
      if (initialFilter === "new" && !item.isNewArrival) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") {
        return a.rawPrice - b.rawPrice;
      }
      if (sortBy === "price-high") {
        return b.rawPrice - a.rawPrice;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0; // default featured
    });
  }, [selectedCategory, selectedFinish, searchQuery, sortBy, initialFilter]);

  return (
    <div className="min-h-screen bg-[#F6F2EA] pb-24 no-horizontal-overflow font-body">
      {/* Top Breadcrumb & Metadata Banner */}
      <div className="bg-[#EFE8DC] border-b border-brand-border/60 py-2.5 sm:py-3 text-xs text-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center space-x-2 truncate">
            <Link href="/" className="hover:text-brand-dark transition-colors font-medium">
              Home
            </Link>
            <span>&bull;</span>
            <span className="text-brand-dark font-bold">Export Catalogue</span>
            {selectedCategory !== "All Collections" && (
              <>
                <span>&bull;</span>
                <span className="text-brand-accent font-semibold truncate">{selectedCategory}</span>
              </>
            )}
          </div>
          <div className="text-[11px] font-number tracking-wider uppercase text-brand-dark font-semibold">
            Global Rise Exports &bull; Moradabad Foundry Dossier
          </div>
        </div>
      </div>

      {/* Catalogue Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6">
        <div className="max-w-3xl">
          <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-2">
            Archival Masterworks &bull; Vol. IV
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl text-brand-dark font-extrabold tracking-tight">
            Export Collections &amp; Brass Catalogue
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
            Carefully curated handcrafted brass artifacts, decorative bowls, sculptural vessels, and traditional Indian metalwork priced in Indian Rupees (₹ INR) for wholesale, interior projects, and international maritime trade.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-number text-brand-secondary">
            <span className="px-2.5 py-1 bg-white border border-brand-border/60 font-medium">
              100% Solid Virgin Brass (CuZn40)
            </span>
            <span className="px-2.5 py-1 bg-white border border-brand-border/60 font-medium">
              FOB Nhava Sheva (JNPT) Mumbai
            </span>
            <span className="px-2.5 py-1 bg-white border border-brand-border/60 font-medium">
              Custom OEM Architectural Scaling
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-[#FFFFFF] p-4 sm:p-6 border border-brand-border shadow-subtle space-y-4 sm:space-y-6">
          {/* Category Tabs */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brand-secondary font-bold block mb-2.5">
              Filter by Collection
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs uppercase tracking-wider font-heading transition-all flex-shrink-0 active:scale-95 ${
                    selectedCategory === cat
                      ? "bg-brand-dark text-white font-bold shadow-sm"
                      : "bg-bg-secondary text-brand-secondary hover:text-brand-dark hover:bg-brand-border/60 font-semibold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search, Finishes & Sort Controls */}
          <div className="pt-3 sm:pt-4 border-t border-brand-border/60 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-brand-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by SKU, brass finish, product title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none font-body"
              />
            </div>

            {/* Finish Dropdown */}
            <div className="md:col-span-4 flex items-center space-x-2">
              <span className="text-[11px] text-brand-secondary uppercase tracking-wider flex-shrink-0 font-bold">
                Finish:
              </span>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none font-body"
              >
                {FINISHES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 flex items-center space-x-2">
              <span className="text-[11px] text-brand-secondary uppercase tracking-wider flex-shrink-0 font-bold">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none font-body"
              >
                <option value="featured">Featured Curation</option>
                <option value="price-low">Price: Low to High (₹)</option>
                <option value="price-high">Price: High to Low (₹)</option>
                <option value="name">Product Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-brand-secondary pt-2 border-t border-brand-border/40 font-number">
            <span>
              Showing <strong className="text-brand-dark">{filteredProducts.length}</strong> export masterpieces in Indian Rupees (₹)
            </span>
            {(selectedCategory !== "All Collections" ||
              selectedFinish !== "All Finishes" ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All Collections");
                  setSelectedFinish("All Finishes");
                  setSearchQuery("");
                }}
                className="text-xs text-brand-accent underline hover:text-brand-dark font-bold font-body"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFFFF] p-12 sm:p-16 text-center border border-brand-border">
            <h3 className="font-heading text-xl sm:text-2xl text-brand-dark font-bold">
              No matching export items found
            </h3>
            <p className="text-xs text-brand-secondary mt-2 max-w-md mx-auto font-body">
              Please try adjusting your category or finish selection, or contact our foundry export desk directly for custom sand-casting specifications.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Collections");
                setSelectedFinish("All Finishes");
                setSearchQuery("");
              }}
              className="mt-5 px-6 py-2.5 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Export Inquiry Action Drawer (Desktop) */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="flex items-center space-x-3 px-5 py-3.5 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold shadow-2xl hover:bg-black transition-all border border-white/20 rounded-full group"
        >
          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white">
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
          </div>
          <span>Instant WhatsApp Trade Quote (₹)</span>
        </button>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        defaultProductTitle="Full Export Catalogue Dossier (INR)"
        defaultSku="CAT-INR-VOL-IV"
      />
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F6F2EA]">
          <p className="font-heading text-lg text-brand-dark font-bold">Loading export catalogue...</p>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
