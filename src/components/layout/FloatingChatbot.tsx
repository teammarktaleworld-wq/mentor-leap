// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { useAuth } from "@/components/providers/AuthProvider";
// import Link from "next/link";

// interface Message {
//   role: "bot" | "user";
//   text: string;
// }

// const SUGGESTIONS = ["Live Events", "Premium Courses", "Executive Coaching", "Corporate Training"];

// const BOT_REPLIES: Record<string, string> = {
//   "live events":
//     "🚀 Join our high-impact live learning experiences designed for rapid skill acquisition and networking. Check the 'Live Events' page for upcoming bootcamps.",
//   "premium courses":
//     "🎓 Explore our comprehensive library of elite communication, leadership, and personal branding programs. Visit the 'Explore Courses' section to begin.",
//   "executive coaching":
//     "👑 Master executive presence with 1-on-1 coaching from Mridu Bhandari. Perfect for leaders and founders looking to scale their influence.",
//   "corporate training":
//     "🏢 MentorLeap offers high-impact corporate leadership training for teams and executives. Reach out via the Contact section to book a session with Mridu.",
// };

// const GREETING: Message = {
//   role: "bot",
//   text: "Hello! I am MISHA, your personal AI Mentor at MentorLeap.\nHow can I help you accelerate your career today?",
// };

// export default function FloatingChatbot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [greetingDone, setGreetingDone] = useState(false);
//   const [typedGreeting, setTypedGreeting] = useState("");
//   const [chatVisible, setChatVisible] = useState(false);
//   const { user, loading: authLoading } = useAuth();
//   const bodyRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // greeting typewriter on first open
//   useEffect(() => {
//     if (!open || greetingDone) return;
//     const full = GREETING.text;
//     let i = 0;
//     const t = setInterval(() => {
//       if (i <= full.length) {
//         setTypedGreeting(full.slice(0, i));
//         i++;
//       } else {
//         clearInterval(t);
//         setGreetingDone(true);
//         setMessages([{ role: "bot", text: full }]);
//       }
//     }, 28);
//     return () => clearInterval(t);
//   }, [open, greetingDone]);

//   // slide-in chat window
//   useEffect(() => {
//     if (open) {
//       requestAnimationFrame(() => setChatVisible(true));
//       setTimeout(() => inputRef.current?.focus(), 400);
//     } else {
//       setChatVisible(false);
//     }
//   }, [open]);

//   // auto-scroll
//   useEffect(() => {
//     if (bodyRef.current)
//       bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
//   }, [messages, typedGreeting]);

//   const [isTyping, setIsTyping] = useState(false);

//   const send = async (text: string) => {
//     const val = text.trim();
//     if (!val || isTyping) return;

//     const userMsg: Message = { role: "user", text: val };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       // Map history for context-aware responses (same as student dashboard)
//       const history = messages.map(m => ({ 
//         role: m.role === "bot" ? "assistant" : "user" as const, 
//         content: m.text 
//       }));
//       history.push({ role: "user", content: val });

