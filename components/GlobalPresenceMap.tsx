"use client";

import React, { useState } from "react";
import { Globe, Anchor, Plane, ShieldCheck } from "lucide-react";

export default function GlobalPresenceMap() {
  const [activeRegion, setActiveRegion] = useState("North America");

  const regions = [
    {
      name: "North America",
      destinations: "New York, Los Angeles, Toronto, Vancouver",
      transitTime: "24–28 Days Sea Freight",
      airTransit: "4–6 Days Priority Cargo",
      volume: "FCL / 40ft High-Cube & LCL Consolidated",
      note: "Supplying premier hospitality chains, architectural specification firms, and luxury boutique retailers in USA & Canada.",
    },
    {
      name: "Western Europe",
      destinations: "London, Hamburg, Rotterdam, Antwerp, Milan",
      transitTime: "20–25 Days Direct Maritime",
      airTransit: "3–5 Days Air Freight",
      volume: "Palletised & Drop-Tested Wooden Crates",
      note: "High export demand for hand-chiseled Urli vessels and custom verdigris finished architectural brassware.",
    },
    {
      name: "Middle East & GCC",
      destinations: "Dubai (Jebel Ali), Abu Dhabi, Riyadh, Doha",
      transitTime: "6–9 Days Expedited Maritime",
      airTransit: "2–3 Days Daily Direct Flights",
      volume: "Custom Monumental Architectural Castings",
      note: "Specialized royal suite centerpieces, monumental brass planters, and luxury villa decor.",
    },
    {
      name: "Domestic & South Asia",
      destinations: "Mumbai, Delhi NCR, Bangalore, Chennai, Hyderabad",
      transitTime: "2–4 Days Surface Express Logistics",
      airTransit: "Next Day Air Cargo",
      volume: "Master Box & Safe Pallet Packaging",
      note: "Direct foundry B2B wholesale pricing in Indian Rupees (₹ INR) for domestic interior projects and luxury stores.",
    },
  ];

  const current = regions.find((r) => r.name === activeRegion) || regions[0];

  return (
    <div className="bg-[#FFFFFF] border border-brand-border p-5 sm:p-8 lg:p-12 shadow-card font-jakarta">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-5 border-b border-brand-border">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-1">
            GLOBAL RISE EXPORTS &bull; Maritime &amp; Air Corridors
          </span>
          <h3 className="font-playfair text-2xl sm:text-3xl text-brand-dark font-medium">
            Connecting Craftsmanship With The World
          </h3>
        </div>
        <p className="mt-2 md:mt-0 text-xs text-brand-secondary font-jakarta max-w-md">
          Dispatched from India’s premier maritime gateway (Nhava Sheva Port, JNPT) and Air Cargo terminals (DEL) to over 35 countries globally, with full domestic Indian supply.
        </p>
      </div>

      {/* Region Selector Pills (Scrollable on mobile) */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-none">
        {regions.map((reg) => (
          <button
            key={reg.name}
            onClick={() => setActiveRegion(reg.name)}
            className={`px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider flex-shrink-0 transition-all font-semibold active:scale-95 ${
              activeRegion === reg.name
                ? "bg-brand-dark text-white shadow-sm"
                : "bg-bg-secondary text-brand-secondary hover:text-brand-dark hover:bg-brand-border/60"
            }`}
          >
            {reg.name}
          </button>
        ))}
      </div>

      {/* Graphic Map & Route Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Visual Map Representation */}
        <div className="lg:col-span-7 relative h-64 sm:h-80 bg-bg-secondary/60 border border-brand-border/60 p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
          {/* Subtle SVG World Contour background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 1000 500" className="w-full h-full fill-brand-dark">
              <path d="M150,150 Q180,100 260,120 Q320,130 350,180 Q320,240 240,260 Q180,240 150,180 Z" />
              <path d="M450,100 Q520,80 580,110 Q620,160 580,210 Q500,220 460,160 Z" />
              <path d="M560,200 Q650,180 720,220 Q750,290 680,320 Q600,310 560,250 Z" />
              <path d="M780,260 Q850,250 880,310 Q850,370 780,360 Q750,310 780,260 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-brand-dark font-semibold">
                Origin: Moradabad &bull; Nhava Sheva (JNPT)
              </span>
            </div>
            <span className="text-[10px] font-mono text-brand-secondary">
              Corridor: {activeRegion}
            </span>
          </div>

          {/* Center Callout */}
          <div className="relative z-10 my-auto py-2 sm:py-4">
            <h4 className="font-playfair text-xl sm:text-2xl text-brand-dark font-medium">
              {current.name} Dispatch Network
            </h4>
            <p className="text-xs text-brand-secondary mt-1 font-jakarta">
              Key Hubs: {current.destinations}
            </p>
          </div>

          {/* Port Badges */}
          <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3 pt-3 border-t border-brand-border/60">
            <div className="flex items-center space-x-2">
              <Anchor className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
              <span className="text-[11px] sm:text-xs text-brand-dark font-medium">{current.transitTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
              <span className="text-[11px] sm:text-xs text-brand-dark font-medium">{current.airTransit}</span>
            </div>
          </div>
        </div>

        {/* Right Specification Info */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-4">
          <div className="p-4 sm:p-5 bg-bg-secondary border border-brand-border/70">
            <h5 className="text-xs uppercase tracking-widest text-brand-dark font-semibold mb-1.5 flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>Commercial Delivery Terms</span>
            </h5>
            <p className="text-xs text-brand-secondary leading-relaxed font-jakarta">
              {current.note}
            </p>
          </div>

          <div className="space-y-1.5 text-xs font-jakarta">
            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60">
              <span className="text-brand-secondary">Commercial Incoterms</span>
              <span className="font-mono text-brand-dark font-medium">FOB, CIF, CFR, Ex-Foundry (INR / USD)</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60">
              <span className="text-brand-secondary">Export Capacities</span>
              <span className="font-mono text-brand-dark font-medium">{current.volume}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-brand-border/60">
              <span className="text-brand-secondary">Quality Inspection</span>
              <span className="text-brand-dark flex items-center space-x-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600 inline" />
                <span>Pre-shipment Spectrometry</span>
              </span>
            </div>
          </div>

          <p className="text-[10px] sm:text-[11px] text-brand-secondary/80 italic">
            * Sample crates are dispatched via DHL/FedEx Express with real-time tracking numbers provided upon dispatch.
          </p>
        </div>
      </div>
    </div>
  );
}
