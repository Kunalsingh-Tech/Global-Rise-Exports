"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FileText,
  ShieldCheck,
  Check,
  ArrowRight,
  Layers,
  Scale,
  Clock,
  Sparkles,
  Maximize2,
  PackageCheck,
  Info,
  PhoneCall,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import WhatsAppModal from "@/components/WhatsAppModal";
import ProductCard from "@/components/ProductCard";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(product.finish[0]);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F2EA] pb-24 no-horizontal-overflow font-body">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#EFE8DC] border-b border-brand-border/60 py-2.5 sm:py-3.5 text-xs text-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <Link href="/" className="hover:text-brand-dark transition-colors font-medium">
              Home
            </Link>
            <span>&bull;</span>
            <Link href="/catalogue" className="hover:text-brand-dark transition-colors font-medium">
              Explore
            </Link>
            <span>&bull;</span>
            <Link
              href={`/catalogue?cat=${encodeURIComponent(product.category)}`}
              className="hover:text-brand-dark transition-colors hidden sm:inline font-medium"
            >
              {product.category}
            </Link>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-brand-dark font-bold truncate max-w-[160px] sm:max-w-md">
              {product.name}
            </span>
          </div>
          <div className="text-[11px] font-number text-brand-secondary font-semibold">
            SKU: {product.sku}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* LEFT COLUMN: Large Product Image, Vertical Thumbnails & Navigation Arrows */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 sm:gap-5">
            {/* Vertical Thumbnails Stack */}
            <div className="order-2 md:order-1 flex md:flex-col gap-2.5 sm:gap-3 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#FCFAF7] border-2 transition-all flex-shrink-0 overflow-hidden active:scale-95 ${
                    activeImageIndex === idx
                      ? "border-brand-dark shadow-sm"
                      : "border-brand-border/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div className="order-1 md:order-2 flex-1 relative aspect-[4/5] bg-[#FFFFFF] border border-brand-border shadow-card overflow-hidden group">
              <Image
                src={product.images[activeImageIndex]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover object-center transition-transform duration-500 ${
                  isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in group-hover:scale-105"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-brand-border text-brand-dark flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity shadow-sm active:scale-90"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-brand-border text-brand-dark flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity shadow-sm active:scale-90"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom hint */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/85 backdrop-blur-sm p-2 text-brand-dark hover:bg-white transition-colors"
                title="Toggle Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Archival Badge */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#FFFFFF]/90 backdrop-blur-sm px-2.5 sm:px-3 py-1 text-[10px] font-number tracking-wider text-brand-dark uppercase font-semibold border border-brand-border">
                {product.sku} &bull; Handcrafted in Moradabad
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Typography, Swatches, Pricing in INR, Specs & WhatsApp Enquiry */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-brand-secondary mb-2">
                <span className="uppercase tracking-wider text-brand-accent font-heading font-bold">
                  {product.category}
                </span>
                <span className="font-number text-[11px] text-green-800 bg-green-50 px-2 py-0.5 border border-green-200 font-semibold">
                  Export Production Ready
                </span>
              </div>

              {/* Product Title in Clean Bold Heading */}
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-dark font-extrabold leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Subtitle / Styling Advice */}
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                {product.subtitle}
              </p>

              {/* Finish Swatches */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-brand-border/60">
                <div className="flex items-center justify-between mb-2.5 text-xs">
                  <span className="uppercase tracking-wider text-brand-dark font-bold font-heading">
                    Available Metallurgy Finishes:
                  </span>
                  <span className="text-brand-accent font-number text-xs font-semibold">{selectedFinish}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.finish.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      className={`flex items-center space-x-2 px-3 py-1.5 border text-xs transition-all active:scale-95 ${
                        selectedFinish === f
                          ? "border-brand-dark bg-white font-bold shadow-sm"
                          : "border-brand-border bg-bg-secondary text-brand-secondary hover:border-brand-dark font-medium"
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          f.includes("Gold")
                            ? "bg-[#D4AF37]"
                            : f.includes("Patina")
                            ? "bg-[#6E543C]"
                            : f.includes("Verdigris")
                            ? "bg-[#4E786B]"
                            : "bg-[#9A7D55]"
                        }`}
                      />
                      <span>{f}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing & MOQ Bar with Crystal-Clear Numbers */}
              <div className="mt-5 sm:mt-6 p-4 bg-[#FFFFFF] border border-brand-border flex items-baseline justify-between shadow-subtle">
                <div>
                  <span className="font-number text-2xl sm:text-4xl text-brand-dark font-black tracking-tight">
                    {product.price}
                  </span>
                  <span className="ml-2 text-xs text-brand-secondary font-medium">
                    FOB Nhava Sheva (JNPT) / Wholesale
                  </span>
                </div>
                <div className="text-right font-number">
                  <span className="text-xs text-brand-secondary block font-body">Sample MOQ:</span>
                  <strong className="text-xs font-bold text-brand-dark">
                    {product.moq}
                  </strong>
                </div>
              </div>

              {/* Wholesale Tier Pricing Table (Clear INR Numbers) */}
              {product.wholesaleTiers && product.wholesaleTiers.length > 0 && (
                <div className="mt-4 p-3.5 bg-bg-secondary border border-brand-border text-xs">
                  <span className="font-bold text-brand-dark block mb-2 text-[11px] uppercase tracking-wider font-heading">
                    Volume Tiered Quotations (INR ₹)
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center font-number">
                    {product.wholesaleTiers.map((tier, idx) => (
                      <div key={idx} className="bg-white p-2 border border-brand-border/60">
                        <span className="text-[10px] text-brand-secondary block font-medium">{tier.quantity}</span>
                        <strong className="text-brand-dark block text-xs mt-0.5 font-extrabold">{tier.pricePerUnit}</strong>
                        <span className="text-[10px] text-green-700 font-bold">{tier.discount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description Paragraph */}
              <div className="mt-5 sm:mt-6">
                <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                  {product.description}
                </p>
              </div>

              {/* Bulleted Specifications */}
              <div className="mt-5 sm:mt-6 pt-5 border-t border-brand-border/60">
                <h4 className="text-xs uppercase tracking-wider text-brand-dark font-bold mb-3 font-heading">
                  Material &amp; Foundry Specifications
                </h4>
                <ul className="space-y-2 text-xs text-brand-secondary font-body">
                  {product.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-brand-accent mt-0.5 font-bold">&bull;</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dual Action Buttons */}
              <div className="mt-6 sm:mt-8 pt-5 border-t border-brand-border/60 space-y-3">
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="w-full py-4 px-6 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-md rounded-full group active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>Enquire on WhatsApp (Instant Quote)</span>
                </button>

                <Link
                  href="/contact"
                  className="w-full py-3.5 px-6 border-2 border-brand-dark text-brand-dark text-xs uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center justify-center space-x-2 rounded-full text-center active:scale-95"
                >
                  <FileText className="w-4 h-4 text-brand-secondary" />
                  <span>Request Export Spec Dossier</span>
                </Link>
              </div>

              {/* Reassurance notes with Numbers */}
              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3 text-xs text-brand-secondary font-number">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <span className="font-medium">IS-319 Grade I Spectrometry</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <span className="font-medium">Lead Time: {product.leadTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-brand-border">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl sm:text-3xl text-brand-dark mb-4 sm:mb-6 font-bold">
              Commercial Export Metrics &amp; Details
            </h3>
            <div className="bg-[#FFFFFF] border border-brand-border overflow-hidden text-xs shadow-subtle">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Product SKU</span>
                    <span className="font-number text-brand-dark font-bold">{product.sku}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Customs HSN Code</span>
                    <span className="font-number text-brand-dark font-bold">{product.hsnCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Alloy Composition</span>
                    <span className="text-brand-dark font-medium">{product.material}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Metric Dimensions</span>
                    <span className="font-number text-brand-dark font-bold">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-brand-secondary">Imperial Dimensions</span>
                    <span className="font-number text-brand-dark font-bold">{product.dimensionsInches}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3">
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Net Unit Weight</span>
                    <span className="font-number text-brand-dark font-bold">{product.weight}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Packaging Standard</span>
                    <span className="text-brand-dark font-medium">7-Ply Corrugated &bull; Foam Lined</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2">
                    <span className="text-brand-secondary">Dispatch Gateway</span>
                    <span className="font-number text-brand-dark font-medium">Nhava Sheva (JNPT) &bull; DEL</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-brand-secondary">Custom OEM Scaling</span>
                    <span className="text-green-700 font-bold">Available from 25 Units</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-bg-secondary border-t border-brand-border text-[11px] text-brand-secondary">
                <strong className="text-brand-dark font-bold">Maintenance &amp; Care:</strong> {product.careInstructions}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-brand-border">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-1">
                  Similar Aesthetics
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-brand-dark font-bold">
                  Related Export Masterpieces
                </h3>
              </div>
              <Link
                href="/catalogue"
                className="text-xs uppercase tracking-wider text-brand-dark hover:text-brand-accent transition-colors pb-0.5 border-b-2 border-brand-dark font-bold"
              >
                View Full Archive &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Modal with pre-filled product details */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        defaultSku={product.sku}
        defaultProductTitle={product.name}
      />
    </div>
  );
}
