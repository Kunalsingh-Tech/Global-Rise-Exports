"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderTree,
  PlusCircle,
  Edit,
  Trash2,
  Package,
  CheckCircle2,
  XCircle,
  ExternalLink,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminCategory } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminCategoriesPage() {
  const { success, error, info } = useToast();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [deleteConfirmCat, setDeleteConfirmCat] = useState<AdminCategory | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const refreshCategories = () => {
    setCategories(adminStore.getCategories());
  };

  useEffect(() => {
    refreshCategories();
    return adminStore.subscribe(refreshCategories);
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop");
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setSeoTitle("");
    setSeoDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
    setDisplayOrder(cat.displayOrder);
    setIsActive(cat.isActive);
    setSeoTitle(cat.seoTitle);
    setSeoDescription(cat.seoDescription);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
      setSeoTitle(`${val} | Global Rise Exports`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error("Validation Error", "Category Name is required.");
      return;
    }

    const payload: Partial<AdminCategory> & { name: string } = {
      ...(editingCategory ? { id: editingCategory.id } : {}),
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: description.trim(),
      image: image.trim(),
      displayOrder: Number(displayOrder),
      isActive,
      seoTitle: seoTitle || `${name} | Global Rise Exports`,
      seoDescription: seoDescription || description,
    };

    const saved = adminStore.saveCategory(payload);
    success(
      editingCategory ? "Category Updated" : "Category Created",
      `'${saved.name}' successfully saved.`
    );
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleteConfirmCat) return;
    adminStore.deleteCategory(deleteConfirmCat.id);
    success("Category Deleted", `'${deleteConfirmCat.name}' removed.`);
    setDeleteConfirmCat(null);
  };

  const handleToggleActive = (cat: AdminCategory) => {
    adminStore.saveCategory({ ...cat, isActive: !cat.isActive });
    info(
      "Status Changed",
      `Category '${cat.name}' is now ${!cat.isActive ? "ACTIVE" : "INACTIVE"}`
    );
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Catalogue Taxonomy</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Category Management
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Organize Moradabad brass articles into export collections and architectural categories.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#C5A059]" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-[#E2D8C6] shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#1F1A16] transition-all"
            >
              <div>
                {/* Category Thumbnail */}
                <div className="relative h-44 bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#1F1A16]/90 text-white text-[10px] font-bold font-number uppercase">
                    Order #{cat.displayOrder}
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={() => handleToggleActive(cat)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm transition-all ${
                        cat.isActive
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-neutral-100 text-neutral-600 border-neutral-300"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-heading text-base font-extrabold text-[#1F1A16]">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-[10px] text-[#A78044] block mt-0.5">
                    /{cat.slug}
                  </span>
                  <p className="text-xs text-[#685E53] mt-2 line-clamp-2 leading-relaxed">
                    {cat.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E2D8C6] flex items-center justify-between text-xs">
                <Link
                  href={`/catalogue?category=${encodeURIComponent(cat.name)}`}
                  target="_blank"
                  className="text-[11px] font-semibold text-[#685E53] hover:text-[#1F1A16] flex items-center space-x-1"
                >
                  <span>Filter in Catalogue</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 text-neutral-500 hover:text-[#1F1A16] hover:bg-white rounded transition-colors"
                    title="Edit Category"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmCat(cat)}
                    className="p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-white rounded transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal: Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-lg w-full p-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2D8C6] mb-4">
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : "Create New Category"}
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
                  Category Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Architectural Planters"
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
                    placeholder="architectural-planters"
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] font-number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Category Banner Image URL
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
                  placeholder="Short description of this product line..."
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] leading-relaxed"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#1F1A16] border-[#E2D8C6] rounded focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-[#1F1A16]">
                    Set as Active Category (Shown in catalogue filters)
                  </span>
                </label>
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
                  {editingCategory ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Category */}
      {deleteConfirmCat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Delete Category
              </h3>
            </div>
            <p className="text-xs text-[#685E53] leading-relaxed mb-4">
              Are you sure you want to delete <strong className="text-[#1F1A16]">{deleteConfirmCat.name}</strong>?
              Existing products assigned to this category will not be deleted, but will need to be reclassified.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2D8C6]">
              <button
                onClick={() => setDeleteConfirmCat(null)}
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
