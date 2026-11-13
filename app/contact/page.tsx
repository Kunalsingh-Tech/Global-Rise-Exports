"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  MapPin,
  Globe,
  Clock,
  Send,
  CheckCircle,
  FileText,
  ShieldCheck,
  Building,
  Phone,
} from "lucide-react";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    country: "India",
    enquiryType: "Sample Request",
    targetSku: "",
    estimatedVolume: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F6F2EA] pb-24 no-horizontal-overflow font-body">
      {/* Top Eyebrow */}
      <div className="bg-[#EFE8DC] border-b border-brand-border/60 py-2.5 sm:py-3 text-xs text-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-brand-dark transition-colors font-medium">
              Home
            </Link>
            <span>&bull;</span>
            <span className="text-brand-dark font-bold">Export Inquiry &amp; Trade Desk</span>
          </div>
          <span className="text-[11px] font-number uppercase tracking-wider text-brand-dark font-semibold">
            Global Rise Exports &bull; Response &lt; 12h
          </span>
        </div>
      </div>

      {/* Header Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="max-w-3xl">
          <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-2">
            B2B Trade Relations &bull; Foundry Coordination
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl text-brand-dark font-extrabold tracking-tight">
            Connect &amp; Export Enquiry
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
            Engage our foundry export desk for bespoke architectural brassware, institutional volume pricing in Indian Rupees (₹) and US Dollars, and nationwide or worldwide freight coordination.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Export Desk Channels & Info */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* Direct WhatsApp Trade Card */}
            <div className="bg-[#FFFFFF] p-5 sm:p-7 border border-brand-border shadow-subtle">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#EBF7EE] flex items-center justify-center text-[#25D366] flex-shrink-0">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-brand-dark font-bold">
                    Direct Foundry WhatsApp Line
                  </h3>
                  <p className="text-xs text-brand-secondary font-number">
                    Active Desk: 08:00 &ndash; 20:00 IST (GMT+5:30)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-bg-secondary border border-brand-border/60 text-xs mb-4">
                <span className="text-brand-secondary block text-[10px] uppercase tracking-wider font-semibold">
                  Export Trade Officer
                </span>
                <span className="font-number text-brand-dark font-black text-sm sm:text-base">
                  +91 (0) 98765 43210
                </span>
              </div>

              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="w-full py-3 px-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#20ba5a] transition-colors flex items-center justify-center space-x-2 active:scale-95 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat via WhatsApp Now</span>
              </button>
            </div>

            {/* Corporate & Atelier Address Cards */}
            <div className="bg-[#FFFFFF] p-5 sm:p-7 border border-brand-border shadow-subtle space-y-4">
              <h4 className="font-heading text-base text-brand-dark font-bold border-b border-brand-border/60 pb-2">
                Atelier &amp; Port Dispatch Centers
              </h4>

              <div className="flex items-start space-x-3 text-xs">
                <Building className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block font-semibold">Moradabad Foundry Guild &amp; Workshop</strong>
                  <span className="text-brand-secondary leading-relaxed block mt-0.5">
                    Foundry Way, Industrial Area Phase II, Moradabad, Uttar Pradesh 244001, India
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block font-semibold">New Delhi Commercial Liaison Office</strong>
                  <span className="text-brand-secondary leading-relaxed block mt-0.5">
                    Barakhamba Road, Connaught Place, New Delhi 110001, India
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <Globe className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block font-semibold">Maritime &amp; Air Logistics Gateways</strong>
                  <span className="text-brand-secondary leading-relaxed block mt-0.5">
                    Sea Freight: Nhava Sheva (JNPT) Mumbai &bull; Air Freight: IGI Airport Cargo (DEL)
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs pt-2 border-t border-brand-border/60">
                <Mail className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-dark block font-semibold">Electronic Commercial Correspondence</strong>
                  <a
                    href="mailto:export@globalriseexports.com"
                    className="text-brand-accent hover:underline font-mono text-xs font-semibold"
                  >
                    export@globalriseexports.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Export Terms */}
            <div className="bg-[#FFFFFF] p-5 sm:p-6 border border-brand-border shadow-subtle text-xs space-y-2.5">
              <h4 className="font-heading text-sm text-brand-dark font-bold">
                Standard Export Trade Terms
              </h4>
              <ul className="space-y-2 text-brand-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-brand-accent font-bold">&bull;</span>
                  <span><strong>Minimum Order Quantities:</strong> Trial orders from 8&ndash;15 units per SKU; bespoke architectural sand castings from 25 units.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-accent font-bold">&bull;</span>
                  <span><strong>Pricing Currency:</strong> Quotes available in Indian Rupees (₹ INR) for domestic/SAARC, and USD ($) / EUR (€) for global ports.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-brand-accent font-bold">&bull;</span>
                  <span><strong>Sample Kits:</strong> Sample prototypes dispatched via DHL/FedEx Express in 3&ndash;5 business days.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated B2B RFQ / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] p-5 sm:p-10 border border-brand-border shadow-subtle">
              {submitted ? (
                /* Success Demonstration State */
                <div className="py-10 px-2 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-brand-dark font-bold">
                    Export Inquiry Transmitted
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-secondary max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-brand-dark">{formData.name}</strong>. Your export and wholesale inquiry for <strong className="text-brand-dark">{formData.company || "your business"}</strong> has been logged with our Moradabad Foundry Export Desk.
                  </p>
                  <div className="p-4 bg-bg-secondary border border-brand-border/60 max-w-sm mx-auto text-left text-xs space-y-1 font-number">
                    <div>Reference ID: GRE-RFQ-{Math.floor(100000 + Math.random() * 900000)}</div>
                    <div>Destination: {formData.country}</div>
                    <div>Inquiry Type: {formData.enquiryType}</div>
                    <div>Turnaround: Guaranteed &lt; 12 Hours</div>
                  </div>
                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                    <button
                      onClick={() => setIsWhatsAppOpen(true)}
                      className="px-5 py-2.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#20ba5a] transition-colors flex items-center space-x-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Continue on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-brand-accent font-heading font-bold block mb-1">
                      Formal Inquiry
                    </span>
                    <h3 className="font-heading text-2xl text-brand-dark font-bold">
                      Submit Trade RFQ &amp; Specifications
                    </h3>
                    <p className="text-xs text-brand-secondary mt-1">
                      For luxury hospitality groups, architectural interior studios, and wholesale distributors.
                    </p>
                  </div>

                  {/* Name & Corporate Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Julian Rostova"
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Corporate Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="e.g. Principal Architect / Head of Buying"
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Company Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Company / Studio Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. Rostova Design House"
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Professional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. info@rostovadesign.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Destination Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        WhatsApp / Direct Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none font-number"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Destination Country / Port
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none"
                      >
                        <option value="India">India (Domestic Sourcing)</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">UAE (Dubai / Abu Dhabi)</option>
                        <option value="Germany">Germany</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="France">France</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Other">Other Global Port</option>
                      </select>
                    </div>
                  </div>

                  {/* Enquiry Type & Target SKU */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Enquiry Classification
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, enquiryType: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none"
                      >
                        <option value="Sample Request">Sample Request / Evaluation</option>
                        <option value="Custom OEM Sand-Casting">Bespoke Architectural OEM Sand-Casting</option>
                        <option value="Full Container Load (FCL)">Full Container Load (FCL) Maritime</option>
                        <option value="Less Container Load (LCL)">Less Container Load (LCL) Consolidation</option>
                        <option value="Complete Catalogue Dossier">Physical Printed Catalogue Dossier</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                        Target SKU / Collection
                      </label>
                      <input
                        type="text"
                        value={formData.targetSku}
                        onChange={(e) =>
                          setFormData({ ...formData, targetSku: e.target.value })
                        }
                        placeholder="e.g. GBR-804 or Antique Urli Vases"
                        className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none font-number"
                      />
                    </div>
                  </div>

                  {/* Message & Technical Specifications */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-brand-secondary mb-1 font-semibold">
                      Detailed Project Specifications / Bill of Quantities (BOQ) *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please specify target finish (Antique Patina, Polished Gold, Verdigris), dimensional requirements, estimated unit volume, and target delivery deadline..."
                      className="w-full px-3.5 py-2.5 text-xs bg-bg-secondary border border-brand-border focus:border-brand-dark focus:outline-none resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 px-6 bg-brand-dark text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors flex items-center justify-center space-x-2 shadow-sm active:scale-95"
                    >
                      {isSubmitting ? (
                        <span>Validating &amp; Transmitting...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Export Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-[11px] text-brand-secondary/80 flex items-center justify-between pt-2 border-t border-brand-border/40 font-number">
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600 inline" />
                      <span>Commercial NDA &amp; IP Protection Guaranteed</span>
                    </span>
                    <span>Response &lt; 12 Hours</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        defaultProductTitle="General Export Trade Desk Inquiry"
        defaultSku="GBR-EXPORT"
      />
    </div>
  );
}
