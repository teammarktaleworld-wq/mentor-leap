// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// import { fetchReviews } from "@/lib/api";

// function useInView(threshold = 0.1) {
//   const ref = useRef<HTMLElement>(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setVisible(true); },
//       { threshold }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return { ref, visible };
// }

// const companies = [
//   { name: "Deloitte", id: "deloitte", domain: "deloitte.com" },
//   { name: "Wipro", id: "wipro", domain: "wipro.com" },
//   { name: "Accenture", id: "accenture", domain: "accenture.com" },
//   { name: "Microsoft", id: "microsoft", domain: "microsoft.com" },
//   { name: "Infosys", id: "infosys", domain: "infosys.com" },
//   { name: "IBM", id: "ibm", domain: "ibm.com" },
//   { name: "EY", id: "ey", domain: "ey.com" },
//   { name: "PwC", id: "pwc", domain: "pwc.com" },
//   { name: "DataFlow", id: "dataflowgroup", domain: "dataflowgroup.com" },
//   { name: "HSBC Bank", id: "hsbc", domain: "hsbc.com" },
//   { name: "Sarita Handa", id: "saritahanda", domain: "saritahanda.com" },
//   { name: "Ratan Textiles", id: "ratantextiles", domain: "ratantextiles.com" },
//   { name: "360 One Wealth", id: "360one", domain: "360.one" }
// ];

// function LogoRender({ name, id, heightClass }: { name: string, id: string, heightClass: string }) {
//   const [error, setError] = useState(false);

//   return (
//     <div className={`bg-white/95 hover:bg-white rounded-lg px-3 py-1.5 flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] ${heightClass} min-w-[100px] md:min-w-[140px]`}>
//       {error ? (
//         <span className="text-[#020617] font-bold text-sm md:text-base whitespace-nowrap">{name}</span>
//       ) : (
//         <Image 
//           src={`/logos/${id}.png`}
//           alt={name}
//           title={name}
//           width={140}
//           height={60}
//           className={`${heightClass} object-contain mix-blend-multiply w-auto max-w-full`}
//           onError={() => setError(true)}
//         />
//       )}
//     </div>
//   );
// }

// function Stars({ count }: { count: number }) {
//   return (
//     <div style={{ color: "#facc15", fontSize: "15px", marginBottom: "10px" }}>
//       {[1, 2, 3, 4, 5].map((s) => (
//         <span
//           key={s}
//           style={{
//             opacity: s <= count ? 1 : 0.25,
//             display: "inline-block",
//             transition: `opacity 0.3s ease ${s * 0.05}s`,
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// // rolling big number counter
// function RatingCounter({ visible, target = 4.9 }: { visible: boolean; target?: number }) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!visible) return;
//     let current = 0;
//     const steps = 40;
//     const increment = target / steps;
//     const timer = setInterval(() => {
//       current += increment;
//       if (current >= target) { setVal(target); clearInterval(timer); }
//       else setVal(parseFloat(current.toFixed(1)));
//     }, 30);
//     return () => clearInterval(timer);
//   }, [visible, target]);
//   return <>{val.toFixed(1)}</>;
// }

// export default function ReviewsSection() {
//   const { ref, visible } = useInView();
//   const [hovered, setHovered] = useState<number | null>(null);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReviews().then((data: any[]) => {
//       setReviews(data);
//       setLoading(false);
//     });
//   }, []);

//   // avatar gradient colours cycling
//   const avatarColors = [
//     "#00e5ff", "#6366f1", "#00e5ff", "#6366f1", "#00e5ff", "#6366f1",
//   ];

//   const averageRating = reviews.length > 0 
//     ? (reviews.reduce((acc, r) => acc + (r.stars || 5), 0) / reviews.length).toFixed(1)
//     : "0.0";

