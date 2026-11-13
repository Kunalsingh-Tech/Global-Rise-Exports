"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProductForWhatsApp, setSelectedProductForWhatsApp] = useState<{
    sku: string;
    title: string;
  } | null>(null);

  const carouselItems = PRODUCTS.slice(0, 6);
  const total = carouselItems.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const currentItem = carouselItems[currentIndex];
  const nextItem = carouselItems[(currentIndex + 1) % total];
  const thirdItem = carouselItems[(currentIndex + 2) % total];

  return (
    <div
      className="w-full relative font-body"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Mobile Slide Card (1 item per slide on mobile with touch gestures) */}
      <div className="block lg:hidden w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#FCFAF7] p-4 sm:p-5 shadow-card border border-brand-border flex flex-col justify-between"
          >
            <Link
              href={`/catalogue/${currentItem.slug}`}
              className="relative w-full aspect-[4/3] bg-[#F5F0E6] block overflow-hidden group"
            >
              <Image
                src={currentItem.images[0]}
                alt={currentItem.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/95 text-[10px] font-number tracking-wider text-brand-dark uppercase font-semibold border border-brand-border/40">
                {currentItem.sku}
              </span>
              <span className="absolute top-2 right-2 px-2 py-0.5 bg-brand-dark text-white text-[9px] uppercase tracking-wider font-bold">
                Featured
              </span>
            </Link>

            <div className="mt-4 flex items-end justify-between">
              <div className="flex-1 pr-3">
                <Link href={`/catalogue/${currentItem.slug}`}>
                  <h4 className="font-heading text-base font-bold text-brand-dark hover:text-brand-accent transition-colors line-clamp-1">
                    {currentItem.name}
                  </h4>
                </Link>
                <p className="text-xs text-brand-secondary mt-0.5 font-number">
                  {currentItem.category} &bull; MOQ: {currentItem.moq}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                {/* Crystal-Clear Sharp Price */}
                <span className="text-lg font-number font-extrabold text-brand-dark">
                  {currentItem.price}
                </span>
                <span className="block text-[10px] text-brand-secondary font-medium">Wholesale / FOB</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center space-x-2">
              <Link
                href={`/catalogue/${currentItem.slug}`}
                className="flex-1 py-2.5 bg-bg-secondary text-brand-dark text-xs uppercase tracking-wider font-bold text-center hover:bg-brand-dark hover:text-white transition-colors active:scale-95"
              >
                View Details
              </Link>
              <button
                onClick={() =>
                  setSelectedProductForWhatsApp({
                    sku: currentItem.sku,
                    title: currentItem.name,
                  })
                }
                className="py-2.5 px-4 bg-[#25D366] text-white text-xs font-bold flex items-center justify-center space-x-1.5 active:scale-95"
                title="Enquire on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Multi-Card Row - Exactly matching Reference Image 1 Layout */}
      <div className="hidden lg:grid grid-cols-4 gap-6 items-center">
        {/* Card 1 */}
        <motion.div
          key={`desktop-1-${currentItem.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[#FCFAF7] p-5 shadow-subtle border border-brand-border/60 hover:border-brand-dark transition-all duration-300 flex flex-col justify-between h-[375px] group"
        >
          <Link
            href={`/catalogue/${currentItem.slug}`}
            className="relative w-full h-56 bg-[#F5F0E6] block overflow-hidden"
          >
            <Image
              src={currentItem.images[0]}
              alt={currentItem.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-[10px] font-number tracking-wider text-brand-dark font-semibold">
              {currentItem.sku}
            </span>
          </Link>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex-1 pr-2">
              <Link href={`/catalogue/${currentItem.slug}`}>
                <h4 className="font-heading text-sm font-bold text-brand-dark hover:text-brand-accent transition-colors line-clamp-1">
                  {currentItem.name}
                </h4>
              </Link>
              <p className="text-[11px] text-brand-secondary mt-0.5">{currentItem.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-base font-number font-extrabold text-brand-dark">
                {currentItem.price}
              </span>
              <span className="block text-[10px] text-brand-secondary font-medium">INR</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          key={`desktop-2-${nextItem.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-[#FCFAF7] p-5 shadow-subtle border border-brand-border/60 hover:border-brand-dark transition-all duration-300 flex flex-col justify-between h-[375px] group"
        >
          <Link
            href={`/catalogue/${nextItem.slug}`}
            className="relative w-full h-56 bg-[#F5F0E6] block overflow-hidden"
          >
            <Image
              src={nextItem.images[0]}
              alt={nextItem.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-[10px] font-number tracking-wider text-brand-dark font-semibold">
              {nextItem.sku}
            </span>
          </Link>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex-1 pr-2">
              <Link href={`/catalogue/${nextItem.slug}`}>
                <h4 className="font-heading text-sm font-bold text-brand-dark hover:text-brand-accent transition-colors line-clamp-1">
                  {nextItem.name}
                </h4>
              </Link>
              <p className="text-[11px] text-brand-secondary mt-0.5">{nextItem.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-base font-number font-extrabold text-brand-dark">
                {nextItem.price}
              </span>
              <span className="block text-[10px] text-brand-secondary font-medium">INR</span>
            </div>
          </div>
        </motion.div>

        {/* Circular Dashed Badge - Signature Reference 1 Element */}
        <div className="flex flex-col items-center justify-center h-[375px]">
          <Link
            href="/catalogue"
            className="group relative w-36 h-36 rounded-full border-2 border-dashed border-brand-dark/40 hover:border-brand-dark flex flex-col items-center justify-center p-3 text-center transition-all duration-500 hover:scale-105 hover:bg-[#FAF7F2] shadow-sm"
          >
            <span className="font-heading text-sm text-brand-dark font-bold group-hover:text-brand-accent transition-colors flex items-center space-x-1">
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-[10px] uppercase tracking-wider text-brand-secondary font-semibold mt-1">
              Full Archive
            </span>
          </Link>
        </div>

        {/* Card 3 */}
        <motion.div
          key={`desktop-3-${thirdItem.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-[#FCFAF7] p-5 shadow-subtle border border-brand-border/60 hover:border-brand-dark transition-all duration-300 flex flex-col justify-between h-[375px] group"
        >
          <Link
            href={`/catalogue/${thirdItem.slug}`}
            className="relative w-full h-56 bg-[#F5F0E6] block overflow-hidden"
          >
            <Image
              src={thirdItem.images[0]}
              alt={thirdItem.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-[10px] font-number tracking-wider text-brand-dark font-semibold">
              {thirdItem.sku}
            </span>
          </Link>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex-1 pr-2">
              <Link href={`/catalogue/${thirdItem.slug}`}>
                <h4 className="font-heading text-sm font-bold text-brand-dark hover:text-brand-accent transition-colors line-clamp-1">
                  {thirdItem.name}
                </h4>
              </Link>
              <p className="text-[11px] text-brand-secondary mt-0.5">{thirdItem.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-base font-number font-extrabold text-brand-dark">
                {thirdItem.price}
              </span>
              <span className="block text-[10px] text-brand-secondary font-medium">INR</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pagination Controls & Live Indicator - Matching Reference 1 '<- 1/6 ->' */}
      <div className="mt-6 sm:mt-8 flex items-center justify-between">
        {/* Progress Dots */}
        <div className="flex items-center space-x-1.5">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-8 bg-brand-dark"
                  : "w-2.5 bg-brand-border hover:bg-brand-secondary"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows Counter with Clear Numbers */}
        <div className="flex items-center space-x-3 text-xs font-number text-brand-secondary tracking-widest font-bold">
          <button
            onClick={prevSlide}
            className="p-2 border border-brand-border hover:border-brand-dark text-brand-dark hover:bg-white transition-colors active:scale-90"
            aria-label="Previous item"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-brand-dark font-number font-extrabold text-xs min-w-[40px] text-center">
            {currentIndex + 1} / {total}
          </span>

          <button
            onClick={nextSlide}
            className="p-2 border border-brand-border hover:border-brand-dark text-brand-dark hover:bg-white transition-colors active:scale-90"
            aria-label="Next item"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {selectedProductForWhatsApp && (
        <WhatsAppModal
          isOpen={true}
          onClose={() => setSelectedProductForWhatsApp(null)}
          defaultSku={selectedProductForWhatsApp.sku}
          defaultProductTitle={selectedProductForWhatsApp.title}
        />
      )}
    </div>
  );
}
