"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Toast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { AdminAPI } from "@/lib/admin-api";
import { Mail, Phone, User, Briefcase, MessageSquare, Calendar } from "lucide-react";

export default function AdminEventEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await AdminAPI.getEventEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error: any) {
      setToast({ show: true, message: error.message || "Failed to load enquiries", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (value: string | null | undefined) => {
    if (!value) return "-";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-white">Event Enquiries</h1>
          <p className="text-[#94a3b8] text-[10px] md:text-sm uppercase font-bold tracking-widest italic">Leads from event enquiry form</p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-all border border-white/5"
        >
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><Loader /></div>
      ) : enquiries.length === 0 ? (
        <Card className="p-20 text-center text-[#475569] italic bg-white/5 border-white/5">No enquiries found yet.</Card>
      ) : (
        <Card className="!p-0 bg-white/[0.02] border-white/5 relative overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[950px]">
              <thead className="bg-[#0f172a] text-[#475569] text-[10px] uppercase font-black tracking-[0.2em] border-b border-white/5">
                <tr>
                  <th className="px-8 py-5">Lead</th>
                  <th className="px-8 py-5">Contact</th>
                  <th className="px-8 py-5">Profession</th>
                  <th className="px-8 py-5">Event</th>
                  <th className="px-8 py-5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setSelectedEnquiry(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedEnquiry(item);
                      }
                    }}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8]">
                          <User size={18} />
                        </div>
                        <span className="font-bold text-white text-sm">{item.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1 text-xs text-[#cbd5f5]">
                        <p className="flex items-center gap-2"><Mail size={12} className="text-[#64748b]" /> {item.email}</p>
                        <p className="flex items-center gap-2"><Phone size={12} className="text-[#64748b]" /> {item.mobile}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="flex items-center gap-2 text-sm text-white">
                        <Briefcase size={13} className="text-[#64748b]" />
                        {item.profession || "-"}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs">
                        <p className="text-white font-bold">{item.eventTitle || "Interview to Offer Letter"}</p>
                        <p className="text-[#64748b] uppercase font-black tracking-widest mt-1">{item.eventId || "-"}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="flex items-center gap-2 text-sm text-[#cbd5f5]">
                        <Calendar size={13} className="text-[#64748b]" />
                        {formatDateTime(item.createdAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title="Enquiry Details"
      >
        {selectedEnquiry && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Name</p>
                <p className="text-white font-semibold">{selectedEnquiry.name || "-"}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Profession</p>
                <p className="text-white font-semibold">{selectedEnquiry.profession || "-"}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Email</p>
                <p className="text-[#cbd5f5] text-sm break-all">{selectedEnquiry.email || "-"}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Mobile</p>
                <p className="text-[#cbd5f5] text-sm">{selectedEnquiry.mobile || "-"}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Event</p>
                <p className="text-white text-sm font-semibold">{selectedEnquiry.eventTitle || "-"}</p>
                <p className="text-[#64748b] text-[10px] font-black uppercase tracking-widest mt-1">{selectedEnquiry.eventId || "-"}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Date</p>
                <p className="text-[#cbd5f5] text-sm">{formatDateTime(selectedEnquiry.createdAt)}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <MessageSquare size={12} />
                Query
              </p>
              <p className="text-[#cbd5f5] text-sm leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.query || "-"}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