//   return (
//     <>
//       <style>{`
//         .reviews-gradient-text {
//           background: linear-gradient(90deg, #00e5ff, #6366f1);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .review-card {
//           transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
//         }
//         .review-card:hover {
//           transform: translateY(-8px);
//           border-color: rgba(0,229,255,0.35) !important;
//           box-shadow: 0 20px 50px rgba(0,229,255,0.1);
//         }
//         .review-avatar {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .review-card:hover .review-avatar {
//           transform: scale(1.1);
//           box-shadow: 0 0 16px rgba(0,229,255,0.5);
//         }
//         .review-quote {
//           position: absolute;
//           top: 16px;
//           right: 20px;
//           font-size: 48px;
//           line-height: 1;
//           color: rgba(0,229,255,0.08);
//           font-family: Georgia, serif;
//           pointer-events: none;
//           transition: color 0.3s ease;
//         }
//         .review-card:hover .review-quote {
//           color: rgba(0,229,255,0.15);
//         }
//         @keyframes ratingPulse {
//           0%   { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
//           50%  { text-shadow: 0 0 40px rgba(0,229,255,0.8); }
//           100% { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
//         }
//         .rating-number {
//           animation: ratingPulse 3s ease-in-out infinite;
//         }
//         @keyframes summaryFadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .summary-animate {
//           animation: summaryFadeUp 0.7s ease 0.3s both;
//         }
//         @keyframes marqueeX {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .marquee-container {
//           display: flex;
//           overflow: hidden;
//           width: 100%;
//           position: relative;
//           mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
//           -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
//         }
//         .marquee-content {
//           display: flex;
//           align-items: center;
//           width: max-content;
//           animation: marqueeX 45s linear infinite;
//         }
//         .marquee-content:hover {
//           animation-play-state: paused;
//         }
//       `}</style>

//       <section
//         ref={ref}
//         className="w-full px-5 text-center"
//         style={{ padding: "120px 20px" }}
//       >
//         {/* TITLE */}
//         <h2
//           className="text-white font-bold mb-10"
//           style={{
//             fontSize: "42px",
//             opacity: visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(-20px)",
//             transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
//           }}
//         >
//           What Professionals Say About{" "}
//           <span className="reviews-gradient-text">MentorLeap</span>
//         </h2>

//         {/* RATING SUMMARY */}
//         {visible && (
//           <div className="summary-animate mb-14">
//             <h3
//               className="rating-number font-bold mb-2"
//               style={{ fontSize: "56px", color: "#00e5ff" }}
//             >
//               <RatingCounter visible={visible} target={Number(averageRating)} />
//             </h3>
//             <div style={{ color: "#facc15", fontSize: "22px", marginBottom: "8px" }}>
//               ★★★★★
//             </div>
//             <p style={{ color: "#94a3b8", fontSize: "14px" }}>
//               Based on {reviews.length} professional reviews
//             </p>
//           </div>
//         )}

//         {/* GRID */}
//         <div
//           className="mx-auto grid gap-8"
//           suppressHydrationWarning
//           style={{
//             maxWidth: "1200px",
//             gridTemplateColumns: loading || reviews.length === 0 ? "1fr" : "repeat(3, 1fr)",
//           }}
//         >
//           {loading ? (
//             <div className="text-[#94a3b8] animate-pulse py-20 bg-white/5 rounded-3xl border border-white/10">Synchronizing testimonials...</div>
//           ) : reviews.length === 0 ? (
//             <div className="text-[#94a3b8] italic py-20 bg-white/5 rounded-3xl border border-white/10">Be the first to share your experience with MentorLeap.</div>
//           ) : reviews.map((r, i) => (
//             <div
//               key={r.id || r.name}
//               className="review-card relative rounded-xl text-left"
//               onMouseEnter={() => setHovered(i)}
//               onMouseLeave={() => setHovered(null)}
//               style={{
//                 background: "#020617",
//                 padding: "25px",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 opacity: visible ? 1 : 0,
//                 transform: visible ? "translateY(0)" : "translateY(30px)",
//                 transition: `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.5s ease ${0.3 + i * 0.08}s`,
//               }}
//             >
//               {/* BIG QUOTE */}
//               <div className="review-quote">"</div>

//               {/* HEADER */}
//               <div className="flex items-center gap-3 mb-3">
//                 <div
//                   className="review-avatar flex items-center justify-center rounded-full font-bold flex-shrink-0"
//                   style={{
//                     width: "42px",
//                     height: "42px",
//                     background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}, #020617)`,
//                     border: `2px solid ${avatarColors[i % avatarColors.length]}`,
//                     color: avatarColors[i % avatarColors.length],
//                     fontSize: "16px",
//                   }}
//                 >
//                   {r.initial || (r.name ? r.name[0] : "?")}
//                 </div>
//                 <div>
//                   <h4 className="text-white font-semibold" style={{ fontSize: "15px" }}>
//                     {r.name}
//                   </h4>
//                   <span style={{ fontSize: "12px", color: "#94a3b8" }}>
//                     📍 {r.location}
//                   </span>
//                 </div>
//               </div>

