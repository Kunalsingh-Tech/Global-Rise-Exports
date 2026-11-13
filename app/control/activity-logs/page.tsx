"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  Package,
  Layers,
  FolderTree,
  Settings,
  MessageSquare,
  Clock,
  User,
  ArrowUpDown,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminAuditLog, AuditActionType } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminActivityLogsPage() {
  const { info } = useToast();
  const [logs, setLogs] = useState<AdminAuditLog[]>(adminStore.getAuditLogs());
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    const refresh = () => setLogs(adminStore.getAuditLogs());
    refresh();
    return adminStore.subscribe(refresh);
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        log.action.toLowerCase().includes(q) ||
        log.admin.toLowerCase().includes(q) ||
        log.affectedRecord.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q));

      const matchesType = typeFilter === "all" || log.actionType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [logs, searchQuery, typeFilter]);

  const getActionIcon = (type: AuditActionType) => {
    switch (type) {
      case "product_create":
      case "product_update":
      case "product_delete":
        return <Package className="w-4 h-4 text-[#A78044]" />;
      case "category_change":
        return <FolderTree className="w-4 h-4 text-emerald-600" />;
      case "collection_change":
        return <Layers className="w-4 h-4 text-amber-600" />;
      case "enquiry_update":
        return <MessageSquare className="w-4 h-4 text-sky-600" />;
      case "homepage_update":
      case "settings_update":
        return <Settings className="w-4 h-4 text-indigo-600" />;
      case "security_event":
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <History className="w-3.5 h-3.5" />
            <span>Administrative Governance &bull; Audit Trail</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Activity Audit Logs
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Immutable log of all administrative actions, catalog changes, and security events.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 bg-white border border-[#E2D8C6] text-xs font-bold text-[#1F1A16] rounded font-number">
            {logs.length} Recorded Events
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-[#E2D8C6] p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by action, administrator, or affected record..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="sm:w-60">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] font-medium"
          >
            <option value="all">All Action Types ({logs.length})</option>
            <option value="product_create">Product Created</option>
            <option value="product_update">Product Updated</option>
            <option value="product_delete">Product Deleted</option>
            <option value="category_change">Category Changes</option>
            <option value="collection_change">Collection Changes</option>
            <option value="enquiry_update">Enquiry Updates</option>
            <option value="homepage_update">Homepage CMS</option>
            <option value="settings_update">Settings / SEO</option>
            <option value="security_event">Security Events</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-[#E2D8C6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E2D8C6] text-[#685E53] font-heading font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-3">Action</th>
                <th className="py-3 px-3">Affected Entity</th>
                <th className="py-3 px-3">Administrator</th>
                <th className="py-3 px-3">Details / Context</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF7F2]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FDFCF9] transition-colors">
                  <td className="py-3 px-4">
                    <div className="p-1.5 rounded bg-[#FAF7F2] border border-[#E2D8C6] inline-flex items-center justify-center">
                      {getActionIcon(log.actionType)}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-heading font-bold text-xs text-[#1F1A16]">
                    {log.action}
                  </td>

                  <td className="py-3 px-3 font-medium text-[#1F1A16] max-w-[200px] truncate">
                    {log.affectedRecord}
                  </td>

                  <td className="py-3 px-3 text-[#685E53]">
                    <div className="flex items-center space-x-1.5">
                      <User className="w-3 h-3 text-neutral-400" />
                      <span>{log.admin}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[#685E53] text-[11px] max-w-[240px] truncate">
                    {log.details || "&mdash;"}
                  </td>

                  <td className="py-3 px-4 text-right font-number text-[11px] text-[#685E53] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#685E53]">
                    No activity logs match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
