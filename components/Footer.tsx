"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F1A16] text-[#F6F2EA] pt-14 sm:pt-16 pb-12 border-t border-brand-border/20 font-body no-horizontal-overflow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-extrabold tracking-tight">
              Global Rise Exports
            </h3>
            <p className="text-[11px] uppercase tracking-wider text-brand-lightGold font-heading mt-1 font-bold">
              Moradabad Brass Atelier &bull; Est. 1984
            </p>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-body leading-relaxed max-w-sm">
              Connecting India’s century-old Moradabad metalworking heritage with international architecture, luxury hospitality groups, and global decor houses.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 font-number">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:export@globalriseexports.com"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-brand-lightGold" />
                <span className="truncate max-w-[190px]">export@globalriseexports.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] uppercase tracking-wider text-brand-lightGold font-heading font-bold mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-body">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-white transition-colors">
                  Complete Catalogue
                </Link>
              </li>
              <li>
                <Link href="/catalogue?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Heritage &amp; Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Foundry Export Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-wider text-brand-lightGold font-heading font-bold mb-3">
              Export Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-body">
              <li>
                <Link href="/catalogue?cat=Brass+Vases+%26+Urns" className="hover:text-white transition-colors">
                  Brass Vases &amp; Urns
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=Decorative+Bowls+%26+Urlis" className="hover:text-white transition-colors">
                  Decorative Bowls &amp; Urlis
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=Artistic+Sculptures" className="hover:text-white transition-colors">
                  Artistic Sculptures &amp; Castings
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=Candle+Holders+%26+Lighting" className="hover:text-white transition-colors">
                  Candle Holders &amp; Lighting
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=Tableware+%26+Trays" className="hover:text-white transition-colors">
                  Tableware &amp; Vanity Trays
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=Traditional+Artifacts" className="hover:text-white transition-colors">
                  Traditional Sacred Artifacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Logistics & Compliance */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-wider text-brand-lightGold font-heading font-bold mb-3">
              Export Logistics &amp; Ports
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400 font-body">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-lightGold flex-shrink-0 mt-0.5" />
                <span>Foundry: Moradabad Metal Craft Cluster, UP, India</span>
              </div>
              <div className="flex items-start space-x-2">
                <Globe className="w-3.5 h-3.5 text-brand-lightGold flex-shrink-0 mt-0.5" />
                <span>Dispatch Ports: Nhava Sheva (JNPT) Mumbai &bull; IGI Airport (DEL)</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-[11px] text-neutral-300">
                  <strong className="text-brand-lightGold">Export Standards:</strong> 100% Solid Virgin Brass Alloy (CuZn40 Grade I), ISPM-15 Fumigated Wooden Maritime Crates, XRF Spectrometry Verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Demo Watermark Notice */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-3 font-number">
          <p>
            &copy; {new Date().getFullYear()} Global Rise Exports. All Rights Reserved.
          </p>
          <p className="text-[11px] text-center md:text-right max-w-xl text-neutral-500 font-body">
            * Official Product Catalogue &amp; Presentation Frontend. All product titles, SKUs, and specifications are demonstration placeholders for export appraisal.
          </p>
        </div>
      </div>
    </footer>
  );
}