//       const res = await fetch("/api/ai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           messages: history,
//           message: val 
//         }),
//       });
//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: data.reply || data.response || "I'm processing that session. One moment..." },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "I'm having a slight connection glitch. Can we try that again?" },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleKey = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") send(input);
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes mishaPulse {
//           0%   { box-shadow: 0 0 0 0   rgba(0,229,255,0.6); }
//           70%  { box-shadow: 0 0 0 18px rgba(0,229,255,0);   }
//           100% { box-shadow: 0 0 0 0   rgba(0,229,255,0);    }
//         }
//         .misha-float-icon {
//           animation: mishaPulse 2s infinite;
//           transition: transform 0.3s ease;
//         }
//         .misha-float-icon:hover {
//           transform: scale(1.1);
//         }
//         .misha-chat-window {
//           opacity: 0;
//           transform: translateY(16px) scale(0.97);
//           transition: opacity 0.35s ease, transform 0.35s ease;
//           pointer-events: none;
//         }
//         .misha-chat-window.visible {
//           opacity: 1;
//           transform: translateY(0) scale(1);
//           pointer-events: all;
//         }
//         .misha-body::-webkit-scrollbar { width: 4px; }
//         .misha-body::-webkit-scrollbar-track { background: transparent; }
//         .misha-body::-webkit-scrollbar-thumb {
//           background: rgba(0,229,255,0.2);
//           border-radius: 4px;
//         }
//         .misha-suggestion-btn {
//           border: 1px solid rgba(0,229,255,0.2);
//           background: #0f172a;
//           color: #cbd5f5;
//           padding: 5px 12px;
//           border-radius: 20px;
//           cursor: pointer;
//           font-size: 12px;
//           transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
//           white-space: nowrap;
//         }
//         .misha-suggestion-btn:hover {
//           background: rgba(0,229,255,0.1);
//           border-color: #00e5ff;
//           color: white;
//           transform: translateY(-2px);
//         }
//         .misha-send-btn {
//           background: linear-gradient(135deg, #00e5ff, #6366f1);
//           border: none;
//           padding: 10px 16px;
//           cursor: pointer;
//           color: white;
//           font-size: 16px;
//           transition: opacity 0.2s ease, transform 0.2s ease;
//         }
//         .misha-send-btn:hover {
//           opacity: 0.85;
//           transform: scale(1.05);
//         }
//         .misha-input-field {
//           flex: 1;
//           padding: 10px 14px;
//           background: #020617;
//           border: none;
//           color: white;
//           font-size: 13px;
//           outline: none;
//         }
//         .misha-input-field::placeholder { color: #475569; }
//         @keyframes msgSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .misha-msg {
//           animation: msgSlideIn 0.3s ease forwards;
//         }
//         .misha-close-btn {
//           margin-left: auto;
//           cursor: pointer;
//           font-size: 20px;
//           color: #94a3b8;
//           line-height: 1;
//           transition: color 0.2s ease, transform 0.2s ease;
//         }
//         .misha-close-btn:hover {
//           color: white;
//           transform: rotate(90deg);
//         }
//       `}</style>

//       <div
//         suppressHydrationWarning
//         style={{
//           position: "fixed",
//           bottom: "25px",
//           right: "25px",
//           zIndex: 9999,
//           fontFamily: "Inter, sans-serif",
//         }}
//       >
//         {/* CHAT WINDOW */}
//         <div
//           className={`misha-chat-window ${chatVisible ? "visible" : ""}`}
//           suppressHydrationWarning
//           style={{
//             width: "340px",
//             background: "#020617",
//             borderRadius: "16px",
//             position: "absolute",
//             bottom: "85px",
//             right: "0",
//             overflow: "hidden",
//             boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.1)",
//             display: "flex",
//             flexDirection: "column",
//             height: "480px",
//           }}
//         >
//           {/* HEADER */}
//           <div
//             suppressHydrationWarning
//             style={{
//               background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
//               borderBottom: "1px solid rgba(0,229,255,0.1)",
//               padding: "12px 14px",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               flexShrink: 0,
//             }}
//           >
//             <div
//               suppressHydrationWarning
//               style={{
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "50%",
//                 overflow: "hidden",
//                 border: "2px solid rgba(0,229,255,0.4)",
//                 flexShrink: 0,
//               }}
//             >
//               <Image
//                 src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/ChatGPT-Image-Mar-4-2026-06_28_34-PM.png"
//                 alt="MISHA"
//                 width={36}
//                 height={36}
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//             <div suppressHydrationWarning>
//               <div
//                 style={{ color: "white", fontWeight: 700, fontSize: "14px" }}
//                 suppressHydrationWarning
//               >
//                 MISHA
//               </div>
//               <div
//                 suppressHydrationWarning
//                 style={{
//                   fontSize: "11px",
//                   color: "#00e5ff",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "5px",
//                 }}
//               >
//                 <span
//                   style={{
//                     width: "6px",
//                     height: "6px",
//                     borderRadius: "50%",
//                     background: "#22c55e",
//                     display: "inline-block",
//                   }}
//                 />
//                 Your AI Mentor · Online
//               </div>
//             </div>
//             <button
//               className="misha-close-btn"
//               onClick={() => setOpen(false)}
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </div>

//           {/* BODY */}
//           <div
//             ref={bodyRef}
//             className="misha-body"
//             suppressHydrationWarning
//             style={{
//               flex: 1,
//               padding: "14px",
//               overflowY: "auto",
//               display: "flex",
//               flexDirection: "column",
//               gap: "8px",
//             }}
//           >
//             {/* GREETING typewriter or messages */}
//             {!greetingDone ? (
//               <div
//                 className="misha-msg"
//                 suppressHydrationWarning
//                 style={{
//                   background: "#0f172a",
//                   color: "#cbd5f5",
//                   padding: "10px 14px",
//                   borderRadius: "10px 10px 10px 2px",
//                   fontSize: "13px",
//                   lineHeight: "1.6",
//                   whiteSpace: "pre-line",
//                   maxWidth: "85%",
//                 }}
//               >
//                 {typedGreeting}
//                 <span
//                   style={{
//                     display: "inline-block",
//                     width: "2px",
//                     height: "13px",
//                     background: "#00e5ff",
//                     marginLeft: "2px",
//                     verticalAlign: "middle",
//                     animation: "mishaPulse 0.8s step-end infinite",
//                   }}
//                 />
//               </div>
//             ) : (
//               messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className="misha-msg"
//                   style={{
//                     background: m.role === "bot" ? "#0f172a" : "linear-gradient(135deg,#00e5ff,#6366f1)",
//                     color: m.role === "bot" ? "#cbd5f5" : "#020617",
//                     padding: "10px 14px",
//                     borderRadius: m.role === "bot"
//                       ? "10px 10px 10px 2px"
//                       : "10px 10px 2px 10px",
//                     fontSize: "13px",
//                     lineHeight: "1.6",
//                     whiteSpace: "pre-line",
//                     maxWidth: "85%",
//                     alignSelf: m.role === "user" ? "flex-end" : "flex-start",
//                   }}
//                 >
//                   {m.text}
//                 </div>
//               ))
//             )}
//             {isTyping && (
//               <div className="misha-msg" style={{ background: "#0f172a", color: "#00e5ff", padding: "10px 14px", borderRadius: "10px 10px 10px 2px", alignSelf: "flex-start", opacity: 0.6 }}>
//                 <div style={{ display: "flex", gap: "4px" }}>
//                   <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-bounce"></div>
//                   <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-bounce [animation-delay:0.2s]"></div>
//                   <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-bounce [animation-delay:0.4s]"></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* SUGGESTIONS */}
//           <div
//             suppressHydrationWarning
//             style={{
//               display: "flex",
//               gap: "8px",
//               padding: "8px 12px",
//               flexWrap: "wrap",
//               borderTop: "1px solid rgba(255,255,255,0.04)",
//               flexShrink: 0,
//             }}
//           >
//             {SUGGESTIONS.map((s) => (
//               <button
//                 key={s}
//                 className="misha-suggestion-btn"
//                 onClick={() => send(s)}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>

//           {/* INPUT */}
//           <div
//             suppressHydrationWarning
//             style={{
//               display: "flex",
//               borderTop: "1px solid rgba(255,255,255,0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <input
//               ref={inputRef}
//               className="misha-input-field"
//               placeholder="Ask MISHA anything..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKey}
//             />
//             <button className="misha-send-btn" onClick={() => send(input)}>
//               ➤
//             </button>
//           </div>
//         </div>

//         {/* FLOAT ICON */}
//         <button
//           className="misha-float-icon"
//           onClick={() => setOpen((p) => !p)}
//           aria-label="Open MISHA chat"
//           style={{
//             width: "70px",
//             height: "70px",
//             borderRadius: "50%",
//             background: "linear-gradient(135deg,#00e5ff,#6366f1)",
//             border: "none",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//           }}
//         >
//           <Image
//             src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/ChatGPT-Image-Mar-4-2026-06_28_34-PM.png"
//             alt="MISHA"
//             width={44}
//             height={44}
//             style={{ borderRadius: "50%", objectFit: "cover" }}
//           />
//         </button>
//       </div>
//     </>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { ArrowRight, Calendar, Clock, Zap } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
  isEvent?: boolean;
}

