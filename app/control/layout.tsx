"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Layers,
  MessageSquare,
  Image as ImageIcon,
  LayoutTemplate,
  Search as SearchIcon,
  Settings,
  ShieldCheck,
  History,
  User,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Database,
  ChevronRight,
} from "lucide-react";
import { ToastProvider, useToast } from "@/components/admin/AdminToast";
import { adminStore } from "@/lib/admin-store";
import { checkSupabaseStatus } from "@/lib/supabase";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [profile, setProfile] = useState(adminStore.getProfile());
  const supabaseStatus = checkSupabaseStatus();

  // If on login route, render standalone without sidebar
  const isLoginRoute = pathname === "/control/login";

  useEffect(() => {
    const updateStats = () => {
      const enqs = adminStore.getEnquiries();
      const newCount = enqs.filter((e) => e.status === "new").length;
      setEnquiriesCount(newCount);
      setProfile(adminStore.getProfile());
    };
    updateStats();
    return adminStore.subscribe(updateStats);
  }, []);

  const navSections = [
    {
      group: "Core Overview",
      items: [
        { name: "Dashboard", href: "/control/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      group: "Catalogue & Inventory",
      items: [
        { name: "All Products", href: "/control/products", icon: Package },
        { name: "Add New Product", href: "/control/products/new", icon: PlusCircle },
        { name: "Categories", href: "/control/categories", icon: FolderTree },
        { name: "Collections", href: "/control/collections", icon: Layers },
      ],
    },
    {
      group: "Trade & Operations",
      items: [
        {
          name: "B2B Enquiries",
          href: "/control/enquiries",
          icon: MessageSquare,
          badge: enquiriesCount > 0 ? `${enquiriesCount} New` : undefined,
        },
        { name: "Media Library", href: "/control/media", icon: ImageIcon },
      ],
    },
    {
      group: "Storefront & Content",
      items: [
        { name: "Homepage CMS", href: "/control/homepage", icon: LayoutTemplate },
        { name: "SEO Management", href: "/control/seo", icon: SearchIcon },
      ],
    },
    {
      group: "System & Governance",
      items: [
        { name: "Website Settings", href: "/control/settings", icon: Settings },
        { name: "Activity Logs", href: "/control/activity-logs", icon: History },
        { name: "Profile & Security", href: "/control/profile", icon: ShieldCheck },
      ],
    },
  ];

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F1A16] flex font-body selection:bg-brand-accent selection:text-white">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Luxury Charcoal Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#171411] text-[#EFE8DC] border-r border-[#2C2620] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#2C2620]">
          <div className="flex items-center justify-between">
            <Link
              href="/control/dashboard"
              className="flex flex-col group leading-none"
              onClick={() => setIsSidebarOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="font-heading text-lg font-black tracking-tight text-white group-hover:text-[#C5A059] transition-colors">
                  Global Rise Exports
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-[#A78044] font-bold mt-1 font-heading">
                Atelier Control Panel
              </span>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-md"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick link to public website */}
          <div className="mt-4 pt-3 border-t border-[#2C2620]/60 flex items-center justify-between text-xs">
            <span className="text-[11px] text-neutral-400 font-medium">Public Storefront</span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1 text-[#C5A059] hover:text-[#dfca99] text-[11px] font-semibold transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin">
          {navSections.map((sec) => (
            <div key={sec.group}>
              <div className="px-3 mb-2 text-[10px] uppercase font-bold tracking-widest text-[#847A6E]">
                {sec.group}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive =
                    item.href === "/control/products"
                      ? pathname === "/control/products"
                      : pathname === item.href || (item.href !== "/control/dashboard" && pathname.startsWith(item.href));

                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-[#C5A059] text-[#171411] font-bold shadow-md"
                          : "text-neutral-300 hover:text-white hover:bg-[#25201B]"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#171411]" : "text-[#A78044]"}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isActive
                              ? "bg-[#171411] text-[#C5A059]"
                              : "bg-[#25D366] text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Database & Profile Footer */}
        <div className="p-3.5 border-t border-[#2C2620] bg-[#120F0D]">
          {/* Supabase Status Pill */}
          <div className="mb-3 px-3 py-2 rounded-lg bg-[#1C1814] border border-[#2C2620] flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-2">
              <Database className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-neutral-300 font-medium">Data Storage</span>
            </div>
            <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Modular Store</span>
            </span>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between">
            <Link
              href="/control/profile"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center space-x-2.5 min-w-0 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#171411] font-heading font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                KS
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white group-hover:text-[#C5A059] transition-colors truncate">
                  {profile.name}
                </p>
                <p className="text-[10px] text-neutral-400 truncate">Lead Administrator</p>
              </div>
            </Link>

            <button
              onClick={() => {
                adminStore.setAuth(false);
                router.push("/control/login");
              }}
              className="p-1.5 text-neutral-400 hover:text-rose-400 transition-colors rounded-md"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Viewport */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Sticky Admin Header */}
        <header className="sticky top-0 z-30 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E2D8C6] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white border border-[#E2D8C6] text-[#1F1A16] hover:bg-[#EFE8DC] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center space-x-2 text-xs text-[#685E53] truncate font-medium">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-bold text-[#1F1A16] capitalize truncate">
                {pathname.replace("/control/", "").replace(/-/g, " ") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0">
            {/* Quick Add Product Button */}
            <Link
              href="/control/products/new"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Add Product</span>
            </Link>

            {/* Notification Bell */}
            <Link
              href="/control/enquiries"
              className="relative p-2 rounded-md bg-white border border-[#E2D8C6] hover:bg-[#EFE8DC] text-[#1F1A16] transition-colors"
              title="View Enquiries"
            >
              <Bell className="w-4 h-4" />
              {enquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-number text-[9px] font-black flex items-center justify-center">
                  {enquiriesCount}
                </span>
              )}
            </Link>

            {/* Profile Avatar link */}
            <Link
              href="/control/profile"
              className="flex items-center space-x-2 pl-2 border-l border-[#E2D8C6]"
            >
              <div className="w-7 h-7 rounded-full bg-[#1F1A16] text-[#C5A059] font-heading font-black text-xs flex items-center justify-center">
                KS
              </div>
              <span className="hidden md:inline text-xs font-bold text-[#1F1A16]">Kunal S.</span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </ToastProvider>
  );
}
