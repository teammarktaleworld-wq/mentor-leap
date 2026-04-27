// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Card } from "@/components/ui/Card";
// import { Send, Bot, User, Sparkles } from "lucide-react";

// interface Message {
//   role: "bot" | "user";
//   text: string;
// }

// const GREETING: Message = {
//   role: "bot",
//   text: "Hello! I am MISHA, your personal AI Mentor at MentorLeap.\nHow can I help you accelerate your career today?",
// };

// export default function AiAssistantPage() {
//     const [messages, setMessages] = useState<Message[]>([GREETING]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const bottomRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, isTyping]);

//     const send = async (e?: React.FormEvent) => {
//         if (e) e.preventDefault();
//         const val = input.trim();
//         if (!val || isTyping) return;

//         const userMsg: Message = { role: "user", text: val };
//         setMessages((prev) => [...prev, userMsg]);
//         setInput("");
//         setIsTyping(true);

//         try {
//             const history = messages.slice(1).map(m => ({ 
//                 role: m.role === "bot" ? "assistant" : "user", 
//                 content: m.text 
//             }));
//             history.push({ role: "user", content: val });

//             const res = await fetch("/api/ai", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ messages: history, message: val }),
//             });
//             const data = await res.json();

//             setMessages((prev) => [
//                 ...prev,
//                 { role: "bot", text: data.reply || "I encountered an error. Please try again." },
//             ]);
//         } catch (error) {
//             setMessages((prev) => [
//                 ...prev,
//                 { role: "bot", text: "I'm having a connection glitch. Can you check your connection?" },
//             ]);
//         } finally {
//             setIsTyping(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto pb-20 px-4 py-8 md:p-10 h-full flex flex-col min-h-[85vh]">
//             <div className="mb-8 flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00e5ff] to-[#6366f1] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
//                     <Sparkles size={24} className="text-white" />
//                 </div>
//                 <div>
//                     <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">MISHA</h1>
//                     <p className="text-[#00e5ff] font-bold text-[10px] uppercase tracking-[0.2em]">Your Personal AI Mentor</p>
//                 </div>
//             </div>

//             <Card className="!p-0 bg-[#020617] border-white/10 flex flex-col flex-1 shadow-2xl overflow-hidden relative">
//                 {/* Background glow */}
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00e5ff]/5 blur-[120px] rounded-full pointer-events-none"></div>
                
//                 <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10 w-full">
//                     {messages.map((m, i) => (
//                         <div key={i} className={`flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
//                             <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 mt-1">
//                                 {m.role === "bot" ? <Bot size={14} className="text-[#00e5ff]" /> : <User size={14} className="text-[#cbd5f5]" />}
//                             </div>
//                             <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
//                                 m.role === "bot" 
//                                 ? "bg-white/5 border border-white/5 text-[#cbd5f5] rounded-tl-sm"
//                                 : "bg-gradient-to-br from-[#00e5ff] to-[#6366f1] text-[#020617] font-medium rounded-tr-sm"
//                             }`}>
//                                 {m.text}
//                             </div>
//                         </div>
//                     ))}
//                     {isTyping && (
//                         <div className="flex gap-4 max-w-[85%] mr-auto">
//                             <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 mt-1">
//                                 <Bot size={16} className="text-[#00e5ff]" />
//                             </div>
//                             <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1.5 h-[52px]">
//                                 <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce"></div>
//                                 <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:-0.15s]"></div>
//                                 <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:-0.3s]"></div>
//                             </div>
//                         </div>
//                     )}
//                     <div ref={bottomRef} />
//                 </div>