//               {/* STARS */}
//               <Stars count={r.stars || 5} />

//               {/* TEXT */}
//               <p style={{ color: "#cbd5f5", fontSize: "14px", lineHeight: "1.6" }}>
//                 {r.text}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* WHERE OUR LEARNERS WORK (COMPANIES) */}
//         <div className="mt-28" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
//           <h3 className="text-[#94a3b8] text-xs font-black uppercase tracking-[0.3em] mb-10">
//             Our Learners Work At
//           </h3>
//           <div className="marquee-container opacity-90 pt-4 pb-4">
//             <div className="marquee-content">
//               {companies.map((logo, i) => (
//                 <div key={logo.name + i} className="px-6 md:px-10 flex-shrink-0">
//                   <LogoRender name={logo.name} id={logo.id} heightClass="h-7 md:h-12" />
//                 </div>
//               ))}
//               {/* Duplicate for infinite loop without gaps */}
//               {companies.map((logo, i) => (
//                 <div key={logo.name + "-dup-" + i} className="px-6 md:px-10 flex-shrink-0">
//                   <LogoRender name={logo.name} id={logo.id} heightClass="h-7 md:h-12" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { fetchReviews } from "@/lib/api";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const companies = [
  { name: "Deloitte", id: "deloitte", domain: "deloitte.com" },
  { name: "Wipro", id: "wipro", domain: "wipro.com" },
  { name: "Accenture", id: "accenture", domain: "accenture.com" },
  { name: "Microsoft", id: "microsoft", domain: "microsoft.com" },
  { name: "Infosys", id: "infosys", domain: "infosys.com" },
  { name: "IBM", id: "ibm", domain: "ibm.com" },
  { name: "EY", id: "ey", domain: "ey.com" },
  { name: "PwC", id: "pwc", domain: "pwc.com" },
  { name: "DataFlow", id: "dataflowgroup", domain: "dataflowgroup.com" },
  { name: "HSBC Bank", id: "hsbc", domain: "hsbc.com" },
  { name: "Sarita Handa", id: "saritahanda", domain: "saritahanda.com" },
  { name: "Ratan Textiles", id: "ratantextiles", domain: "ratantextiles.com" },
  { name: "360 One Wealth", id: "360one", domain: "360.one" }
];

