// // mentor-leap\src\app\api\admin\event-enquiries\route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebaseAdmin";
// import { verifyAdmin } from "@/lib/auth-server";
// import { QueryDocumentSnapshot } from "firebase-admin/firestore";

// export async function GET(req: NextRequest) {
//     try {
//         // =========================================
//         // 1. VERIFY ADMIN
//         // =========================================
//         const decodedToken = await verifyAdmin(req);

//         console.log(
//             `[Admin Event Enquiries] Authorized admin: ${decodedToken.email} (${decodedToken.uid})`
//         );

//         // =========================================
//         // 2. FETCH EVENT ENQUIRIES
//         // =========================================
//         const snapshot = await db
//             .collection("eventEnquiries")
//             .orderBy("createdAt", "desc")
//             .limit(200)
//             .get();

//         // =========================================
//         // 3. CONVERT FIRESTORE DOCUMENTS
//         // =========================================
//         const enquiries = snapshot.docs.map(
//             (doc: QueryDocumentSnapshot) => {
//                 const data = doc.data();

//                 return {
//                     id: doc.id,
//                     ...data,

//                     createdAt: data.createdAt?.toDate
//                         ? data.createdAt.toDate().toISOString()
//                         : data.createdAt || null,

//                     updatedAt: data.updatedAt?.toDate
//                         ? data.updatedAt.toDate().toISOString()
//                         : data.updatedAt || null,
//                 };
//             }
//         );

//         // =========================================
//         // 4. LOG RESULT
//         // =========================================
//         console.log(
//             `[Admin Event Enquiries] Found ${enquiries.length} enquiries`
//         );

//         // =========================================
//         // 5. RETURN RESPONSE
//         // =========================================
//         return NextResponse.json(enquiries, {
//             status: 200,
//         });
//     } catch (error: any) {
//         // =========================================
//         // ERROR HANDLING
//         // =========================================
//         console.error(
//             "Fetch event enquiries error:",
//             error
//         );

//         const message =
//             error?.message ||
//             "Failed to fetch enquiries";

//         // -----------------------------------------
//         // Authentication / authorization error
//         // -----------------------------------------
//         if (
//             message
//                 .toLowerCase()
//                 .includes("unauthorized") ||
//             message
//                 .toLowerCase()
//                 .includes("forbidden") ||
//             message
//                 .toLowerCase()
//                 .includes("admin access required")
//         ) {
//             return NextResponse.json(
//                 {
//                     error: message,
//                 },
//                 {
//                     status: 403,
//                 }
//             );
//         }

//         // -----------------------------------------
//         // Other server errors
//         // -----------------------------------------
//         return NextResponse.json(
//             {
//                 error: message,
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }








// src/app/api/admin/event-enquiries/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/auth-server";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export async function GET(req: NextRequest) {
  try {
    /* ── 1. Verify admin ── */
    const decodedToken = await verifyAdmin(req);
    console.log(`[Admin Event Enquiries] Authorized: ${decodedToken.email}`);

    /* ── 2. Fetch from BOTH collections in parallel ── */
    const [enquiriesSnap, contactsSnap] = await Promise.all([
      db.collection("eventEnquiries")
        .orderBy("createdAt", "desc")
        .limit(200)
        .get(),

      // Read existing contacts collection — these are older leads
      // that were submitted before the eventEnquiries write was added
      db.collection("contacts")
        .orderBy("createdAt", "desc")
        .limit(200)
        .get(),
    ]);

    /* ── 3. Normalize eventEnquiries docs ── */
    const enquiries = enquiriesSnap.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        source: data.source ?? "event_page", // default for old records
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || null,
      };
    });

    /* ── 4. Normalize contacts docs — map to same shape ── */
    // These are legacy contact form submissions (pre-fix)
    // Shown with source: "contact_page" so the badge renders correctly
    const contacts = contactsSnap.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: `contact_${doc.id}`, // prefix avoids ID collision with eventEnquiries
        name: data.name ?? "",
        email: data.email ?? "",
        mobile: data.mobile ?? "",
        profession: data.profession ?? "",
        eventTitle: data.subject ?? "General Enquiry",
        eventId: "contact-form",
        query: data.message ?? "",
        source: "contact_page",  // ← always tagged as contact page
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || null,
        updatedAt: null,
      };
    });

    /* ── 5. Merge + sort by date descending ── */
    const allLeads = [...enquiries, ...contacts].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    console.log(
      `[Admin Event Enquiries] eventEnquiries: ${enquiries.length}, contacts: ${contacts.length}, total: ${allLeads.length}`
    );

    return NextResponse.json(allLeads, { status: 200 });

  } catch (error: unknown) {
    console.error("Fetch event enquiries error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to fetch enquiries";

    if (
      message.toLowerCase().includes("unauthorized") ||
      message.toLowerCase().includes("forbidden") ||
      message.toLowerCase().includes("admin access required")
    ) {
      return NextResponse.json({ error: message }, { status: 403 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}