//                 <div className="p-4 border-t border-white/10 bg-[#0f172a]/80 backdrop-blur-md relative z-10">
//                     <form onSubmit={send} className="relative flex items-center">
//                         <input
//                             autoFocus
//                             type="text"
//                             placeholder="Ask MISHA anything..."
//                             className="w-full bg-[#020617] border border-white/10 rounded-xl py-3.5 md:py-4 pl-4 md:pl-6 pr-14 text-sm text-white focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/[0.02] transition-colors"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             disabled={isTyping}
//                         />
//                         <button
//                             type="submit"
//                             disabled={!input.trim() || isTyping}
//                             className="absolute right-2 p-2.5 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                         >
//                             <Send size={18} />
//                         </button>
//                     </form>
//                 </div>
//             </Card>
//         </div>
//     );
// }


"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import {
  Send, Bot, User, Sparkles, Calendar, Clock, MapPin,
  ChevronRight, X, Star, Zap, Users, BookOpen, ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "bot" | "user";
  text: string;
}

const GREETING: Message = {
  role: "bot",
  text: "Hello! I am MISHA, your personal AI Mentor at MentorLeap.\nHow can I help you accelerate your career today?\n\n💡 Don't miss our upcoming live masterclass — check the \"Interview to Offer\" panel below!",
};

const EVENT = {
  title: "Interview to Offer Letter",
  subtitle: "The Ultimate Communication Masterclass",
  tagline: "Learn to answer the most commonly asked interview questions with clarity, structure, and confidence.",
  date: "Thursday, 30th April 2026",
  time: "7:30 PM – 9:00 PM IST",
  price: "₹499",
  originalPrice: "₹1999",
  link: "http://localhost:3000/events/interview-to-offer-letter",
  zoomLink: "https://us05web.zoom.us/j/123456789?pwd=example",
  mentor: "Mridu Bhandari",
  mentorTitle: "Award-Winning Journalist • Communication Coach",
  mentorSub: "20+ years • 500+ professionals mentored • Google, Amazon & Fortune 500",
  outcomes: [
    "Introduction Patterns",
    "Handling Why Us?",
    "Strength/Weakness Storytelling",
    "Salary Negotiation Basics",
  ],
  modules: [
    { icon: "🎯", title: "Answering with Clarity", desc: "STAR & Pyramid methods" },
    { icon: "👔", title: "Executive Presence", desc: "Sound confident & authoritative" },
    { icon: "🤝", title: "Mastering Body Language", desc: "Eye contact, posture & virtual etiquette" },
    { icon: "🔁", title: "Repeatable Frameworks", desc: "Prep for any interview in 60 min" },
  ],
  bonuses: ["Interview Prep Guide (50+ Q&A)", "LinkedIn Optimization", "Email Follow-up Templates"],
  audience: ["Job Seekers", "Freshers", "Career Switchers", "Tech Professionals", "Students"],
};