const SUGGESTIONS = [
  { label: "🎤 Interview to Offer", prompt: "Tell me about the Interview to Offer Letter masterclass on 30th April" },
  { label: "Live Events",           prompt: "What live events are coming up?" },
  { label: "Premium Courses",       prompt: "Premium Courses" },
  { label: "Executive Coaching",    prompt: "Executive Coaching" },
  { label: "Corporate Training",    prompt: "Corporate Training" },
];

const EVENT = {
  tag:           "Communication Masterclass",
  title:         "Interview to Offer Letter",
  date:          "Thursday, 30th April 2026",
  time:          "7:30 PM – 9:00 PM IST",
  price:         "₹499",
  originalPrice: "₹1999",
  link:          "/events/interview-to-offer-letter",
};

// Injected into every API call so MISHA has full accurate event knowledge
const EVENT_CONTEXT = `
IMPORTANT — CURRENT UPCOMING EVENTS:
There is currently only ONE live upcoming event. The March 15 event is over and gone. Do not mention it.

EVENT: Interview to Offer Letter — The Ultimate Communication Masterclass
Tagline: Learn to answer the most commonly asked interview questions with clarity, structure, and confidence.
Date: Thursday, 30th April 2026 | Time: 7:30 PM – 9:00 PM IST
Price: ₹499 (was ₹1999) — Special Launch Offer
Register: /events/interview-to-offer-letter

WHO IT IS FOR: Job Seekers, Freshers, Career Switchers, Tech Professionals, Students

SESSION OUTCOMES: Introduction Patterns, Handling "Why Us?", Strength/Weakness Storytelling, Salary Negotiation Basics

CORE MODULES:
1. Answering with Clarity — STAR & Pyramid methods
2. Executive Presence — Sound confident and authoritative
3. Mastering Body Language — Eye contact, posture, virtual interview etiquette
4. Repeatable Frameworks — Prep any interview in under 60 minutes

HOW IT WORKS: 2-hour live session with Mridu Bhandari, Live Q&A and mock drills, Cheat sheets and templates, Lifetime networking community

BONUSES: Interview Prep Guide (50+ Q&A), LinkedIn Optimization, Email Follow-up Templates

MENTOR: Mridu Bhandari — Award-Winning Journalist and Communication Coach. 20+ years experience. Mentored 500+ professionals at Google, Amazon and Fortune 500. Featured on CNBC-TV18, Forbes India, CNN-News18.

When anyone asks about live events or upcoming events, enthusiastically promote this event and encourage registration at /events/interview-to-offer-letter.
`.trim();

