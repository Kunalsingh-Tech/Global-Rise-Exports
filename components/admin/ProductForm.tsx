"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  Upload,
  Sparkles,
  AlertCircle,
  Eye,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { AdminProduct, ProductStatus, PriceVisibility } from "@/lib/admin-types";
import { adminStore } from "@/lib/admin-store";
import { useToast } from "@/components/admin/AdminToast";

interface ProductFormProps {
  initialProduct?: AdminProduct;
  isEditMode?: boolean;
}

export default function ProductForm({
  initialProduct,
  isEditMode = false,
}: ProductFormProps) {
  const router = useRouter();
  const { success, error, info } = useToast();

  // Categories & Collections list from store
  const [categories, setCategories] = useState(adminStore.getCategories());
  const [collections, setCollections] = useState(adminStore.getCollections());

  // Form State
  const [name, setName] = useState(initialProduct?.name || "");
  const [slug, setSlug] = useState(initialProduct?.slug || "");
  const [sku, setSku] = useState(initialProduct?.sku || "");
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription || "");
  const [description, setDescription] = useState(initialProduct?.description || "");
  const [category, setCategory] = useState(initialProduct?.category || "Brass Vases & Urns");
  const [collection, setCollection] = useState(
    initialProduct?.collection || "The Royal Moradabad Atelier Collection"
  );
  const [productType, setProductType] = useState(initialProduct?.productType || "Handcrafted Brassware");
  const [tagsInput, setTagsInput] = useState(initialProduct?.tags?.join(", ") || "Solid Brass, Moradabad");
  
  // Specifications
  const [material, setMaterial] = useState(initialProduct?.material || "100% Solid Virgin Brass (CuZn40)");
  const [weight, setWeight] = useState(initialProduct?.weight || "4.2 kg (9.2 lbs)");
  const [dimensions, setDimensions] = useState(initialProduct?.dimensions || "38 × 38 × 48 cm");
  const [finishInput, setFinishInput] = useState(
    initialProduct?.finish?.join(", ") || "Antique Patina, Hand-Hammered"
  );
  const [color, setColor] = useState(initialProduct?.color || "Natural Burnished Brass");
  const [moq, setMoq] = useState(initialProduct?.moq || "12 Units");
  const [leadTime, setLeadTime] = useState(initialProduct?.leadTime || "15-20 Business Days");
  const [packaging, setPackaging] = useState(
    initialProduct?.packaging || "Individual EPE Foam Cushioning, 7-Ply Master Carton"
  );
  const [hsnCode, setHsnCode] = useState(initialProduct?.hsnCode || "7418.10.22");

  // Commercial Info
  const [numericPrice, setNumericPrice] = useState<number>(initialProduct?.numericPrice || 15400);
  const [currency, setCurrency] = useState<"INR" | "USD">(initialProduct?.currency || "INR");
  const [priceVisibility, setPriceVisibility] = useState<PriceVisibility>(
    initialProduct?.priceVisibility || "public"
  );
  const [requestForQuote, setRequestForQuote] = useState(initialProduct?.requestForQuote ?? true);

  // Images
  const [images, setImages] = useState<string[]>(
    initialProduct?.images || [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState(initialProduct?.imageAlt || "");

  // Visibility & Flags
  const [status, setStatus] = useState<ProductStatus>(initialProduct?.status || "published");
  const [isFeatured, setIsFeatured] = useState<boolean>(Boolean(initialProduct?.isFeatured));
  const [isNewArrival, setIsNewArrival] = useState<boolean>(initialProduct?.isNewArrival ?? true);

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialProduct?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialProduct?.seoDescription || "");

  // Dirty state tracking
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // auto-generate slug and SKU when name changes on new product
    if (!isEditMode && name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);

      if (!sku) {
        const letters = name
          .split(" ")
          .filter(Boolean)
          .map((w) => w[0]?.toUpperCase())
          .slice(0, 3)
          .join("");
        setSku(`GBR-${letters || "BR"}-${Math.floor(100 + Math.random() * 900)}`);
      }

      if (!seoTitle) {
        setSeoTitle(`${name} | Global Rise Exports`);
      }
    }
  }, [name, isEditMode, sku, seoTitle]);

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages([...images, newImageUrl.trim()]);
    setNewImageUrl("");
    setIsDirty(true);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length === 1) {
      error("Minimum Image Required", "A product must have at least one main image.");
      return;
    }
    setImages(images.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error("Validation Error", "Product Name is required.");
      return;
    }
    if (!sku.trim()) {
      error("Validation Error", "SKU is required.");
      return;
    }

    // Check unique SKU
    const existing = adminStore.getProducts().find(
      (p) => p.sku.toUpperCase() === sku.trim().toUpperCase() && p.id !== initialProduct?.id
    );
    if (existing) {
      error("Duplicate SKU", `SKU '${sku}' is already assigned to '${existing.name}'. Please choose a unique SKU.`);
      return;
    }

    setIsSubmitting(true);

    const formattedPrice =
      currency === "INR"
        ? `₹${numericPrice.toLocaleString("en-IN")}`
        : `$${numericPrice.toLocaleString("en-US")}`;

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const finishArray = finishInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const productPayload: Partial<AdminProduct> & { name: string; sku: string } = {
      ...(initialProduct ? { id: initialProduct.id } : {}),
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: sku.trim().toUpperCase(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      category,
      collection,
      productType,
      tags: tagsArray,
      material,
      weight,
      dimensions,
      finish: finishArray,
      color,
      moq,
      leadTime,
      packaging,
      hsnCode,
      price: formattedPrice,
      numericPrice,
      currency,
      priceVisibility,
      requestForQuote,
      images,
      imageAlt: imageAlt || `${name} - Handcrafted Moradabad Brass`,
      status,
      isFeatured,
      isNewArrival,
      seoTitle: seoTitle || `${name} | Global Rise Exports`,
      seoDescription: seoDescription || shortDescription,
      canonicalSlug: `/catalogue/${slug}`,
    };

    setTimeout(() => {
      const saved = adminStore.saveProduct(productPayload);
      setIsSubmitting(false);
      setIsDirty(false);
      success(
        isEditMode ? "Product Updated" : "Product Created",
        `${saved.name} (${saved.sku}) saved successfully.`
      );
      router.push("/control/products");
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} onChange={() => setIsDirty(true)} className="space-y-8 font-body">
      {/* Top Breadcrumb & Save Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div className="flex items-center space-x-3">
          <Link
            href="/control/products"
            className="p-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-[#1F1A16] rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[#A78044] font-heading">
              <span>Inventory Management</span>
              <span>&bull;</span>
              <span>{isEditMode ? `Edit Model ${sku}` : "New Foundry Article"}</span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-black text-[#1F1A16] tracking-tight">
              {isEditMode ? `Edit: ${name || initialProduct?.name}` : "Create New Brass Article"}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/control/products"
            className="px-4 py-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded"
          >
            Cancel
          </Link>
          {isEditMode && initialProduct && (
            <Link
              href={`/catalogue/${initialProduct.slug}`}
              target="_blank"
              className="px-3.5 py-2 bg-[#FAF7F2] border border-[#E2D8C6] hover:bg-white text-xs font-bold text-[#A78044] rounded flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Page</span>
            </Link>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-5 py-2 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-70"
          >
            <Save className="w-4 h-4 text-[#C5A059]" />
            <span>{isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Publish Article"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (8 cols): Main Product Data */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white border border-[#E2D8C6] p-5 sm:p-7 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
              1. Basic Article Information
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Product Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Handcrafted Antique Brass Sculptural Urli Vase"
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  SKU (Stock Keeping Unit) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value.toUpperCase())}
                  placeholder="e.g. GBR-BR-804"
                  className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors font-number font-bold text-[#A78044]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="antique-brass-sculptural-urli-vase"
                  className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Short Subtitle / Tagline
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Minimalist Abstract Patina Decor for Living Room, Shelf & Tabletop Styling"
                className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Comprehensive Architectural Dossier &amp; Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe casting technique, raw alloy proportions, decorative patina aging, historical context..."
                className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Card 2: Metallurgical Specifications & Logistics */}
          <div className="bg-white border border-[#E2D8C6] p-5 sm:p-7 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
              2. Metallurgical Specifications &amp; Freight Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Metal Alloy
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="100% Solid Virgin Brass (CuZn40)"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Weight (approx)
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="4.2 kg (9.2 lbs)"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Dimensions (L×W×H)
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="38 × 38 × 48 cm"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Minimum Order (MOQ)
                </label>
                <input
                  type="text"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="12 Units (Export Tier)"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Lead Time
                </label>
                <input
                  type="text"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  placeholder="15-20 Business Days"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  HSN Export Code
                </label>
                <input
                  type="text"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  placeholder="7418.10.22"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none font-number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Available Finishes (comma separated)
                </label>
                <input
                  type="text"
                  value={finishInput}
                  onChange={(e) => setFinishInput(e.target.value)}
                  placeholder="Antique Patina, Polished Mirror Gold, Satin"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Export Packaging Grade
                </label>
                <input
                  type="text"
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  placeholder="7-Ply Master Carton, Foam Protected"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Commercial & Pricing */}
          <div className="bg-white border border-[#E2D8C6] p-5 sm:p-7 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
              3. Commercial Pricing &amp; Quotation Controls
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Base Price (Numeric)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={numericPrice}
                  onChange={(e) => setNumericPrice(Number(e.target.value))}
                  placeholder="15400"
                  className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none font-number font-black text-[#1F1A16]"
                />
                <span className="text-[10px] text-[#685E53] mt-1 block">
                  Current Display:{" "}
                  <strong className="text-[#1F1A16]">
                    {currency === "INR" ? `₹${numericPrice.toLocaleString("en-IN")}` : `$${numericPrice}`}
                  </strong>
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="w-full py-2.5 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none font-medium"
                >
                  <option value="INR">₹ INR (Indian Rupee - Primary)</option>
                  <option value="USD">$ USD (US Dollar - Global FOB)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Price Visibility
                </label>
                <select
                  value={priceVisibility}
                  onChange={(e) => setPriceVisibility(e.target.value as any)}
                  className="w-full py-2.5 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none font-medium"
                >
                  <option value="public">Public (Show Wholesale Tier)</option>
                  <option value="on_enquiry">Price on Enquiry Only</option>
                  <option value="hidden">Hidden from Unregistered</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requestForQuote}
                  onChange={(e) => setRequestForQuote(e.target.checked)}
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#1F1A16]">
                  Enable 1-Tap Direct WhatsApp Request for Quotation (RFQ) on this article
                </span>
              </label>
            </div>
          </div>

          {/* Card 4: Product Image Gallery */}
          <div className="bg-white border border-[#E2D8C6] p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <h3 className="font-heading text-base font-extrabold text-[#1F1A16]">
                4. High-Resolution Gallery Imagery
              </h3>
              <span className="text-xs text-[#685E53] font-medium font-number">
                {images.length} Image(s) Attached
              </span>
            </div>

            {/* Thumbnail Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square bg-[#FAF7F2] border border-[#E2D8C6] overflow-hidden group"
                >
                  <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#1F1A16]/90 text-white text-[9px] font-bold uppercase">
                    {idx === 0 ? "Main" : `Image ${idx + 1}`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Image URL Input */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Add Image URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or Supabase storage path"
                  className="flex-1 py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-[#1F1A16] text-white hover:bg-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Add URL</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Image Alt Text (SEO Accessibility)
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="e.g. Handcrafted Antique Brass Sculptural Urli Vase with Aged Verdigris Patina"
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Classification, Status, SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Status & Visibility */}
          <div className="bg-white border border-[#E2D8C6] p-5 shadow-sm space-y-4">
            <h3 className="font-heading text-sm font-extrabold text-[#1F1A16] pb-2.5 border-b border-[#FAF7F2]">
              Publication Status
            </h3>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1.5">
                Visibility State
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProductStatus)}
                className="w-full py-2.5 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-bold text-[#1F1A16]"
              >
                <option value="published">Published (Visible on Public Site)</option>
                <option value="draft">Draft (Hidden in Admin Console)</option>
                <option value="out_of_stock">Out of Stock (Archived)</option>
              </select>
            </div>

            <div className="pt-2 space-y-2 border-t border-[#FAF7F2]">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#1F1A16]">
                  Highlight as Featured Article
                </span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#1F1A16]">
                  Display under &ldquo;New Arrivals&rdquo; grid
                </span>
              </label>
            </div>
          </div>

          {/* Card: Classification */}
          <div className="bg-white border border-[#E2D8C6] p-5 shadow-sm space-y-4">
            <h3 className="font-heading text-sm font-extrabold text-[#1F1A16] pb-2.5 border-b border-[#FAF7F2]">
              Category &amp; Collection
            </h3>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Assigned Collection
              </label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-medium"
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                Search Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Solid Brass, Moradabad, Patina, Urli"
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
              />
            </div>
          </div>

          {/* Card: SEO Meta */}
          <div className="bg-white border border-[#E2D8C6] p-5 shadow-sm space-y-4">
            <h3 className="font-heading text-sm font-extrabold text-[#1F1A16] pb-2.5 border-b border-[#FAF7F2]">
              Search Engine Optimization (SEO)
            </h3>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1F1A16]">
                  SEO Meta Title
                </label>
                <span className="text-[10px] text-neutral-400 font-number">
                  {seoTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Product Name | Global Rise Exports"
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1F1A16]">
                  Meta Description
                </label>
                <span className="text-[10px] text-neutral-400 font-number">
                  {seoDescription.length}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Summary for Google and search snippets..."
                className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
