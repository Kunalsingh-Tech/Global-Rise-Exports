"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  Building,
  Mail,
  Phone,
  Globe,
  Share2,
  FileText,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminSiteSettings } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminSettingsPage() {
  const { success, error } = useToast();
  const [settings, setSettings] = useState<AdminSiteSettings>(adminStore.getSiteSettings());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "footer">("general");

  useEffect(() => {
    setSettings(adminStore.getSiteSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      adminStore.saveSiteSettings(settings);
      setIsSubmitting(false);
      success("Settings Saved", "Website configuration updated successfully.");
    }, 400);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <Settings className="w-3.5 h-3.5" />
            <span>Storefront Configuration</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Website Settings
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Configure export house brand identity, contact channels, logistics credentials, and footer links.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-70 flex-shrink-0"
        >
          <Save className="w-4 h-4 text-[#C5A059]" />
          <span>{isSubmitting ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex space-x-2 border-b border-[#E2D8C6] overflow-x-auto pb-1 text-xs font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "general"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          General &bull; Brand Identity
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "contact"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          Contact &bull; Export Desk
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "social"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          Social Media Links
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("footer")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "footer"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          Footer &bull; Freight Ports
        </button>
      </div>

      {/* Tab 1: General Settings */}
      {activeTab === "general" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            General Brand Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Brand Name
              </label>
              <input
                type="text"
                value={settings.general.websiteName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, websiteName: e.target.value },
                  })
                }
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Tagline / Descriptor
              </label>
              <input
                type="text"
                value={settings.general.tagline}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, tagline: e.target.value },
                  })
                }
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Header Wordmark
              </label>
              <input
                type="text"
                value={settings.general.logoText}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, logoText: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Cluster Subtext
              </label>
              <input
                type="text"
                value={settings.general.logoSubtext}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, logoSubtext: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-[#FAF7F2]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Primary Pricing Currency
              </label>
              <select
                value={settings.general.primaryCurrency}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, primaryCurrency: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              >
                <option value="INR">₹ INR (Indian Rupee - Official)</option>
                <option value="USD">$ USD (US Dollar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Website Default Language
              </label>
              <input
                type="text"
                value={settings.general.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    general: { ...settings.general, language: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Contact & Export Desk */}
      {activeTab === "contact" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Contact &amp; Regulatory Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Contact Email Address
              </label>
              <input
                type="email"
                value={settings.contact.contactEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, contactEmail: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Official Phone Number
              </label>
              <input
                type="text"
                value={settings.contact.phoneNumber}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, phoneNumber: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                WhatsApp Trade Desk Number
              </label>
              <input
                type="text"
                value={settings.contact.whatsappNumber}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, whatsappNumber: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-number"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Desk Operating Hours
              </label>
              <input
                type="text"
                value={settings.contact.exportDeskHours}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, exportDeskHours: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Foundry Cluster Registered Address
            </label>
            <input
              type="text"
              value={settings.contact.businessAddress}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, businessAddress: e.target.value },
                })
              }
              className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-[#FAF7F2]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                IEC (Import Export Code)
              </label>
              <input
                type="text"
                value={settings.contact.iecCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, iecCode: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                GSTIN Identification
              </label>
              <input
                type="text"
                value={settings.contact.gstin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, gstin: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social Media Links */}
      {activeTab === "social" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Social Media &amp; Brand Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={settings.socialMedia.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, instagram: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                value={settings.socialMedia.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, linkedin: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={settings.socialMedia.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, facebook: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Pinterest
              </label>
              <input
                type="url"
                value={settings.socialMedia.pinterest}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: { ...settings.socialMedia, pinterest: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Footer & Freight Ports */}
      {activeTab === "footer" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Footer Information &amp; Logistics Declaration
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Footer Description Paragraph
            </label>
            <textarea
              rows={3}
              value={settings.footer.description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  footer: { ...settings.footer, description: e.target.value },
                })
              }
              className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Copyright Notice
              </label>
              <input
                type="text"
                value={settings.footer.copyrightText}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    footer: { ...settings.footer, copyrightText: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Maritime FOB Ports
              </label>
              <input
                type="text"
                value={settings.footer.fobPort}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    footer: { ...settings.footer, fobPort: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
