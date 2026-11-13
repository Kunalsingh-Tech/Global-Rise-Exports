"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Save,
  Globe,
  Share2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminSeoEntry } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminSeoPage() {
  const { success } = useToast();
  const [entries, setEntries] = useState<AdminSeoEntry[]>(adminStore.getSeoEntries());
  const [selectedEntry, setSelectedEntry] = useState<AdminSeoEntry>(
    entries[0] || {
      id: "seo-1",
      pageKey: "homepage",
      pageName: "Homepage (/)",
      seoTitle: "Global Rise Exports",
      metaDescription: "",
      canonicalUrl: "https://globalriseexports.vercel.app/",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      ogType: "website",
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const list = adminStore.getSeoEntries();
    setEntries(list);
    if (!selectedEntry && list.length > 0) {
      setSelectedEntry(list[0]);
    }
  }, [selectedEntry]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    adminStore.saveSeoEntry(selectedEntry);
    setTimeout(() => {
      setIsSubmitting(false);
      success("SEO Metadata Saved", `Updated search metadata for ${selectedEntry.pageName}`);
    }, 350);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <Search className="w-3.5 h-3.5" />
            <span>Search Engine Optimization</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            SEO &amp; Open Graph Management
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Optimize search engine rankings, Google SERP snippets, and social media preview cards.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-70 flex-shrink-0"
        >
          <Save className="w-4 h-4 text-[#C5A059]" />
          <span>{isSubmitting ? "Saving..." : "Save SEO Metadata"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pages List */}
        <div className="lg:col-span-4 bg-white border border-[#E2D8C6] p-4 shadow-sm space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78044] px-2 block mb-2 font-heading">
            Select Page Route
          </span>

          <div className="space-y-1">
            {entries.map((item) => {
              const isSelected = selectedEntry.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedEntry(item)}
                  className={`w-full text-left p-3 rounded text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#1F1A16] text-[#F6F2EA] shadow-sm"
                      : "text-[#1F1A16] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <span className="truncate">{item.pageName}</span>
                  <Globe className={`w-3.5 h-3.5 ${isSelected ? "text-[#C5A059]" : "text-neutral-400"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: SEO Form & Google Snippet Live Preview */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Google Search SERP Snippet Preview */}
          <div className="bg-white border border-[#E2D8C6] p-5 sm:p-6 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#685E53] block mb-2 font-heading">
              Google Search Result Snippet (Desktop Preview)
            </span>
            <div className="p-4 bg-[#FDFCF9] border border-[#E2D8C6] rounded-md font-sans space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-neutral-600 truncate">
                <span className="font-semibold text-neutral-800">globalriseexports.vercel.app</span>
                <span>&rsaquo;</span>
                <span className="text-neutral-500">{selectedEntry.pageKey}</span>
              </div>
              <h4 className="text-blue-700 hover:underline text-base sm:text-lg font-medium leading-snug cursor-pointer line-clamp-1">
                {selectedEntry.seoTitle || "Global Rise Exports | Handcrafted Brass Products"}
              </h4>
              <p className="text-xs sm:text-[13px] text-neutral-600 line-clamp-2 leading-relaxed">
                {selectedEntry.metaDescription || "Discover handcrafted brass products, urlis, and vessels..."}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSave} className="bg-white border border-[#E2D8C6] p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
              Metadata for {selectedEntry.pageName}
            </h3>

            {/* SEO Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1F1A16] font-heading">
                  Page Title (Title Tag)
                </label>
                <span
                  className={`text-[10px] font-number font-bold ${
                    selectedEntry.seoTitle.length > 60 ? "text-amber-600" : "text-emerald-700"
                  }`}
                >
                  {selectedEntry.seoTitle.length}/60 Chars
                </span>
              </div>
              <input
                type="text"
                value={selectedEntry.seoTitle}
                onChange={(e) =>
                  setSelectedEntry({ ...selectedEntry, seoTitle: e.target.value })
                }
                placeholder="Page Title"
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1F1A16] font-heading">
                  Meta Description
                </label>
                <span
                  className={`text-[10px] font-number font-bold ${
                    selectedEntry.metaDescription.length > 160
                      ? "text-amber-600"
                      : "text-emerald-700"
                  }`}
                >
                  {selectedEntry.metaDescription.length}/160 Chars
                </span>
              </div>
              <textarea
                rows={3}
                value={selectedEntry.metaDescription}
                onChange={(e) =>
                  setSelectedEntry({ ...selectedEntry, metaDescription: e.target.value })
                }
                placeholder="Enter compelling description for search engine ranking..."
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] leading-relaxed"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Canonical URL
              </label>
              <input
                type="url"
                value={selectedEntry.canonicalUrl}
                onChange={(e) =>
                  setSelectedEntry({ ...selectedEntry, canonicalUrl: e.target.value })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-mono"
              />
            </div>

            {/* Social Share Preview (Open Graph) */}
            <div className="pt-3 border-t border-[#FAF7F2] space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#A78044] font-heading">
                Open Graph / Social Media Sharing Preview
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={selectedEntry.ogTitle}
                    onChange={(e) =>
                      setSelectedEntry({ ...selectedEntry, ogTitle: e.target.value })
                    }
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    OG Image URL
                  </label>
                  <input
                    type="url"
                    value={selectedEntry.ogImage}
                    onChange={(e) =>
                      setSelectedEntry({ ...selectedEntry, ogImage: e.target.value })
                    }
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  OG Description
                </label>
                <input
                  type="text"
                  value={selectedEntry.ogDescription}
                  onChange={(e) =>
                    setSelectedEntry({ ...selectedEntry, ogDescription: e.target.value })
                  }
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
