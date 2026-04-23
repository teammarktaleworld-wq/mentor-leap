

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

// // 20 realistic fallback reviews
// const STATIC_REVIEWS = [
   
//   {
//     name: "Aarti Shroff",
//     role: "",
//     initials: "AS",
//     color: "#1a56db",
//     bg: "#ebf5ff",
//     quote:
//       "Thank you so much Mridu for your time and teaching. You have made a big difference in each one of our public speaking and we can see how well we have improved. Will definitely keep in touch and keep asking for your support often.",
//   },
//   {
//     name: "Sujit Danait",
//     role: "",
//     initials: "SD",
//     color: "#057a55",
//     bg: "#e3fbf6",
//     quote:
//       "It was a great learning experience. Because of your step-by-step approach to effective public speaking, now it looks achievable. Effective communication is probably the single most important skill in life and I am sure these learnings will help all of us to do better in our lives.",
//   },
//   {
//     name: "Paramesh Sarma",
//     role: "Senior Manager, Delhi/NCR",
//     initials: "PS",
//     color: "#9f580a",
//     bg: "#fffbeb",
//     quote:
//       "I had an amazing experience with Mentorleap's Public Speaking training. Mridu's guidance was excellent and her approach was engaging, making the program a wonderfully enriching experience. I feel more confident and prepared for speaking engagements. Highly recommended!",
//   },
//   {
//     name: "Ruchi Halakhandi",
//     role: "",
//     initials: "RH",
//     color: "#c81e1e",
//     bg: "#fff5f5",
//     quote:
//       "Mridu, thank you for this excellent course. It's a very good mix of theory & practical as well as the feature of being able to track one's progress is quite useful. Thank you also to all the cohort mates. Made the classes all the more interactive & interesting.",
//   },
//   {
//     name: "Leena Dayal",
//     role: "",
//     initials: "LD",
//     color: "#6c2bd9",
//     bg: "#f5f3ff",
//     quote:
//       "Thank you Mridu, for being a great mentor. Learning with you and under your guidance was a delight. Will surely stay in touch and be connected with you and all members of this group. Wishing you and all in group peace and comfort all your way!",
//   },
//   {
//     name: "Jigar Gogri",
//     role: "Mentorleap Cohort",
//     initials: "JG",
//     color: "#1a56db",
//     bg: "#ebf5ff",
//     quote:
//       "I would like to thank Mridu Bhandari for coming up with this wonderful training to speak effectively! I loved the content discussed during the live classes and the exercises. Thanks for being a wonderful coach! Looking forward to meeting you in person!",
//   },
//   {
//     name: "Pravin Chaudhary",
//     role: "",
//     initials: "PC",
//     color: "#057a55",
//     bg: "#e3fbf6",
//     quote:
//       "It was a great session and I learned lots from everyone. If any one gets a chance to come to Ahmedabad, please ping me — we will have good lunch or dinner together with gujju style. You are most welcome with family!",
//   },
//   {
//     name: "Ajay Singh",
//     role: "Mentorleap Cohort",
//     initials: "AS",
//     color: "#9f580a",
//     bg: "#fffbeb",
//     quote:
//       "Thank you Mridu Ma'am! You gave me the opportunity to be part of this cohort. It was wonderful. I learnt many things which will help me go ahead in my business with more confidence.",
//   },
//   {
//     name: "Adhyuth",
//     role: "Mentorleap Cohort",
//     initials: "AD",
//     color: "#c81e1e",
//     bg: "#fff5f5",
//     quote:
//       "Thanks Mridu. Wonderful cohort this was! As promised, I will have my brother enroll soon for the next. May we all be the best version of us on stage.",
//   },
//   {
//     name: "Alice Ando",
//     role: "Senior HR Manager, Manila",
//     initials: "AA",
//     color: "#6c2bd9",
//     bg: "#f5f3ff",
//     quote:
//       "It is indeed a mentorship program. I had a great learning experience. Mridu made me feel comfortable and allowed me to be myself during practical exercises.",
//   },
//   {
//     name: "Laila Saleh",
//     role: "Associate Senior Manager, Jordan",
//     initials: "LS",
//     color: "#1a56db",
//     bg: "#ebf5ff",
//     quote:
//       "I really liked it and the programme will help you become more confident!",
//   },
//   {
//     name: "Abby Valles",
//     role: "Manager – Finance, Manila",
//     initials: "AV",
//     color: "#057a55",
//     bg: "#e3fbf6",
//     quote:
//       "It was a great program, and the content could make a difference in our day-to-day lives. I found it very interactive — hearing instructors' thoughts and tips is worth the value for money. I am happy I joined the session!",
//   },
//   {
//     name: "Ashish Koul",
//     role: "Senior Manager, Noida",
//     initials: "AK",
//     color: "#9f580a",
//     bg: "#fffbeb",
//     quote:
//       "I recently attended sessions in Mentorleap's Speak with Impact course and I confidently say it was a game changer for me. The mentor's approach was not only engaging but also tailored to meet individual needs. Kudos to Mentorleap for a fantastic learning experience! Highly recommended.",
//   },
//   {
//     name: "Riza Rosarial",
//     role: "Operations Manager – Recruitment, Manila",
//     initials: "RR",
//     color: "#c81e1e",
//     bg: "#fff5f5",
//     quote:
//       "It was a very good learning experience with other Managers and I would recommend other leaders to also go through the program. It was fun interacting with other participants and applying what we learned during class exercises.",
//   },
//   {
//     name: "Thet Rivera",
//     role: "Manager, Manila",
//     initials: "TR",
//     color: "#6c2bd9",
//     bg: "#f5f3ff",
//     quote:
//       "It was a good 8 sessions and I really enjoyed every course per session. I learned a lot and I know that it will definitely help me considering that I'm in the field of sales and business development.",
//   },
//   {
//     name: "Ma. Cecilia Amarille",
//     role: "Associate Manager, Manila",
//     initials: "MC",
//     color: "#1a56db",
//     bg: "#ebf5ff",
//     quote:
//       "I enjoyed the sessions with my colleagues and Mridu! Wish we have more of these! The next skill I want to learn is that of business writing!",
//   },
//   {
//     name: "Dima Talafha",
//     role: "Senior Manager, UAE",
//     initials: "DT",
//     color: "#057a55",
//     bg: "#e3fbf6",
//     quote:
//       "I would highly recommend the Mentorleap's Speak with Impact course to anyone who wants to improve their public speaking skills.",
//   },
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
//     <div style={{ color: "#facc15", fontSize: "14px", marginBottom: "10px" }}>
//       {[1, 2, 3, 4, 5].map((s) => (
//         <span key={s} style={{ opacity: s <= count ? 1 : 0.25 }}>★</span>
//       ))}
//     </div>
//   );
// }

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

