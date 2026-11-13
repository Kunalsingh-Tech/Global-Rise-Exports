"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutTemplate,
  Save,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Layers,
  Image as ImageIcon,
  HelpCircle,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminHomepageConfig } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminHomepageCmsPage() {
  const { success, error } = useToast();
  const [config, setConfig] = useState<AdminHomepageConfig>(adminStore.getHomepageConfig());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "hero" | "sections" | "story" | "craftsmanship" | "cta"
  >("hero");

  useEffect(() => {
    setConfig(adminStore.getHomepageConfig());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      adminStore.saveHomepageConfig(config);
      setIsSubmitting(false);
      success("Homepage CMS Updated", "Changes saved to visual homepage configuration.");
    }, 400);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Storefront Visual CMS</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Homepage Content Management
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Control editorial headlines, section toggles, imagery, and promotional copy on the public storefront.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded flex items-center space-x-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live Site</span>
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-70"
          >
            <Save className="w-4 h-4 text-[#C5A059]" />
            <span>{isSubmitting ? "Publishing..." : "Publish to Storefront"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-[#E2D8C6] overflow-x-auto pb-1 text-xs font-bold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "hero"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          1. Hero Composition
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sections")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "sections"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          2. Section Toggles &amp; Headings
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("story")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "story"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          3. Brand Story
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("craftsmanship")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "craftsmanship"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          4. Craftsmanship &amp; Global Presence
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cta")}
          className={`py-2.5 px-4 rounded-t border-b-2 transition-all ${
            activeTab === "cta"
              ? "border-[#1F1A16] bg-white text-[#1F1A16]"
              : "border-transparent text-[#685E53] hover:text-[#1F1A16]"
          }`}
        >
          5. Contact &amp; Inquiry CTA
        </button>
      </div>

      {/* Tab 1: Hero Section */}
      {activeTab === "hero" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
            <h3 className="font-heading text-lg font-black text-[#1F1A16]">
              Hero Editorial Composition
            </h3>
            <span className="text-[11px] text-[#A78044] font-semibold">
              Signature 3-Column Luxury Layout
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={config.hero.heading}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, heading: e.target.value },
                  })
                }
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Eyebrow Subtitle
              </label>
              <input
                type="text"
                value={config.hero.subtitle}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, subtitle: e.target.value },
                  })
                }
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Hero Editorial Paragraph
            </label>
            <textarea
              rows={3}
              value={config.hero.description}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hero: { ...config.hero, description: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Left Product Image URL
              </label>
              <input
                type="url"
                value={config.hero.image}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, image: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Foundry Quote
              </label>
              <input
                type="text"
                value={config.hero.quote}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, quote: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-[#FAF7F2]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Metallurgy Standard Callout
              </label>
              <input
                type="text"
                value={config.hero.metalStandard}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, metalStandard: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Dispatch Gateway Callout
              </label>
              <input
                type="text"
                value={config.hero.dispatchGateway}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, dispatchGateway: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Primary Button Text
              </label>
              <input
                type="text"
                value={config.hero.buttonText}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, buttonText: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Primary Button Link
              </label>
              <input
                type="text"
                value={config.hero.buttonLink}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    hero: { ...config.hero, buttonLink: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Section Toggles & Headings */}
      {activeTab === "sections" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Section Toggles &amp; Headings
          </h3>

          {/* Section: Best Sellers Carousel */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E2D8C6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-extrabold text-[#1F1A16]">
                Section: Best Sellers Horizontal Carousel
              </span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.bestSellers.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      bestSellers: { ...config.bestSellers, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded"
                />
                <span className="text-xs font-bold text-[#1F1A16]">
                  {config.bestSellers.enabled ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={config.bestSellers.heading}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    bestSellers: { ...config.bestSellers, heading: e.target.value },
                  })
                }
                placeholder="Section Heading"
                className="py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
              />
              <input
                type="text"
                value={config.bestSellers.description}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    bestSellers: { ...config.bestSellers, description: e.target.value },
                  })
                }
                placeholder="Short Description"
                className="py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
              />
            </div>
          </div>

          {/* Section: Curated Collections */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E2D8C6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-extrabold text-[#1F1A16]">
                Section: Curated Collections Grid
              </span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.featuredCollections.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      featuredCollections: {
                        ...config.featuredCollections,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded"
                />
                <span className="text-xs font-bold text-[#1F1A16]">
                  {config.featuredCollections.enabled ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={config.featuredCollections.heading}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    featuredCollections: {
                      ...config.featuredCollections,
                      heading: e.target.value,
                    },
                  })
                }
                placeholder="Collections Heading"
                className="py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
              />
              <input
                type="text"
                value={config.featuredCollections.subtitle}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    featuredCollections: {
                      ...config.featuredCollections,
                      subtitle: e.target.value,
                    },
                  })
                }
                placeholder="Subtitle Tagline"
                className="py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
              />
            </div>
          </div>

          {/* Section: New Arrivals */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E2D8C6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-extrabold text-[#1F1A16]">
                Section: New Arrivals Grid
              </span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.newArrivals.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      newArrivals: { ...config.newArrivals, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded"
                />
                <span className="text-xs font-bold text-[#1F1A16]">
                  {config.newArrivals.enabled ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={config.newArrivals.heading}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    newArrivals: { ...config.newArrivals, heading: e.target.value },
                  })
                }
                placeholder="New Arrivals Heading"
                className="py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
              />
              <input
                type="text"
                value={config.newArrivals.subtitle}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    newArrivals: { ...config.newArrivals, subtitle: e.target.value },
                  })
                }
                placeholder="Subtitle"
                className="py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Brand Story */}
      {activeTab === "story" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Brand Story &amp; Foundry Narrative
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Story Heading
            </label>
            <input
              type="text"
              value={config.brandStory.heading}
              onChange={(e) =>
                setConfig({
                  ...config,
                  brandStory: { ...config.brandStory, heading: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Narrative Copy
            </label>
            <textarea
              rows={4}
              value={config.brandStory.description}
              onChange={(e) =>
                setConfig({
                  ...config,
                  brandStory: { ...config.brandStory, description: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Foundry Story Image URL
              </label>
              <input
                type="url"
                value={config.brandStory.image}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    brandStory: { ...config.brandStory, image: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Atelier Subtitle Badge
              </label>
              <input
                type="text"
                value={config.brandStory.atelierSubtitle}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    brandStory: { ...config.brandStory, atelierSubtitle: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Craftsmanship & Global Presence */}
      {activeTab === "craftsmanship" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Craftsmanship &amp; International Logistics Sections
          </h3>

          <div className="p-4 bg-[#FAF8F5] border border-[#E2D8C6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-extrabold text-[#1F1A16]">
                Craftsmanship 4-Stage Foundry Walkthrough
              </span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.craftsmanship.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      craftsmanship: {
                        ...config.craftsmanship,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded"
                />
                <span className="text-xs font-bold text-[#1F1A16]">
                  {config.craftsmanship.enabled ? "Active" : "Hidden"}
                </span>
              </label>
            </div>
            <input
              type="text"
              value={config.craftsmanship.heading}
              onChange={(e) =>
                setConfig({
                  ...config,
                  craftsmanship: { ...config.craftsmanship, heading: e.target.value },
                })
              }
              className="w-full py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
            />
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#E2D8C6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading text-sm font-extrabold text-[#1F1A16]">
                Global Presence &amp; Maritime Map
              </span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.globalPresence.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      globalPresence: {
                        ...config.globalPresence,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded"
                />
                <span className="text-xs font-bold text-[#1F1A16]">
                  {config.globalPresence.enabled ? "Active" : "Hidden"}
                </span>
              </label>
            </div>
            <input
              type="text"
              value={config.globalPresence.heading}
              onChange={(e) =>
                setConfig({
                  ...config,
                  globalPresence: { ...config.globalPresence, heading: e.target.value },
                })
              }
              className="w-full py-2 px-3 text-xs bg-white border border-[#E2D8C6]"
            />
          </div>
        </div>
      )}

      {/* Tab 5: Contact CTA */}
      {activeTab === "cta" && (
        <div className="bg-white border border-[#E2D8C6] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-black text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
            Bottom Trade Desk Inquiry CTA
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Headline
            </label>
            <input
              type="text"
              value={config.contactCta.heading}
              onChange={(e) =>
                setConfig({
                  ...config,
                  contactCta: { ...config.contactCta, heading: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
              Description Paragraph
            </label>
            <textarea
              rows={3}
              value={config.contactCta.description}
              onChange={(e) =>
                setConfig({
                  ...config,
                  contactCta: { ...config.contactCta, description: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Button Text
              </label>
              <input
                type="text"
                value={config.contactCta.buttonText}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contactCta: { ...config.contactCta, buttonText: e.target.value },
                  })
                }
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                WhatsApp Desk Label
              </label>
              <input
                type="text"
                value={config.contactCta.whatsappText}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    contactCta: { ...config.contactCta, whatsappText: e.target.value },
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