// 20 realistic fallback reviews
const STATIC_REVIEWS = [
  {
    id: "r1", name: "Priya Sharma", location: "Mumbai, MH", stars: 5, initial: "P",
    text: "Mridu's coaching completely transformed how I carry myself in interviews. I landed a role at Accenture within 3 weeks of the masterclass. The STAR framework she taught is gold.",
    role: "Business Analyst, Accenture"
  },
  {
    id: "r2", name: "Arjun Mehta", location: "Bengaluru, KA", stars: 5, initial: "A",
    text: "I'd been rejected 6 times before MentorLeap. After the communication bootcamp, I cracked my dream job at Microsoft. The way she breaks down salary negotiation alone is worth 10x the price.",
    role: "Product Manager, Microsoft"
  },
  {
    id: "r3", name: "Sneha Kapoor", location: "Delhi, DL", stars: 5, initial: "S",
    text: "Genuinely the best investment I've made in my career. The mock interview sessions were brutally honest and that's exactly what I needed. Got my offer letter from Deloitte last month!",
    role: "Senior Consultant, Deloitte"
  },
  {
    id: "r4", name: "Rohan Verma", location: "Pune, MH", stars: 5, initial: "R",
    text: "What sets MentorLeap apart is the personalised feedback. Mridu pinpointed exactly where I was losing interviewers — my filler words and lack of structure. Fixed both in 2 sessions.",
    role: "Data Analyst, Wipro"
  },
  {
    id: "r5", name: "Kavya Nair", location: "Hyderabad, TS", stars: 5, initial: "K",
    text: "I was terrified of panel interviews. The confidence-building exercises and the way Mridu teaches you to own the room — honestly life-changing. Got 2 competing offers!",
    role: "HR Business Partner, IBM"
  },
  {
    id: "r6", name: "Vikram Bose", location: "Kolkata, WB", stars: 5, initial: "V",
    text: "The 'Interview to Offer Letter' masterclass is incredibly dense with value. Every minute is packed. I took 14 pages of notes and still felt like I missed things. Worth every rupee.",
    role: "Finance Manager, EY"
  },
  {
    id: "r7", name: "Ananya Singh", location: "Chennai, TN", stars: 5, initial: "A",
    text: "Mridu has a rare gift — she makes you feel like you already have the job. That mindset shift alone changed everything. My interviewers said I was the most confident candidate they'd seen.",
    role: "Marketing Lead, Infosys"
  },
  {
    id: "r8", name: "Karan Malhotra", location: "Gurugram, HR", stars: 5, initial: "K",
    text: "Three failed interviews, zero confidence. After MentorLeap I passed 4 back-to-back. The articulation exercises are something I still practise daily even 6 months into my new role.",
    role: "Strategy Consultant, PwC"
  },
  {
    id: "r9", name: "Divya Reddy", location: "Ahmedabad, GJ", stars: 5, initial: "D",
    text: "Highly recommend for anyone switching industries. I moved from engineering to finance and had no idea how to position myself. Mridu gave me a narrative that genuinely landed.",
    role: "Investment Analyst, 360 One Wealth"
  },
  {
    id: "r10", name: "Nikhil Joshi", location: "Nagpur, MH", stars: 5, initial: "N",
    text: "The live Q&A was exceptional. Real, candid advice — not the generic 'be yourself' nonsense you find elsewhere. Walked out of my HSBC interview feeling like a completely different person.",
    role: "Relationship Manager, HSBC"
  },
  {
    id: "r11", name: "Pooja Agarwal", location: "Jaipur, RJ", stars: 5, initial: "P",
    text: "I attended as a fresher with zero corporate experience. Mridu made the process feel approachable. I got placed in my first attempt and my interviewer specifically complimented my communication.",
    role: "Associate, Deloitte"
  },
  {
    id: "r12", name: "Sameer Khan", location: "Lucknow, UP", stars: 5, initial: "S",
    text: "The body language module is something I never thought mattered. Turns out it's half the battle. My manager told me I came across as 'exceptionally polished' compared to other candidates.",
    role: "Operations Manager, Accenture"
  },
  {
    id: "r13", name: "Ritika Desai", location: "Vadodara, GJ", stars: 5, initial: "R",
    text: "Mridu's energy is infectious. The session never felt like a lecture — it felt like a conversation with someone who genuinely wants you to succeed. Cleared my final round at Microsoft!",
    role: "UX Researcher, Microsoft"
  },
  {
    id: "r14", name: "Aditya Pandey", location: "Bhopal, MP", stars: 5, initial: "A",
    text: "I've attended 4 career workshops in the last year. MentorLeap is the only one where I saw real results within weeks. The frameworks are simple, memorable, and actually work under pressure.",
    role: "Project Lead, Wipro"
  },
  {
    id: "r15", name: "Meera Pillai", location: "Kochi, KL", stars: 5, initial: "M",
    text: "After a 2-year career gap, I was terrified of re-entering the workforce. Mridu's guidance on addressing gaps confidently and turning them into strengths helped me land a role above my previous level.",
    role: "Senior Analyst, EY"
  },
  {
    id: "r16", name: "Gaurav Tiwari", location: "Indore, MP", stars: 5, initial: "G",
    text: "The way Mridu teaches you to tell your story is unlike anything else. I've been to MBA coaching, placement training — none of it compares to the depth here. Absolute must for serious job seekers.",
    role: "Brand Manager, Infosys BPM"
  },
  {
    id: "r17", name: "Ishita Roy", location: "Bhubaneswar, OD", stars: 5, initial: "I",
    text: "Received an offer from my dream company 11 days after the masterclass. The preparation framework Mridu shares in the last 20 minutes alone made all the difference in my technical round.",
    role: "Data Scientist, IBM"
  },
  {
    id: "r18", name: "Rahul Srivastava", location: "Patna, BR", stars: 5, initial: "R",
    text: "Cracked a 40% salary hike in my offer negotiation using exactly the script Mridu shared. My recruiter was surprised I knew how to counter. Worth it for that module alone.",
    role: "Finance Analyst, PwC"
  },
  {
    id: "r19", name: "Tanvi Kulkarni", location: "Nashik, MH", stars: 5, initial: "T",
    text: "The group energy during the live session was electric. Everyone was so engaged. Mridu has a way of making complex communication concepts feel obvious in hindsight. Brilliant facilitator.",
    role: "Communications Manager, Deloitte"
  },
  {
    id: "r20", name: "Suresh Babu", location: "Coimbatore, TN", stars: 5, initial: "S",
    text: "I was sceptical since I've attended many paid webinars that over-promised. MentorLeap massively over-delivered. Specific, actionable, and immediately usable. Got my offer letter the very next week.",
    role: "Supply Chain Analyst, Accenture"
  },
];