// ─── Event Modal ─────────────────────────────────────────────────────────────
function EventModal({ onClose }: { onClose: () => void }) {
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(8px)" }}
      onClick={handleBackdrop}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,229,255,0.2)]"
        style={{
          background: "linear-gradient(145deg, #0a0f1e 0%, #020617 60%)",
          animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Top glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-[#00e5ff] via-[#6366f1] to-transparent" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={14} />
        </button>

        <div className="p-6 space-y-5">
          {/* Badge + Title */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-full px-3 py-1 mb-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00e5ff]" />
              </span>
              <span className="text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider">Live Masterclass · 30 Apr 2026</span>
            </div>
            <h2 className="text-white font-black text-2xl leading-tight mb-1">{EVENT.title}</h2>
            <p className="text-[#6366f1] font-semibold text-sm mb-2">{EVENT.subtitle}</p>
            <p className="text-[#94a3b8] text-xs leading-relaxed">{EVENT.tagline}</p>
          </div>

          {/* Date / Time / Location */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4 space-y-2.5">
            {[
              { icon: <Calendar size={13} className="text-[#00e5ff]" />, text: EVENT.date, bold: true },
              { icon: <Clock size={13} className="text-[#00e5ff]" />, text: EVENT.time },
              { icon: <MapPin size={13} className="text-[#00e5ff]" />, text: "Live on Zoom" },
            ].map(({ icon, text, bold }) => (
              <div key={text} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center flex-shrink-0">{icon}</div>
                <span className={bold ? "text-white font-semibold" : "text-[#cbd5f5]"}>{text}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white">{EVENT.price}</span>
              <div className="pb-1">
                <div className="text-[#94a3b8] line-through text-sm">{EVENT.originalPrice}</div>
                <div className="text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider">Special Launch Offer</div>
              </div>
            </div>
            <div className="bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-xl px-3 py-2 text-center">
              <div className="text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider">Save</div>
              <div className="text-white font-black text-lg">75%</div>
            </div>
          </div>

          {/* Modules */}
          <div>
            <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2.5">Core Modules</p>
            <div className="grid grid-cols-2 gap-2">
              {EVENT.modules.map((mod) => (
                <div key={mod.title} className="bg-white/[0.03] border border-white/8 rounded-xl p-3 hover:border-[#00e5ff]/30 transition-colors">
                  <div className="text-lg mb-1.5">{mod.icon}</div>
                  <div className="text-white text-[11px] font-bold leading-tight">{mod.title}</div>
                  <div className="text-[#94a3b8] text-[10px] leading-tight mt-0.5">{mod.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2.5">Session Outcomes</p>
            <div className="grid grid-cols-2 gap-1.5">
              {EVENT.outcomes.map((o) => (
                <div key={o} className="flex items-center gap-2 text-xs text-[#cbd5f5]">
                  <ChevronRight size={11} className="text-[#00e5ff] flex-shrink-0" />{o}
                </div>
              ))}
            </div>
          </div>

          {/* Bonuses */}
          <div className="bg-gradient-to-r from-[#00e5ff]/5 to-[#6366f1]/5 border border-[#00e5ff]/15 rounded-2xl p-4">
            <p className="text-[#00e5ff] text-[10px] uppercase tracking-widest font-bold mb-2.5 flex items-center gap-1.5">
              <Zap size={10} fill="#00e5ff" /> Exclusive Bonuses
            </p>
            <div className="space-y-1.5">
              {EVENT.bonuses.map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-[#cbd5f5]">
                  <Star size={10} className="text-[#00e5ff] flex-shrink-0" fill="#00e5ff" />{b}
                </div>
              ))}
            </div>
          </div>

          {/* Who it's for */}
          <div>
            <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
              <Users size={10} className="text-[#00e5ff]" /> Who This Is For
            </p>
            <div className="flex flex-wrap gap-1.5">
              {EVENT.audience.map((a) => (
                <span key={a} className="bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-medium px-2.5 py-1 rounded-full">{a}</span>
              ))}
            </div>
          </div>

          {/* Mentor */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-3">Your Mentor</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#6366f1] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(0,229,255,0.3)]">
                <BookOpen size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-black text-base">{EVENT.mentor}</div>
                <div className="text-[#94a3b8] text-[10px] leading-relaxed">{EVENT.mentorTitle}</div>
                <div className="text-[#94a3b8] text-[10px] leading-relaxed">{EVENT.mentorSub}</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-2.5 pt-1">
            <Link
              href={EVENT.link}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00e5ff] to-[#6366f1] text-[#020617] font-black text-sm hover:opacity-90 transition-opacity shadow-[0_4px_24px_rgba(0,229,255,0.35)]"
            >
              Secure Your Seat — {EVENT.price} <ArrowRight size={16} />
            </Link>
            <Link
              href={EVENT.zoomLink}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl border border-white/10 text-[#cbd5f5] font-medium text-xs hover:border-[#00e5ff]/40 hover:text-white transition-all"
            >
              Join Zoom Link
            </Link>
          </div>

          <p className="text-center text-[#94a3b8] text-[10px] pb-1">🔒 SSL Secured Checkout</p>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(14px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [eventOpen, setEventOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = input.trim();
    if (!val || isTyping) return;

    const userMsg: Message = { role: "user", text: val };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      }));
      history.push({ role: "user", content: val });

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, message: val }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "I encountered an error. Please try again." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having a connection glitch. Can you check your connection?" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {modalOpen && <EventModal onClose={() => setModalOpen(false)} />}

      <div className="max-w-7xl mx-auto px-4 py-6 md:px-10 md:py-8 flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
        {/* Header */}
        <div className="mb-5 flex items-center gap-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00e5ff] to-[#6366f1] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">MISHA</h1>
            <p className="text-[#00e5ff] font-bold text-[10px] uppercase tracking-[0.2em]">Your Personal AI Mentor</p>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex gap-5 flex-1 min-h-0 overflow-hidden">

          {/* ── Chat column ── */}
          <Card className="!p-0 bg-[#020617] border-white/10 flex flex-col flex-1 shadow-2xl overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00e5ff]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* ── Event announcement tab inside the chat card ── */}
            <button
              onClick={() => setModalOpen(true)}
              className="
                relative w-full flex items-center gap-2.5 px-4 py-2.5
                bg-[#00e5ff]/10 border-b border-[#00e5ff]/20
                hover:bg-[#00e5ff]/15 transition-colors group
                flex-shrink-0 z-10
              "
            >
              {/* Left: live pulse + icon + label */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]" />
              </span>

              <span className="text-[10px] text-[#00e5ff] font-bold uppercase tracking-wider flex-shrink-0">
                🎯
              </span>

              <span className="text-[#00e5ff] text-xs font-bold truncate">
                Interview to Offer — 30 Apr · ₹499
              </span>

              {/* Right: Register pill */}
              <span className="ml-auto flex items-center gap-1 text-[#020617] bg-[#00e5ff] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 group-hover:bg-white transition-colors">
                Register <ArrowRight size={10} />
              </span>
            </button>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 w-full">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 mt-1">
                    {m.role === "bot" ? (
                      <Bot size={14} className="text-[#00e5ff]" />
                    ) : (
                      <User size={14} className="text-[#cbd5f5]" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "bot"
                        ? "bg-white/5 border border-white/5 text-[#cbd5f5] rounded-tl-sm"
                        : "bg-gradient-to-br from-[#00e5ff] to-[#6366f1] text-[#020617] font-medium rounded-tr-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4 max-w-[85%] mr-auto">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 mt-1">
                    <Bot size={16} className="text-[#00e5ff]" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1.5 h-[52px]">
                    <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:-0.3s]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-[#0f172a]/80 backdrop-blur-md relative z-10">
              <form onSubmit={send} className="relative flex items-center">
                <input
                  autoFocus
                  type="text"
                  placeholder="Ask MISHA anything..."
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3.5 md:py-4 pl-4 md:pl-6 pr-14 text-sm text-white focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/[0.02] transition-colors"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2.5 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </Card>

          {/* ── Event sidebar panel (desktop) ── */}
          <div className={`${eventOpen ? "flex" : "hidden md:flex"} flex-col w-full md:w-[340px] lg:w-[380px] flex-shrink-0`}>
            <div className="bg-[#020617] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00e5ff] via-[#6366f1] to-transparent" />
              <div className="p-4 bg-gradient-to-r from-[#00e5ff]/10 to-[#6366f1]/10 border-b border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                <span className="text-[#00e5ff] text-xs font-bold uppercase tracking-widest flex-1">Upcoming Event</span>
                <button onClick={() => setEventOpen(false)} className="text-white/30 hover:text-white/70 transition-colors md:hidden">
                  <X size={14} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-full px-3 py-1 mb-3">
                    <Star size={10} className="text-[#00e5ff]" fill="#00e5ff" />
                    <span className="text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider">Communication Masterclass</span>
                  </div>
                  <h2 className="text-white font-black text-lg leading-tight mb-1">{EVENT.title}</h2>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{EVENT.subtitle}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm"><Calendar size={14} className="text-[#00e5ff] flex-shrink-0" /><span className="text-white font-semibold">{EVENT.date}</span></div>
                  <div className="flex items-center gap-2 text-sm"><Clock size={14} className="text-[#00e5ff] flex-shrink-0" /><span className="text-[#cbd5f5]">{EVENT.time}</span></div>
                  <div className="flex items-center gap-2 text-sm"><MapPin size={14} className="text-[#00e5ff] flex-shrink-0" /><span className="text-[#cbd5f5]">Live on Zoom</span></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-white">{EVENT.price}</span>
                  <div>
                    <div className="text-[#94a3b8] line-through text-sm">{EVENT.originalPrice}</div>
                    <div className="text-[#00e5ff] text-[10px] font-bold uppercase tracking-wider">Special Launch Offer</div>
                  </div>
                </div>
                <div>
                  <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2">Session Outcomes</p>
                  <div className="space-y-1.5">{EVENT.outcomes.map((o) => (<div key={o} className="flex items-center gap-2 text-xs text-[#cbd5f5]"><ChevronRight size={12} className="text-[#00e5ff] flex-shrink-0" />{o}</div>))}</div>
                </div>
                <div>
                  <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2">Core Modules</p>
                  <div className="grid grid-cols-2 gap-2">{EVENT.modules.map((mod) => (<div key={mod.title} className="bg-white/[0.03] border border-white/8 rounded-lg p-2.5 hover:border-[#00e5ff]/30 transition-colors"><div className="text-base mb-1">{mod.icon}</div><div className="text-white text-[11px] font-semibold leading-tight">{mod.title}</div><div className="text-[#94a3b8] text-[10px] leading-tight mt-0.5">{mod.desc}</div></div>))}</div>
                </div>
                <div>
                  <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2">Exclusive Bonuses</p>
                  <div className="space-y-1.5">{EVENT.bonuses.map((b) => (<div key={b} className="flex items-center gap-2 text-xs text-[#cbd5f5]"><Zap size={10} className="text-[#00e5ff] flex-shrink-0" fill="#00e5ff" />{b}</div>))}</div>
                </div>
                <div>
                  <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5"><Users size={10} className="text-[#00e5ff]" /> Who This Is For</p>
                  <div className="flex flex-wrap gap-1.5">{EVENT.audience.map((a) => (<span key={a} className="bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-medium px-2.5 py-1 rounded-full">{a}</span>))}</div>
                </div>
                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-3">
                  <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold mb-2">Your Mentor</p>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#6366f1] flex items-center justify-center flex-shrink-0"><BookOpen size={14} className="text-white" /></div>
                    <div>
                      <div className="text-white font-bold text-sm">{EVENT.mentor}</div>
                      <div className="text-[#94a3b8] text-[10px] leading-relaxed">{EVENT.mentorTitle}</div>
                      <div className="text-[#94a3b8] text-[10px] leading-relaxed">{EVENT.mentorSub}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pb-2">
                  <Link href={EVENT.link} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#6366f1] text-[#020617] font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(0,229,255,0.3)]">
                    Secure Your Seat <ArrowRight size={16} />
                  </Link>
                  <Link href={EVENT.zoomLink} target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 text-[#cbd5f5] font-medium text-xs hover:border-[#00e5ff]/40 hover:text-white transition-all">
                    Join Zoom Link
                  </Link>
                </div>
                <p className="text-center text-[#94a3b8] text-[10px]">🔒 SSL Secured Checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile toggle */}
        {!eventOpen && (
          <button
            onClick={() => setEventOpen(true)}
            className="fixed bottom-24 right-4 md:hidden z-50 bg-gradient-to-r from-[#00e5ff] to-[#6366f1] text-[#020617] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <Calendar size={14} /> View Event
          </button>
        )}
      </div>
    </>
  );
}