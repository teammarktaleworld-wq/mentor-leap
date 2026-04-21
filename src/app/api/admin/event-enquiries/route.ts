import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyUser, isAdmin } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await verifyUser(req);
    if (!(await isAdmin(decodedToken.email!))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const snapshot = await db
      .collection("eventEnquiries")
      .orderBy("createdAt", "desc")
      .limit(200)
      .get();

    const enquiries = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json(enquiries);
  } catch (error: any) {
    console.error("Fetch event enquiries error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch enquiries" }, { status: 500 });
  }
}
