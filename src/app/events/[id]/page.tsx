// "use client";
// import React, { useState, useEffect } from "react";
// import Script from "next/script";
// import PageWrapper from "@/components/layout/PageWrapper";
// import { Reveal } from "@/components/ui/Animation";
// import { Button } from "@/components/ui/Button";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useParams, useRouter } from "next/navigation";
// import { useAuth } from "@/components/providers/AuthProvider";
// import { Loader } from "@/components/ui/Loader";
// import { Toast } from "@/components/ui/Toast";
// import { GradientText } from "@/components/ui/Typography";
// import { 
//   Clock, 
//   Calendar, 
//   ChevronRight, 
//   CheckCircle2, 
//   Star, 
//   ShieldCheck, 
//   Video, 
//   Mic2, 
//   MessageSquare, 
//   Target, 
//   User, 
//   Zap, 
//   Users, 
//   Gift, 
//   FileText, 
//   Layout, 
//   BookOpen, 
//   PlayCircle, 
//   BarChart, 
//   Globe 
// } from "lucide-react";
// import PaymentDetailsModal, { UserDetails } from "@/components/layout/PaymentDetailsModal";
// import SuccessOverlay from "@/components/ui/SuccessOverlay";
// import { Modal } from "@/components/ui/Modal";
// import { Input, Textarea } from "@/components/ui/Input";

// // --- Specialized Content for SWI Bootcamp Event ---
// const SWI_EVENT_CONTENT = {
//   id: "speak-with-impact-bootcamp",
//   title: "Speak With Impact: Public Speaking Bootcamp",
//   category: "High-Intensity Live Bootcamp",
//   description: "Transform how you communicate in high-stakes situations. A practice-driven 2-day live training designed for executive presence and instant impact.",
//   price: 1999,
//   date: "Mar 28, 2026",
//   duration: "2 Days (7 PM - 9 PM IST)",
//   imageUrl: "https://images.unsplash.com/photo-1475721027187-402ad2989a3b?w=1000&q=80",
//   audience: [
//     { label: "Young Professionals", desc: "Stand out in every meeting", icon: <User size={20} /> },
//     { label: "Founders & Entrepreneurs", desc: "Pitch products and vision with power", icon: <Zap size={20} /> },
//     { label: "Managers & Team Leads", desc: "Master leadership communication", icon: <Target size={20} /> },
//     { label: "Students", desc: "Build industry-ready confidence", icon: <Users size={20} /> }
//   ],
//   agenda: [
//     { day: "Day 1: Saturday (Foundations)", time: "7:00 PM - 9:00 PM", topics: ["Overcoming Stage Fear", "First Impressions", "Executive Presence"] },
//     { day: "Day 2: Sunday (Mastery)", time: "7:00 PM - 9:00 PM", topics: ["The Rule of Three", "Persuasive Narrative", "Handling Q&A Like a Pro"] }
//   ],
//   modules: [
//     { title: "Speak Confidently Under Pressure", desc: "Overcome fear, think clearly in real-time, and stay composed." },
//     { title: "Structure Thoughts Like a Leader", desc: "Use frameworks to stay clear, concise, and avoid rambling." },
//     { title: "Master Voice & Delivery", desc: "Pauses, tone, pace, and body language (online + offline)." },
//     { title: "Storytelling That Influences", desc: "Turn ideas into compelling narratives that drive decisions." },
//     { title: "Build Executive Presence", desc: "Own the room, sound confident, and be taken seriously." }
//   ],
//   howItWorks: [
//     { title: "Live Interactive Sessions", desc: "No pre-recorded boring lectures.", icon: <Video size={20} /> },
//     { title: "Real-Time Practice", desc: "Build muscle memory through exercises.", icon: <Mic2 size={20} /> },
//     { title: "Immediate Feedback", desc: "Get direct correction from the mentor.", icon: <MessageSquare size={20} /> },
//     { title: "Safe Environment", desc: "Learn and fail fast in a supportive group.", icon: <ShieldCheck size={20} /> }
//   ],
//   bonuses: [
//     { title: "Power Phrases Guide", desc: "Sound confident instantly.", icon: <FileText size={20} /> },
//     { title: "Own the Screen Cheatsheet", desc: "Master Zoom/Online presence.", icon: <Layout size={20} /> },
//     { title: "Eye Contact Mastery", desc: "Build trust through connection.", icon: <Star size={20} /> },
//     { title: "Resources Access", desc: "Continued learning materials.", icon: <BookOpen size={20} /> }
//   ],
//   mentorBio: "Award-winning TV Journalist, Chevening Scholar, and Communication Coach with 20+ years of experience. Featured on CNBC-TV18, Forbes India, and CNN-News18. Trained leaders across 13+ countries.",
//   outcome: ["Speak confidently in meetings", "Present ideas clearly", "Influence people through communication", "Handle pressure situations smoothly"],
//   zoomLink: "https://us05web.zoom.us/j/85625593374?pwd=VqabWHfa5B5Uf4lkBXCsjtPLOLPw6C.1",
//   meetingId: "856 2559 3374",
//   passcode: "2VZXAJ"
// };

// const MASTERCLASS_EVENT_CONTENT = {
//   id: "interview-to-offer-letter",
//   title: "Interview to Offer Letter: The Ultimate Communication Masterclass",
//   category: "Communication Masterclass",
//   description: "Learn how to answer the most commonly asked interview questions with clarity, structure, and confidence. Discover how to present yourself powerfully and turn interviews into offer letters.",
//   price: 499,
//   date: "Apr 30, 2026",
//   duration: "1 Day (7:30 PM - 9:00 PM IST)",
//   imageUrl: "/events/interview-to-offer-banner.png",
//   audience: [
//     { label: "Job Seekers", desc: "Freshers looking for their first break", icon: <User size={20} /> },
//     { label: "Career Switchers", desc: "Professionals moving to new roles", icon: <Zap size={20} /> },
//     { label: "Tech Professionals", desc: "Master behavioral interviews", icon: <Target size={20} /> },
//     { label: "Students", desc: "Get ahead of the competition", icon: <Users size={20} /> }
//   ],
//   agenda: [
//     { day: "Thursday, 30th April", time: "7:30 PM - 9:00 PM", topics: ["Introduction Patterns", "Handling Why Us?", "Strength/Weakness Storytelling", "Salary Negotiation Basics"] }
//   ],
//   modules: [
//     { title: "Answering with Clarity", desc: "Learn to structure your thoughts using the STAR and Pyramid methods." },
//     { title: "Executive Presence", desc: "How to sound confident and authoritative without overdoing it." },
//     { title: "Mastering Body Language", desc: "Eye contact, posture, and virtual interview etiquette." },
//     { title: "Repeatable Frameworks", desc: "A system to prepare for any interview in under 60 minutes." }
//   ],
//   howItWorks: [
//     { title: "Live Deep-Dive", desc: "A 2-hour interactive session with Mridu Bhandari.", icon: <Video size={20} /> },
//     { title: "Power Drills", desc: "Participat in live Q&A and mocks.", icon: <Mic2 size={20} /> },
//     { title: "Resource Vault", desc: "Get access to cheat sheets and templates.", icon: <MessageSquare size={20} /> },
//     { title: "Lifetime Community", desc: "Join our networking groups.", icon: <Users size={20} /> }
//   ],
//   bonuses: [
//     { title: "Interview Prep Guide", desc: "50+ questions and answers.", icon: <FileText size={20} /> },
//     { title: "LinkedIn Optimization", desc: "Get noticed by recruiters.", icon: <Layout size={20} /> },
//     { title: "Email Templates", desc: "Follow-up like a pro.", icon: <Star size={20} /> }
//   ],
//   mentorBio: "Award-winning TV Journalist, Chevening Scholar, and Communication Coach with 20+ years of experience. Trained leaders across 13+ countries.",
//   outcome: ["Answering tough questions easily", "Sounding like an expert", "Higher selection ratios", "Confidence in any room"],
//   zoomLink: "https://us05web.zoom.us/j/123456789?pwd=example",
//   meetingId: "123 456 789",
//   passcode: "MASTER"
// };

// export default function EventDetailsPage() {
//   const { id } = useParams();
//   const { user, userData } = useAuth();
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [registering, setRegistering] = useState(false);
//   const [isFreeSuccess, setIsFreeSuccess] = useState(false);
//   const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
//   const [showEnquiryModal, setShowEnquiryModal] = useState(false);
//   const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
//   const [enquiryForm, setEnquiryForm] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     profession: "",
//     query: "",
//   });

