"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  PlusCircle,
  Edit,
  Trash2,
  Package,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminCollection, AdminProduct } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminCollectionsPage() {
  const { success, error, info } = useToast();
  const [collections, setCollections] = useState<AdminCollection[]>([]);
  const [allProducts, setAllProducts] = useState<AdminProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<AdminCollection | null>(null);
  const [deleteConfirmCol, setDeleteConfirmCol] = useState<AdminCollection | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const refreshData = () => {
    setCollections(adminStore.getCollections());
    setAllProducts(adminStore.getProducts());
  };

  useEffect(() => {
    refreshData();
    return adminStore.subscribe(refreshData);
  }, []);

  const openCreateModal = () => {
    setEditingCollection(null);
    setName("");
    setSlug("");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop");
    setIsFeatured(false);
    setStatus("published");
    setSelectedProductIds([]);
    setIsModalOpen(true);
  };

  const openEditModal = (col: AdminCollection) => {
    setEditingCollection(col);
    setName(col.name);
    setSlug(col.slug);
    setDescription(col.description);
    setImage(col.image);
    setIsFeatured(col.isFeatured);
    setStatus(col.status);
    setSelectedProductIds(col.assignedProductIds || []);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCollection) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleToggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error("Validation Error", "Collection Name is required.");
      return;
    }

    const payload: Partial<AdminCollection> & { name: string } = {
      ...(editingCollection ? { id: editingCollection.id } : {}),
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: description.trim(),
      image: image.trim(),
      isFeatured,
      status,
      assignedProductIds: selectedProductIds,
    };

    const saved = adminStore.saveCollection(payload);
    success(
      editingCollection ? "Collection Updated" : "Collection Created",
      `'${saved.name}' saved with ${saved.assignedProductIds.length} assigned products.`
    );
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteConfirmCol) return;
    adminStore.deleteCollection(deleteConfirmCol.id);
    success("Collection Deleted", `'${deleteConfirmCol.name}' deleted.`);
    setDeleteConfirmCol(null);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Foundry Lines</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Collection Management
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Group brassware into curated thematic collections (e.g. Brutalist, Royal Atelier, Verdigris).
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#C5A059]" />
          <span>Create Collection</span>
        </button>
      </div>

      {/* Collections List */}
      <div className="space-y-4">
        {collections.map((col) => {
          const assignedProducts = allProducts.filter((p) =>
            col.assignedProductIds?.includes(p.id)
          );

          return (
            <div
              key={col.id}
              className="bg-white border border-[#E2D8C6] shadow-sm p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 hover:border-[#1F1A16] transition-all"
            >
              {/* Left Info & Image */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 flex-1">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF7F2] border border-[#E2D8C6] overflow-hidden flex-shrink-0">
                  <Image src={col.image} alt={col.name} fill className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#1F1A16]">
                      {col.name}
                    </h3>
                    {col.isFeatured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF7F2] text-[#A78044] border border-[#C5A059] uppercase tracking-wider">
                        Featured Line
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        col.status === "published"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {col.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#685E53] line-clamp-2 max-w-2xl leading-relaxed">
                    {col.description || "No description provided."}
                  </p>

                  {/* Assigned Products Preview */}
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-[#1F1A16]">
                      {assignedProducts.length} Assigned Products:
                    </span>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {assignedProducts.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          className="relative w-6 h-6 rounded-full border border-white overflow-hidden bg-[#FAF7F2]"
                          title={p.name}
                        >
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                      ))}
                      {assignedProducts.length > 4 && (
                        <div className="w-6 h-6 rounded-full bg-[#1F1A16] text-[#F6F2EA] text-[9px] font-bold flex items-center justify-center border border-white font-number">
                          +{assignedProducts.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 flex-shrink-0 self-end lg:self-center">
                <button
                  onClick={() => openEditModal(col)}
                  className="px-3 py-1.5 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded flex items-center space-x-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Collection</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmCol(col)}
                  className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                  title="Delete Collection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create / Edit Collection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-xl w-full p-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2D8C6] mb-4">
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                {editingCollection ? `Edit: ${editingCollection.name}` : "Create New Collection"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-[#1F1A16]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Collection Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Royal Moradabad Heritage Atelier"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="royal-moradabad-atelier"
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-medium"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Collection Cover Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Editorial story behind this collection..."
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] leading-relaxed"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-[#1F1A16]">
                    Feature on Homepage Collection Showcase
                  </span>
                </label>
              </div>

              {/* Assign Products Checklist */}
              <div className="pt-3 border-t border-[#E2D8C6]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] font-heading">
                    Assign Products to Collection
                  </label>
                  <span className="text-[11px] text-[#A78044] font-bold font-number">
                    {selectedProductIds.length} Selected
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto divide-y divide-[#FAF7F2] border border-[#E2D8C6] bg-[#FAF8F5] p-2 space-y-1">
                  {allProducts.map((p) => {
                    const isChecked = selectedProductIds.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className="flex items-center justify-between p-2 hover:bg-white cursor-pointer rounded text-xs transition-colors"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleProduct(p.id)}
                            className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded focus:ring-0"
                          />
                          <span className="font-medium text-[#1F1A16] truncate">{p.name}</span>
                        </div>
                        <span className="font-number font-bold text-[#A78044] text-[11px] ml-2 flex-shrink-0">
                          {p.sku}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2D8C6] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] text-xs font-bold uppercase tracking-wider rounded shadow-md"
                >
                  {editingCollection ? "Update Collection" : "Save Collection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Collection */}
      {deleteConfirmCol && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Delete Collection
              </h3>
            </div>
            <p className="text-xs text-[#685E53] leading-relaxed mb-4">
              Are you sure you want to delete <strong className="text-[#1F1A16]">{deleteConfirmCol.name}</strong>?
              The products assigned to this collection will remain in the catalogue.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2D8C6]">
              <button
                onClick={() => setDeleteConfirmCol(null)}
                className="px-4 py-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
