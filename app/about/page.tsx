"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Flame,
  Layers,
  Sparkles,
  Globe,
  Award,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function AboutPage() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F2EA] pb-24 no-horizontal-overflow font-body">
      {/* Top Eyebrow & Metadata */}
      <div className="bg-[#EFE8DC] border-b border-brand-border/60 py-2.5 sm:py-3 text-xs text-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-brand-dark transition-colors font-medium">
              Home
            </Link>
            <span>&bull;</span>
            <span className="text-brand-dark font-bold">About Our Atelier</span>
          </div>
          <span className="text-[11px] font-number uppercase tracking-wider text-brand-dark font-semibold">
            Global Rise Exports &bull; Moradabad Foundry
          </span>
        </div>
      </div>

      {/* Hero Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-2">
            Provenance &amp; Purpose
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-brand-dark font-extrabold tracking-tight leading-tight">
            Our Heritage &amp;<br />Artisan Craftsmanship
          </h1>
          <p className="mt-4 text-xs sm:text-base text-brand-secondary leading-relaxed font-body">
            <strong>Global Rise Exports</strong> was established to bridge India&apos;s celebrated generational metalworking guilds with international architecture, luxury hospitality firms, and discerning design showrooms across the world.
          </p>
        </motion.div>
      </div>

      {/* Editorial Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-6 relative aspect-[4/5] bg-[#EFE8DC] border border-brand-border shadow-card overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan at anvil shaping brass"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 px-4 py-2 border border-brand-border text-xs">
              <span className="font-heading text-brand-dark block font-bold">Moradabad Foundry Guild</span>
              <span className="text-[11px] text-brand-secondary font-number font-medium">Lost-Wax Sand Casting Process</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-6"
          >
            <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-2">
              Our Story
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-brand-dark font-bold">
              Where Craftsmanship Meets Contemporary Design
            </h2>
            <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
              <p>
                In the historic brass craft hub of Moradabad, Uttar Pradesh—celebrated worldwide as <em>Peetal Nagri</em> (The Brass City)—metal smithing is not merely a trade; it is a sacred lineage. For centuries, our artisan families have mastered the difficult equilibrium between copper and zinc, pouring molten brass into molds shaped from alluvial river sand.
              </p>
              <p>
                <strong>Global Rise Exports</strong> was conceived to liberate this extraordinary metallurgical heritage from ephemeral commodity markets. By collaborating closely with Scandinavian, European, and American interior architects, we refine traditional silhouettes into timeless minimal forms suited for five-star hotel lobbies, private villas, and high-end retail environments.
              </p>
              <p>
                Every piece leaving our Moradabad foundry carries the distinctive weight of solid virgin alloy, the nuanced rhythm of hand-hammered peen marks, and an archival patina formulated to age gracefully with the room it inhabits.
              </p>
            </div>

            <div className="mt-6 p-4 bg-bg-secondary border-l-3 border-brand-dark text-xs text-brand-secondary">
              <p className="font-heading italic text-brand-dark text-sm sm:text-base leading-snug font-medium">
                &ldquo;We do not invent heritage; we give it an international stage where its voice can resonate with modern living.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy & Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-1">
            Core Principles
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl text-brand-dark font-bold">
            Our Manufacturing Philosophy
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="font-number text-xs text-brand-accent tracking-wider font-extrabold block mb-3">
                01 / METALLURGY
              </span>
              <h3 className="font-heading text-lg sm:text-xl text-brand-dark font-bold mb-2">
                Uncompromising Purity
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed font-body">
                We utilize only 100% solid virgin brass ingots (IS-319 Grade I alloy, 60% copper, 40% zinc). We strictly reject recycled scrap impurities and toxic resin fillings, ensuring structural permanence and undeniable tactile heft.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border/40 text-[11px] text-brand-dark font-number flex items-center space-x-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>XRF Spectrometer Batch Certified</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="font-number text-xs text-brand-accent tracking-wider font-extrabold block mb-3">
                02 / ETHICS
              </span>
              <h3 className="font-heading text-lg sm:text-xl text-brand-dark font-bold mb-2">
                Sustainable Heritage
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed font-body">
                True luxury cannot exist without human dignity. We operate on direct foundry-to-artisan trade agreements, providing fair compensation, ergonomic safety gear, and preserving multi-generational guild apprenticeships in Moradabad.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border/40 text-[11px] text-brand-dark font-number flex items-center space-x-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Equitable Guild Partnership</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-brand-border shadow-subtle flex flex-col justify-between">
            <div>
              <span className="font-number text-xs text-brand-accent tracking-wider font-extrabold block mb-3">
                03 / RIGOR
              </span>
              <h3 className="font-heading text-lg sm:text-xl text-brand-dark font-bold mb-2">
                International Standards
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed font-body">
                From ±0.5mm dimensional tolerances to drop-tested 7-ply export cartons and ISPM-15 heat-treated maritime timber crates, our production satisfies the strictest global logistics mandates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border/40 text-[11px] text-brand-dark font-number flex items-center space-x-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>ISO 9001:2015 Compliant Protocols</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4-Stage Foundry Process */}
      <div className="bg-[#EFE8DC] py-14 sm:py-20 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-1">
              From Foundry To Freight
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-brand-dark font-bold">
              The Artisanal Process
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-brand-secondary font-body">
              A photographic walkthrough documenting the transformative journey of raw alloy into international export masterworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                step: "Phase 01",
                title: "Sand Molding & Pour",
                desc: "High-grade virgin brass ingots are melted in coke furnaces at 1,020°C and hand-ladled into compressed river sand flasks.",
                img: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=800&auto=format&fit=crop",
              },
              {
                step: "Phase 02",
                title: "Hand Chasing & Peening",
                desc: "After breakout and sprue removal, master carvers hand-chisel relief details and hammer surfaces over anvils.",
                img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
              },
              {
                step: "Phase 03",
                title: "Chemical Weathering",
                desc: "Proprietary acid formulas and humidity chambers develop rich antique, verdigris, or polished gold finishes.",
                img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
              },
              {
                step: "Phase 04",
                title: "Seaworthy Packaging",
                desc: "Sealed with microcrystalline wax, vacuum-bagged with desiccant, and nested into custom foam lined crates.",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
              },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FFFFFF] border border-brand-border overflow-hidden shadow-subtle group"
              >
                <div className="relative h-44 sm:h-48 bg-[#FCFAF7] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#1F1A16] text-[#F6F2EA] text-[10px] font-number font-bold">
                    {p.step}
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-heading text-base text-brand-dark font-bold mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-brand-secondary leading-relaxed font-body">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="bg-[#1F1A16] text-white p-6 sm:p-12 border border-brand-border flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brand-lightGold font-heading font-bold block mb-2">
              Foundry Collaboration
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Discuss an Export Partnership
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl font-body">
              Whether you require custom architectural sand-castings or volume quotes in Indian Rupees or foreign currency, our foundry desk is ready to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-white text-brand-dark text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors text-center"
            >
              Export RFQ Desk
            </Link>
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="px-6 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#20ba5a] transition-colors flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </button>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        defaultProductTitle="Institutional Export Partnership Inquiry"
        defaultSku="GBR-PARTNER"
      />
    </div>
  );
}