//   const isSWI = id === "speak-with-impact-bootcamp";
//   const isMasterclass = id === "interview-to-offer-letter";

//   useEffect(() => {
//     if (user?.email && !enquiryForm.email) {
//       setEnquiryForm((prev) => ({ ...prev, email: user.email || "" }));
//     }
//   }, [user?.email, enquiryForm.email]);

//   const { data: event, isLoading } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       try {
//         const res = await fetch(`/api/events/${id}`);
//         if (!res.ok) throw new Error("Event not found");
//         return res.json();
//       } catch (error) {
//         if (isSWI) return SWI_EVENT_CONTENT;
//         if (isMasterclass) return MASTERCLASS_EVENT_CONTENT;
//         throw error;
//       }
//     }
//   });

//   const handleRegisterInitiation = () => {
//     if (!user) {
//       return router.push(`/auth/login?redirect=/events/${id}?checkout=true`);
//     }
//     setShowDetailsModal(true);
//   };

//   const processRegistration = async (details: UserDetails) => {
//     try {
//       setRegistering(true);
//       setShowDetailsModal(false);
//       const token = await user?.getIdToken() || "";
//       if (!token) throw new Error("Authentication failed");
      
//       const res = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ 
//           itemId: id,
//           itemType: "event",
//           couponCode: details.couponCode,
//           userDetails: details
//         })
//       });
      
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Checkout failed");

//       if (data.type === "redirect") {
//         window.location.href = data.url;
//       } else if (data.type === "free") {
//         setIsFreeSuccess(true);
//         setShowSuccessOverlay(true);
//         queryClient.invalidateQueries({ queryKey: ["event", id] });
//       } else if (data.type === "paid") {
//         // --- RAZORPAY TEST LOGGING ---
//         console.log("--- [TEST] Razorpay Order Details ---");
//         console.log("Order ID:", data.orderId);
//         console.log("Key ID:", data.key);
//         console.log("Amount (paise):", data.amount);
//         console.log("Currency: INR");
//         console.log("-------------------------------------");

//         if (!data.key) throw new Error("Razorpay Key ID is missing. Please check environment variables.");
        
//         if (typeof (window as any).Razorpay === 'undefined') {
//           throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
//         }

//         const options = {
//           key: data.key,
//           amount: data.amount,
//           currency: "INR",
//           name: "MentorLeap",
//           description: `Registration for ${event.title}`,
//           order_id: data.orderId,
//           handler: async (response: any) => {
//             console.log("--- [TEST] Razorpay Payment Success ---");
//             console.log("Payment ID:", response.razorpay_payment_id);
//             console.log("Order ID:", response.razorpay_order_id);
//             console.log("Signature:", response.razorpay_signature);
//             console.log("---------------------------------------");
            
//             const verifyRes = await fetch("/api/checkout/verify", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                 ...response,
//                 itemId: id,
//                 itemType: "event"
//               })
//             });
//             if (verifyRes.ok) {
//               setToast({ show: true, message: "Successfully registered and paid!", type: "success" });
//               queryClient.invalidateQueries({ queryKey: ["event", id] });
//             } else {
//               setToast({ show: true, message: "Payment verification failed. Please contact support.", type: "error" });
//             }
//           },
//           modal: {
//             ondismiss: function() {
//               setRegistering(false);
//             }
//           },
//           prefill: {
//             name: details.fullName,
//             email: user?.email,
//             contact: details.phone
//           },
//           theme: { color: "#00e5ff" }
//         };
//         const rzp = new (window as any).Razorpay(options);
//         rzp.on('payment.failed', function (response: any) {
//           console.error("--- [TEST] Razorpay Payment Failed ---");
//           console.error("Error Code:", response.error.code);
//           console.error("Error Description:", response.error.description);
//           console.error("Error Source:", response.error.source);
//           console.error("Error Step:", response.error.step);
//           console.error("Error Reason:", response.error.reason);
//           console.error("---------------------------------------");
//         });
//         rzp.open();
//       }
//     } catch (e: any) {
//       setToast({ show: true, message: e.message, type: "error" });
//     } finally {
//       setRegistering(false);
//     }
//   };

//   const handleEnquiryFieldChange = (field: string, value: string) => {
//     setEnquiryForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmitEnquiry = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         name: enquiryForm.name.trim(),
//         mobile: enquiryForm.mobile.trim(),
//         email: enquiryForm.email.trim(),
//         profession: enquiryForm.profession.trim(),
//         query: enquiryForm.query.trim(),
//       };

//       if (!payload.name || !payload.mobile || !payload.email || !payload.profession || !payload.query) {
//         return setToast({ show: true, message: "Please fill all enquiry fields", type: "error" });
//       }

//       setSubmittingEnquiry(true);
//       const res = await fetch("/api/events/enquiries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...payload,
//           eventId: id,
//           eventTitle: event?.title || "MentorLeap Event",
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to submit enquiry");

//       setToast({ show: true, message: "Enquiry submitted successfully", type: "success" });
//       setShowEnquiryModal(false);
//       setEnquiryForm((prev) => ({
//         name: "",
//         mobile: "",
//         email: user?.email || prev.email || "",
//         profession: "",
//         query: "",
//       }));
//     } catch (error: any) {
//       setToast({ show: true, message: error.message || "Unable to submit enquiry", type: "error" });
//     } finally {
//       setSubmittingEnquiry(false);
//     }
//   };

//   if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#020617]"><Loader /></div>;
//   if (!event) return <div className="h-screen flex items-center justify-center bg-[#020617] text-white">Event not found</div>;

//   const isRegistered = userData?.registeredEvents?.includes(id as string);

//   return (
//     <PageWrapper>
//       <section className="px-5 py-[120px] max-w-[1200px] mx-auto">
//           <div>
//             <div className="relative aspect-[21/9] w-full rounded-3xl bg-[#0f172a] border border-white/10 mb-10 overflow-hidden flex items-center justify-center shadow-2xl group">
//               {(() => {
//                 const bannerUrl = event.banner || event.thumbnail || event.imageUrl;
//                 const fallbackUrl = isSWI ? "/events/speak-with-impact.png" : null;
//                 const finalUrl = bannerUrl || fallbackUrl;
                
//                 if (finalUrl) {
//                   return <img src={finalUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt={event.title} />;
//                 }
//                 return (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
//                     <div className="text-5xl md:text-7xl font-black opacity-10 uppercase tracking-tighter italic text-center px-10 select-none">
//                       {event.title || "MentorLeap Masterclass"}
//                     </div>
//                   </div>
//                 );
//               })()}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
//             </div>

//             <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
//               <div className="space-y-16">
//                 <div>
//                   <span className="px-4 py-1.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-bold uppercase tracking-widest mb-4 inline-block">{isSWI ? "High-Intensity Live Bootcamp" : (event.category || "Professional Development")}</span>
//                   <h1 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight">{event.title}</h1>
//                   <p className="text-[#94a3b8] text-xl leading-relaxed max-w-2xl">{event.description}</p>
//                 </div>

//                 {/* WHO IS THIS FOR? */}
//                 {(isSWI || isMasterclass) && (
//                   <Reveal>
//                     <h3 className="text-2xl font-black mb-8 underline decoration-[#00e5ff]/20 underline-offset-8">Who this is <GradientText>Targeted Toward</GradientText></h3>
//                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                       {(isSWI ? SWI_EVENT_CONTENT : MASTERCLASS_EVENT_CONTENT).audience.map((item: any, i: number) => (
//                         <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00e5ff]/50 transition-all group">
//                           <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] mb-4 group-hover:scale-110 transition-transform">
//                             {item.icon}
//                           </div>
//                           <h4 className="font-bold text-white text-sm mb-1">{item.label}</h4>
//                           <p className="text-[10px] text-[#64748b] leading-relaxed">{item.desc}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </Reveal>
//                 )}

