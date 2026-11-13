"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  FolderTree,
  Layers,
  MessageSquare,
  PlusCircle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  FileEdit,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Globe,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminProduct, AdminEnquiry, AdminAuditLog } from "@/lib/admin-types";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);

  useEffect(() => {
    const loadData = () => {
      setProducts(adminStore.getProducts());
      setEnquiries(adminStore.getEnquiries());
      setAuditLogs(adminStore.getAuditLogs());
      setCategoriesCount(adminStore.getCategories().length);
      setCollectionsCount(adminStore.getCollections().length);
    };
    loadData();
    return adminStore.subscribe(loadData);
  }, []);

  // Compute metrics
  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.status === "published").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;
  const featuredProducts = products.filter((p) => p.isFeatured).length;
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  const recentProducts = products.slice(0, 5);
  const recentEnquiries = enquiries.slice(0, 5);
  const recentLogs = auditLogs.slice(0, 6);

  return (
    <div className="space-y-8 font-body">
      {/* Page Title & Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Moradabad Brassworks &bull; Export Control Center</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Atelier Executive Dashboard
          </h1>
          <p className="text-xs text-[#685E53] mt-1">
            Real-time control over products, wholesale inquiries, collections, and export operations.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/control/products/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/control/enquiries"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-[#E2D8C6] hover:bg-[#EFE8DC] text-[#1F1A16] rounded-md text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#A78044]" />
            <span>View Enquiries</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#FAF7F2] border border-[#E2D8C6] hover:bg-white text-[#685E53] hover:text-[#1F1A16] rounded-md text-xs font-semibold transition-all"
            title="Open Live Public Site"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Total Products */}
        <div className="bg-white border border-[#E2D8C6] p-4 sm:p-5 rounded-none shadow-sm hover:border-[#1F1A16] transition-colors group">
          <div className="flex items-center justify-between text-[#685E53] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-heading">
              Total Products
            </span>
            <div className="p-2 rounded-md bg-[#FAF7F2] group-hover:bg-[#1F1A16] group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-number text-2xl sm:text-3xl font-black text-[#1F1A16]">
              {totalProducts}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold font-number">
              {publishedProducts} Published
            </span>
          </div>
          <div className="mt-2 text-[10px] text-[#685E53] flex items-center justify-between border-t border-[#FAF7F2] pt-2">
            <span>{draftProducts} Drafts</span>
            <span>{featuredProducts} Featured</span>
          </div>
        </div>

        {/* Card 2: B2B Enquiries */}
        <div className="bg-white border border-[#E2D8C6] p-4 sm:p-5 rounded-none shadow-sm hover:border-[#1F1A16] transition-colors group">
          <div className="flex items-center justify-between text-[#685E53] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-heading">
              Export Enquiries
            </span>
            <div className="p-2 rounded-md bg-[#FAF7F2] group-hover:bg-[#1F1A16] group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-number text-2xl sm:text-3xl font-black text-[#1F1A16]">
              {totalEnquiries}
            </span>
            {newEnquiries > 0 ? (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold font-number">
                {newEnquiries} New Inquiries
              </span>
            ) : (
              <span className="text-[11px] text-emerald-700 font-medium font-number">
                All Cleared
              </span>
            )}
          </div>
          <div className="mt-2 text-[10px] text-[#685E53] flex items-center justify-between border-t border-[#FAF7F2] pt-2">
            <span>Response rate &lt; 12h</span>
            <Link href="/control/enquiries" className="text-[#A78044] font-semibold hover:underline">
              Manage &rarr;
            </Link>
          </div>
        </div>

        {/* Card 3: Categories & Collections */}
        <div className="bg-white border border-[#E2D8C6] p-4 sm:p-5 rounded-none shadow-sm hover:border-[#1F1A16] transition-colors group">
          <div className="flex items-center justify-between text-[#685E53] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-heading">
              Categories &amp; Lines
            </span>
            <div className="p-2 rounded-md bg-[#FAF7F2] group-hover:bg-[#1F1A16] group-hover:text-white transition-colors">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-number text-2xl sm:text-3xl font-black text-[#1F1A16]">
              {categoriesCount}
            </span>
            <span className="text-[11px] text-brand-dark font-medium font-number">
              {collectionsCount} Collections
            </span>
          </div>
          <div className="mt-2 text-[10px] text-[#685E53] flex items-center justify-between border-t border-[#FAF7F2] pt-2">
            <span>Peetal Nagri Classifications</span>
            <Link href="/control/categories" className="text-[#A78044] font-semibold hover:underline">
              View &rarr;
            </Link>
          </div>
        </div>

        {/* Card 4: Maritime & FOB Readiness */}
        <div className="bg-white border border-[#E2D8C6] p-4 sm:p-5 rounded-none shadow-sm hover:border-[#1F1A16] transition-colors group">
          <div className="flex items-center justify-between text-[#685E53] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-heading">
              Export Readiness
            </span>
            <div className="p-2 rounded-md bg-[#FAF7F2] group-hover:bg-[#1F1A16] group-hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-lg sm:text-xl font-black text-emerald-700">
              100% Active
            </span>
            <span className="text-[11px] text-[#A78044] font-semibold font-number">
              INR + USD
            </span>
          </div>
          <div className="mt-2 text-[10px] text-[#685E53] flex items-center justify-between border-t border-[#FAF7F2] pt-2">
            <span>Ports: JNPT &bull; DEL</span>
            <span className="font-semibold text-emerald-600">IEC Active</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Recent Inquiries & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (7 cols): Recent Export Enquiries */}
        <div className="lg:col-span-7 bg-white border border-[#E2D8C6] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2D8C6] mb-4">
            <div>
              <h2 className="font-heading text-base font-extrabold text-[#1F1A16]">
                Recent B2B Wholesale Enquiries
              </h2>
              <p className="text-xs text-[#685E53]">
                Direct buyer requests received from public catalogue &amp; WhatsApp RFQ
              </p>
            </div>
            <Link
              href="/control/enquiries"
              className="text-xs font-bold text-[#A78044] hover:text-[#1F1A16] flex items-center space-x-1"
            >
              <span>All Enquiries ({totalEnquiries})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#FAF7F2]">
            {recentEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FDFCF9] -mx-2 px-2 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-heading text-xs font-bold text-[#1F1A16] truncate">
                      {enq.customerName}
                    </span>
                    <span className="text-[10px] text-neutral-400">&bull;</span>
                    <span className="text-[11px] text-[#685E53] truncate">{enq.companyName}</span>
                  </div>
                  <p className="text-xs text-[#1F1A16] font-medium mt-0.5 truncate">
                    Interested in: <span className="font-semibold text-[#A78044]">{enq.productOfInterest}</span>
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] text-[#685E53] mt-1 font-number">
                    <span>Qty: {enq.quantity}</span>
                    <span>&bull;</span>
                    <span>{enq.country}</span>
                    <span>&bull;</span>
                    <span>{new Date(enq.submissionDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      enq.status === "new"
                        ? "bg-rose-100 text-rose-800"
                        : enq.status === "in_progress"
                        ? "bg-amber-100 text-amber-800"
                        : enq.status === "converted"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {enq.status.replace("_", " ")}
                  </span>
                  <Link
                    href={`/control/enquiries?id=${enq.id}`}
                    className="p-1.5 text-neutral-400 hover:text-[#1F1A16] hover:bg-[#FAF7F2] rounded"
                    title="Open Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Recent Products */}
        <div className="lg:col-span-5 bg-white border border-[#E2D8C6] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2D8C6] mb-4">
            <div>
              <h2 className="font-heading text-base font-extrabold text-[#1F1A16]">
                Recent Catalogue Additions
              </h2>
              <p className="text-xs text-[#685E53]">Active products with INR wholesale pricing</p>
            </div>
            <Link
              href="/control/products"
              className="text-xs font-bold text-[#A78044] hover:text-[#1F1A16] flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#FAF7F2]">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-[#FDFCF9] -mx-2 px-2 transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-11 h-11 bg-[#FAF7F2] border border-[#E2D8C6] overflow-hidden flex-shrink-0">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/control/products/${p.id}/edit`}
                      className="font-heading text-xs font-bold text-[#1F1A16] hover:text-[#A78044] transition-colors truncate block"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center space-x-2 text-[10px] text-[#685E53] mt-0.5">
                      <span className="font-number font-bold text-[#A78044]">{p.sku}</span>
                      <span>&bull;</span>
                      <span className="truncate">{p.category}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-number text-xs font-black text-[#1F1A16] block">
                    {p.price}
                  </span>
                  <Link
                    href={`/control/products/${p.id}/edit`}
                    className="text-[10px] font-semibold text-[#A78044] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Logs & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: Audit Trail */}
        <div className="lg:col-span-8 bg-white border border-[#E2D8C6] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2D8C6] mb-4">
            <div>
              <h2 className="font-heading text-base font-extrabold text-[#1F1A16]">
                Recent Administrative Activity
              </h2>
              <p className="text-xs text-[#685E53]">Logged changes across catalogue, CMS, and settings</p>
            </div>
            <Link
              href="/control/activity-logs"
              className="text-xs font-bold text-[#A78044] hover:text-[#1F1A16] flex items-center space-x-1"
            >
              <span>Full Audit Trail</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-3 text-xs p-3 bg-[#FAF8F5] border border-[#E2D8C6]/50"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#1F1A16] font-heading">{log.action}</span>
                    <span className="text-[10px] text-neutral-400">&bull;</span>
                    <span className="text-[11px] text-[#A78044] font-semibold font-number">
                      {log.admin}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#685E53]">{log.affectedRecord}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-[10px] text-neutral-400 font-number">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Action Shortcuts */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E2D8C6] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-base font-extrabold text-[#1F1A16] mb-1">
              Atelier Quick Operations
            </h2>
            <p className="text-xs text-[#685E53] mb-5">
              Direct access to frequent export catalogue tasks
            </p>

            <div className="space-y-2.5">
              <Link
                href="/control/products/new"
                className="flex items-center justify-between p-3 bg-white border border-[#E2D8C6] hover:border-[#1F1A16] text-xs font-bold text-[#1F1A16] transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <PlusCircle className="w-4 h-4 text-[#A78044]" />
                  <span>Publish New Brass Article</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/control/categories"
                className="flex items-center justify-between p-3 bg-white border border-[#E2D8C6] hover:border-[#1F1A16] text-xs font-bold text-[#1F1A16] transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <FolderTree className="w-4 h-4 text-[#A78044]" />
                  <span>Manage Categories ({categoriesCount})</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/control/homepage"
                className="flex items-center justify-between p-3 bg-white border border-[#E2D8C6] hover:border-[#1F1A16] text-xs font-bold text-[#1F1A16] transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <FileEdit className="w-4 h-4 text-[#A78044]" />
                  <span>Edit Homepage Hero &amp; Sections</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/control/media"
                className="flex items-center justify-between p-3 bg-white border border-[#E2D8C6] hover:border-[#1F1A16] text-xs font-bold text-[#1F1A16] transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-[#A78044]" />
                  <span>Upload High-Res Media</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2D8C6] text-[11px] text-[#685E53] flex items-center justify-between">
            <span>Export Cluster Status</span>
            <span className="font-bold text-emerald-700 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Moradabad Operational</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
