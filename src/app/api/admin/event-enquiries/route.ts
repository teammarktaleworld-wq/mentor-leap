import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/auth-server";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export async function GET(req: NextRequest) {
    try {
        // =========================================
        // 1. VERIFY ADMIN
        // =========================================
        const decodedToken = await verifyAdmin(req);

        console.log(
            `[Admin Event Enquiries] Authorized admin: ${decodedToken.email} (${decodedToken.uid})`
        );

        // =========================================
        // 2. FETCH EVENT ENQUIRIES
        // =========================================
        const snapshot = await db
            .collection("eventEnquiries")
            .orderBy("createdAt", "desc")
            .limit(200)
            .get();

        // =========================================
        // 3. CONVERT FIRESTORE DOCUMENTS
        // =========================================
        const enquiries = snapshot.docs.map(
            (doc: QueryDocumentSnapshot) => {
                const data = doc.data();

                return {
                    id: doc.id,
                    ...data,

                    createdAt: data.createdAt?.toDate
                        ? data.createdAt.toDate().toISOString()
                        : data.createdAt || null,

                    updatedAt: data.updatedAt?.toDate
                        ? data.updatedAt.toDate().toISOString()
                        : data.updatedAt || null,
                };
            }
        );

        // =========================================
        // 4. LOG RESULT
        // =========================================
        console.log(
            `[Admin Event Enquiries] Found ${enquiries.length} enquiries`
        );

        // =========================================
        // 5. RETURN RESPONSE
        // =========================================
        return NextResponse.json(enquiries, {
            status: 200,
        });
    } catch (error: any) {
        // =========================================
        // ERROR HANDLING
        // =========================================
        console.error(
            "Fetch event enquiries error:",
            error
        );

        const message =
            error?.message ||
            "Failed to fetch enquiries";

        // -----------------------------------------
        // Authentication / authorization error
        // -----------------------------------------
        if (
            message
                .toLowerCase()
                .includes("unauthorized") ||
            message
                .toLowerCase()
                .includes("forbidden") ||
            message
                .toLowerCase()
                .includes("admin access required")
        ) {
            return NextResponse.json(
                {
                    error: message,
                },
                {
                    status: 403,
                }
            );
        }

        // -----------------------------------------
        // Other server errors
        // -----------------------------------------
        return NextResponse.json(
            {
                error: message,
            },
            {
                status: 500,
            }
        );
    }
}