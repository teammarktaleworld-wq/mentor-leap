// "use client";
// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/Card";
// import { Loader } from "@/components/ui/Loader";
// import { Toast } from "@/components/ui/Toast";
// import { Modal } from "@/components/ui/Modal";
// import { AdminAPI } from "@/lib/admin-api";
// import { Mail, Phone, User, Briefcase, MessageSquare, Calendar } from "lucide-react";

// export default function AdminEventEnquiriesPage() {
//   const [enquiries, setEnquiries] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });
//   const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   const fetchEnquiries = async () => {
//     try {
//       setLoading(true);
//       const data = await AdminAPI.getEventEnquiries();
//       setEnquiries(Array.isArray(data) ? data : []);
//     } catch (error: any) {
//       setToast({ show: true, message: error.message || "Failed to load enquiries", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDateTime = (value: string | null | undefined) => {
//     if (!value) return "-";
//     return new Date(value).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="w-full">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-white">Event Enquiries</h1>
//           <p className="text-[#94a3b8] text-[10px] md:text-sm uppercase font-bold tracking-widest italic">Leads from event enquiry form</p>
//         </div>
//         <button
//           onClick={fetchEnquiries}
//           className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-all border border-white/5"
//         >
//           Refresh List
//         </button>
//       </div>

//       {loading ? (
//         <div className="flex justify-center p-20"><Loader /></div>
//       ) : enquiries.length === 0 ? (
//         <Card className="p-20 text-center text-[#475569] italic bg-white/5 border-white/5">No enquiries found yet.</Card>
//       ) : (
//         <Card className="!p-0 bg-white/[0.02] border-white/5 relative overflow-hidden">
//           <div className="overflow-x-auto custom-scrollbar">
//             <table className="w-full text-left min-w-[950px]">
//               <thead className="bg-[#0f172a] text-[#475569] text-[10px] uppercase font-black tracking-[0.2em] border-b border-white/5">
//                 <tr>
//                   <th className="px-8 py-5">Lead</th>
//                   <th className="px-8 py-5">Contact</th>
//                   <th className="px-8 py-5">Profession</th>
//                   <th className="px-8 py-5">Event</th>
//                   <th className="px-8 py-5">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {enquiries.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="hover:bg-white/[0.02] transition-colors cursor-pointer"
//                     onClick={() => setSelectedEnquiry(item)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" || e.key === " ") {
//                         e.preventDefault();
//                         setSelectedEnquiry(item);
//                       }
//                     }}
//                   >
//                     <td className="px-8 py-6">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8]">
//                           <User size={18} />
//                         </div>
//                         <span className="font-bold text-white text-sm">{item.name || "Unknown"}</span>
//                       </div>
//                     </td>
//                     <td className="px-8 py-6">
//                       <div className="space-y-1 text-xs text-[#cbd5f5]">
//                         <p className="flex items-center gap-2"><Mail size={12} className="text-[#64748b]" /> {item.email}</p>
//                         <p className="flex items-center gap-2"><Phone size={12} className="text-[#64748b]" /> {item.mobile}</p>
//                       </div>
//                     </td>
//                     <td className="px-8 py-6">
//                       <p className="flex items-center gap-2 text-sm text-white">
//                         <Briefcase size={13} className="text-[#64748b]" />
//                         {item.profession || "-"}
//                       </p>
//                     </td>
//                     <td className="px-8 py-6">
//                       <div className="text-xs">
//                         <p className="text-white font-bold">{item.eventTitle || "Interview to Offer Letter"}</p>
//                         <p className="text-[#64748b] uppercase font-black tracking-widest mt-1">{item.eventId || "-"}</p>
//                       </div>
//                     </td>
//                     <td className="px-8 py-6">
//                       <p className="flex items-center gap-2 text-sm text-[#cbd5f5]">
//                         <Calendar size={13} className="text-[#64748b]" />
//                         {formatDateTime(item.createdAt)}
//                       </p>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       <Modal
//         isOpen={!!selectedEnquiry}
//         onClose={() => setSelectedEnquiry(null)}
//         title="Enquiry Details"
//       >
//         {selectedEnquiry && (
//           <div className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-3 rounded-xl bg-white/5 border border-white/10">
//                 <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Name</p>
//                 <p className="text-white font-semibold">{selectedEnquiry.name || "-"}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-white/5 border border-white/10">
//                 <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Profession</p>
//                 <p className="text-white font-semibold">{selectedEnquiry.profession || "-"}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-white/5 border border-white/10">
//                 <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Email</p>
//                 <p className="text-[#cbd5f5] text-sm break-all">{selectedEnquiry.email || "-"}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-white/5 border border-white/10">
//                 <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Mobile</p>
//                 <p className="text-[#cbd5f5] text-sm">{selectedEnquiry.mobile || "-"}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-white/5 border border-white/10">
//                 <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Event</p>
//                 <p className="text-white text-sm font-semibold">{selectedEnquiry.eventTitle || "-"}</p>
//                 <p className="text-[#64748b] text-[10px] font-black uppercase tracking-widest mt-1">{selectedEnquiry.eventId || "-"}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-white/5 border border-white/10">
//                 <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">Date</p>
//                 <p className="text-[#cbd5f5] text-sm">{formatDateTime(selectedEnquiry.createdAt)}</p>
//               </div>
//             </div>