// // Split reviews into two rows for the dual marquee
// function splitIntoRows<T>(arr: T[]): [T[], T[]] {
//   const mid = Math.ceil(arr.length / 2);
//   return [arr.slice(0, mid), arr.slice(mid)];
// }

// const avatarColors = [
//   "#00e5ff", "#6366f1", "#a78bfa", "#22d3ee", "#818cf8",
//   "#00e5ff", "#6366f1", "#a78bfa", "#22d3ee", "#818cf8",
// ];

// export default function ReviewsSection() {
//   const { ref, visible } = useInView();
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   fetchReviews().then((data: any[]) => {
//   //     // Merge API reviews with static ones, deduplicate by id
//   //     const merged = [...STATIC_REVIEWS];
//   //     data.forEach((r: any) => {
//   //       if (!merged.find((s) => s.id === r.id)) merged.push(r);
//   //     });
//   //     setReviews(merged);
//   //     setLoading(false);
//   //   }).catch(() => {
//   //     setReviews(STATIC_REVIEWS);
//   //     setLoading(false);
//   //   });
//   // }, []);

//   useEffect(() => {
//   // Use only curated static reviews — ignore API data to prevent test/dummy entries showing
//   setReviews(STATIC_REVIEWS);
//   setLoading(false);
// }, []);

//   const [row1, row2] = splitIntoRows(reviews);

//   const averageRating = reviews.length > 0
//     ? (reviews.reduce((acc, r) => acc + (r.stars || 5), 0) / reviews.length).toFixed(1)
//     : "4.9";

//   return (
//     <>
//       <style>{`
//         .reviews-gradient-text {
//           background: linear-gradient(90deg, #00e5ff, #6366f1);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         @keyframes ratingPulse {
//           0%   { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
//           50%  { text-shadow: 0 0 40px rgba(0,229,255,0.8); }
//           100% { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
//         }
//         .rating-number { animation: ratingPulse 3s ease-in-out infinite; }

//         @keyframes summaryFadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .summary-animate { animation: summaryFadeUp 0.7s ease 0.3s both; }

//         /* Marquee rows */
//         @keyframes marqueeLeft {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes marqueeRight {
//           0%   { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }

//         .marquee-track {
//           display: flex;
//           overflow: hidden;
//           width: 100%;
//           mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
//           -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
//         }

//         .marquee-row-left {
//           display: flex;
//           width: max-content;
//           animation: marqueeLeft 55s linear infinite;
//         }
//         .marquee-row-right {
//           display: flex;
//           width: max-content;
//           animation: marqueeRight 50s linear infinite;
//         }
//         .marquee-row-left:hover,
//         .marquee-row-right:hover {
//           animation-play-state: paused;
//         }

//         /* Review card */
//         .review-card {
//           flex-shrink: 0;
//           width: 320px;
//           background: #020617;
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 16px;
//           padding: 22px 24px;
//           margin: 0 12px;
//           position: relative;
//           transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
//           cursor: default;
//         }
//         .review-card:hover {
//           border-color: rgba(0,229,255,0.3);
//           box-shadow: 0 16px 48px rgba(0,229,255,0.08);
//           transform: translateY(-4px);
//         }
//         .review-quote-mark {
//           position: absolute;
//           top: 14px;
//           right: 18px;
//           font-size: 52px;
//           line-height: 1;
//           color: rgba(0,229,255,0.07);
//           font-family: Georgia, serif;
//           pointer-events: none;
//           transition: color 0.3s;
//         }
//         .review-card:hover .review-quote-mark {
//           color: rgba(0,229,255,0.14);
//         }

//         .review-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//           font-size: 15px;
//           flex-shrink: 0;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .review-card:hover .review-avatar {
//           transform: scale(1.1);
//         }

//         /* Companies marquee */
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
//         .marquee-content:hover { animation-play-state: paused; }
//       `}</style>

//       <section
//         ref={ref}
//         className="w-full text-center"
//         style={{ padding: "120px 0" }}
//       >
//         {/* TITLE */}
//         <div style={{ padding: "0 20px" }}>
//           <h2
//             className="text-white font-bold mb-10"
//             style={{
//               fontSize: "42px",
//               opacity: visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(-20px)",
//               transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
//             }}
//           >
//             What Professionals Say About{" "}
//             <span className="reviews-gradient-text">MentorLeap</span>
//           </h2>

//           {/* RATING SUMMARY */}
//           {visible && (
//             <div className="summary-animate mb-16">
//               <h3
//                 className="rating-number font-bold mb-2"
//                 style={{ fontSize: "56px", color: "#00e5ff" }}
//               >
//                 <RatingCounter visible={visible} target={Number(averageRating)} />
//               </h3>
//               <div style={{ color: "#facc15", fontSize: "22px", marginBottom: "8px" }}>
//                 ★★★★★
//               </div>
//               <p style={{ color: "#94a3b8", fontSize: "14px" }}>
//                 Based on {reviews.length}+ professional reviews
//               </p>
//             </div>
//           )}
//         </div>

//         {/* SLIDING REVIEW ROWS */}
//         {!loading && reviews.length > 0 && (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "20px",
//               opacity: visible ? 1 : 0,
//               transition: "opacity 0.8s ease 0.3s",
//             }}
//           >
//             {/* ROW 1 — slides left */}
//             <div className="marquee-track">
//               <div className="marquee-row-left">
//                 {[...row1, ...row1].map((r, i) => (
//                   <div key={`r1-${i}`} className="review-card">
//                     <div className="review-quote-mark">"</div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
//                       <div
//                         className="review-avatar"
//                         style={{
//                           background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}33, #0f172a)`,
//                           border: `2px solid ${avatarColors[i % avatarColors.length]}`,
//                           color: avatarColors[i % avatarColors.length],
//                         }}
//                       >
//                         {r.initial || r.name?.[0] || "?"}
//                       </div>
//                       <div style={{ textAlign: "left" }}>
//                         <div style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{r.name}</div>
//                         <div style={{ color: "#6366f1", fontSize: "11px", marginTop: "1px" }}>{r.role || ""}</div>
//                         <div style={{ color: "#64748b", fontSize: "11px" }}>📍 {r.location}</div>
//                       </div>
//                     </div>
//                     <Stars count={r.stars || 5} />
//                     <p style={{ color: "#cbd5f5", fontSize: "13px", lineHeight: "1.65", textAlign: "left" }}>
//                       {r.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ROW 2 — slides right */}
//             <div className="marquee-track">
//               <div className="marquee-row-right">
//                 {[...row2, ...row2].map((r, i) => (
//                   <div key={`r2-${i}`} className="review-card">
//                     <div className="review-quote-mark">"</div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
//                       <div
//                         className="review-avatar"
//                         style={{
//                           background: `linear-gradient(135deg, ${avatarColors[(i + 5) % avatarColors.length]}33, #0f172a)`,
//                           border: `2px solid ${avatarColors[(i + 5) % avatarColors.length]}`,
//                           color: avatarColors[(i + 5) % avatarColors.length],
//                         }}
//                       >
//                         {r.initial || r.name?.[0] || "?"}
//                       </div>
//                       <div style={{ textAlign: "left" }}>
//                         <div style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{r.name}</div>
//                         <div style={{ color: "#00e5ff", fontSize: "11px", marginTop: "1px" }}>{r.role || ""}</div>
//                         <div style={{ color: "#64748b", fontSize: "11px" }}>📍 {r.location}</div>
//                       </div>
//                     </div>
//                     <Stars count={r.stars || 5} />
//                     <p style={{ color: "#cbd5f5", fontSize: "13px", lineHeight: "1.65", textAlign: "left" }}>
//                       {r.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {loading && (
//           <div className="text-[#94a3b8] animate-pulse py-20">Loading reviews...</div>
//         )}

//         {/* WHERE OUR LEARNERS WORK (COMPANIES) */}
//         <div className="mt-28 px-5" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
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










// // "use client";

// // import { useRef, useEffect, useState } from "react";

// // const testimonials = [
// //   {
// //     name: "Aarti Shroff",
// //     role: "",
// //     initials: "AS",
// //     color: "#1a56db",
// //     bg: "#ebf5ff",
// //     quote:
// //       "Thank you so much Mridu for your time and teaching. You have made a big difference in each one of our public speaking and we can see how well we have improved. Will definitely keep in touch and keep asking for your support often.",
// //   },
// //   {
// //     name: "Sujit Danait",
// //     role: "",
// //     initials: "SD",
// //     color: "#057a55",
// //     bg: "#e3fbf6",
// //     quote:
// //       "It was a great learning experience. Because of your step-by-step approach to effective public speaking, now it looks achievable. Effective communication is probably the single most important skill in life and I am sure these learnings will help all of us to do better in our lives.",
// //   },
// //   {
// //     name: "Paramesh Sarma",
// //     role: "Senior Manager, Delhi/NCR",
// //     initials: "PS",
// //     color: "#9f580a",
// //     bg: "#fffbeb",
// //     quote:
// //       "I had an amazing experience with Mentorleap's Public Speaking training. Mridu's guidance was excellent and her approach was engaging, making the program a wonderfully enriching experience. I feel more confident and prepared for speaking engagements. Highly recommended!",
// //   },
// //   {
// //     name: "Ruchi Halakhandi",
// //     role: "",
// //     initials: "RH",
// //     color: "#c81e1e",
// //     bg: "#fff5f5",
// //     quote:
// //       "Mridu, thank you for this excellent course. It's a very good mix of theory & practical as well as the feature of being able to track one's progress is quite useful. Thank you also to all the cohort mates. Made the classes all the more interactive & interesting.",
// //   },
// //   {
// //     name: "Leena Dayal",
// //     role: "",
// //     initials: "LD",
// //     color: "#6c2bd9",
// //     bg: "#f5f3ff",
// //     quote:
// //       "Thank you Mridu, for being a great mentor. Learning with you and under your guidance was a delight. Will surely stay in touch and be connected with you and all members of this group. Wishing you and all in group peace and comfort all your way!",
// //   },
// //   {
// //     name: "Jigar Gogri",
// //     role: "Mentorleap Cohort",
// //     initials: "JG",
// //     color: "#1a56db",
// //     bg: "#ebf5ff",
// //     quote:
// //       "I would like to thank Mridu Bhandari for coming up with this wonderful training to speak effectively! I loved the content discussed during the live classes and the exercises. Thanks for being a wonderful coach! Looking forward to meeting you in person!",
// //   },
// //   {
// //     name: "Pravin Chaudhary",
// //     role: "",
// //     initials: "PC",
// //     color: "#057a55",
// //     bg: "#e3fbf6",
// //     quote:
// //       "It was a great session and I learned lots from everyone. If any one gets a chance to come to Ahmedabad, please ping me — we will have good lunch or dinner together with gujju style. You are most welcome with family!",
// //   },
// //   {
// //     name: "Ajay Singh",
// //     role: "Mentorleap Cohort",
// //     initials: "AS",
// //     color: "#9f580a",
// //     bg: "#fffbeb",
// //     quote:
// //       "Thank you Mridu Ma'am! You gave me the opportunity to be part of this cohort. It was wonderful. I learnt many things which will help me go ahead in my business with more confidence.",
// //   },
// //   {
// //     name: "Adhyuth",
// //     role: "Mentorleap Cohort",
// //     initials: "AD",
// //     color: "#c81e1e",
// //     bg: "#fff5f5",
// //     quote:
// //       "Thanks Mridu. Wonderful cohort this was! As promised, I will have my brother enroll soon for the next. May we all be the best version of us on stage.",
// //   },
// //   {
// //     name: "Alice Ando",
// //     role: "Senior HR Manager, Manila",
// //     initials: "AA",
// //     color: "#6c2bd9",
// //     bg: "#f5f3ff",
// //     quote:
// //       "It is indeed a mentorship program. I had a great learning experience. Mridu made me feel comfortable and allowed me to be myself during practical exercises.",
// //   },
// //   {
// //     name: "Laila Saleh",
// //     role: "Associate Senior Manager, Jordan",
// //     initials: "LS",
// //     color: "#1a56db",
// //     bg: "#ebf5ff",
// //     quote:
// //       "I really liked it and the programme will help you become more confident!",
// //   },
// //   {
// //     name: "Abby Valles",
// //     role: "Manager – Finance, Manila",
// //     initials: "AV",
// //     color: "#057a55",
// //     bg: "#e3fbf6",
// //     quote:
// //       "It was a great program, and the content could make a difference in our day-to-day lives. I found it very interactive — hearing instructors' thoughts and tips is worth the value for money. I am happy I joined the session!",
// //   },
// //   {
// //     name: "Ashish Koul",
// //     role: "Senior Manager, Noida",
// //     initials: "AK",
// //     color: "#9f580a",
// //     bg: "#fffbeb",
// //     quote:
// //       "I recently attended sessions in Mentorleap's Speak with Impact course and I confidently say it was a game changer for me. The mentor's approach was not only engaging but also tailored to meet individual needs. Kudos to Mentorleap for a fantastic learning experience! Highly recommended.",
// //   },
// //   {
// //     name: "Riza Rosarial",
// //     role: "Operations Manager – Recruitment, Manila",
// //     initials: "RR",
// //     color: "#c81e1e",
// //     bg: "#fff5f5",
// //     quote:
// //       "It was a very good learning experience with other Managers and I would recommend other leaders to also go through the program. It was fun interacting with other participants and applying what we learned during class exercises.",
// //   },
// //   {
// //     name: "Thet Rivera",
// //     role: "Manager, Manila",
// //     initials: "TR",
// //     color: "#6c2bd9",
// //     bg: "#f5f3ff",
// //     quote:
// //       "It was a good 8 sessions and I really enjoyed every course per session. I learned a lot and I know that it will definitely help me considering that I'm in the field of sales and business development.",
// //   },
// //   {
// //     name: "Ma. Cecilia Amarille",
// //     role: "Associate Manager, Manila",
// //     initials: "MC",
// //     color: "#1a56db",
// //     bg: "#ebf5ff",
// //     quote:
// //       "I enjoyed the sessions with my colleagues and Mridu! Wish we have more of these! The next skill I want to learn is that of business writing!",
// //   },
// //   {
// //     name: "Dima Talafha",
// //     role: "Senior Manager, UAE",
// //     initials: "DT",
// //     color: "#057a55",
// //     bg: "#e3fbf6",
// //     quote:
// //       "I would highly recommend the Mentorleap's Speak with Impact course to anyone who wants to improve their public speaking skills.",
// //   },
// // ];

// // function TestimonialCard({
// //   t,
// //   index,
// // }: {
// //   t: (typeof testimonials)[0];
// //   index: number;
// // }) {
// //   const ref = useRef<HTMLDivElement>(null);
// //   const [visible, setVisible] = useState(false);

// //   useEffect(() => {
// //     const el = ref.current;
// //     if (!el) return;
// //     const obs = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           setVisible(true);
// //           obs.disconnect();
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );
// //     obs.observe(el);
// //     return () => obs.disconnect();
// //   }, []);

// //   return (
// //     <div
// //       ref={ref}
// //       style={{
// //         background: "#fff",
// //         border: "1px solid #f0f0f0",
// //         borderRadius: "16px",
// //         padding: "1.5rem",
// //         display: "flex",
// //         flexDirection: "column",
// //         gap: "1rem",
// //         breakInside: "avoid",
// //         marginBottom: "1rem",
// //         opacity: visible ? 1 : 0,
// //         transform: visible ? "translateY(0)" : "translateY(20px)",
// //         transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`,
// //         boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
// //       }}
// //     >
// //       {/* Quote mark */}
// //       <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
// //         <path
// //           d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 3.6C4.2 4.8 3.4 6.2 3 7.8H6V18H0ZM12 18V10.8C12 7.2 13.2 4.2 15.6 1.8L17.4 3.6C16.2 4.8 15.4 6.2 15 7.8H18V18H12Z"
// //           fill={t.color}
// //           opacity="0.25"
// //         />
// //       </svg>

// //       <p
// //         style={{
// //           fontSize: "0.9375rem",
// //           lineHeight: "1.75",
// //           color: "#374151",
// //           margin: 0,
// //           flex: 1,
// //         }}
// //       >
// //         {t.quote}
// //       </p>

// //       <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "0.5rem", borderTop: "1px solid #f3f4f6" }}>
// //         <div
// //           style={{
// //             width: "38px",
// //             height: "38px",
// //             borderRadius: "50%",
// //             background: t.bg,
// //             color: t.color,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: "12px",
// //             fontWeight: 600,
// //             flexShrink: 0,
// //             letterSpacing: "0.5px",
// //           }}
// //         >
// //           {t.initials}
// //         </div>
// //         <div>
// //           <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>
// //             {t.name}
// //           </p>
// //           {t.role && (
// //             <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
// //               {t.role}
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function TestimonialsSection() {
// //   const col1 = testimonials.filter((_, i) => i % 3 === 0);
// //   const col2 = testimonials.filter((_, i) => i % 3 === 1);
// //   const col3 = testimonials.filter((_, i) => i % 3 === 2);

// //   return (
// //     <section
// //       style={{
// //         padding: "5rem 1.5rem",
// //         background: "#f9fafb",
// //         fontFamily: "'DM Sans', sans-serif",
// //       }}
// //     >
// //       {/* Google Font */}
// //       <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

// //       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
// //         {/* Header */}
// //         <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
// //           <p
// //             style={{
// //               fontSize: "0.8125rem",
// //               fontWeight: 600,
// //               letterSpacing: "0.12em",
// //               textTransform: "uppercase",
// //               color: "#1a56db",
// //               marginBottom: "0.75rem",
// //             }}
// //           >
// //             Real reviews · Real learners
// //           </p>
// //           <h2
// //             style={{
// //               fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
// //               fontWeight: 700,
// //               color: "#111827",
// //               margin: "0 0 1rem",
// //               lineHeight: 1.2,
// //             }}
// //           >
// //             Testimonials from past learners
// //           </h2>
// //           <p style={{ color: "#6b7280", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
// //             Hear directly from the professionals who've transformed their communication skills with Mentorleap.
// //           </p>
// //         </div>

// //         {/* Masonry Grid — 3 cols */}
// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(3, 1fr)",
// //             gap: "1rem",
// //             alignItems: "start",
// //           }}
// //         >
// //           <div>
// //             {col1.map((t, i) => (
// //               <TestimonialCard key={i} t={t} index={i * 3} />
// //             ))}
// //           </div>
// //           <div>
// //             {col2.map((t, i) => (
// //               <TestimonialCard key={i} t={t} index={i * 3 + 1} />
// //             ))}
// //           </div>
// //           <div>
// //             {col3.map((t, i) => (
// //               <TestimonialCard key={i} t={t} index={i * 3 + 2} />
// //             ))}
// //           </div>
// //         </div>

// //         {/* Stats bar */}
// //         <div
// //           style={{
// //             marginTop: "3.5rem",
// //             background: "#fff",
// //             border: "1px solid #e5e7eb",
// //             borderRadius: "16px",
// //             padding: "2rem",
// //             display: "grid",
// //             gridTemplateColumns: "repeat(3, 1fr)",
// //             gap: "1.5rem",
// //             textAlign: "center",
// //           }}
// //         >
// //           {[
// //             { value: "17+", label: "Learner reviews" },
// //             { value: "5+", label: "Countries represented" },
// //             { value: "100%", label: "Would recommend" },
// //           ].map((s, i) => (
// //             <div key={i}>
// //               <p
// //                 style={{
// //                   fontSize: "2rem",
// //                   fontWeight: 700,
// //                   color: "#111827",
// //                   margin: "0 0 4px",
// //                 }}
// //               >
// //                 {s.value}
// //               </p>
// //               <p style={{ fontSize: "0.875rem", color: "#9ca3af", margin: 0 }}>
// //                 {s.label}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }








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
  { name: "360 One Wealth", id: "360one", domain: "360.one" },
];

// Canonical review shape: use `text` and `initial` to match API response shape
const STATIC_REVIEWS = [
  {
    name: "Aarti Shroff",
    role: "",
    initial: "AS",
    color: "#1a56db",
    bg: "#ebf5ff",
    text: "Thank you so much Mridu for your time and teaching. You have made a big difference in each one of our public speaking and we can see how well we have improved. Will definitely keep in touch and keep asking for your support often.",
  },
  {
    name: "Sujit Danait",
    role: "",
    initial: "SD",
    color: "#057a55",
    bg: "#e3fbf6",
    text: "It was a great learning experience. Because of your step-by-step approach to effective public speaking, now it looks achievable. Effective communication is probably the single most important skill in life and I am sure these learnings will help all of us to do better in our lives.",
  },
  {
    name: "Paramesh Sarma",
    role: "Senior Manager, Delhi/NCR",
    initial: "PS",
    color: "#9f580a",
    bg: "#fffbeb",
    text: "I had an amazing experience with Mentorleap's Public Speaking training. Mridu's guidance was excellent and her approach was engaging, making the program a wonderfully enriching experience. I feel more confident and prepared for speaking engagements. Highly recommended!",
  },
  {
    name: "Ruchi Halakhandi",
    role: "",
    initial: "RH",
    color: "#c81e1e",
    bg: "#fff5f5",
    text: "Mridu, thank you for this excellent course. It's a very good mix of theory & practical as well as the feature of being able to track one's progress is quite useful. Thank you also to all the cohort mates. Made the classes all the more interactive & interesting.",
  },
  {
    name: "Leena Dayal",
    role: "",
    initial: "LD",
    color: "#6c2bd9",
    bg: "#f5f3ff",
    text: "Thank you Mridu, for being a great mentor. Learning with you and under your guidance was a delight. Will surely stay in touch and be connected with you and all members of this group. Wishing you and all in group peace and comfort all your way!",
  },
  {
    name: "Jigar Gogri",
    role: "Mentorleap Cohort",
    initial: "JG",
    color: "#1a56db",
    bg: "#ebf5ff",
    text: "I would like to thank Mridu Bhandari for coming up with this wonderful training to speak effectively! I loved the content discussed during the live classes and the exercises. Thanks for being a wonderful coach! Looking forward to meeting you in person!",
  },
  {
    name: "Pravin Chaudhary",
    role: "",
    initial: "PC",
    color: "#057a55",
    bg: "#e3fbf6",
    text: "It was a great session and I learned lots from everyone. If any one gets a chance to come to Ahmedabad, please ping me — we will have good lunch or dinner together with gujju style. You are most welcome with family!",
  },
  {
    name: "Ajay Singh",
    role: "Mentorleap Cohort",
    initial: "AS",
    color: "#9f580a",
    bg: "#fffbeb",
    text: "Thank you Mridu Ma'am! You gave me the opportunity to be part of this cohort. It was wonderful. I learnt many things which will help me go ahead in my business with more confidence.",
  },
  {
    name: "Adhyuth",
    role: "Mentorleap Cohort",
    initial: "AD",
    color: "#c81e1e",
    bg: "#fff5f5",
    text: "Thanks Mridu. Wonderful cohort this was! As promised, I will have my brother enroll soon for the next. May we all be the best version of us on stage.",
  },
  {
    name: "Alice Ando",
    role: "Senior HR Manager, Manila",
    initial: "AA",
    color: "#6c2bd9",
    bg: "#f5f3ff",
    text: "It is indeed a mentorship program. I had a great learning experience. Mridu made me feel comfortable and allowed me to be myself during practical exercises.",
  },
  {
    name: "Laila Saleh",
    role: "Associate Senior Manager, Jordan",
    initial: "LS",
    color: "#1a56db",
    bg: "#ebf5ff",
    text: "I really liked it and the programme will help you become more confident!",
  },
  {
    name: "Abby Valles",
    role: "Manager – Finance, Manila",
    initial: "AV",
    color: "#057a55",
    bg: "#e3fbf6",
    text: "It was a great program, and the content could make a difference in our day-to-day lives. I found it very interactive — hearing instructors' thoughts and tips is worth the value for money. I am happy I joined the session!",
  },
  {
    name: "Ashish Koul",
    role: "Senior Manager, Noida",
    initial: "AK",
    color: "#9f580a",
    bg: "#fffbeb",
    text: "I recently attended sessions in Mentorleap's Speak with Impact course and I confidently say it was a game changer for me. The mentor's approach was not only engaging but also tailored to meet individual needs. Kudos to Mentorleap for a fantastic learning experience! Highly recommended.",
  },
  {
    name: "Riza Rosarial",
    role: "Operations Manager – Recruitment, Manila",
    initial: "RR",
    color: "#c81e1e",
    bg: "#fff5f5",
    text: "It was a very good learning experience with other Managers and I would recommend other leaders to also go through the program. It was fun interacting with other participants and applying what we learned during class exercises.",
  },
  {
    name: "Thet Rivera",
    role: "Manager, Manila",
    initial: "TR",
    color: "#6c2bd9",
    bg: "#f5f3ff",
    text: "It was a good 8 sessions and I really enjoyed every course per session. I learned a lot and I know that it will definitely help me considering that I'm in the field of sales and business development.",
  },
  {
    name: "Ma. Cecilia Amarille",
    role: "Associate Manager, Manila",
    initial: "MC",
    color: "#1a56db",
    bg: "#ebf5ff",
    text: "I enjoyed the sessions with my colleagues and Mridu! Wish we have more of these! The next skill I want to learn is that of business writing!",
  },
  {
    name: "Dima Talafha",
    role: "Senior Manager, UAE",
    initial: "DT",
    color: "#057a55",
    bg: "#e3fbf6",
    text: "I would highly recommend the Mentorleap's Speak with Impact course to anyone who wants to improve their public speaking skills.",
  },
];

function LogoRender({ name, id, heightClass }: { name: string; id: string; heightClass: string }) {
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

  // Re-enable this block when the API is ready and returns { initial, text, ... } shaped objects
  // useEffect(() => {
  //   fetchReviews().then((data: any[]) => {
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

  const averageRating =
    reviews.length > 0
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

        @keyframes marqueeX {
          0%   { transform: translateX(0); }
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

        {/* WHERE OUR LEARNERS WORK */}
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