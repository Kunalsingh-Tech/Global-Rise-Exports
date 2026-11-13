"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Plus,
  AlertTriangle,
  X,
  FileImage,
  Database,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminMediaItem } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminMediaLibraryPage() {
  const { success, error, info } = useToast();
  const [media, setMedia] = useState<AdminMediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<AdminMediaItem | null>(null);

  // Upload Form Fields
  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [fileType, setFileType] = useState("image/jpeg");
  const [dimensions, setDimensions] = useState("1200 × 1500 px");

  const refreshMedia = () => {
    setMedia(adminStore.getMedia());
  };

  useEffect(() => {
    refreshMedia();
    return adminStore.subscribe(refreshMedia);
  }, []);

  const filteredMedia = useMemo(() => {
    return media.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      return !q || m.filename.toLowerCase().includes(q) || m.altText.toLowerCase().includes(q);
    });
  }, [media, searchQuery]);

  const handleCopyUrl = (item: AdminMediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    success("Path Copied", `Copied URL for ${item.filename}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      error("URL Required", "Please enter a valid image URL.");
      return;
    }

    const name = filename.trim() || `brass-asset-${Date.now()}.jpg`;
    adminStore.addMediaItem({
      filename: name,
      url: url.trim(),
      altText: altText.trim() || name,
      fileType,
      fileSize: "520 KB",
      dimensions,
    });

    success("Media Registered", `File '${name}' registered in media library.`);
    setIsUploadModalOpen(false);
    setFilename("");
    setUrl("");
    setAltText("");
  };

  const handleDelete = () => {
    if (!deleteConfirmItem) return;
    adminStore.deleteMediaItem(deleteConfirmItem.id);
    success("Media Deleted", `File '${deleteConfirmItem.filename}' removed.`);
    setDeleteConfirmItem(null);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Digital Asset Management</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Media Library
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Manage high-resolution photography of brass vessels, urlis, and foundry workshops.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <Upload className="w-4 h-4 text-[#C5A059]" />
          <span>Upload Image Asset</span>
        </button>
      </div>

      {/* Supabase Storage Notice */}
      <div className="p-3.5 bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <Database className="w-4 h-4 text-[#A78044] flex-shrink-0" />
          <span className="text-[#1F1A16]">
            Media assets are prepared for <strong>Supabase Storage</strong> bucket integration.
          </span>
        </div>
        <span className="text-[11px] text-[#685E53] font-number font-medium">
          {media.length} Archival Assets
        </span>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white border border-[#E2D8C6] p-4 shadow-sm flex items-center justify-between gap-3">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by filename, alt description..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
          />
        </div>
        <span className="text-xs text-[#685E53] font-number">
          Showing {filteredMedia.length} of {media.length} files
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border border-[#E2D8C6] shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#1F1A16] transition-all"
            >
              <div className="relative aspect-square bg-[#FAF7F2] overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 right-1.5 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopyUrl(item)}
                    className="p-1 bg-[#1F1A16]/90 text-white hover:bg-black rounded"
                    title="Copy URL"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteConfirmItem(item)}
                    className="p-1 bg-rose-600/90 text-white hover:bg-rose-700 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-2.5">
                <span className="font-heading font-bold text-[11px] text-[#1F1A16] truncate block">
                  {item.filename}
                </span>
                <div className="flex items-center justify-between text-[10px] text-[#685E53] mt-1 font-number">
                  <span>{item.fileSize}</span>
                  <span>{item.dimensions}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Upload Image */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2D8C6] mb-4">
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Register Media Asset
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-[#1F1A16]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Asset URL <span className="text-rose-600">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Filename
                </label>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="e.g. brass-carved-lotus-urli.jpg"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Alt Text Description
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g. Handcrafted brass urli on marble pedestal"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    MIME Type
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                  >
                    <option value="image/jpeg">JPEG (image/jpeg)</option>
                    <option value="image/png">PNG (image/png)</option>
                    <option value="image/webp">WebP (image/webp)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    Resolution
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="1200 × 1600 px"
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2D8C6] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#E2D8C6] text-xs font-bold rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] text-xs font-bold uppercase tracking-wider rounded shadow-md"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Media */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Delete Media File
              </h3>
            </div>
            <p className="text-xs text-[#685E53] leading-relaxed mb-4">
              Are you sure you want to delete <strong className="text-[#1F1A16]">{deleteConfirmItem.filename}</strong>?
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2D8C6]">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 bg-white border border-[#E2D8C6] text-xs font-bold rounded"
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