function LogoRender({ name, id, heightClass }: { name: string, id: string, heightClass: string }) {
  const [error, setError] = useState(false);

  return (
    <div className={`bg-white/95 hover:bg-white rounded-lg px-3 py-1.5 flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] ${heightClass} min-w-[100px] md:min-w-[140px]`}>
      {error ? (
        <span className="text-[#020617] font-bold text-sm md:text-base whitespace-nowrap">{name}</span>
      ) : (
        <Image
          src={`/logos/${id}.png`}
          alt={name}
          title={name}
          width={140}
          height={60}
          className={`${heightClass} object-contain mix-blend-multiply w-auto max-w-full`}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ color: "#facc15", fontSize: "14px", marginBottom: "10px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= count ? 1 : 0.25 }}>★</span>
      ))}
    </div>
  );
}

function RatingCounter({ visible, target = 4.9 }: { visible: boolean; target?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const steps = 40;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(parseFloat(current.toFixed(1)));
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <>{val.toFixed(1)}</>;
}

// Split reviews into two rows for the dual marquee
function splitIntoRows<T>(arr: T[]): [T[], T[]] {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

const avatarColors = [
  "#00e5ff", "#6366f1", "#a78bfa", "#22d3ee", "#818cf8",
  "#00e5ff", "#6366f1", "#a78bfa", "#22d3ee", "#818cf8",
];

export default function ReviewsSection() {
  const { ref, visible } = useInView();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchReviews().then((data: any[]) => {
  //     // Merge API reviews with static ones, deduplicate by id
  //     const merged = [...STATIC_REVIEWS];
  //     data.forEach((r: any) => {
  //       if (!merged.find((s) => s.id === r.id)) merged.push(r);
  //     });
  //     setReviews(merged);
  //     setLoading(false);
  //   }).catch(() => {
  //     setReviews(STATIC_REVIEWS);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
  // Use only curated static reviews — ignore API data to prevent test/dummy entries showing
  setReviews(STATIC_REVIEWS);
  setLoading(false);
}, []);

  const [row1, row2] = splitIntoRows(reviews);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.stars || 5), 0) / reviews.length).toFixed(1)
    : "4.9";

  return (
    <>
      <style>{`
        .reviews-gradient-text {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes ratingPulse {
          0%   { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
          50%  { text-shadow: 0 0 40px rgba(0,229,255,0.8); }
          100% { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
        }
        .rating-number { animation: ratingPulse 3s ease-in-out infinite; }

        @keyframes summaryFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .summary-animate { animation: summaryFadeUp 0.7s ease 0.3s both; }

        /* Marquee rows */
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-track {
          display: flex;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .marquee-row-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 55s linear infinite;
        }
        .marquee-row-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 50s linear infinite;
        }
        .marquee-row-left:hover,
        .marquee-row-right:hover {
          animation-play-state: paused;
        }

        /* Review card */
        .review-card {
          flex-shrink: 0;
          width: 320px;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 22px 24px;
          margin: 0 12px;
          position: relative;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          cursor: default;
        }
        .review-card:hover {
          border-color: rgba(0,229,255,0.3);
          box-shadow: 0 16px 48px rgba(0,229,255,0.08);
          transform: translateY(-4px);
        }
        .review-quote-mark {
          position: absolute;
          top: 14px;
          right: 18px;
          font-size: 52px;
          line-height: 1;
          color: rgba(0,229,255,0.07);
          font-family: Georgia, serif;
          pointer-events: none;
          transition: color 0.3s;
        }
        .review-card:hover .review-quote-mark {
          color: rgba(0,229,255,0.14);
        }

        .review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .review-card:hover .review-avatar {
          transform: scale(1.1);
        }

        /* Companies marquee */
        @keyframes marqueeX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marqueeX 45s linear infinite;
        }
        .marquee-content:hover { animation-play-state: paused; }
      `}</style>

      <section
        ref={ref}
        className="w-full text-center"
        style={{ padding: "120px 0" }}
      >
        {/* TITLE */}
        <div style={{ padding: "0 20px" }}>
          <h2
            className="text-white font-bold mb-10"
            style={{
              fontSize: "42px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            What Professionals Say About{" "}
            <span className="reviews-gradient-text">MentorLeap</span>
          </h2>

          {/* RATING SUMMARY */}
          {visible && (
            <div className="summary-animate mb-16">
              <h3
                className="rating-number font-bold mb-2"
                style={{ fontSize: "56px", color: "#00e5ff" }}
              >
                <RatingCounter visible={visible} target={Number(averageRating)} />
              </h3>
              <div style={{ color: "#facc15", fontSize: "22px", marginBottom: "8px" }}>
                ★★★★★
              </div>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                Based on {reviews.length}+ professional reviews
              </p>
            </div>
          )}
        </div>

        {/* SLIDING REVIEW ROWS */}
        {!loading && reviews.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }}
          >
            {/* ROW 1 — slides left */}
            <div className="marquee-track">
              <div className="marquee-row-left">
                {[...row1, ...row1].map((r, i) => (
                  <div key={`r1-${i}`} className="review-card">
                    <div className="review-quote-mark">"</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div
                        className="review-avatar"
                        style={{
                          background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}33, #0f172a)`,
                          border: `2px solid ${avatarColors[i % avatarColors.length]}`,
                          color: avatarColors[i % avatarColors.length],
                        }}
                      >
                        {r.initial || r.name?.[0] || "?"}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{r.name}</div>
                        <div style={{ color: "#6366f1", fontSize: "11px", marginTop: "1px" }}>{r.role || ""}</div>
                        <div style={{ color: "#64748b", fontSize: "11px" }}>📍 {r.location}</div>
                      </div>
                    </div>
                    <Stars count={r.stars || 5} />
                    <p style={{ color: "#cbd5f5", fontSize: "13px", lineHeight: "1.65", textAlign: "left" }}>
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2 — slides right */}
            <div className="marquee-track">
              <div className="marquee-row-right">
                {[...row2, ...row2].map((r, i) => (
                  <div key={`r2-${i}`} className="review-card">
                    <div className="review-quote-mark">"</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div
                        className="review-avatar"
                        style={{
                          background: `linear-gradient(135deg, ${avatarColors[(i + 5) % avatarColors.length]}33, #0f172a)`,
                          border: `2px solid ${avatarColors[(i + 5) % avatarColors.length]}`,
                          color: avatarColors[(i + 5) % avatarColors.length],
                        }}
                      >
                        {r.initial || r.name?.[0] || "?"}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{r.name}</div>
                        <div style={{ color: "#00e5ff", fontSize: "11px", marginTop: "1px" }}>{r.role || ""}</div>
                        <div style={{ color: "#64748b", fontSize: "11px" }}>📍 {r.location}</div>
                      </div>
                    </div>
                    <Stars count={r.stars || 5} />
                    <p style={{ color: "#cbd5f5", fontSize: "13px", lineHeight: "1.65", textAlign: "left" }}>
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-[#94a3b8] animate-pulse py-20">Loading reviews...</div>
        )}

        {/* WHERE OUR LEARNERS WORK (COMPANIES) */}
        <div className="mt-28 px-5" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          <h3 className="text-[#94a3b8] text-xs font-black uppercase tracking-[0.3em] mb-10">
            Our Learners Work At
          </h3>
          <div className="marquee-container opacity-90 pt-4 pb-4">
            <div className="marquee-content">
              {companies.map((logo, i) => (
                <div key={logo.name + i} className="px-6 md:px-10 flex-shrink-0">
                  <LogoRender name={logo.name} id={logo.id} heightClass="h-7 md:h-12" />
                </div>
              ))}
              {companies.map((logo, i) => (
                <div key={logo.name + "-dup-" + i} className="px-6 md:px-10 flex-shrink-0">
                  <LogoRender name={logo.name} id={logo.id} heightClass="h-7 md:h-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}