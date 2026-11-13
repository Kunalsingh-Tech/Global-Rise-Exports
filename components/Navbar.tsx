"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Menu, X, PhoneCall, ChevronRight } from "lucide-react";
import ClassicSearchBar from "@/components/ClassicSearchBar";
import WhatsAppModal from "@/components/WhatsAppModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/catalogue" },
    { name: "Collections", href: "/catalogue" },
    { name: "New Arrivals", href: "/catalogue?filter=new" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#F6F2EA]/95 backdrop-blur-md border-b border-brand-border/80 shadow-sm"
            : "bg-[#F6F2EA] border-b border-brand-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          {/* Main Top Row */}
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left Brand Wordmark: Global Rise Exports */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="group flex flex-col items-start leading-none"
              >
                <span className="font-heading text-lg xs:text-xl sm:text-2xl text-brand-dark tracking-tight font-extrabold group-hover:text-brand-accent transition-colors">
                  Global Rise Exports
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider text-brand-secondary font-body font-medium mt-0.5">
                  Moradabad Brass &bull; Peetal Nagri, India
                </span>
              </Link>
            </div>

            {/* Center Desktop Classic Search Bar */}
            <div className="hidden lg:block flex-1 max-w-md mx-auto">
              <ClassicSearchBar placeholder="Search brass products, SKUs (e.g. GBR-804)..." />
            </div>

            {/* Right Action Icons & Mobile WhatsApp Pill */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* WhatsApp Button - Flawlessly Adjusted for Phone & Desktop */}
              <button
                onClick={() => setIsWhatsAppOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold tracking-wide rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex-shrink-0"
                aria-label="Direct WhatsApp Trade Line"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden text-[11px]">Chat</span>
              </button>

              {/* Direct Call Button (Desktop) */}
              <a
                href="tel:+919876543210"
                className="hidden xl:inline-flex items-center space-x-1.5 px-3 py-2 bg-brand-dark text-white rounded-full text-xs font-semibold hover:bg-black transition-colors font-number"
                title="Call Export Desk"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 98765 43210</span>
              </a>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors active:scale-90"
                aria-label="Open navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links Row */}
          <div className="hidden md:flex items-center justify-between pt-2.5 mt-2 border-t border-brand-border/40">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href.includes("catalogue") && pathname.startsWith("/catalogue"));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs lg:text-[13px] tracking-wide font-body transition-colors py-1 ${
                      isActive
                        ? "text-brand-dark font-extrabold"
                        : "text-brand-secondary hover:text-brand-dark font-semibold"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-dark rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="text-[11px] font-number text-brand-secondary font-medium">
              FOB Nhava Sheva (JNPT) &bull; Domestic &amp; Global Supply
            </div>
          </div>

          {/* Mobile Classic Search Bar - Right below brand on mobile for instant 1-tap search */}
          <div className="block lg:hidden mt-2 pt-1">
            <ClassicSearchBar placeholder="Search vases, urlis, sculptures..." />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[115px] bottom-0 z-50 bg-[#F6F2EA] border-t border-brand-border/60 overflow-y-auto px-5 py-5 animate-fadeIn flex flex-col justify-between">
            <div className="flex flex-col space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-brand-accent font-bold mb-1">
                Navigation Menu
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 border-b border-brand-border/50 text-base font-heading font-bold text-brand-dark hover:text-brand-accent transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-brand-secondary" />
                </Link>
              ))}

              <div className="pt-4 flex flex-col space-y-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWhatsAppOpen(true);
                  }}
                  className="w-full py-3 bg-[#25D366] text-white rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Direct WhatsApp Line (+91 98765 43210)</span>
                </button>
                <a
                  href="tel:+919876543210"
                  className="w-full py-3 bg-brand-dark text-white rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 shadow-sm active:scale-95 font-number"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Us: +91 98765 43210</span>
                </a>
              </div>
            </div>

            <div className="pt-6 pb-2 text-xs text-brand-secondary border-t border-brand-border/60 space-y-1 font-body">
              <p className="font-heading text-brand-dark font-bold text-sm">Global Rise Exports</p>
              <p>Moradabad Brass Cluster, Uttar Pradesh, India</p>
              <p>GST &bull; IEC &bull; EPCCH Export Registered</p>
            </div>
          </div>
        )}
      </header>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </>
  );
}