//                 {/* AGENDA / MASTERY */}
//                 <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff05] blur-3xl rounded-full -mr-32 -mt-32"></div>
//                   <h3 className="text-2xl font-bold text-[#00e5ff] relative z-10">{(isSWI || isMasterclass) ? "Schedule & Outcomes" : "Masterclass Agenda"}</h3>
//                   <div className="space-y-6 relative z-10">
//                     {(isSWI || isMasterclass) ? (
//                       <div className="space-y-10">
//                         {(isSWI ? SWI_EVENT_CONTENT : MASTERCLASS_EVENT_CONTENT).agenda.map((item: any, i: number) => (
//                           <div key={i} className="flex flex-col gap-4 pb-8 border-b border-white/5 last:border-0 last:pb-0">
//                             <div className="flex items-center justify-between">
//                                <div className="text-[#00e5ff] font-black text-xs uppercase tracking-widest">{item.day}</div>
//                                <div className="text-[#64748b] font-bold text-sm tracking-tight flex items-center gap-2">
//                                  <Clock size={14} className="text-[#00e5ff]" />
//                                  {item.time} IST
//                                </div>
//                             </div>
//                             <div className="grid sm:grid-cols-3 gap-4">
//                                {item.topics.map((topic: string, j: number) => (
//                                  <div key={j} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-[#cbd5f5] font-medium flex items-center gap-2">
//                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></div>
//                                    {topic}
//                                  </div>
//                                ))}
//                             </div>
//                           </div>
//                         ))}
                        
//                         <div className="pt-6 grid gap-6">
//                            <h4 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-[#00e5ff] pl-4">Core Mastery Modules:</h4>
//                            <div className="grid md:grid-cols-2 gap-6">
//                               {(isSWI ? SWI_EVENT_CONTENT : MASTERCLASS_EVENT_CONTENT).modules.map((m: any, i: number) => (
//                                 <div key={i} className="flex gap-4 items-start">
//                                   <div className="mt-1 flex-shrink-0"><CheckCircle2 size={16} className="text-[#00e5ff]" /></div>
//                                   <div>
//                                     <h5 className="text-white font-bold text-sm">{m.title}</h5>
//                                     <p className="text-[10px] text-[#64748b]">{m.desc}</p>
//                                   </div>
//                                 </div>
//                               ))}
//                            </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <div className="flex gap-6 items-start pb-6 border-b border-white/5">
//                           <div className="text-[#00e5ff] font-bold text-lg min-w-[100px]">10:00 AM</div>
//                           <div className="text-[#cbd5f5] font-medium text-lg">Foundations of Executive Presence</div>
//                         </div>
//                         <div className="flex gap-6 items-start pb-6 border-b border-white/5">
//                           <div className="text-[#00e5ff] font-bold text-lg min-w-[100px]">12:00 PM</div>
//                           <div className="text-[#cbd5f5] font-medium text-lg">Live Framework Application Workshop</div>
//                         </div>
//                         <div className="flex gap-6 items-start">
//                           <div className="text-[#00e5ff] font-bold text-lg min-w-[100px]">02:30 PM</div>
//                           <div className="text-[#cbd5f5] font-medium text-lg">High-Stakes Positioning & Hotseats</div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* HOW IT WORKS */}
//                 {(isSWI || isMasterclass) && (
//                   <Reveal>
//                     <h3 className="text-2xl font-black mb-8 tracking-tight">How the Event <GradientText>Works</GradientText></h3>
//                     <div className="grid sm:grid-cols-2 gap-6">
//                       {(isSWI ? SWI_EVENT_CONTENT : MASTERCLASS_EVENT_CONTENT).howItWorks.map((item: any, i: number) => (
//                         <div key={i} className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-5">
//                           <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] flex-shrink-0">
//                             {item.icon}
//                           </div>
//                           <div>
//                             <h4 className="font-bold text-white mb-1">{item.title}</h4>
//                             <p className="text-xs text-[#64748b]">{item.desc}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Reveal>
//                 )}

//                 {/* BONUSES */}
//                 {(isSWI || isMasterclass) && (
//                   <Reveal>
//                      <div className="relative group">
//                         <div className="absolute -inset-1 bg-gradient-to-r from-[#00e5ff] to-[#6366f1] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
//                         <div className="relative bg-[#020617] rounded-3xl p-10 border border-white/5 overflow-hidden">
//                           <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
//                             Exclusive <GradientText>Bonuses Included</GradientText>
//                             <Gift className="text-[#00e5ff]" size={24} />
//                           </h3>
//                           <div className="grid sm:grid-cols-2 gap-8">
//                             {(isSWI ? SWI_EVENT_CONTENT : MASTERCLASS_EVENT_CONTENT).bonuses.map((item: any, i: number) => (
//                               <div key={i} className="flex gap-4 items-center">
//                                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00e5ff]">
//                                   {item.icon}
//                                 </div>
//                                 <div>
//                                   <h4 className="font-bold text-white text-sm">{item.title}</h4>
//                                   <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mt-0.5">{item.desc}</p>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                      </div>
//                   </Reveal>
//                 )}

//                 {/* INSTRUCTOR */}
//                 <Reveal>
//                    <h3 className="text-2xl font-black mb-8 tracking-tight">Your <GradientText>Mentor</GradientText></h3>
//                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
//                       <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff05] blur-3xl -mr-32 -mt-32 rounded-full"></div>
//                       <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-[#00e5ff]/20 shadow-[0_10px_30px_rgba(0,229,255,0.1)] relative z-10">
//                         <img
//                           src="/mridu-bhandari-profile.jpg"
//                           onError={(e: any) => e.target.src = "https://ui-avatars.com/api/?name=Mridu+Bhandari&background=00e5ff&color=020617&size=200"}
//                           className="w-full h-full object-cover"
//                           alt="Mridu Bhandari"
//                         />
//                       </div>
//                       <div className="flex-1 relative z-10 text-center md:text-left">
//                          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
//                             <h4 className="text-2xl font-black text-white">Mridu Bhandari</h4>
//                             <ShieldCheck size={18} className="text-[#00e5ff]" />
//                          </div>
//                          <p className="text-[#00e5ff] text-[10px] font-black uppercase tracking-widest mb-4">Award-Winning Journalist • Communication Coach</p>
//                          <p className="text-sm text-[#cbd5f5] leading-relaxed mb-6 italic opacity-80">
//                             {isSWI ? SWI_EVENT_CONTENT.mentorBio : "With over 20+ years of experience in high-stakes communication, Mridu has mentored 500+ professionals across Google, Amazon, and Fortune 500 companies."}
//                          </p>
//                          <div className="flex gap-8 justify-center md:justify-start grayscale opacity-30 invert">
//                             <span className="text-[9px] font-black text-white">CNBC-TV18</span>
//                             <span className="text-[9px] font-black text-white">FORBES INDIA</span>
//                             <span className="text-[9px] font-black text-white">CNN-NEWS18</span>
//                          </div>
//                       </div>
//                    </div>
//                 </Reveal>
//               </div>

//               {/* SIDEBAR */}
//               <div className="lg:sticky lg:top-32 h-fit space-y-8">
//                 <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
//                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] to-[#6366f1]"></div>
                  
//                   <div className="flex items-end gap-3 mb-1">
//                     <span className="text-4xl font-black tracking-tight text-white">
//                       ₹{isSWI ? 1999 : isMasterclass ? 499 : (event.price || 499)}
//                     </span>
//                     {(isSWI || isMasterclass) && (
//                       <span className="text-2xl font-bold text-[#475569] line-through decoration-[#ef4444]/80 decoration-2 mb-0.5">
//                         ₹{isSWI ? 7999 : 1999}
//                       </span>
//                     )}
//                   </div>
//                   {(isSWI || isMasterclass) && <p className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest mb-10 mt-2">Special Launch Offer</p>}

//                   {!isSWI && <div className="h-10"></div>}