//             <div className="p-4 rounded-xl bg-white/5 border border-white/10">
//               <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
//                 <MessageSquare size={12} />
//                 Query
//               </p>
//               <p className="text-[#cbd5f5] text-sm leading-relaxed whitespace-pre-wrap">
//                 {selectedEnquiry.query || "-"}
//               </p>
//             </div>
//           </div>
//         )}
//       </Modal>

//       <Toast
//         isVisible={toast.show}
//         message={toast.message}
//         type={toast.type}
//         onClose={() => setToast({ ...toast, show: false })}
//       />
//     </div>
//   );
// }













"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Toast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { AdminAPI } from "@/lib/admin-api";
import {
  Mail,
  Phone,
  User,
  Briefcase,
  MessageSquare,
  Calendar,
  RefreshCw,
  Globe,
  Filter,
  Download,
  ExternalLink,
} from "lucide-react";

/* =========================================================
   TYPES
   ========================================================= */

interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profession?: string;
  eventTitle?: string;
  eventId?: string;
  query?: string;
  createdAt?: string;
  source?: string; // "contact_page" | "event_page" | etc.
}

/* =========================================================
   SOURCE BADGE
   Visually designates where the enquiry came from
   ========================================================= */

function SourceBadge({ source }: { source?: string }) {
  const isContact =
    !source ||
    source === "contact_page" ||
    source === "contact" ||
    source === "contact-form";

  if (isContact) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-violet-500/15 text-violet-300 border border-violet-500/20">
        <Globe size={9} />
        Contact Page
      </span>
    );
  }

  if (source === "event_page" || source === "event-form") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/15 text-blue-300 border border-blue-500/20">
        <ExternalLink size={9} />
        Event Page
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-[#64748b] border border-white/10">
      {source ?? "Unknown"}
    </span>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function formatDateTime(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportCSV(enquiries: Enquiry[]) {
  const headers = [
    "Name",
    "Email",
    "Mobile",
    "Profession",
    "Event",
    "Event ID",
    "Source",
    "Query",
    "Date",
  ];
  const rows = enquiries.map((e) => [
    e.name ?? "",
    e.email ?? "",
    e.mobile ?? "",
    e.profession ?? "",
    e.eventTitle ?? "",
    e.eventId ?? "",
    e.source ?? "contact_page",
    (e.query ?? "").replace(/\n/g, " "),
    formatDateTime(e.createdAt),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((v) => `"${v}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `event-enquiries-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5">
      <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-xs text-[#64748b] mt-1">{sub}</p>}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function AdminEventEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "contact" | "event">("all");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await AdminAPI.getEventEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Failed to load enquiries";
      setToast({ show: true, message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ── Derived data ── */
  const contactLeads = enquiries.filter(
    (e) =>
      !e.source ||
      e.source === "contact_page" ||
      e.source === "contact" ||
      e.source === "contact-form"
  );
  const eventLeads = enquiries.filter(
    (e) => e.source === "event_page" || e.source === "event-form"
  );

  const filtered = enquiries
    .filter((e) => {
      if (filter === "contact") return contactLeads.includes(e);
      if (filter === "event") return eventLeads.includes(e);
      return true;
    })
    .filter((e) => {
      const q = search.toLowerCase();
      return (
        !q ||
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.mobile?.includes(q) ||
        e.eventTitle?.toLowerCase().includes(q)
      );
    });

  /* ── Render ── */
  return (
    <div className="w-full space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
            Event Enquiries
          </h1>
          <p className="text-[#94a3b8] text-[10px] uppercase font-black tracking-widest italic">
            Leads from Contact Page & Event Pages
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportCSV(filtered)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-all border border-white/5"
          >
            <Download size={13} />
            Export CSV
          </button>
          <button
            onClick={fetchEnquiries}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-all border border-white/5"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Enquiries" value={enquiries.length} />
        <StatCard
          label="From Contact Page"
          value={contactLeads.length}
          sub="Via /contact form"
        />
        <StatCard
          label="From Event Pages"
          value={eventLeads.length}
          sub="Via event enquiry form"
        />
        <StatCard
          label="Showing"
          value={filtered.length}
          sub={filter === "all" ? "All sources" : filter}
        />
      </div>

      {/* ── Filters + Search ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Source filter tabs */}
        <div className="flex gap-1 p-1 bg-white/5 border border-white/5 rounded-xl">
          {(
            [
              { key: "all", label: "All" },
              { key: "contact", label: "Contact Page" },
              { key: "event", label: "Event Page" },
            ] as { key: typeof filter; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                filter === tab.key
                  ? "bg-white/10 text-white"
                  : "text-[#64748b] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Filter
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]"
          />
          <input
            type="text"
            placeholder="Search name, email, event…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder-[#475569] focus:outline-none focus:border-white/15"
          />
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex justify-center p-20">
          <Loader />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-20 text-center text-[#475569] italic bg-white/5 border-white/5">
          No enquiries found.
        </Card>
      ) : (
        <Card className="!p-0 bg-white/[0.02] border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
              <thead className="bg-[#0f172a] text-[#475569] text-[10px] uppercase font-black tracking-[0.18em] border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Profession</th>
                  <th className="px-6 py-4">Event</th>
                  {/* SOURCE COLUMN — shows Contact Page / Event Page designation */}
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer"
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
                    {/* Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] shrink-0">
                          <User size={16} />
                        </div>
                        <span className="font-bold text-white text-sm">
                          {item.name || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <div className="space-y-1 text-xs text-[#cbd5e1]">
                        <p className="flex items-center gap-2">
                          <Mail size={11} className="text-[#64748b] shrink-0" />
                          {item.email || "—"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={11} className="text-[#64748b] shrink-0" />
                          {item.mobile || "—"}
                        </p>
                      </div>
                    </td>

                    {/* Profession */}
                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-sm text-white">
                        <Briefcase size={12} className="text-[#64748b] shrink-0" />
                        {item.profession || "—"}
                      </p>
                    </td>

                    {/* Event */}
                    <td className="px-6 py-5">
                      <p className="text-white text-sm font-semibold leading-tight">
                        {item.eventTitle || "General Enquiry"}
                      </p>
                      {item.eventId && (
                        <p className="text-[#64748b] text-[10px] uppercase font-black tracking-widest mt-1">
                          {item.eventId}
                        </p>
                      )}
                    </td>

                    {/* SOURCE — key column */}
                    <td className="px-6 py-5">
                      <SourceBadge source={item.source} />
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-xs text-[#94a3b8]">
                        <Calendar size={11} className="text-[#64748b] shrink-0" />
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

      {/* ── Detail Modal ── */}
      <Modal
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title="Enquiry Details"
      >
        {selectedEnquiry && (
          <div className="space-y-4">
            {/* Source designation — prominent at top */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Globe size={14} className="text-[#64748b] shrink-0" />
              <div>
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest">
                  Lead Source
                </p>
                <div className="mt-1">
                  <SourceBadge source={selectedEnquiry.source} />
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Name", value: selectedEnquiry.name },
                { label: "Profession", value: selectedEnquiry.profession },
                { label: "Email", value: selectedEnquiry.email },
                { label: "Mobile", value: selectedEnquiry.mobile },
                {
                  label: "Event",
                  value: selectedEnquiry.eventTitle || "General Enquiry",
                },
                { label: "Event ID", value: selectedEnquiry.eventId },
                { label: "Received", value: formatDateTime(selectedEnquiry.createdAt) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <p className="text-white text-sm font-semibold break-all">
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Query */}
            {selectedEnquiry.query && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <MessageSquare size={11} />
                  Message / Query
                </p>
                <p className="text-[#cbd5e1] text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.query}
                </p>
              </div>
            )}

            {/* Quick actions */}
            <div className="flex gap-2 pt-1">
              <a
                href={`mailto:${selectedEnquiry.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-all border border-white/5"
              >
                <Mail size={12} />
                Send Email
              </a>
              {selectedEnquiry.mobile && (
                <a
                  href={`tel:${selectedEnquiry.mobile}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase transition-all border border-white/5"
                >
                  <Phone size={12} />
                  Call
                </a>
              )}
              {selectedEnquiry.mobile && (
                <a
                  href={`https://wa.me/91${selectedEnquiry.mobile.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl text-xs font-bold uppercase transition-all border border-green-500/20"
                >
                  <Phone size={12} />
                  WhatsApp
                </a>
              )}
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


