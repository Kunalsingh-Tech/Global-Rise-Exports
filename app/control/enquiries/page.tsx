"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  Filter,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Plus,
  AlertTriangle,
  X,
  FileText,
  User,
  Building,
  Globe,
  Package,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminEnquiry, EnquiryStatus } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";

export default function AdminEnquiriesPage() {
  const { success, error, info } = useToast();
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [deleteConfirmEnquiry, setDeleteConfirmEnquiry] = useState<AdminEnquiry | null>(null);

  const refreshEnquiries = () => {
    const list = adminStore.getEnquiries();
    setEnquiries(list);
    if (selectedEnquiry) {
      const updatedSelected = list.find((e) => e.id === selectedEnquiry.id);
      if (updatedSelected) setSelectedEnquiry(updatedSelected);
    }
  };

  useEffect(() => {
    refreshEnquiries();
    return adminStore.subscribe(refreshEnquiries);
  }, []);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.customerName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.companyName.toLowerCase().includes(q) ||
        e.country.toLowerCase().includes(q) ||
        e.productOfInterest.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" || e.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  }, [enquiries, searchQuery, statusFilter]);

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    const updated = adminStore.updateEnquiryStatus(id, newStatus);
    if (updated) {
      success("Status Updated", `Enquiry #${id} marked as ${newStatus.toUpperCase()}`);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteText.trim()) return;
    adminStore.addEnquiryNote(selectedEnquiry.id, newNoteText.trim());
    setNewNoteText("");
    success("Internal Note Added", "Note saved to buyer dossier.");
  };

  const handleDelete = () => {
    if (!deleteConfirmEnquiry) return;
    adminStore.deleteEnquiry(deleteConfirmEnquiry.id);
    if (selectedEnquiry?.id === deleteConfirmEnquiry.id) {
      setSelectedEnquiry(null);
    }
    success("Enquiry Deleted", `Enquiry #${deleteConfirmEnquiry.id} removed.`);
    setDeleteConfirmEnquiry(null);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>International Trade Desk &bull; RFQ Pipeline</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Enquiry Management
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Track wholesale quotation requests, contact overseas buyers, and record internal negotiations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 bg-white border border-[#E2D8C6] text-xs font-bold text-[#1F1A16] rounded font-number">
            Total: {enquiries.length} Enquiries
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#E2D8C6] p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, company, country, product..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16] focus:bg-white focus:outline-none font-medium"
          >
            <option value="all">All Statuses ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === "new").length})</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Enquiries Table / List + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table / List View */}
        <div className={`${selectedEnquiry ? "lg:col-span-7" : "lg:col-span-12"} space-y-3`}>
          <div className="bg-white border border-[#E2D8C6] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E2D8C6] text-[#685E53] font-heading font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Buyer &amp; Company</th>
                    <th className="py-3 px-3">Product of Interest</th>
                    <th className="py-3 px-3">Quantity</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF7F2]">
                  {filteredEnquiries.map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    return (
                      <tr
                        key={enq.id}
                        className={`hover:bg-[#FDFCF9] transition-colors cursor-pointer ${
                          isSelected ? "bg-[#FAF7F2] font-semibold" : ""
                        }`}
                        onClick={() => setSelectedEnquiry(enq)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-heading font-bold text-xs text-[#1F1A16]">
                            {enq.customerName}
                          </div>
                          <div className="text-[11px] text-[#685E53] truncate max-w-[170px]">
                            {enq.companyName} &bull; {enq.country}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-[#1F1A16] block truncate max-w-[190px]">
                            {enq.productOfInterest}
                          </span>
                          {enq.skuOfInterest && (
                            <span className="font-number font-bold text-[#A78044] text-[10px]">
                              {enq.skuOfInterest}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 font-number text-[#1F1A16]">
                          {enq.quantity}
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
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
                        </td>

                        <td className="py-3.5 px-3 font-number text-[11px] text-[#685E53] whitespace-nowrap">
                          {new Date(enq.submissionDate).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => setSelectedEnquiry(enq)}
                              className="px-2 py-1 bg-white border border-[#E2D8C6] hover:bg-[#EFE8DC] text-[11px] font-bold rounded"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => setDeleteConfirmEnquiry(enq)}
                              className="p-1 text-neutral-400 hover:text-rose-600 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredEnquiries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-xs text-[#685E53]">
                        No export inquiries found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Detail Pane */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white border border-[#E2D8C6] p-5 sm:p-6 shadow-lg space-y-5 animate-fadeIn">
            {/* Header of Detail */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E2D8C6]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78044] font-number">
                  RFQ #{selectedEnquiry.id}
                </span>
                <h3 className="font-heading text-lg font-black text-[#1F1A16] mt-0.5">
                  {selectedEnquiry.customerName}
                </h3>
                <span className="text-xs text-[#685E53]">
                  {selectedEnquiry.companyName} &bull; {selectedEnquiry.country}
                </span>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-neutral-400 hover:text-[#1F1A16]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="bg-[#FAF8F5] p-3 border border-[#E2D8C6] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F1A16] font-heading">
                Pipeline Status:
              </span>
              <select
                value={selectedEnquiry.status}
                onChange={(e) =>
                  handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)
                }
                className="py-1 px-2.5 text-xs bg-white border border-[#E2D8C6] font-bold text-[#1F1A16]"
              >
                <option value="new">NEW INQUIRY</option>
                <option value="contacted">CONTACTED</option>
                <option value="in_progress">IN PROGRESS</option>
                <option value="converted">CONVERTED (WON)</option>
                <option value="closed">CLOSED</option>
              </select>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`https://wa.me/${selectedEnquiry.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello ${selectedEnquiry.customerName}, this is Kunal Singh from Global Rise Exports (Moradabad, India) regarding your quotation request for ${selectedEnquiry.productOfInterest}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Quote</span>
              </a>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                  `Wholesale Export Quotation: ${selectedEnquiry.productOfInterest} - Global Rise Exports`
                )}&body=${encodeURIComponent(
                  `Dear ${selectedEnquiry.customerName},\n\nThank you for your interest in Global Rise Exports. Regarding your requirement for ${selectedEnquiry.quantity} of ${selectedEnquiry.productOfInterest}...\n\nBest regards,\nExport Desk\nGlobal Rise Exports, Moradabad, India`
                )}`}
                className="py-2.5 px-3 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send Official Email</span>
              </a>
            </div>

            {/* Product & Quantity Specification */}
            <div className="p-3.5 bg-[#FAF8F5] border border-[#E2D8C6] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#685E53]">Target Article:</span>
                <strong className="text-[#1F1A16]">{selectedEnquiry.productOfInterest}</strong>
              </div>
              {selectedEnquiry.skuOfInterest && (
                <div className="flex items-center justify-between">
                  <span className="text-[#685E53]">Model SKU:</span>
                  <span className="font-number font-bold text-[#A78044]">
                    {selectedEnquiry.skuOfInterest}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[#685E53]">Requested Volume:</span>
                <strong className="font-number text-[#1F1A16]">{selectedEnquiry.quantity}</strong>
              </div>
            </div>

            {/* Buyer Message */}
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                Client Inquiry Message
              </span>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E2D8C6] text-xs text-[#1F1A16] leading-relaxed italic">
                &ldquo;{selectedEnquiry.message}&rdquo;
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-1.5 text-xs text-[#685E53] border-t border-[#E2D8C6] pt-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[#1F1A16] font-medium">{selectedEnquiry.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[#1F1A16] font-number font-medium">
                  {selectedEnquiry.phoneNumber}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>
                  {selectedEnquiry.country} &bull; Received{" "}
                  {new Date(selectedEnquiry.submissionDate).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Internal Dossier Notes */}
            <div className="border-t border-[#E2D8C6] pt-3 space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] font-heading">
                Internal Trade Notes ({selectedEnquiry.internalNotes.length})
              </span>

              {/* Notes List */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedEnquiry.internalNotes.map((n) => (
                  <div key={n.id} className="p-2.5 bg-[#FAF7F2] border border-[#E2D8C6] text-xs">
                    <p className="text-[#1F1A16] font-medium leading-relaxed">{n.note}</p>
                    <span className="block text-[10px] text-neutral-400 font-number mt-1">
                      {n.author} &bull; {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {selectedEnquiry.internalNotes.length === 0 && (
                  <p className="text-[11px] text-neutral-400 italic">No notes recorded yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add internal note..."
                  className="flex-1 py-1.5 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#1F1A16] text-[#F6F2EA] text-xs font-bold uppercase rounded"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal: Delete Enquiry */}
      {deleteConfirmEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2D8C6] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-heading text-lg font-black text-[#1F1A16]">
                Delete Export Enquiry
              </h3>
            </div>
            <p className="text-xs text-[#685E53] leading-relaxed mb-4">
              Are you sure you want to delete inquiry #{deleteConfirmEnquiry.id} from{" "}
              <strong className="text-[#1F1A16]">{deleteConfirmEnquiry.customerName}</strong> ({deleteConfirmEnquiry.companyName})?
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2D8C6]">
              <button
                onClick={() => setDeleteConfirmEnquiry(null)}
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
