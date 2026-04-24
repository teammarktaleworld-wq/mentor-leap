// import { NextRequest, NextResponse } from "next/server";
// import { admin, db } from "@/lib/firebaseAdmin";

// type EnquiryPayload = {
//   name?: string;
//   mobile?: string;
//   email?: string;
//   profession?: string;
//   query?: string;
//   eventId?: string;
//   eventTitle?: string;
// };

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const mobileRegex = /^[0-9+\-\s()]{7,20}$/;

// export async function POST(req: NextRequest) {
//   try {
//     const body = (await req.json()) as EnquiryPayload;

//     const name = body.name?.trim() || "";
//     const mobile = body.mobile?.trim() || "";
//     const email = body.email?.trim() || "";
//     const profession = body.profession?.trim() || "";
//     const query = body.query?.trim() || "";
//     const eventId = body.eventId?.trim() || "unknown-event";
//     const eventTitle = body.eventTitle?.trim() || "MentorLeap Event";

//     if (!name || !mobile || !email || !profession || !query) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     if (!emailRegex.test(email)) {
//       return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
//     }

//     if (!mobileRegex.test(mobile)) {
//       return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
//     }

//     const enquiryRef = await db.collection("eventEnquiries").add({
//       name,
//       mobile,
//       email,
//       profession,
//       query,
//       eventId,
//       eventTitle,
//       status: "new",
//       source: "event-page",
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     return NextResponse.json({ success: true, id: enquiryRef.id });
//   } catch (error: any) {
//     console.error("Event enquiry submit error:", error);
//     return NextResponse.json({ error: error.message || "Failed to submit enquiry" }, { status: 500 });
//   }
// }




import { NextRequest, NextResponse } from "next/server";
import { admin, db } from "@/lib/firebaseAdmin";

type EnquiryPayload = {
  name?: string;
  mobile?: string;
  email?: string;
  profession?: string;
  query?: string;
  eventId?: string;
  eventTitle?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9+\-\s()]{7,20}$/;

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSek_X6ZwlFzSrEtkSmmIZA8P-Iu1T4r-jRZCYJSUkeWFk0OWw/formResponse";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EnquiryPayload;

    const name = body.name?.trim() || "";
    const mobile = body.mobile?.trim() || "";
    const email = body.email?.trim() || "";
    const profession = body.profession?.trim() || "";
    const query = body.query?.trim() || "";
    const eventId = body.eventId?.trim() || "unknown-event";
    const eventTitle = body.eventTitle?.trim() || "MentorLeap Event";

    if (!name || !mobile || !email || !profession || !query) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!mobileRegex.test(mobile)) {
      return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    }

    // Save to Firebase + Submit to Google Forms simultaneously
    const googleFormBody = new URLSearchParams({
      "entry.216377554": name,
      "entry.1586314226": mobile,
      "entry.961002569": email,
      "entry.355021519": profession,
      "entry.1319891710": query,
    });

    const [enquiryRef] = await Promise.all([
      db.collection("eventEnquiries").add({
        name,
        mobile,
        email,
        profession,
        query,
        eventId,
        eventTitle,
        status: "new",
        source: "event-page",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }),
      fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: googleFormBody.toString(),
      }),
    ]);

    return NextResponse.json({ success: true, id: enquiryRef.id });
  } catch (error: any) {
    console.error("Event enquiry submit error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit enquiry" }, { status: 500 });
  }
}