"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(PRODUCTS.slice(0, 4));
    } else {
      const term = searchTerm.toLowerCase();
      const results = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.material.toLowerCase().includes(term) ||
          p.finish.some((f) => f.toLowerCase().includes(term))
      );
      setFilteredProducts(results);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 bg-brand-dark/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] shadow-2xl border border-brand-border overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-brand-border">
          <Search className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by SKU, brass finish, product title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full text-sm sm:text-base text-brand-dark placeholder-brand-secondary/60 focus:outline-none bg-transparent font-jakarta"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-brand-secondary hover:text-brand-dark transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions / Filter Results */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto font-jakarta">
          <div className="flex items-center justify-between text-[11px] tracking-widest text-brand-secondary uppercase mb-3">
            <span>{searchTerm ? `Found ${filteredProducts.length} Results` : "Featured Export SKUs (INR ₹)"}</span>
            <span className="hidden sm:inline">Moradabad Foundry</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/catalogue/${product.slug}`}
                onClick={onClose}
                className="group flex items-center p-2.5 border border-brand-border/60 hover:border-brand-dark hover:bg-bg-secondary/40 transition-all duration-200"
              >
                <div className="relative w-14 h-14 bg-[#F8F7F5] flex-shrink-0 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider text-brand-accent uppercase font-medium">
                      {product.sku}
                    </span>
                    <span className="text-xs font-playfair text-brand-dark font-bold">
                      {product.price}
                    </span>
                  </div>
                  <h4 className="text-xs font-playfair font-medium text-brand-dark truncate mt-0.5">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-brand-secondary truncate mt-0.5">
                    {product.category}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-secondary group-hover:text-brand-dark group-hover:translate-x-1 transition-all ml-1.5 flex-shrink-0" />
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm font-playfair text-brand-dark">No products found matching &ldquo;{searchTerm}&rdquo;</p>
              <p className="text-xs text-brand-secondary mt-1">
                Try searching for &ldquo;Vase&rdquo;, &ldquo;Urli&rdquo;, &ldquo;Candle&rdquo;, or &ldquo;GBR-804&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 sm:px-6 py-2.5 bg-bg-secondary border-t border-brand-border flex items-center justify-between text-[11px] text-brand-secondary font-jakarta">
          <span>GLOBAL RISE EXPORTS</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
