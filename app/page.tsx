"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Compass,
  MessageSquare,
  Layers,
  Flame,
  Award,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import GlobalPresenceMap from "@/components/GlobalPresenceMap";
import WhatsAppModal from "@/components/WhatsAppModal";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.isFeatured).slice(0, 4);

  return (
    <div className="w-full overflow-hidden bg-[#F6F2EA] no-horizontal-overflow font-body">
      {/* =========================================================================
          SECTION 1: HERO (Clean Editorial Layout - Hero Composition)
          ========================================================================= */}
      <section className="relative pt-4 sm:pt-8 pb-14 sm:pb-24 border-b border-brand-border/60 overflow-hidden bg-[#F6F2EA]">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Hero Composition Grid - 3 Columns (Left Urn, Center Copy, Right Framed Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pt-2 sm:pt-4 pb-10 sm:pb-16 items-start overflow-hidden">
            {/* Left Column: Large Brass Vase/Urn & "Our Best Sellers" Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col w-full max-w-full"
            >
              <div className="relative w-full aspect-[4/5] bg-[#EFE8DC] border border-brand-border/60 overflow-hidden shadow-card group">
                <Image
                  src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop"
                  alt="Handcrafted Brass Sculptural Urn Vase"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-number tracking-wider text-brand-dark uppercase font-semibold border border-brand-border/40">
                  Archival Brass Urn &bull; Moradabad
                </div>
              </div>

              {/* Directly below left image: "Our Best Sellers" */}
              <div className="mt-5 sm:mt-8 pr-2">
                <h2 className="font-heading text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight">
                  Our Best Sellers
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                  Explore the handcrafted pieces and discover timeless beauty. From sculptural decor to everyday brass essentials, these popular export finds blend Indian artistry, metallurgical purity, and soul.
                </p>
                <div className="mt-3.5 sm:mt-5">
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-extrabold text-brand-dark hover:text-brand-accent transition-colors pb-0.5 border-b-2 border-brand-dark"
                  >
                    <span>View Export Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Center Column: Clear Headline & Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex flex-col justify-between pt-1 lg:pt-3 w-full max-w-full"
            >
              <div>
                <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-extrabold block mb-1.5 sm:mb-3">
                  Indian Handicraft &bull; Global Architecture
                </span>

                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-dark font-extrabold leading-tight">
                  Crafted With Heritage.<br />
                  Designed For The World.
                </h1>

                <p className="mt-3.5 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                  Discover thoughtfully crafted brass products, timeless decorative pieces and distinctive handcrafted collections created for global interior architecture. Formed by generational Moradabad artisans, translating ancient sand-casting metallurgy into modern luxury living.
                </p>

                {/* Key B2B Specifications Bar with Sharp Numbers */}
                <div className="mt-5 sm:mt-7 grid grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4 border-y border-brand-border/60 text-xs font-body">
                  <div>
                    <span className="block text-brand-secondary text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                      Metal Standard
                    </span>
                    <strong className="font-number text-brand-dark font-bold mt-0.5 block text-xs sm:text-sm">
                      100% Solid Brass (CuZn40)
                    </strong>
                  </div>
                  <div>
                    <span className="block text-brand-secondary text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                      Dispatch Gateway
                    </span>
                    <strong className="font-number text-brand-dark font-bold mt-0.5 block text-xs sm:text-sm">
                      Nhava Sheva (JNPT) &amp; DEL
                    </strong>
                  </div>
                </div>

                <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-4">
                  <Link
                    href="/catalogue"
                    className="flex-1 sm:flex-initial px-5 py-3 sm:px-6 sm:py-3.5 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-all shadow-md text-center active:scale-95"
                  >
                    Explore Collections
                  </Link>
                  <Link
                    href="/about"
                    className="flex-1 sm:flex-initial px-5 py-3 sm:px-6 sm:py-3.5 border-2 border-brand-dark bg-transparent text-brand-dark text-xs uppercase tracking-wider font-bold hover:bg-white transition-all text-center active:scale-95"
                  >
                    Our Heritage
                  </Link>
                </div>
              </div>

              {/* Heritage Quote Badge */}
              <div className="mt-6 sm:mt-10 p-3.5 sm:p-4 bg-[#EFE8DC] border-l-3 border-brand-dark text-xs text-brand-secondary">
                <p className="font-heading italic text-brand-dark text-xs sm:text-base leading-snug font-medium">
                  &ldquo;In the hammer-peen texture of raw brass lies the unhurried patience of master hands.&rdquo;
                </p>
                <span className="block mt-1 text-[10px] uppercase tracking-wider text-brand-accent font-heading font-bold">
                  Moradabad Brass Foundry Guild &bull; Est. 1984
                </span>
              </div>
            </motion.div>

            {/* Right Column: Framed Vertical Portrait Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 flex flex-col items-center lg:items-end w-full max-w-full"
            >
              <div className="w-full max-w-[280px] bg-[#FAF7F2] p-3.5 sm:p-4 border border-brand-border/70 shadow-card">
                <div className="relative w-full aspect-[3/4] bg-[#EFE8DC] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
                    alt="Artisan brass artifact"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover hover:scale-106 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-brand-border/40">
                  <p className="font-heading font-medium text-xs sm:text-sm text-brand-dark text-center leading-snug">
                    &mdash; A Place Where Hands Create &amp; Stories Begin.
                  </p>
                  <p className="text-[9px] text-center text-brand-secondary uppercase tracking-wider font-heading font-bold mt-1">
                    Artisan Guild Series
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Hero Carousel with Sharp Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-2 pt-6 sm:pt-10 border-t border-brand-border/60"
          >
            <div className="mb-3.5 sm:mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-brand-accent font-heading font-bold">
                  Curated Catalog
                </span>
                <h3 className="font-heading text-lg sm:text-2xl text-brand-dark font-extrabold">
                  Featured Export Pieces
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs text-brand-secondary hidden sm:inline font-number font-medium">
                Direct FOB JNPT Pricing in INR (₹)
              </span>
            </div>
            <HeroCarousel />
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURED COLLECTIONS (Editorial Showcase)
          ========================================================================= */}
      <section className="py-14 sm:py-24 border-b border-brand-border/60 bg-[#EFE8DC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14"
          >
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-1">
                Foundry Categories
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl text-brand-dark font-extrabold tracking-tight">
                Curated Collections
              </h2>
            </div>
            <p className="mt-2.5 md:mt-0 text-xs sm:text-sm text-brand-secondary max-w-md font-body">
              From monumental architectural vessels to intimate tabletop accents, explore our specialized metalworking disciplines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Brass Vases & Urns",
                count: "24 SKUs",
                img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
                href: "/catalogue?cat=Brass+Vases+%26+Urns",
              },
              {
                title: "Decorative Bowls & Urlis",
                count: "18 SKUs",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
                href: "/catalogue?cat=Decorative+Bowls+%26+Urlis",
              },
              {
                title: "Artistic Sculptures",
                count: "16 SKUs",
                img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
                href: "/catalogue?cat=Artistic+Sculptures",
              },
              {
                title: "Candle Holders & Lighting",
                count: "22 SKUs",
                img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
                href: "/catalogue?cat=Candle+Holders+%26+Lighting",
              },
              {
                title: "Tableware & Vanity Trays",
                count: "15 SKUs",
                img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop",
                href: "/catalogue?cat=Tableware+%26+Trays",
              },
              {
                title: "Traditional Sacred Artifacts",
                count: "12 SKUs",
                img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
                href: "/catalogue?cat=Traditional+Artifacts",
              },
            ].map((col, index) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link
                  href={col.href}
                  className="group relative h-72 sm:h-96 bg-[#FFFFFF] border border-brand-border overflow-hidden block shadow-subtle hover:shadow-card transition-all"
                >
                  <Image
                    src={col.img}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-number uppercase tracking-wider text-brand-lightGold font-bold block mb-1">
                        {col.count}
                      </span>
                      <h3 className="font-heading text-lg sm:text-2xl font-bold group-hover:translate-x-1 transition-transform">
                        {col.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BRAND STORY & CRAFTSMANSHIP NARRATIVE
          ========================================================================= */}
      <section className="py-14 sm:py-24 border-b border-brand-border/60 bg-[#F6F2EA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Big Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative h-[380px] sm:h-[560px] bg-[#EFE8DC] border border-brand-border shadow-card overflow-hidden w-full max-w-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan Shaping Brass by Hand"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:right-auto bg-white/95 backdrop-blur-sm p-3 border border-brand-border text-xs">
                <span className="font-heading text-brand-dark font-bold block text-sm">
                  Moradabad Brass Foundry Atelier
                </span>
                <span className="text-[11px] text-brand-secondary font-number font-medium">
                  1,020°C Sand-Casting &bull; Hand-Chasing Guild
                </span>
              </div>
            </motion.div>

            {/* Right Story Copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 w-full max-w-full"
            >
              <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-2">
                Our Narrative &bull; The Atelier
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-brand-dark font-extrabold leading-tight">
                Where Craftsmanship Meets Contemporary Design.
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                <strong>Global Rise Exports</strong> stands at the crossroads of centuries-old Indian brass metallurgy and modern international interior styling. Located in the legendary metalwork heartland of Moradabad—known worldwide as <em>Peetal Nagri</em>—our foundry collaborates with generational master artisans whose expertise has been passed down through family guilds.
              </p>

              <p className="mt-3 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                Rather than mass-producing generic hollow stampings, we preserve authentic solid sand-casting, hand-chasing, and chemical acid weathering. Every piece carries subtle organic nuances that tell a genuine story of provenance, fire, and human touch.
              </p>

              {/* 3 Value Pillars with Crystal-Clear Numbers */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-brand-border">
                <div>
                  <span className="font-number text-xl sm:text-3xl text-brand-dark font-black">100%</span>
                  <p className="text-[10px] sm:text-xs text-brand-secondary mt-1 font-body">Virgin Brass Alloy</p>
                </div>
                <div>
                  <span className="font-number text-xl sm:text-3xl text-brand-dark font-black">35+</span>
                  <p className="text-[10px] sm:text-xs text-brand-secondary mt-1 font-body">Export Ports</p>
                </div>
                <div>
                  <span className="font-number text-xl sm:text-3xl text-brand-dark font-black">Zero</span>
                  <p className="text-[10px] sm:text-xs text-brand-secondary mt-1 font-body">Hollow Fillers</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors active:scale-95"
                >
                  <span>Explore Our Heritage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#20ba5a] transition-colors active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Connect With Foundry</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: NEW ARRIVALS GRID (Clear Numbers in ₹ INR)
          ========================================================================= */}
      <section className="py-14 sm:py-24 border-b border-brand-border/60 bg-[#EFE8DC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12"
          >
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-1">
                Recent Foundry Releases
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl text-brand-dark font-extrabold">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/catalogue?filter=new"
              className="mt-2.5 sm:mt-0 text-xs uppercase tracking-wider text-brand-dark font-bold hover:text-brand-accent transition-colors pb-0.5 border-b-2 border-brand-dark"
            >
              View All Releases (INR Pricing) &rarr;
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CRAFTSMANSHIP & METALLURGY STANDARDS
          ========================================================================= */}
      <section className="py-14 sm:py-24 border-b border-brand-border/60 bg-[#F6F2EA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
          >
            <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-2">
              Foundry Detailing
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-brand-dark font-extrabold">
              Artisan Craftsmanship &amp; Finishing
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              Every brass piece undergoes four rigorous stages of physical craftsmanship, from initial river sand-casting to museum-grade protective sealing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                icon: Flame,
                title: "River Sand Molding",
                desc: "1,020°C molten virgin brass poured into hand-compressed river sand flasks, creating authentic granular surface character.",
              },
              {
                step: "02",
                icon: Layers,
                title: "Chisel & Peen Texturing",
                desc: "Second-generation carvers sculpting organic fluting and rhythmic peen marks across thousand-strike anvil cycles.",
              },
              {
                step: "03",
                icon: Sparkles,
                title: "Chemical Acid Patination",
                desc: "Micro-acid baths and atmospheric moisture chambers yielding antique bronze, verdigris, and warm honey lusters.",
              },
              {
                step: "04",
                icon: ShieldCheck,
                title: "Seaworthy Crating",
                desc: "Microcrystalline wax seal, hermetic vapor barrier wrapping, and ISPM-15 heat-treated maritime timber crating.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-[#FFFFFF] p-5 sm:p-8 border border-brand-border flex flex-col justify-between shadow-subtle"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-number text-xs text-brand-accent tracking-wider font-extrabold">
                      {f.step}
                    </span>
                    <f.icon className="w-5 h-5 text-brand-dark" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg text-brand-dark font-bold mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-brand-secondary leading-relaxed font-body">
                    {f.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-brand-border/40 text-[10px] text-brand-secondary uppercase tracking-wider font-bold">
                  Moradabad Standard
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GLOBAL PRESENCE (Export Corridors & Maritime Map)
          ========================================================================= */}
      <section className="py-14 sm:py-24 border-b border-brand-border/60 bg-[#EFE8DC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <GlobalPresenceMap />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ENQUIRY CTA (B2B Trade Desk)
          ========================================================================= */}
      <section className="py-14 sm:py-24 bg-[#1F1A16] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-wider text-brand-lightGold font-heading font-bold block mb-2.5">
            B2B Trade &bull; Architectural OEM &bull; Wholesale Dossier
          </span>
          <h2 className="font-heading text-2xl sm:text-5xl font-extrabold tracking-tight text-white">
            Looking For Something Distinctive?
          </h2>
          <p className="mt-3.5 text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto font-body leading-relaxed">
            Connect with our foundry export desk to explore customized finishes, architectural project scaling, volume tiered quotations in Indian Rupees (₹) and US Dollars, or to receive physical sample crates.
          </p>

          <div className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#FFFFFF] text-brand-dark text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
            >
              Send an Enquiry
            </Link>

            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#20ba5a] transition-colors flex items-center justify-center space-x-2 shadow-lg active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct Desk (+91 98765 43210)</span>
            </button>
          </div>

          <p className="mt-5 text-[10px] sm:text-[11px] text-neutral-400 font-number">
            Guaranteed response &lt; 12 hours &bull; Full Container Load (FCL) &amp; LCL Consolidated Maritime Freight
          </p>
        </div>
      </section>

      {/* WhatsApp Modal Trigger */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </div>
  );
}