//                   <div className="space-y-4 mb-10">
//                     <div className="flex items-center gap-3 text-sm text-[#cbd5f5]">
//                       <span className="text-[#475569] font-black w-14 uppercase text-[9px] tracking-widest">Date</span>
//                       <span className="font-bold text-white italic">
//                         {event.displayDate || (isSWI ? "28th & 29th March '26" : isMasterclass ? "30th April '26" : (event.date ? new Date(event.date).toLocaleDateString() : "TBA"))}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-[#cbd5f5]">
//                       <span className="text-[#475569] font-black w-14 uppercase text-[9px] tracking-widest">Time</span>
//                       <span className="font-bold text-white italic">{isSWI ? "7:00 - 9:00 PM IST" : isMasterclass ? "7:30 - 9:00 PM IST" : "Check Agenda"}</span>
//                     </div>
//                     {(isRegistered || isFreeSuccess) && event.zoomLink && (
//                       <div className="flex items-center gap-3 text-sm text-[#cbd5f5]">
//                         <span className="text-[#475569] font-black w-14 uppercase text-[9px] tracking-widest">Link</span>
//                         <span className="font-bold text-white">
//                             <a href={event.zoomLink} target="_blank" className="text-[#00e5ff] hover:underline underline-offset-4 decoration-[#00e5ff]/30">Click to Join Zoom</a>
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <Button
//                       fullWidth
//                       disabled={registering || isRegistered || isFreeSuccess}
//                       onClick={handleRegisterInitiation}
//                       className={(isRegistered || isFreeSuccess) ? "bg-emerald-500 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] h-14 font-black uppercase tracking-widest" : "h-14 font-black uppercase tracking-widest shadow-[0_10px_25px_#00e5ff30]"}
//                     >
//                       {registering ? "Processing..." : (isRegistered || isFreeSuccess) ? "Seat Confirmed" : (isSWI || isMasterclass) ? "Secure Your Seat" : "Complete Registration"}
//                     </Button>
//                   </div>

//                   <div className="mb-4">
//                     <Button
//                       variant="outline"
//                       fullWidth
//                       onClick={() => setShowEnquiryModal(true)}
//                       className="h-12 font-black uppercase tracking-widest"
//                     >
//                       Enquiry
//                     </Button>
//                   </div>

//                   {isSWI && !isRegistered && !isFreeSuccess && (
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                       <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></div>
//                       <p className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff]">
//                         {(() => {
//                           const enrollmentCount = event.enrollmentCount || 0;
//                           if (enrollmentCount < 20) {
//                             return "75% OFF SLOTS AVAILABLE";
//                           }
//                           return "STANDARD REGISTRATION OPEN";
//                         })()}
//                       </p>
//                     </div>
//                   )}

//                   {!user && (
//                     <p className="text-[9px] text-center text-[#475569] mt-6 font-black uppercase tracking-[0.2em]">Login required to access link</p>
//                   )}
                  
//                   <p className="text-[9px] text-center text-[#475569] font-black uppercase tracking-widest mt-6 italic">
//                     🔒 SSL Secured Checkout
//                   </p>
//                 </div>
                
//                 {isSWI && (
//                   <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
//                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00e5ff]">Guaranteed Outcome</h5>
//                      <p className="text-[11px] text-[#cbd5f5] leading-relaxed">
//                         Master the skill of structured communication and vocal power. If you don&apos;t feel more confident in 2 days, we will provide a private 1-on-1 diagnostic session.
//                      </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//       </section>

//       {/* RAZORPAY SCRIPT */}
//       <Script 
//         src="https://checkout.razorpay.com/v1/checkout.js" 
//         strategy="lazyOnload"
//       />

//       {/* DETAILS FORM MODAL */}
//       <PaymentDetailsModal
//         isOpen={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         onSubmit={processRegistration}
//         initialEmail={user?.email || undefined}
//         courseTitle={event?.title}
//       />

//       <Modal
//         isOpen={showEnquiryModal}
//         onClose={() => setShowEnquiryModal(false)}
//         title="Event Enquiry Form"
//       >
//         <form onSubmit={handleSubmitEnquiry} className="space-y-4">
//           <Input
//             label="Name"
//             placeholder="Enter full name"
//             value={enquiryForm.name}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("name", e.target.value)}
//             required
//           />
//           <Input
//             label="Mobile Number"
//             placeholder="Enter mobile number"
//             value={enquiryForm.mobile}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("mobile", e.target.value)}
//             required
//           />
//           <Input
//             type="email"
//             label="Email"
//             placeholder="Enter email address"
//             value={enquiryForm.email}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("email", e.target.value)}
//             required
//           />
//           <Input
//             label="Profession"
//             placeholder="Enter profession"
//             value={enquiryForm.profession}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("profession", e.target.value)}
//             required
//           />
//           <Textarea
//             label="Query"
//             placeholder="Write your query"
//             value={enquiryForm.query}
//             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleEnquiryFieldChange("query", e.target.value)}
//             required
//           />
//           <Button type="submit" fullWidth disabled={submittingEnquiry}>
//             {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
//           </Button>
//         </form>
//       </Modal>

//       <SuccessOverlay
//         isOpen={showSuccessOverlay}
//         onClose={() => setShowSuccessOverlay(false)}
//         title="Registration Successful!"
//         message="Congratulations! Your seat for the 'Speak With Impact' Bootcamp has been successfully secured. Check your email for more details."
//         ctaText="View My Events"
//         onCtaClick={() => router.push("/dashboard/my-events")}
//       />

//       <Toast
//         isVisible={toast.show}
//         message={toast.message}
//         type={toast.type}
//         onClose={() => setToast({ ...toast, show: false })}
//       />
//     </PageWrapper>
//   );
// }



















"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import PageWrapper from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/Animation";
import { Button } from "@/components/ui/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Loader } from "@/components/ui/Loader";
import { Toast } from "@/components/ui/Toast";
import { GradientText } from "@/components/ui/Typography";
import {
  Clock,
  CheckCircle2,
  Star,
  ShieldCheck,
  Video,
  Mic2,
  MessageSquare,
  Target,
  User,
  Zap,
  Users,
  Gift,
  FileText,
  Layout,
  BookOpen,
  Compass,
  Award
} from "lucide-react";
import PaymentDetailsModal, { UserDetails } from "@/components/layout/PaymentDetailsModal";
import SuccessOverlay from "@/components/ui/SuccessOverlay";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";

// --- Specialized Content for SWI Bootcamp Event ---
const SWI_EVENT_CONTENT = {
  id: "speak-with-impact-bootcamp",
  title: "Speak With Impact: Public Speaking Bootcamp",
  category: "High-Intensity Live Bootcamp",
  description: "Transform how you communicate in high-stakes situations. A practice-driven 2-day live training designed for executive presence and instant impact.",
  price: 1999,
  strikePrice: 7999,
  date: "Mar 28, 2026",
  displayDate: "28th & 29th March '26",
  time: "7:00 - 9:00 PM IST",
  duration: "2 Days (7 PM - 9 PM IST)",
  imageUrl: "https://images.unsplash.com/photo-1475721027187-402ad2989a3b?w=1000&q=80",
  audience: [
    { label: "Young Professionals", desc: "Stand out in every meeting", icon: <User size={20} /> },
    { label: "Founders & Entrepreneurs", desc: "Pitch products and vision with power", icon: <Zap size={20} /> },
    { label: "Managers & Team Leads", desc: "Master leadership communication", icon: <Target size={20} /> },
    { label: "Students", desc: "Build industry-ready confidence", icon: <Users size={20} /> }
  ],
  agenda: [
    { day: "Day 1: Saturday (Foundations)", time: "7:00 PM - 9:00 PM", topics: ["Overcoming Stage Fear", "First Impressions", "Executive Presence"] },
    { day: "Day 2: Sunday (Mastery)", time: "7:00 PM - 9:00 PM", topics: ["The Rule of Three", "Persuasive Narrative", "Handling Q&A Like a Pro"] }
  ],
  modules: [
    { title: "Speak Confidently Under Pressure", desc: "Overcome fear, think clearly in real-time, and stay composed." },
    { title: "Structure Thoughts Like a Leader", desc: "Use frameworks to stay clear, concise, and avoid rambling." },
    { title: "Master Voice & Delivery", desc: "Pauses, tone, pace, and body language (online + offline)." },
    { title: "Storytelling That Influences", desc: "Turn ideas into compelling narratives that drive decisions." },
    { title: "Build Executive Presence", desc: "Own the room, sound confident, and be taken seriously." }
  ],
  howItWorks: [
    { title: "Live Interactive Sessions", desc: "No pre-recorded boring lectures.", icon: <Video size={20} /> },
    { title: "Real-Time Practice", desc: "Build muscle memory through exercises.", icon: <Mic2 size={20} /> },
    { title: "Immediate Feedback", desc: "Get direct correction from the mentor.", icon: <MessageSquare size={20} /> },
    { title: "Safe Environment", desc: "Learn and fail fast in a supportive group.", icon: <ShieldCheck size={20} /> }
  ],
  bonuses: [
    { title: "Power Phrases Guide", desc: "Sound confident instantly.", icon: <FileText size={20} /> },
    { title: "Own the Screen Cheatsheet", desc: "Master Zoom/Online presence.", icon: <Layout size={20} /> },
    { title: "Eye Contact Mastery", desc: "Build trust through connection.", icon: <Star size={20} /> },
    { title: "Resources Access", desc: "Continued learning materials.", icon: <BookOpen size={20} /> }
  ],
  mentorBio: "Award-winning TV Journalist, Chevening Scholar, and Communication Coach with 20+ years of experience. Featured on CNBC-TV18, Forbes India, and CNN-News18. Trained leaders across 13+ countries.",
  outcome: ["Speak confidently in meetings", "Present ideas clearly", "Influence people through communication", "Handle pressure situations smoothly"],
  zoomLink: "https://us05web.zoom.us/j/85625593374?pwd=VqabWHfa5B5Uf4lkBXCsjtPLOLPw6C.1",
  meetingId: "856 2559 3374",
  passcode: "2VZXAJ"
};

