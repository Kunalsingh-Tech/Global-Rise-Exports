"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function FloatingWhatsApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button for Mobile and Desktop */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center group">
        {/* Tooltip on Desktop */}
        <span className="hidden sm:inline-block mr-2.5 px-3 py-1.5 bg-brand-dark/95 text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Direct Foundry WhatsApp Desk
        </span>

        {/* Pulse ring */}
        <div className="relative">
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative flex items-center space-x-2 px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] active:scale-95 transition-all duration-200 border-2 border-white"
            aria-label="Direct WhatsApp Trade Chat"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="text-xs font-extrabold tracking-wide hidden xs:inline font-heading">
              WhatsApp
            </span>
          </button>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProductTitle="Instant Trade & Export Enquiry"
        defaultSku="GBR-QUICK-TRADE"
      />
    </>
  );
}
