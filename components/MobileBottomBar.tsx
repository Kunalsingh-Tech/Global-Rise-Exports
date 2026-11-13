"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Search, MessageSquare, PhoneCall } from "lucide-react";
import SearchModal from "@/components/SearchModal";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-t border-brand-border px-3 py-2 shadow-2xl safe-area-bottom">
        <div className="flex items-center justify-around">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
              pathname === "/" ? "text-brand-dark font-semibold" : "text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* Catalogue */}
          <Link
            href="/catalogue"
            className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
              pathname.startsWith("/catalogue") ? "text-brand-dark font-semibold" : "text-brand-secondary hover:text-brand-dark"
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Catalogue</span>
          </Link>

          {/* Quick Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center py-1 px-2.5 text-brand-secondary hover:text-brand-dark transition-colors"
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Search</span>
          </button>

          {/* WhatsApp Direct Enquiry - Prominent Highlight */}
          <button
            onClick={() => setIsWhatsAppOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#25D366] text-white rounded-full text-xs font-medium shadow-md active:scale-95 transition-transform"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-semibold tracking-wide">WhatsApp</span>
          </button>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
    </>
  );
}