const MASTERCLASS_EVENT_CONTENT = {
  id: "interview-to-offer-letter",
  title: "Interview to Offer Letter: The Ultimate Communication Masterclass",
  category: "Communication Masterclass",
  description: "Learn how to answer the most commonly asked interview questions with clarity, structure, and confidence. Discover how to present yourself powerfully and turn interviews into offer letters.",
  price: 499,
  strikePrice: 1999,
  date: "Apr 30, 2026",
  displayDate: "30th April '26",
  time: "7:30 - 9:00 PM IST",
  duration: "1 Day (7:30 PM - 9:00 PM IST)",
  imageUrl: "/events/interview-to-offer-banner.png",
  audience: [
    { label: "Job Seekers", desc: "Freshers looking for their first break", icon: <User size={20} /> },
    { label: "Career Switchers", desc: "Professionals moving to new roles", icon: <Zap size={20} /> },
    { label: "Tech Professionals", desc: "Master behavioral interviews", icon: <Target size={20} /> },
    { label: "Students", desc: "Get ahead of the competition", icon: <Users size={20} /> }
  ],
  agenda: [
    { day: "Thursday, 30th April", time: "7:30 PM - 9:00 PM", topics: ["Introduction Patterns", "Handling Why Us?", "Strength/Weakness Storytelling", "Salary Negotiation Basics"] }
  ],
  modules: [
    { title: "Answering with Clarity", desc: "Learn to structure your thoughts using the STAR and Pyramid methods." },
    { title: "Executive Presence", desc: "How to sound confident and authoritative without overdoing it." },
    { title: "Mastering Body Language", desc: "Eye contact, posture, and virtual interview etiquette." },
    { title: "Repeatable Frameworks", desc: "A system to prepare for any interview in under 60 minutes." }
  ],
  howItWorks: [
    { title: "Live Deep-Dive", desc: "A 2-hour interactive session with Mridu Bhandari.", icon: <Video size={20} /> },
    { title: "Power Drills", desc: "Participat in live Q&A and mocks.", icon: <Mic2 size={20} /> },
    { title: "Resource Vault", desc: "Get access to cheat sheets and templates.", icon: <MessageSquare size={20} /> },
    { title: "Lifetime Community", desc: "Join our networking groups.", icon: <Users size={20} /> }
  ],
  bonuses: [
    { title: "Interview Prep Guide", desc: "50+ questions and answers.", icon: <FileText size={20} /> },
    { title: "LinkedIn Optimization", desc: "Get noticed by recruiters.", icon: <Layout size={20} /> },
    { title: "Email Templates", desc: "Follow-up like a pro.", icon: <Star size={20} /> }
  ],
  mentorBio: "Award-winning TV Journalist, Chevening Scholar, and Communication Coach with 20+ years of experience. Trained leaders across 13+ countries.",
  outcome: ["Answering tough questions easily", "Sounding like an expert", "Higher selection ratios", "Confidence in any room"],
  zoomLink: "https://us05web.zoom.us/j/123456789?pwd=example",
  meetingId: "123 456 789",
  passcode: "MASTER"
};

// --- NEW: Smart But Overlooked (Executive Presence Masterclass) ---
const SMART_EVENT_CONTENT = {
  id: "smart-but-overlooked",
  title: "Smart But Overlooked",
  subtitle: "The Executive Presence Masterclass with Mridu Bhandari",
  category: "Executive Presence Masterclass",
  description: "The room decides if you are a leader even before you speak. I've spent 21 years in television news, watching that decision get made in 7 seconds every time. On Sunday, in 120 minutes, I show you how to change it.",
  price: 999,        // ← TODO: set real price (keep in sync with /api/checkout HARDCODED_ITEMS)
  strikePrice: 2999, // ← TODO: set real strike price
  date: "Sunday",
  displayDate: "Sunday",           // ← TODO: add the exact date, e.g. "12th July '26"
  time: "11:00 AM - 1:00 PM IST",  // ← TODO: confirm timing
  duration: "120 minutes live",
  imageUrl: "/events/smart-but-overlooked-banner.png", // ← TODO: add banner image to /public/events
  highlights: [
    "120 minutes live with Mridu. Not recorded.",
    "3 to 5 of you get coached LIVE",
    "Six IMPACT tools you can use on Monday",
    "MentorLeap's Inside-Out Compass live diagnostic"
  ],
  pattern: {
    heading: "You already know if this is you.",
    items: [
      "You walked out of a meeting thinking \"I knew what I wanted to say, but I didn't land it.\"",
      "You watched someone less capable get more airtime.",
      "You agreed with an option you did not believe in, because the moment to speak passed and you did not take it.",
      "You were told you are \"very good at what you do\" and then watched the promotion go elsewhere."
    ],
    callout: "Nobody writes \"communicates without authority\" on a performance review. They write strong technical contributor and give the role to someone else.",
    callout2: "This is not a competence problem. It is an executive presence problem, and by 1:00 PM on Sunday you will know exactly where yours sits."
  },
  audience: [
    { label: "Senior Professionals & Managers", desc: "You deliver. You get trusted with the hard work. And the visibility keeps going to someone whose output you could match on a bad day. Your gap is usually message clarity and poise.", icon: <User size={20} /> },
    { label: "Founders & Business Owners", desc: "You pitch, you lead, you hold rooms full of people who are older or wealthier than you. Your gap is usually gravitas under pressure, and it costs you in the first ninety seconds.", icon: <Zap size={20} /> },
    { label: "Women in Leadership", desc: "You are interrupted, softened, or asked to repeat a point that gets credited to whoever says it next. Your gap is rarely competence. It is usually how you are looked to open.", icon: <Users size={20} /> }
  ],
  audienceHeading: "Find yourself in one of these three.",
  audienceSub: "The gap I am fixing does not check your designation. But it does show up differently depending on where you sit.",
  audienceFooter: "If you are 21 or older and you have a room you need to own, you are in the right place.",
  agenda: [
    { time: "0:00 – 0:08", title: "The Beginning", desc: "Why smart people go quiet in rooms they earned the right to be in." },
    { time: "0:08 – 0:20", title: "The Executive Presence Myth", desc: "The belief limiting your career, taken apart." },
    { time: "0:20 – 0:35", title: "The Inside-Out Compass", desc: "A live self-diagnostic. Four quadrants: Conviction, Gravitas, Emotional Intelligence, Influence. You find your exact gap before we go further. Not a personality test. A location." },
    { time: "0:35 – 1:00", title: "The IMPACT Map", desc: "Six pillars of executive presence. One usable tool from each." },
    { time: "1:00 – 1:40", title: "Live Hot-Seat Coaching", desc: "You deliver your opening in 45 seconds, as you normally would. I give you specific, tangible observation. You apply immediately and deliver again. The room watches what happens between those two deliveries.", highlight: true },
    { time: "1:40 – 1:50", title: "Your 3-Step Action Plan", desc: "Not a worksheet you forget by Monday. A contract you write with yourself." },
    { time: "1:50 – 2:00", title: "Close and Live Q&A", desc: "Every question answered live, until they run out." }
  ],
  impact: {
    heading: "Six tools. You leave with all of them.",
    sub: "Six pillars of executive presence. One usable tool from each, handed to you live on Sunday.",
    pillars: [
      { letter: "I", label: "Identity & Mindset" },
      { letter: "M", label: "Message Clarity" },
      { letter: "P", label: "Presence & Body Language" },
      { letter: "A", label: "Audience Intelligence" },
      { letter: "C", label: "Command of Voice" },
      { letter: "T", label: "Trust Under Pressure" }
    ],
    footer: "Six tools will change your next conversation. The full system is when all six compound over weeks and become how you communicate without thinking about it. That takes longer, and I will tell you so on the day."
  },
  bonuses: [
    { title: "The 3-Part Message Template", desc: "One page. 1-page printable PDF with 4 worked examples.", icon: <FileText size={20} /> },
    { title: "The 60-Second Reset Card", desc: "Print and phone versions. Works before interviews or boardrooms.", icon: <Layout size={20} /> },
    { title: "The Inside-Out Compass Scorecard", desc: "4-quadrant scoring grid. Re-score in 3 weeks.", icon: <Compass size={20} /> }
  ],
  bonusesHeading: "Three bonus tools you get to keep",
  mentorBio: "Mridu Bhandari is an award-winning broadcast journalist, Founder of MentorLeap and an Executive Presence Strategist. She has spent 21 years across CNBC-TV18, Forbes India, Moneycontrol, BBC London and Times Network and is currently Senior Anchor & Consulting Editor at Network18. She has interviewed Ministers, policymakers and Fortune 500 CEOs on live television and at large scale events, where there is no second take and the audience judges you in the first seven seconds. She now coaches senior leaders on executive presence, creating tools and diagnostics based on her real-life interactions with high achievers over 21 years.",
  mentorStats: [
    { value: "21+", label: "Years in broadcast media" },
    { value: "900+", label: "Corporate events anchored" },
    { value: "250+", label: "Hours coaching senior leaders" }
  ],
  mentorBadges: ["Ramnath Goenka Awardee", "Chevening Scholar", "UCL Alum", "10,000+ professionals taught"],
  zoomLink: "", // ← TODO: add Zoom link
  meetingId: "",
  passcode: ""
};

