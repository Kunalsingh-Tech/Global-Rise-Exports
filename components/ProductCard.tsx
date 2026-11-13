"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ArrowRight, Eye } from "lucide-react";
import { Product } from "@/data/products";
import WhatsAppModal from "@/components/WhatsAppModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <>
      <div className="group bg-[#FCFAF7] border border-brand-border/70 hover:border-brand-dark transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-subtle hover:shadow-card rounded-none font-body">
        {/* Image Container with smooth zoom on hover */}
        <Link
          href={`/catalogue/${product.slug}`}
          className="relative w-full pt-[100%] bg-[#F5F0E6] overflow-hidden block"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {/* SKU & Category Badge */}
          <div className="absolute top-2.5 left-2.5 bg-[#FAF7F2]/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-number tracking-wider text-brand-dark uppercase font-semibold border border-brand-border/50">
            {product.sku}
          </div>

          {product.isNewArrival && (
            <div className="absolute top-2.5 right-2.5 bg-brand-dark text-white px-2 py-0.5 text-[9px] uppercase tracking-wider font-heading font-bold">
              New
            </div>
          )}

          {/* Quick View Overlay (Desktop) */}
          <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
            <span className="px-3.5 py-1.5 bg-white/95 text-brand-dark text-xs uppercase tracking-wider font-bold shadow-md flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Details</span>
            </span>
          </div>
        </Link>

        {/* Product Information */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-brand-secondary mb-1">
              <span className="truncate max-w-[120px] font-medium">{product.category}</span>
              {/* Crystal-Clear Sharp Price */}
              <span className="font-number text-brand-dark font-extrabold text-base sm:text-lg">
                {product.price}
              </span>
            </div>

            <Link href={`/catalogue/${product.slug}`}>
              <h3 className="font-heading text-sm sm:text-base text-brand-dark font-bold group-hover:text-brand-accent transition-colors line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1 text-[11px] sm:text-xs text-brand-secondary line-clamp-2 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Quick Metrics */}
            <div className="mt-3 pt-2.5 border-t border-brand-border/50 text-[11px] text-brand-secondary flex items-center justify-between font-number">
              <span className="font-medium">MOQ: <strong className="text-brand-dark">{product.moq}</strong></span>
              <span className="truncate max-w-[110px] text-right font-semibold text-brand-accent">
                {product.finish[0]}
              </span>
            </div>
          </div>

          {/* Action Buttons: Responsive for Phone & Desktop */}
          <div className="mt-4 pt-3 flex items-center space-x-2">
            <Link
              href={`/catalogue/${product.slug}`}
              className="flex-1 py-2 sm:py-2.5 px-3 bg-bg-secondary hover:bg-brand-dark hover:text-white text-brand-dark text-xs uppercase tracking-wider font-bold text-center transition-colors flex items-center justify-center space-x-1 active:scale-95"
            >
              <span>View Specs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={() => setIsWhatsAppOpen(true)}
              title="Enquire on WhatsApp"
              className="p-2 sm:p-2.5 border border-brand-border hover:border-brand-dark bg-white hover:bg-[#EBF7EE] text-brand-dark hover:text-[#25D366] transition-colors active:scale-95"
              aria-label="Enquire on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        defaultSku={product.sku}
        defaultProductTitle={product.name}
      />
    </>
  );
}
