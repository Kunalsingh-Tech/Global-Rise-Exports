"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

interface ClassicSearchBarProps {
  placeholder?: string;
  className?: string;
  isCompact?: boolean;
}

export default function ClassicSearchBar({
  placeholder = "Search brass products, SKUs (e.g. GBR-804), finishes...",
  className = "",
  isCompact = false,
}: ClassicSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Live matching results
  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.finish.some((f) => f.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [query]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/catalogue?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Classic Search Bar Input Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full bg-[#FCFAF7] border border-brand-border rounded-full shadow-sm focus-within:border-brand-dark focus-within:ring-2 focus-within:ring-brand-dark/10 transition-all overflow-hidden"
      >
        {/* Left Search Icon */}
        <div className="pl-3.5 sm:pl-4 text-brand-secondary flex items-center justify-center">
          <Search className="w-4 h-4 text-brand-secondary" />
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full py-2 sm:py-2.5 px-3 text-xs sm:text-sm text-brand-dark placeholder-brand-secondary/70 bg-transparent focus:outline-none font-body"
        />

        {/* Clear Button if query exists */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="p-1.5 text-brand-secondary hover:text-brand-dark mr-1"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Classic Search Submit Button */}
        <button
          type="submit"
          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors flex items-center space-x-1.5 flex-shrink-0"
        >
          <span className="hidden sm:inline">Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Live Dropdown Results */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#FCFAF7] border border-brand-border shadow-2xl rounded-xl z-50 overflow-hidden font-body animate-fadeIn">
          <div className="p-3 bg-bg-secondary/60 border-b border-brand-border flex items-center justify-between text-[11px] text-brand-secondary">
            <span>Found {results.length} matching brass products</span>
            <span className="hidden sm:inline text-brand-dark font-medium">Press Enter to view all</span>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-brand-border/40">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/catalogue/${product.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center p-3 hover:bg-bg-secondary transition-colors group"
              >
                <div className="relative w-12 h-12 bg-[#F5F0E6] rounded-md overflow-hidden flex-shrink-0 border border-brand-border/50">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs sm:text-sm font-bold text-brand-dark truncate group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </span>
                    <span className="font-number text-xs font-black text-brand-dark ml-2 flex-shrink-0">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-brand-secondary mt-0.5">
                    <span className="font-number font-semibold text-brand-accent uppercase">{product.sku}</span>
                    <span>&bull;</span>
                    <span className="truncate">{product.category}</span>
                  </div>
                </div>
              </Link>
            ))}

            {results.length === 0 && (
              <div className="p-6 text-center text-xs text-brand-secondary">
                No brass items found matching &ldquo;{query}&rdquo;.
                <div className="mt-2 text-[11px] text-brand-accent font-medium">
                  Try searching &ldquo;Vase&rdquo;, &ldquo;Urli&rdquo;, &ldquo;GBR-804&rdquo;, or &ldquo;Patina&rdquo;
                </div>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="p-2.5 bg-bg-secondary text-center border-t border-brand-border">
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="text-xs text-brand-dark font-bold hover:text-brand-accent transition-colors flex items-center justify-center space-x-1 mx-auto"
              >
                <span>View all search results in Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