const EVENT_FALLBACKS: Record<string, any> = {
  "speak-with-impact-bootcamp": SWI_EVENT_CONTENT,
  "interview-to-offer-letter": MASTERCLASS_EVENT_CONTENT,
  "smart-but-overlooked": SMART_EVENT_CONTENT
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const { user, userData } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [isFreeSuccess, setIsFreeSuccess] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    mobile: "",
    email: "",
    profession: "",
    query: "",
  });

  const isSWI = id === "speak-with-impact-bootcamp";
  const isMasterclass = id === "interview-to-offer-letter";
  const isSmart = id === "smart-but-overlooked";
  const isCustom = isSWI || isMasterclass || isSmart;
  const staticContent: any = EVENT_FALLBACKS[id as string] || null;

  useEffect(() => {
    if (user?.email && !enquiryForm.email) {
      setEnquiryForm((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user?.email, enquiryForm.email]);

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      } catch (error) {
        if (staticContent) return staticContent;
        throw error;
      }
    }
  });

  const handleRegisterInitiation = () => {
    if (!user) {
      return router.push(`/auth/login?redirect=/events/${id}?checkout=true`);
    }
    setShowDetailsModal(true);
  };

  const processRegistration = async (details: UserDetails) => {
    try {
      setRegistering(true);
      setShowDetailsModal(false);
      const token = await user?.getIdToken() || "";
      if (!token) throw new Error("Authentication failed");

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          itemId: id,
          itemType: "event",
          couponCode: details.couponCode,
          userDetails: details
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      if (data.type === "redirect") {
        window.location.href = data.url;
      } else if (data.type === "free") {
        setIsFreeSuccess(true);
        setShowSuccessOverlay(true);
        queryClient.invalidateQueries({ queryKey: ["event", id] });
      } else if (data.type === "paid") {
        // --- RAZORPAY TEST LOGGING ---
        console.log("--- [TEST] Razorpay Order Details ---");
        console.log("Order ID:", data.orderId);
        console.log("Key ID:", data.key);
        console.log("Amount (paise):", data.amount);
        console.log("Currency: INR");
        console.log("-------------------------------------");

        if (!data.key) throw new Error("Razorpay Key ID is missing. Please check environment variables.");

        if (typeof (window as any).Razorpay === 'undefined') {
          throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
        }

        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "MentorLeap",
          description: `Registration for ${event.title}`,
          order_id: data.orderId,
          handler: async (response: any) => {
            console.log("--- [TEST] Razorpay Payment Success ---");
            console.log("Payment ID:", response.razorpay_payment_id);
            console.log("Order ID:", response.razorpay_order_id);
            console.log("Signature:", response.razorpay_signature);
            console.log("---------------------------------------");

            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                ...response,
                itemId: id,
                itemType: "event"
              })
            });
            if (verifyRes.ok) {
              setToast({ show: true, message: "Successfully registered and paid!", type: "success" });
              queryClient.invalidateQueries({ queryKey: ["event", id] });
            } else {
              setToast({ show: true, message: "Payment verification failed. Please contact support.", type: "error" });
            }
          },
          modal: {
            ondismiss: function() {
              setRegistering(false);
            }
          },
          prefill: {
            name: details.fullName,
            email: user?.email,
            contact: details.phone
          },
          theme: { color: "#00e5ff" }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          console.error("--- [TEST] Razorpay Payment Failed ---");
          console.error("Error Code:", response.error.code);
          console.error("Error Description:", response.error.description);
          console.error("Error Source:", response.error.source);
          console.error("Error Step:", response.error.step);
          console.error("Error Reason:", response.error.reason);
          console.error("---------------------------------------");
        });
        rzp.open();
      }
    } catch (e: any) {
      setToast({ show: true, message: e.message, type: "error" });
    } finally {
      setRegistering(false);
    }
  };

  const handleEnquiryFieldChange = (field: string, value: string) => {
    setEnquiryForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: enquiryForm.name.trim(),
        mobile: enquiryForm.mobile.trim(),
        email: enquiryForm.email.trim(),
        profession: enquiryForm.profession.trim(),
        query: enquiryForm.query.trim(),
      };

      if (!payload.name || !payload.mobile || !payload.email || !payload.profession || !payload.query) {
        return setToast({ show: true, message: "Please fill all enquiry fields", type: "error" });
      }

      setSubmittingEnquiry(true);
      const res = await fetch("/api/events/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          eventId: id,
          eventTitle: event?.title || "MentorLeap Event",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit enquiry");

      setToast({ show: true, message: "Enquiry submitted successfully", type: "success" });
      setShowEnquiryModal(false);
      setEnquiryForm((prev) => ({
        name: "",
        mobile: "",
        email: user?.email || prev.email || "",
        profession: "",
        query: "",
      }));
    } catch (error: any) {
      setToast({ show: true, message: error.message || "Unable to submit enquiry", type: "error" });
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#020617]"><Loader /></div>;
  if (!event) return <div className="h-screen flex items-center justify-center bg-[#020617] text-white">Event not found</div>;

  const isRegistered = userData?.registeredEvents?.includes(id as string);

  const displayPrice = staticContent?.price ?? event.price ?? 499;
  const displayStrikePrice = staticContent?.strikePrice;
  const displayDate =
    event.displayDate ||
    staticContent?.displayDate ||
    (event.date ? new Date(event.date).toLocaleDateString() : "TBA");
  const displayTime = staticContent?.time || "Check Agenda";

  return (
    <PageWrapper>
      <section className="px-5 py-[120px] max-w-[1200px] mx-auto">
          <div>
            <div className="relative aspect-[21/9] w-full rounded-3xl bg-[#0f172a] border border-white/10 mb-10 overflow-hidden flex items-center justify-center shadow-2xl group">
              {(() => {
                const bannerUrl = event.banner || event.thumbnail || event.imageUrl;
                const fallbackUrl = isSWI ? "/events/speak-with-impact.png" : null;
                const finalUrl = bannerUrl || fallbackUrl;

                if (finalUrl) {
                  return (
                    <img
                      src={finalUrl}
                      onError={(e: any) => { e.currentTarget.style.display = "none"; }}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                      alt={event.title}
                    />
                  );
                }
                return (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
                    <div className="text-5xl md:text-7xl font-black opacity-10 uppercase tracking-tighter italic text-center px-10 select-none">
                      {event.title || "MentorLeap Masterclass"}
                    </div>
                  </div>
                );
              })()}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
              <div className="space-y-16">
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-xs font-bold uppercase tracking-widest mb-4 inline-block">{isSWI ? "High-Intensity Live Bootcamp" : (event.category || "Professional Development")}</span>
                  <h1 className="text-5xl md:text-6xl font-black mb-4 text-white leading-tight">
                    {isSmart ? <>Smart But <GradientText>Overlooked</GradientText></> : event.title}
                  </h1>
                  {isSmart && (
                    <p className="text-[#00e5ff] text-sm font-black uppercase tracking-widest mb-6">{SMART_EVENT_CONTENT.subtitle}</p>
                  )}
                  <p className="text-[#94a3b8] text-xl leading-relaxed max-w-2xl">{event.description}</p>

                  {isSmart && (
                    <ul className="mt-8 space-y-3">
                      {SMART_EVENT_CONTENT.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#cbd5f5] text-sm font-medium">
                          <CheckCircle2 size={18} className="text-[#00e5ff] flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* THE PATTERN (Smart But Overlooked only) */}
                {isSmart && (
                  <Reveal>
                    <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8">
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00e5ff] mb-3">The Pattern</p>
                        <h3 className="text-3xl font-black text-white">{SMART_EVENT_CONTENT.pattern.heading}</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {SMART_EVENT_CONTENT.pattern.items.map((item, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-4">
                            <span className="text-[#00e5ff] font-black text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                            <p className="text-sm text-[#cbd5f5] leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 rounded-2xl border-l-4 border-[#00e5ff] bg-[#00e5ff]/5 space-y-3">
                        <p className="text-sm text-[#cbd5f5] leading-relaxed">{SMART_EVENT_CONTENT.pattern.callout}</p>
                        <p className="text-sm text-white font-bold leading-relaxed">{SMART_EVENT_CONTENT.pattern.callout2}</p>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* WHO IS THIS FOR? */}
                {isCustom && (
                  <Reveal>
                    {isSmart ? (
                      <div className="mb-8">
                        <h3 className="text-2xl font-black mb-2">{SMART_EVENT_CONTENT.audienceHeading}</h3>
                        <p className="text-sm text-[#64748b]">{SMART_EVENT_CONTENT.audienceSub}</p>
                      </div>
                    ) : (
                      <h3 className="text-2xl font-black mb-8 underline decoration-[#00e5ff]/20 underline-offset-8">Who this is <GradientText>Targeted Toward</GradientText></h3>
                    )}
                    <div className={`grid sm:grid-cols-2 gap-6 ${isSmart ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                      {staticContent.audience.map((item: any, i: number) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00e5ff]/50 transition-all group">
                          <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] mb-4 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <h4 className="font-bold text-white text-sm mb-1">{item.label}</h4>
                          <p className={`${isSmart ? "text-xs" : "text-[10px]"} text-[#64748b] leading-relaxed`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    {isSmart && (
                      <p className="mt-6 p-4 rounded-xl border-l-4 border-[#00e5ff] bg-[#00e5ff]/5 text-sm text-[#cbd5f5] font-medium">
                        {SMART_EVENT_CONTENT.audienceFooter}
                      </p>
                    )}
                  </Reveal>
                )}

                {/* AGENDA / MASTERY */}
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff05] blur-3xl rounded-full -mr-32 -mt-32"></div>
                  <h3 className="text-2xl font-bold text-[#00e5ff] relative z-10">
                    {isSmart ? "Two hours. Seven segments. Nothing filler." : isCustom ? "Schedule & Outcomes" : "Masterclass Agenda"}
                  </h3>
                  <div className="space-y-6 relative z-10">
                    {isSmart ? (
                      <div className="space-y-4">
                        {SMART_EVENT_CONTENT.agenda.map((seg, i) => (
                          <div
                            key={i}
                            className={`flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border ${seg.highlight ? "bg-[#00e5ff]/10 border-[#00e5ff]/40" : "bg-white/[0.02] border-white/5"}`}
                          >
                            <div className="sm:w-28 flex-shrink-0">
                              <span className="inline-block px-3 py-1 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] font-black tracking-widest">
                                {seg.time}
                              </span>
                            </div>
                            <div>
                              <h5 className="text-white font-bold text-sm mb-1">{seg.title}</h5>
                              <p className="text-xs text-[#94a3b8] leading-relaxed">{seg.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : isCustom ? (
                      <div className="space-y-10">
                        {staticContent.agenda.map((item: any, i: number) => (
                          <div key={i} className="flex flex-col gap-4 pb-8 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between">
                               <div className="text-[#00e5ff] font-black text-xs uppercase tracking-widest">{item.day}</div>
                               <div className="text-[#64748b] font-bold text-sm tracking-tight flex items-center gap-2">
                                 <Clock size={14} className="text-[#00e5ff]" />
                                 {item.time} IST
                               </div>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                               {item.topics.map((topic: string, j: number) => (
                                 <div key={j} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-[#cbd5f5] font-medium flex items-center gap-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"></div>
                                   {topic}
                                 </div>
                               ))}
                            </div>
                          </div>
                        ))}

                        <div className="pt-6 grid gap-6">
                           <h4 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-[#00e5ff] pl-4">Core Mastery Modules:</h4>
                           <div className="grid md:grid-cols-2 gap-6">
                              {staticContent.modules.map((m: any, i: number) => (
                                <div key={i} className="flex gap-4 items-start">
                                  <div className="mt-1 flex-shrink-0"><CheckCircle2 size={16} className="text-[#00e5ff]" /></div>
                                  <div>
                                    <h5 className="text-white font-bold text-sm">{m.title}</h5>
                                    <p className="text-[10px] text-[#64748b]">{m.desc}</p>
                                  </div>
                                </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-6 items-start pb-6 border-b border-white/5">
                          <div className="text-[#00e5ff] font-bold text-lg min-w-[100px]">10:00 AM</div>
                          <div className="text-[#cbd5f5] font-medium text-lg">Foundations of Executive Presence</div>
                        </div>
                        <div className="flex gap-6 items-start pb-6 border-b border-white/5">
                          <div className="text-[#00e5ff] font-bold text-lg min-w-[100px]">12:00 PM</div>
                          <div className="text-[#cbd5f5] font-medium text-lg">Live Framework Application Workshop</div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <div className="text-[#00e5ff] font-bold text-lg min-w-[100px]">02:30 PM</div>
                          <div className="text-[#cbd5f5] font-medium text-lg">High-Stakes Positioning & Hotseats</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* THE IMPACT MAP (Smart But Overlooked only) */}
                {isSmart && (
                  <Reveal>
                    <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 space-y-8">
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00e5ff] mb-3">The IMPACT Map</p>
                        <h3 className="text-3xl font-black text-white mb-2">{SMART_EVENT_CONTENT.impact.heading}</h3>
                        <p className="text-sm text-[#64748b]">{SMART_EVENT_CONTENT.impact.sub}</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {SMART_EVENT_CONTENT.impact.pillars.map((p, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#00e5ff]/50 transition-all">
                            <div className="w-9 h-9 rounded-lg bg-[#00e5ff] text-[#020617] font-black flex items-center justify-center flex-shrink-0">
                              {p.letter}
                            </div>
                            <span className="text-white font-bold text-xs">{p.label}</span>
                          </div>
                        ))}
                      </div>
                      <p className="p-5 rounded-xl border-l-4 border-[#00e5ff] bg-[#00e5ff]/5 text-xs text-[#cbd5f5] leading-relaxed">
                        {SMART_EVENT_CONTENT.impact.footer}
                      </p>
                    </div>
                  </Reveal>
                )}

                {/* HOW IT WORKS (not shown for Smart But Overlooked) */}
                {(isSWI || isMasterclass) && (
                  <Reveal>
                    <h3 className="text-2xl font-black mb-8 tracking-tight">How the Event <GradientText>Works</GradientText></h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {staticContent.howItWorks.map((item: any, i: number) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-5">
                          <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center text-[#00e5ff] flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-xs text-[#64748b]">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}

                {/* BONUSES */}
                {isCustom && (
                  <Reveal>
                     <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00e5ff] to-[#6366f1] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-[#020617] rounded-3xl p-10 border border-white/5 overflow-hidden">
                          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                            {isSmart ? (
                              <>{SMART_EVENT_CONTENT.bonusesHeading}</>
                            ) : (
                              <>Exclusive <GradientText>Bonuses Included</GradientText></>
                            )}
                            <Gift className="text-[#00e5ff]" size={24} />
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-8">
                            {staticContent.bonuses.map((item: any, i: number) => (
                              <div key={i} className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00e5ff] flex-shrink-0">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                  <p className="text-[10px] text-[#475569] font-black uppercase tracking-widest mt-0.5">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                     </div>
                  </Reveal>
                )}

                {/* INSTRUCTOR */}
                <Reveal>
                   <h3 className="text-2xl font-black mb-8 tracking-tight">{isSmart ? <>Meet <GradientText>Mridu Bhandari.</GradientText></> : <>Your <GradientText>Mentor</GradientText></>}</h3>
                   <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff05] blur-3xl -mr-32 -mt-32 rounded-full"></div>
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-[#00e5ff]/20 shadow-[0_10px_30px_rgba(0,229,255,0.1)] relative z-10 flex-shrink-0">
                        <img
                          src="/mridu-bhandari-profile.jpg"
                          onError={(e: any) => e.target.src = "https://ui-avatars.com/api/?name=Mridu+Bhandari&background=00e5ff&color=020617&size=200"}
                          className="w-full h-full object-cover"
                          alt="Mridu Bhandari"
                        />
                      </div>
                      <div className="flex-1 relative z-10 text-center md:text-left">
                         <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h4 className="text-2xl font-black text-white">Mridu Bhandari</h4>
                            <ShieldCheck size={18} className="text-[#00e5ff]" />
                         </div>
                         <p className="text-[#00e5ff] text-[10px] font-black uppercase tracking-widest mb-4">
                           {isSmart ? "Broadcast Journalist • Executive Presence Strategist" : "Award-Winning Journalist • Communication Coach"}
                         </p>
                         <p className="text-sm text-[#cbd5f5] leading-relaxed mb-6 italic opacity-80">
                            {isSmart
                              ? SMART_EVENT_CONTENT.mentorBio
                              : isSWI
                                ? SWI_EVENT_CONTENT.mentorBio
                                : "With over 20+ years of experience in high-stakes communication, Mridu has mentored 500+ professionals across Google, Amazon, and Fortune 500 companies."}
                         </p>

                         {isSmart ? (
                           <>
                             <div className="grid grid-cols-3 gap-3 mb-5">
                               {SMART_EVENT_CONTENT.mentorStats.map((s, i) => (
                                 <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                                   <div className="text-xl font-black text-[#00e5ff]">{s.value}</div>
                                   <div className="text-[9px] text-[#64748b] font-bold uppercase tracking-wider mt-1">{s.label}</div>
                                 </div>
                               ))}
                             </div>
                             <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                               {SMART_EVENT_CONTENT.mentorBadges.map((b, i) => (
                                 <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] font-bold">
                                   <Award size={10} /> {b}
                                 </span>
                               ))}
                             </div>
                           </>
                         ) : (
                           <div className="flex gap-8 justify-center md:justify-start grayscale opacity-30 invert">
                              <span className="text-[9px] font-black text-white">CNBC-TV18</span>
                              <span className="text-[9px] font-black text-white">FORBES INDIA</span>
                              <span className="text-[9px] font-black text-white">CNN-NEWS18</span>
                           </div>
                         )}
                      </div>
                   </div>
                </Reveal>
              </div>

              {/* SIDEBAR */}
              <div className="lg:sticky lg:top-32 h-fit space-y-8">
                <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] to-[#6366f1]"></div>

                  <div className="flex items-end gap-3 mb-1">
                    <span className="text-4xl font-black tracking-tight text-white">
                      ₹{displayPrice}
                    </span>
                    {isCustom && displayStrikePrice && (
                      <span className="text-2xl font-bold text-[#475569] line-through decoration-[#ef4444]/80 decoration-2 mb-0.5">
                        ₹{displayStrikePrice}
                      </span>
                    )}
                  </div>
                  {isCustom && <p className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest mb-10 mt-2">Special Launch Offer</p>}

                  {!isCustom && <div className="h-10"></div>}

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm text-[#cbd5f5]">
                      <span className="text-[#475569] font-black w-14 uppercase text-[9px] tracking-widest">Date</span>
                      <span className="font-bold text-white italic">{displayDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#cbd5f5]">
                      <span className="text-[#475569] font-black w-14 uppercase text-[9px] tracking-widest">Time</span>
                      <span className="font-bold text-white italic">{displayTime}</span>
                    </div>
                    {(isRegistered || isFreeSuccess) && event.zoomLink && (
                      <div className="flex items-center gap-3 text-sm text-[#cbd5f5]">
                        <span className="text-[#475569] font-black w-14 uppercase text-[9px] tracking-widest">Link</span>
                        <span className="font-bold text-white">
                            <a href={event.zoomLink} target="_blank" className="text-[#00e5ff] hover:underline underline-offset-4 decoration-[#00e5ff]/30">Click to Join Zoom</a>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <Button
                      fullWidth
                      disabled={registering || isRegistered || isFreeSuccess}
                      onClick={handleRegisterInitiation}
                      className={(isRegistered || isFreeSuccess) ? "bg-emerald-500 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] h-14 font-black uppercase tracking-widest" : "h-14 font-black uppercase tracking-widest shadow-[0_10px_25px_#00e5ff30]"}
                    >
                      {registering ? "Processing..." : (isRegistered || isFreeSuccess) ? "Seat Confirmed" : isCustom ? "Secure Your Seat" : "Complete Registration"}
                    </Button>
                  </div>

                  <div className="mb-4">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => setShowEnquiryModal(true)}
                      className="h-12 font-black uppercase tracking-widest"
                    >
                      Enquiry
                    </Button>
                  </div>

                  {isSWI && !isRegistered && !isFreeSuccess && (
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff]">
                        {(() => {
                          const enrollmentCount = event.enrollmentCount || 0;
                          if (enrollmentCount < 20) {
                            return "75% OFF SLOTS AVAILABLE";
                          }
                          return "STANDARD REGISTRATION OPEN";
                        })()}
                      </p>
                    </div>
                  )}

                  {!user && (
                    <p className="text-[9px] text-center text-[#475569] mt-6 font-black uppercase tracking-[0.2em]">Login required to access link</p>
                  )}

                  <p className="text-[9px] text-center text-[#475569] font-black uppercase tracking-widest mt-6 italic">
                    🔒 SSL Secured Checkout
                  </p>
                </div>

                {isSWI && (
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00e5ff]">Guaranteed Outcome</h5>
                     <p className="text-[11px] text-[#cbd5f5] leading-relaxed">
                        Master the skill of structured communication and vocal power. If you don&apos;t feel more confident in 2 days, we will provide a private 1-on-1 diagnostic session.
                     </p>
                  </div>
                )}

                {isSmart && (
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00e5ff]">Limited Live Coaching</h5>
                     <p className="text-[11px] text-[#cbd5f5] leading-relaxed">
                        Only 3 to 5 participants are coached LIVE in the hot-seat round. The session is not recorded, so be there on the day.
                     </p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </section>

      {/* RAZORPAY SCRIPT */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* DETAILS FORM MODAL */}
      <PaymentDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onSubmit={processRegistration}
        initialEmail={user?.email || undefined}
        courseTitle={event?.title}
      />

      <Modal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        title="Event Enquiry Form"
      >
        <form onSubmit={handleSubmitEnquiry} className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter full name"
            value={enquiryForm.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("name", e.target.value)}
            required
          />
          <Input
            label="Mobile Number"
            placeholder="Enter mobile number"
            value={enquiryForm.mobile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("mobile", e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter email address"
            value={enquiryForm.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("email", e.target.value)}
            required
          />
          <Input
            label="Profession"
            placeholder="Enter profession"
            value={enquiryForm.profession}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEnquiryFieldChange("profession", e.target.value)}
            required
          />
          <Textarea
            label="Query"
            placeholder="Write your query"
            value={enquiryForm.query}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleEnquiryFieldChange("query", e.target.value)}
            required
          />
          <Button type="submit" fullWidth disabled={submittingEnquiry}>
            {submittingEnquiry ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </Modal>

      <SuccessOverlay
        isOpen={showSuccessOverlay}
        onClose={() => setShowSuccessOverlay(false)}
        title="Registration Successful!"
        message={`Congratulations! Your seat for '${event?.title || "the event"}' has been successfully secured. Check your email for more details.`}
        ctaText="View My Events"
        onCtaClick={() => router.push("/dashboard/my-events")}
      />

      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </PageWrapper>
  );
}