const GREETING: Message = {
  role: "bot",
  text: "Hello! I am MISHA, your personal AI Mentor at MentorLeap.\nHow can I help you accelerate your career today?",
};

const EVENT_MSG: Message = { role: "bot", text: "", isEvent: true };

export default function FloatingChatbot() {
  const [open, setOpen]                     = useState(false);
  const [messages, setMessages]             = useState<Message[]>([]);
  const [input, setInput]                   = useState("");
  const [greetingDone, setGreetingDone]     = useState(false);
  const [typedGreeting, setTypedGreeting]   = useState("");
  const [chatVisible, setChatVisible]       = useState(false);
  const [isTyping, setIsTyping]             = useState(false);
  const [showBadge, setShowBadge]           = useState(true);

  const { user, loading: authLoading } = useAuth();
  const bodyRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // greeting typewriter on first open
  useEffect(() => {
    if (!open || greetingDone) return;
    const full = GREETING.text;
    let i = 0;
    const t = setInterval(() => {
      if (i <= full.length) {
        setTypedGreeting(full.slice(0, i));
        i++;
      } else {
        clearInterval(t);
        setGreetingDone(true);
        setMessages([{ role: "bot", text: full }, EVENT_MSG]);
      }
    }, 28);
    return () => clearInterval(t);
  }, [open, greetingDone]);

  // slide-in animation
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setChatVisible(true));
      setTimeout(() => inputRef.current?.focus(), 400);
      setShowBadge(false);
    } else {
      setChatVisible(false);
    }
  }, [open]);

  // auto-scroll
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typedGreeting]);

  const send = async (text: string) => {
    const val = text.trim();
    if (!val || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: val }]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages
        .filter((m) => !m.isEvent)
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : "user" as const,
          content: m.text,
        }));
      history.push({ role: "user", content: val });

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          message: val,
          // Pass event context so MISHA always has accurate info
          systemContext: EVENT_CONTEXT,
        }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || data.response || "I'm processing that. One moment..." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having a slight connection glitch. Can we try that again?" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") send(input);
  };

  return (
    <>
      <style>{`
        @keyframes mishaPulse {
          0%   { box-shadow: 0 0 0 0   rgba(0,229,255,0.6); }
          70%  { box-shadow: 0 0 0 18px rgba(0,229,255,0);  }
          100% { box-shadow: 0 0 0 0   rgba(0,229,255,0);   }
        }
        .misha-float-icon {
          animation: mishaPulse 2s infinite;
          transition: transform 0.3s ease;
        }
        .misha-float-icon:hover { transform: scale(1.1); }

        .misha-chat-window {
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }
        .misha-chat-window.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }

        .misha-body::-webkit-scrollbar { width: 4px; }
        .misha-body::-webkit-scrollbar-track { background: transparent; }
        .misha-body::-webkit-scrollbar-thumb {
          background: rgba(0,229,255,0.2);
          border-radius: 4px;
        }

        .misha-suggestion-btn {
          border: 1px solid rgba(0,229,255,0.2);
          background: #0f172a;
          color: #cbd5f5;
          padding: 5px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .misha-suggestion-btn:hover {
          background: rgba(0,229,255,0.1);
          border-color: #00e5ff;
          color: white;
          transform: translateY(-2px);
        }
        .misha-suggestion-btn.event-pill {
          border-color: rgba(0,229,255,0.4);
          background: rgba(0,229,255,0.08);
          color: #00e5ff;
          font-weight: 700;
        }
        .misha-suggestion-btn.event-pill:hover {
          background: rgba(0,229,255,0.18);
        }

        .misha-send-btn {
          background: linear-gradient(135deg, #00e5ff, #6366f1);
          border: none;
          padding: 10px 16px;
          cursor: pointer;
          color: white;
          font-size: 16px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .misha-send-btn:hover { opacity: 0.85; transform: scale(1.05); }

        .misha-input-field {
          flex: 1;
          padding: 10px 14px;
          background: #020617;
          border: none;
          color: white;
          font-size: 13px;
          outline: none;
        }
        .misha-input-field::placeholder { color: #475569; }

        @keyframes msgSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .misha-msg { animation: msgSlideIn 0.3s ease forwards; }

        .misha-close-btn {
          margin-left: auto;
          cursor: pointer;
          font-size: 20px;
          color: #94a3b8;
          line-height: 1;
          background: none;
          border: none;
          transition: color 0.2s, transform 0.2s;
        }
        .misha-close-btn:hover { color: white; transform: rotate(90deg); }

        .misha-event-card {
          background: linear-gradient(135deg, rgba(0,229,255,0.06), rgba(99,102,241,0.06));
          border: 1px solid rgba(0,229,255,0.22);
          border-radius: 12px;
          padding: 11px 13px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          max-width: 95%;
          align-self: flex-start;
        }
        .misha-event-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(0,229,255,0.12);
          border: 1px solid rgba(0,229,255,0.25);
          color: #00e5ff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 20px;
          width: fit-content;
        }
        .misha-event-title {
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.3;
        }
        .misha-event-meta { display: flex; flex-direction: column; gap: 3px; }
        .misha-event-meta-row {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #94a3b8;
          font-size: 11px;
        }
        .misha-price-row { display: flex; align-items: baseline; gap: 6px; }
        .misha-price       { color: #fff; font-size: 18px; font-weight: 900; }
        .misha-price-og    { color: #64748b; font-size: 11px; text-decoration: line-through; }
        .misha-price-badge { color: #00e5ff; font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .misha-event-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 0;
          border-radius: 8px;
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          color: #020617;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .misha-event-cta:hover { opacity: 0.87; }

        .misha-event-banner {
          background: linear-gradient(90deg, rgba(0,229,255,0.1), rgba(99,102,241,0.1));
          border-bottom: 1px solid rgba(0,229,255,0.14);
          padding: 5px 13px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: #00e5ff;
          font-weight: 700;
          letter-spacing: 0.03em;
          flex-shrink: 0;
        }
        .misha-event-banner a {
          margin-left: auto;
          color: #00e5ff;
          font-size: 10px;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 2px;
          white-space: nowrap;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .misha-event-banner a:hover { opacity: 1; }

        .misha-fab-badge {
          position: absolute;
          top: 0; right: 0;
          width: 18px; height: 18px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #020617;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 800; color: white;
          animation: badgePop 0.3s ease;
        }
        @keyframes badgePop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }

        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-5px); }
        }
        .misha-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00e5ff;
          animation: dotBounce 1.2s infinite;
        }
        .misha-dot:nth-child(2) { animation-delay: 0.2s; }
        .misha-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div
        suppressHydrationWarning
        style={{ position: "fixed", bottom: "25px", right: "25px", zIndex: 9999, fontFamily: "Inter, sans-serif" }}
      >
        {/* CHAT WINDOW */}
        <div
          className={`misha-chat-window ${chatVisible ? "visible" : ""}`}
          suppressHydrationWarning
          style={{
            width: "340px",
            background: "#020617",
            borderRadius: "16px",
            position: "absolute",
            bottom: "85px",
            right: "0",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.1)",
            display: "flex",
            flexDirection: "column",
            height: "500px",
          }}
        >
          {/* HEADER */}
          <div
            suppressHydrationWarning
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
              borderBottom: "1px solid rgba(0,229,255,0.1)",
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(0,229,255,0.4)", flexShrink: 0 }}>
              <Image
                src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/ChatGPT-Image-Mar-4-2026-06_28_34-PM.png"
                alt="MISHA"
                width={36}
                height={36}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div suppressHydrationWarning>
              <div style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>MISHA</div>
              <div style={{ fontSize: "11px", color: "#00e5ff", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                Your AI Mentor · Online
              </div>
            </div>
            <button className="misha-close-btn" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>

          {/* EVENT BANNER STRIP */}
          <div className="misha-event-banner">
            <Zap size={10} fill="#00e5ff" color="#00e5ff" />
            🎤 Interview to Offer — 30 Apr · ₹499
            <Link href={EVENT.link}>Register <ArrowRight size={10} /></Link>
          </div>

          {/* BODY */}
          <div
            ref={bodyRef}
            className="misha-body"
            suppressHydrationWarning
            style={{ flex: 1, padding: "14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}
          >
            {!greetingDone ? (
              <div
                className="misha-msg"
                style={{ background: "#0f172a", color: "#cbd5f5", padding: "10px 14px", borderRadius: "10px 10px 10px 2px", fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-line", maxWidth: "85%" }}
              >
                {typedGreeting}
                <span style={{ display: "inline-block", width: "2px", height: "13px", background: "#00e5ff", marginLeft: "2px", verticalAlign: "middle" }} />
              </div>
            ) : (
              messages.map((m, i) => {
                if (m.isEvent) return (
                  <div key={i} className="misha-msg misha-event-card">
                    <div className="misha-event-tag"><Calendar size={8} /> {EVENT.tag}</div>
                    <div className="misha-event-title">{EVENT.title}</div>
                    <div className="misha-event-meta">
                      <div className="misha-event-meta-row"><Calendar size={10} color="#00e5ff" /><span>{EVENT.date}</span></div>
                      <div className="misha-event-meta-row"><Clock size={10} color="#00e5ff" /><span>{EVENT.time}</span></div>
                    </div>
                    <div className="misha-price-row">
                      <span className="misha-price">{EVENT.price}</span>
                      <span className="misha-price-og">{EVENT.originalPrice}</span>
                      <span className="misha-price-badge">Launch Offer</span>
                    </div>
                    <Link href={EVENT.link} className="misha-event-cta">
                      Secure Your Seat <ArrowRight size={12} />
                    </Link>
                  </div>
                );
                return (
                  <div
                    key={i}
                    className="misha-msg"
                    style={{
                      background: m.role === "bot" ? "#0f172a" : "linear-gradient(135deg,#00e5ff,#6366f1)",
                      color: m.role === "bot" ? "#cbd5f5" : "#020617",
                      padding: "10px 14px",
                      borderRadius: m.role === "bot" ? "10px 10px 10px 2px" : "10px 10px 2px 10px",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                      maxWidth: "85%",
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {m.text}
                  </div>
                );
              })
            )}

            {isTyping && (
              <div className="misha-msg" style={{ background: "#0f172a", padding: "10px 14px", borderRadius: "10px 10px 10px 2px", alignSelf: "flex-start", display: "flex", gap: "4px" }}>
                <div className="misha-dot" />
                <div className="misha-dot" />
                <div className="misha-dot" />
              </div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div suppressHydrationWarning style={{ display: "flex", gap: "6px", padding: "8px 12px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                className={`misha-suggestion-btn ${s.label.includes("Interview") ? "event-pill" : ""}`}
                onClick={() => send(s.prompt)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div suppressHydrationWarning style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
            <input
              ref={inputRef}
              className="misha-input-field"
              placeholder="Ask MISHA anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="misha-send-btn" onClick={() => send(input)}>➤</button>
          </div>
        </div>

        {/* FAB */}
        <button
          className="misha-float-icon"
          onClick={() => setOpen((p) => !p)}
          aria-label="Open MISHA chat"
          style={{ position: "relative", width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#6366f1)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <Image
            src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/ChatGPT-Image-Mar-4-2026-06_28_34-PM.png"
            alt="MISHA"
            width={44}
            height={44}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          {!open && showBadge && <div className="misha-fab-badge">1</div>}
        </button>
      </div>
    </>
  );
}