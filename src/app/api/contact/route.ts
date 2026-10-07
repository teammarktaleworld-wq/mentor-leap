// import { NextRequest, NextResponse } from "next/server";

// // ✅ CORRECT — must end with /formResponse
// const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScBwC8yBrOgcWS0di_PBzY_3PhrkD8wzqdW6vDHnIaPKbIDRw/formResponse";
// export async function POST(req: NextRequest) {
//   const { name, email, subject, message } = await req.json();

//   const body = new URLSearchParams({
//     "entry.125130012": name,
//     "entry.2126497212": email,
//     "entry.1067650312": subject,
//     "entry.1269992321": message,
//   });

//   try {
//     await fetch(GOOGLE_FORM_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: body.toString(),
//     });
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }




// import { NextRequest, NextResponse } from "next/server";
// import { MailService } from "@/lib/mail";

// const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScBwC8yBrOgcWS0di_PBzY_3PhrkD8wzqdW6vDHnIaPKbIDRw/formResponse";

// export async function POST(req: NextRequest) {
//   const { name, email, subject, message } = await req.json();

//   console.log("[Contact] New submission from:", email);

//   const body = new URLSearchParams({
//     "entry.125130012": name,
//     "entry.2126497212": email,
//     "entry.1067650312": subject,
//     "entry.1269992321": message,
//   });

//   try {
//     await Promise.all([
//       fetch(GOOGLE_FORM_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: body.toString(),
//       }),
//       MailService.sendContactNotification(process.env.Admin_Email!, {
//         name,
//         email,
//         subject,
//         message,
//       }),
//     ]);

//     console.log("[Contact] Google Form + admin email sent successfully");
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("[Contact] Error:", err);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }





// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { MailService } from "@/lib/mail";
import { db } from "@/lib/firebaseAdmin"; // ✅ correct — no hyphen, matches event-enquiries/route.ts

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScBwC8yBrOgcWS0di_PBzY_3PhrkD8wzqdW6vDHnIaPKbIDRw/formResponse";

export async function POST(req: NextRequest) {
  const { name, email, subject, message, mobile, profession } =
    await req.json();

  console.log("[Contact] New submission from:", email);

  /* ─── Google Form mirror ─── */
  const formBody = new URLSearchParams({
    "entry.125130012": name,
    "entry.2126497212": email,
    "entry.1067650312": subject,
    "entry.1269992321": message,
  });

  /* ─── Keep writing to "contacts" (don't break existing data) ─── */
  const contactPayload = {
    name: name ?? "",
    email: email ?? "",
    message: message ?? "",
    subject: subject ?? "",
    createdAt: new Date().toISOString(),
  };

  /* ─── ALSO write to "eventEnquiries" with source tag ─── */
  // This is what makes it appear in Admin → Event Enquiries
  const enquiryPayload = {
    name: name ?? "",
    email: email ?? "",
    mobile: mobile ?? "",
    profession: profession ?? "",
    eventTitle: subject ?? "General Enquiry",
    eventId: "contact-form",
    query: message ?? "",
    source: "contact_page",   // ← drives the purple "Contact Page" badge
    createdAt: new Date().toISOString(),
  };

  try {
    await Promise.all([
      fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      }),
      MailService.sendContactNotification(process.env.Admin_Email!, {
        name,
        email,
        subject,
        message,
      }),
      db.collection("contacts").add(contactPayload),       // keep existing
      db.collection("eventEnquiries").add(enquiryPayload), // new — shows in admin
    ]);

    console.log("[Contact] Saved to contacts + eventEnquiries");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}