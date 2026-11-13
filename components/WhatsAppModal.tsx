"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, ShieldCheck, Check } from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSku?: string;
  defaultProductTitle?: string;
}

export default function WhatsAppModal({
  isOpen,
  onClose,
  defaultSku = "",
  defaultProductTitle = "",
}: WhatsAppModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("India");
  const [units, setUnits] = useState("25");
  const [notes, setNotes] = useState(
    defaultProductTitle
      ? `Inquiry regarding export & wholesale FOB quotation (₹ INR) for ${defaultProductTitle} (${defaultSku}).`
      : "Inquiry regarding wholesale brass export catalogue and customized OEM sand-casting."
  );
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "919876543210"; // Official demo export desk number
    const message = `*GLOBAL RISE EXPORTS - TRADE INQUIRY*\n` +
      `*Client:* ${name || "Trade Buyer"}\n` +
      `*Company:* ${company || "Design Studio / Retailer"}\n` +
      `*Destination Country / Port:* ${country}\n` +
      (defaultSku ? `*Target SKU:* ${defaultSku} - ${defaultProductTitle}\n` : "") +
      `*Requested Volume:* ${units} units (FOB / Wholesale ₹)\n` +
      `*Details:* ${notes}`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encoded}`;
    
    setSent(true);
    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setSent(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-brand-dark/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] shadow-2xl border border-brand-border p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-secondary hover:text-brand-dark transition-colors p-1"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4 sm:mb-5">
          <div className="w-10 h-10 rounded-full bg-[#EBF7EE] flex items-center justify-center text-[#25D366] flex-shrink-0">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-playfair text-brand-dark font-semibold">
              GLOBAL RISE EXPORTS
            </h3>
            <p className="text-[11px] text-brand-secondary font-jakarta">
              Direct Foundry WhatsApp Desk &bull; Instant Trade Quotes in ₹ INR
            </p>
          </div>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-3.5 font-jakarta">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-secondary mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Julian Wright"
                className="w-full px-3 py-2 text-xs border border-brand-border focus:border-brand-dark focus:outline-none bg-bg-secondary/30"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-secondary mb-1">
                Company / Studio
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Wright Interiors"
                className="w-full px-3 py-2 text-xs border border-brand-border focus:border-brand-dark focus:outline-none bg-bg-secondary/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-secondary mb-1">
                Destination Port / Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-brand-border focus:border-brand-dark focus:outline-none bg-bg-secondary/30"
              >
                <option value="India">India (Domestic Freight)</option>
                <option value="United States">United States (FOB/CIF)</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United Arab Emirates">UAE (Dubai/Abu Dhabi)</option>
                <option value="Germany">Germany (Hamburg)</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="France">France</option>
                <option value="Singapore">Singapore</option>
                <option value="Other">Other Global Port</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-secondary mb-1">
                Estimated Volume (Units)
              </label>
              <input
                type="text"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="e.g. 25 or 100"
                className="w-full px-3 py-2 text-xs border border-brand-border focus:border-brand-dark focus:outline-none bg-bg-secondary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-secondary mb-1">
              Inquiry / Custom Specifications
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-brand-border focus:border-brand-dark focus:outline-none bg-bg-secondary/30 resize-none font-sans"
            />
          </div>

          <div className="p-2.5 bg-bg-secondary text-[11px] text-brand-secondary flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
            <span>
              Direct connection to Moradabad Foundry Export Manager. Average response &lt; 2 hours during business hours (08:00 - 20:00 IST).
            </span>
          </div>

          <button
            type="submit"
            disabled={sent}
            className="w-full py-3 px-6 bg-brand-dark text-[#FFFFFF] text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors flex items-center justify-center space-x-2 active:scale-95 shadow-md"
          >
            {sent ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>Redirecting to WhatsApp...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
