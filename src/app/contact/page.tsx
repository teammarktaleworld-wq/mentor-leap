// "use client";
// import { useState } from "react";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // adjust path if needed
// import PageWrapper from "@/components/layout/PageWrapper";
// import { Reveal } from "@/components/ui/Animation";
// import { SectionHeading, GradientText, Paragraph } from "@/components/ui/Typography";
// import { Card } from "@/components/ui/Card";
// import { Input, Textarea } from "@/components/ui/Input";
// import { Button } from "@/components/ui/Button";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("loading");
//     try {
//       await addDoc(collection(db, "contacts"), {
//         ...form,
//         createdAt: serverTimestamp(),
//       });
//       setStatus("success");
//       setForm({ name: "", email: "", subject: "", message: "" });
//     } catch (err) {
//       console.error("Error saving contact:", err);
//       setStatus("error");
//     }
//   };

//   return (
//     <PageWrapper>
//       <section className="px-5 py-[120px] max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
//         <Reveal>
//           <SectionHeading>Get In <GradientText>Touch</GradientText></SectionHeading>
//           <Paragraph>Have a question about our programs? Want to collaborate? Drop us a message and our team will get back to you shortly.</Paragraph>
//           <div className="mt-10 space-y-6">
//             <div className="flex gap-4">
//               <div className="text-2xl">📧</div>
//               <div><h4 className="font-bold text-white">Email</h4><p className="text-[#94a3b8] text-sm">hello@mentorleap.co</p></div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-2xl">📱</div>
//               <div><h4 className="font-bold text-white">WhatsApp</h4><p className="text-[#94a3b8] text-sm"><a href="https://wa.me/919892322427" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e5ff] transition-colors">+91 98923 22427</a></p></div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-2xl">📍</div>
//               <div><h4 className="font-bold text-white">Office</h4><p className="text-[#94a3b8] text-sm">Virtual HQ, Global Reach</p></div>
//             </div>
//           </div>
//         </Reveal>

//         <Reveal delay={0.2}>
//           <Card className="!p-8">
//             <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <Input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
//               <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
//               <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required />
//               <Textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />

//               <Button fullWidth disabled={status === "loading"}>
//                 {status === "loading" ? "Sending..." : "Send Message"}
//               </Button>

//               {status === "success" && (
//                 <p className="text-green-400 text-sm text-center">✅ Message sent! We'll get back to you soon.</p>
//               )}
//               {status === "error" && (
//                 <p className="text-red-400 text-sm text-center">❌ Something went wrong. Please try again.</p>
//               )}
//             </form>
//           </Card>
//         </Reveal>
//       </section>
//     </PageWrapper>
//   );
// }







// "use client";
// import { useState } from "react";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import PageWrapper from "@/components/layout/PageWrapper";
// import { Reveal } from "@/components/ui/Animation";
// import { SectionHeading, GradientText, Paragraph } from "@/components/ui/Typography";
// import { Card } from "@/components/ui/Card";
// import { Input, Textarea } from "@/components/ui/Input";
// import { Button } from "@/components/ui/Button";

// const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScBwC8yBrOgcWS0di_PBzY_3PhrkD8wzqdW6vDHnIaPKbIDRw/formResponse";

// const ENTRY_IDS = {
//   name:    "entry.125130012",
//   email:   "entry.2126497212",
//   subject: "entry.1067650312",
//   message: "entry.1269992321",
// };

// async function submitToGoogleForm(form: { name: string; email: string; subject: string; message: string }) {
//   const body = new URLSearchParams({
//     [ENTRY_IDS.name]:    form.name,
//     [ENTRY_IDS.email]:   form.email,
//     [ENTRY_IDS.subject]: form.subject,
//     [ENTRY_IDS.message]: form.message,
//   });

