"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  CheckSquare,
  Square,
  AlertTriangle,
  X,
  CheckCircle2,
  Sparkles,
  Eye,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminProduct, ProductStatus } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminProductsPage() {
  const { success, error, info } = useToast();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [collectionFilter, setCollectionFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteModalProduct, setDeleteModalProduct] = useState<AdminProduct | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const load = () => {
      setProducts(adminStore.getProducts());
    };
    load();
    return adminStore.subscribe(load);
  }, []);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.finish.some((f) => f.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesCollection = collectionFilter === "all" || p.collection === collectionFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesCollection;
    }).sort((a, b) => {
      if (sortBy === "price-high") return b.numericPrice - a.numericPrice;
      if (sortBy === "price-low") return a.numericPrice - b.numericPrice;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      // default newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, searchQuery, statusFilter, categoryFilter, collectionFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const collections = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.collection)));
  }, [products]);

  // Bulk Selection Handlers
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatus = (status: ProductStatus) => {
    if (selectedIds.length === 0) return;
    const count = adminStore.bulkUpdateStatus(selectedIds, status);
    success("Bulk Update Completed", `${count} products updated to ${status.toUpperCase()}`);
    setSelectedIds([]);
  };

  const handleBulkDeleteConfirm = () => {
    if (selectedIds.length === 0) return;
    const count = adminStore.bulkDelete(selectedIds);
    success("Products Deleted", `${count} products permanently removed.`);
    setSelectedIds([]);
    setIsBulkDeleteModalOpen(false);
  };

  const handleDeleteSingle = (p: AdminProduct) => {
    setDeleteModalProduct(p);
  };

  const confirmSingleDelete = () => {
    if (!deleteModalProduct) return;
    adminStore.deleteProduct(deleteModalProduct.id);
    success("Product Deleted", `${deleteModalProduct.name} has been removed.`);
    setDeleteModalProduct(null);
  };

  const handleDuplicate = (id: string) => {
    const copy = adminStore.duplicateProduct(id);
    if (copy) {
      success("Product Duplicated", `Created ${copy.sku} as draft.`);
    } else {
      error("Duplication Failed", "Could not duplicate product.");
    }
  };

  const handleToggleStatus = (p: AdminProduct) => {
    const newStatus: ProductStatus =
      p.status === "published" ? "draft" : "published";
    adminStore.saveProduct({ id: p.id, name: p.name, sku: p.sku, status: newStatus });
    info("Status Updated", `${p.sku} is now ${newStatus.toUpperCase()}`);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header & Main Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <Package className="w-3.5 h-3.5" />
            <span>Foundry Catalog Inventory</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Product Management
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Manage brassware models, dimensions, pricing in INR, SKUs, and public visibility.
          </p>
        </div>

        <Link
          href="/control/products/new"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#C5A059]" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-[#E2D8C6] p-4 shadow-sm space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Field */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, SKU (e.g. GBR-804)..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1F1A16]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors font-medium text-[#1F1A16]"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors font-medium text-[#1F1A16]"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors font-medium text-[#1F1A16]"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price-high">Price: High to Low (₹)</option>
              <option value="price-low">Price: Low to High (₹)</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Bulk Action Bar (Appears when items are selected) */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 bg-[#FAF7F2] border border-[#C5A059] flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1F1A16]">
              <span className="w-5 h-5 rounded-full bg-[#1F1A16] text-[#F6F2EA] flex items-center justify-center font-number text-[11px]">
                {selectedIds.length}
              </span>
              <span>Products selected</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkStatus("published")}
                className="px-2.5 py-1 text-xs font-bold bg-white border border-[#E2D8C6] hover:bg-[#EFE8DC] text-[#1F1A16] transition-colors rounded"
              >
                Set Published
              </button>
              <button
                onClick={() => handleBulkStatus("draft")}
                className="px-2.5 py-1 text-xs font-bold bg-white border border-[#E2D8C6] hover:bg-[#EFE8DC] text-[#685E53] transition-colors rounded"
              >
                Set Draft
              </button>
              <button
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="px-2.5 py-1 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors rounded flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Data Table */}
      <div className="bg-white border border-[#E2D8C6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E2D8C6] text-[#685E53] font-heading font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 w-10 text-center">
                  <button onClick={handleSelectAll} title="Select All On Page">
                    {selectedIds.length > 0 && selectedIds.length === paginatedProducts.length ? (
                      <CheckSquare className="w-4 h-4 text-[#1F1A16]" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price (₹ INR)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF7F2]">
              {paginatedProducts.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-[#FDFCF9] transition-colors ${
                      isSelected ? "bg-[#FAF7F2]" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => handleToggleSelect(p.id)}>
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#1F1A16]" />
                        ) : (
                          <Square className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                    </td>

                    {/* Image & Title */}
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3 min-w-[200px]">
                        <div className="relative w-12 h-12 bg-[#FAF7F2] border border-[#E2D8C6] overflow-hidden flex-shrink-0">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/control/products/${p.id}/edit`}
                            className="font-heading font-bold text-xs text-[#1F1A16] hover:text-[#A78044] transition-colors truncate block"
                          >
                            {p.name}
                          </Link>
                          <span className="text-[10px] text-[#685E53] truncate block">
                            {p.material} &bull; {p.weight}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-3">
                      <span className="font-number font-bold text-[#A78044] text-[11px]">
                        {p.sku}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-[#1F1A16] font-medium">
                      {p.category}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3">
                      <span className="font-number font-black text-sm text-[#1F1A16]">
                        {p.price}
                      </span>
                      <span className="block text-[9px] text-[#685E53] uppercase">
                        Wholesale FOB
                      </span>
                    </td>

                    {/* Status Pill with Toggle */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                          p.status === "published"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                            : p.status === "draft"
                            ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                            : "bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {p.status}
                      </button>
                    </td>

                    {/* Featured Star/Badge */}
                    <td className="py-3 px-3 text-center">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF7F2] text-[#A78044] border border-[#C5A059]">
                          Featured
                        </span>
                      ) : (
                        <span className="text-neutral-400">&mdash;</span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          href={`/catalogue/${p.slug}`}
                          target="_blank"
                          className="p-1.5 text-neutral-400 hover:text-[#1F1A16] rounded"
                          title="View on Public Site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/control/products/${p.id}/edit`}
                          className="p-1.5 text-neutral-400 hover:text-[#1F1A16] hover:bg-[#FAF7F2] rounded"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          className="p-1.5 text-neutral-400 hover:text-[#A78044] hover:bg-[#FAF7F2] rounded"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSingle(p)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-[#685E53]">
                    <div className="flex flex-col items-center space-y-2">
                      <Package className="w-8 h-8 text-neutral-300" />
                      <p className="font-heading font-bold text-sm text-[#1F1A16]">
                        No brass products match your search or filter
                      </p>
                      <p className="text-[11px]">
                        Try clearing filters or search query to see catalog articles.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E2D8C6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#685E53]">
          <div>
            Showing <span className="font-bold text-[#1F1A16] font-number">{paginatedProducts.length}</span> of{" "}
            <span className="font-bold text-[#1F1A16] font-number">{filteredProducts.length}</span> products
          </div>

          {totalPages > 1 && (
            <div className="flex items-center space-x-1 font-number">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 bg-white border border-[#E2D8C6] disabled:opacity-40 rounded text-xs font-semibold"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                    currentPage === num
                      ? "bg-[#1F1A16] text-white"
                      : "bg-white border border-[#E2D8C6] hover:bg-[#FAF7F2] text-[#1F1A16]"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 bg-white border border-[#E2D8C6] disabled:opacity-40 rounded text-xs font-semibold"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal: Delete Single Product */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Confirm Product Deletion
              </h3>
            </div>
            <p className="text-xs text-[#685E53] leading-relaxed mb-4">
              Are you sure you want to permanently delete:
              <br />
              <strong className="text-[#1F1A16] block mt-1">
                {deleteModalProduct.name} ({deleteModalProduct.sku})
              </strong>
              This action cannot be undone. Public links to this product will become inactive.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2D8C6]">
              <button
                onClick={() => setDeleteModalProduct(null)}
                className="px-4 py-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmSingleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Bulk Delete */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Bulk Delete {selectedIds.length} Products
              </h3>
            </div>
            <p className="text-xs text-[#685E53] leading-relaxed mb-4">
              You are about to permanently delete <strong className="text-[#1F1A16]">{selectedIds.length}</strong> selected products. This action will immediately remove them from the export catalog.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2D8C6]">
              <button
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1A16] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDeleteConfirm}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Confirm Bulk Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