//   // no-cors because Google Forms doesn't allow cross-origin — we fire and forget
//   await fetch(GOOGLE_FORM_URL, {
//     method: "POST",
//     mode: "no-cors",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: body.toString(),
//   });
// }

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("loading");
//     try {
//       // Submit to both simultaneously
//       await Promise.all([
//         addDoc(collection(db, "contacts"), {
//           ...form,
//           createdAt: serverTimestamp(),
//         }),
//         submitToGoogleForm(form),
//       ]);
//       setStatus("success");
//       setForm({ name: "", email: "", subject: "", message: "" });
//     } catch (err) {
//       console.error("Error submitting contact form:", err);
//       setStatus("error");
//     }
//   };

//   return (
//     <PageWrapper>
//       <section className="px-5 py-[120px] max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
//         <Reveal>
//           <SectionHeading>Get In <GradientText>Touch</GradientText></SectionHeading>
//           <Paragraph>Have a question about our programs? Want to collaborate? Drop us a message and our team will get back to you shortly.</Paragraph>
//           <div className="mt-10 space-y-6">
//             <div className="flex gap-4">
//               <div className="text-2xl">📧</div>
//               <div><h4 className="font-bold text-white">Email</h4><p className="text-[#94a3b8] text-sm">hello@mentorleap.co</p></div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-2xl">📱</div>
//               <div><h4 className="font-bold text-white">WhatsApp</h4><p className="text-[#94a3b8] text-sm"><a href="https://wa.me/919892322427" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e5ff] transition-colors">+91 98923 22427</a></p></div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-2xl">📍</div>
//               <div><h4 className="font-bold text-white">Office</h4><p className="text-[#94a3b8] text-sm">Virtual HQ, Global Reach</p></div>
//             </div>
//           </div>
//         </Reveal>

//         <Reveal delay={0.2}>
//           <Card className="!p-8">
//             <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <Input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
//               <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
//               <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required />
//               <Textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />

//               <Button fullWidth disabled={status === "loading"}>
//                 {status === "loading" ? "Sending..." : "Send Message"}
//               </Button>

//               {status === "success" && (
//                 <p className="text-green-400 text-sm text-center">✅ Message sent! We'll get back to you soon.</p>
//               )}
//               {status === "error" && (
//                 <p className="text-red-400 text-sm text-center">❌ Something went wrong. Please try again.</p>
//               )}
//             </form>
//           </Card>
//         </Reveal>
//       </section>
//     </PageWrapper>
//   );
// }









"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PageWrapper from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/Animation";
import { SectionHeading, GradientText, Paragraph } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

async function submitToGoogleForm(form: { name: string; email: string; subject: string; message: string }) {
  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await Promise.all([
        addDoc(collection(db, "contacts"), {
          ...form,
          createdAt: serverTimestamp(),
        }),
        submitToGoogleForm(form),
      ]);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
    }
  };

  return (
    <PageWrapper>
      <section className="px-5 py-[120px] max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
        <Reveal>
          <SectionHeading>Get In <GradientText>Touch</GradientText></SectionHeading>
          <Paragraph>Have a question about our programs? Want to collaborate? Drop us a message and our team will get back to you shortly.</Paragraph>
          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <div className="text-2xl">📧</div>
              <div><h4 className="font-bold text-white">Email</h4><p className="text-[#94a3b8] text-sm">hello@mentorleap.co</p></div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">📱</div>
              <div><h4 className="font-bold text-white">WhatsApp</h4><p className="text-[#94a3b8] text-sm"><a href="https://wa.me/919892322427" target="_blank" rel="noopener noreferrer" className="hover:text-[#00e5ff] transition-colors">+91 98923 22427</a></p></div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">📍</div>
              <div><h4 className="font-bold text-white">Office</h4><p className="text-[#94a3b8] text-sm">Virtual HQ, Global Reach</p></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Card className="!p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
              <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required />
              <Textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />

              <Button fullWidth disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <p className="text-green-400 text-sm text-center">✅ Message sent! We'll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">❌ Something went wrong. Please try again.</p>
              )}
            </form>
          </Card>
        </Reveal>
      </section>
    </PageWrapper>
  );
}