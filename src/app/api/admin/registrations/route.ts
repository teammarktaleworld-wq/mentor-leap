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
            `[Admin Registrations] Authorized admin: ${decodedToken.email} (${decodedToken.uid})`
        );

        // =========================================
        // 2. FETCH ALL TRANSACTIONS
        //
        // No .where()
        // No .orderBy()
        //
        // Therefore NO composite Firestore index
        // is required.
        // =========================================
        const snapshot = await db
            .collection("transactions")
            .get();

        // =========================================
        // 3. CONVERT FIRESTORE DOCUMENTS
        // =========================================
        const allTransactions = snapshot.docs.map(
            (doc: QueryDocumentSnapshot) => {
                const data = doc.data();

                return {
                    id: doc.id,
                    ...data,

                    createdAt: data.createdAt?.toDate
                        ? data.createdAt.toDate().toISOString()
                        : data.createdAt || null,
                };
            }
        );

        // =========================================
        // 4. ONLY EVENT TRANSACTIONS
        // =========================================
        const eventTransactions = allTransactions.filter(
            (transaction: any) =>
                transaction.itemType === "event"
        );

        // =========================================
        // 5. SORT NEWEST → OLDEST
        // =========================================
        eventTransactions.sort(
            (a: any, b: any) => {
                const dateA = a.createdAt
                    ? new Date(a.createdAt).getTime()
                    : 0;

                const dateB = b.createdAt
                    ? new Date(b.createdAt).getTime()
                    : 0;

                return dateB - dateA;
            }
        );

        // =========================================
        // 6. ENRICH REGISTRATIONS WITH USER DATA
        // =========================================
        const enrichedRegistrations =
            await Promise.all(
                eventTransactions.map(
                    async (registration: any) => {
                        try {
                            // ---------------------------------
                            // Transaction already contains
                            // complete user details
                            // ---------------------------------
                            if (
                                registration.userDetails?.fullName &&
                                registration.userDetails?.email
                            ) {
                                return registration;
                            }

                            // ---------------------------------
                            // No user ID
                            // ---------------------------------
                            if (!registration.userId) {
                                return {
                                    ...registration,

                                    userDetails: {
                                        fullName:
                                            registration
                                                .userDetails
                                                ?.fullName ||
                                            "Guest User",

                                        email:
                                            registration
                                                .userDetails
                                                ?.email ||
                                            "No Email",

                                        phone:
                                            registration
                                                .userDetails
                                                ?.phone ||
                                            "No Phone",
                                    },
                                };
                            }

                            // ---------------------------------
                            // Fetch user document
                            // ---------------------------------
                            const userDoc = await db
                                .collection("users")
                                .doc(registration.userId)
                                .get();

                            // ---------------------------------
                            // User doesn't exist
                            // ---------------------------------
                            if (!userDoc.exists) {
                                return {
                                    ...registration,

                                    userDetails: {
                                        fullName:
                                            registration
                                                .userDetails
                                                ?.fullName ||
                                            "Guest User",

                                        email:
                                            registration
                                                .userDetails
                                                ?.email ||
                                            "No Email",

                                        phone:
                                            registration
                                                .userDetails
                                                ?.phone ||
                                            "No Phone",
                                    },
                                };
                            }

                            // ---------------------------------
                            // User exists
                            // ---------------------------------
                            const userData =
                                userDoc.data() || {};

                            const profile =
                                userData.profileDetails || {};

                            return {
                                ...registration,

                                userDetails: {
                                    fullName:
                                        registration
                                            .userDetails
                                            ?.fullName ||
                                        profile.fullName ||
                                        userData.displayName ||
                                        "Unknown User",

                                    email:
                                        registration
                                            .userDetails
                                            ?.email ||
                                        profile.email ||
                                        userData.email ||
                                        "No Email",

                                    phone:
                                        registration
                                            .userDetails
                                            ?.phone ||
                                        profile.phone ||
                                        userData.phone ||
                                        "No Phone",

                                    ...profile,
                                },
                            };
                        } catch (error) {
                            console.error(
                                `Failed to enrich registration ${registration.id}:`,
                                error
                            );

                            return registration;
                        }
                    }
                )
            );

        // =========================================
        // 7. EVENT TITLES
        // =========================================
        const eventTitles: Record<string, string> = {
            "speak-with-impact-bootcamp":
                "Speak With Impact Bootcamp",

            "interview-to-offer-letter":
                "Interview to Offer Letter",

            "smart-but-overlooked":
                "Smart But Overlooked: The Executive Presence Masterclass",
        };

        // =========================================
        // 8. FORMAT FINAL RESPONSE
        // =========================================
        const result = enrichedRegistrations.map(
            (registration: any) => {
                return {
                    ...registration,

                    // Friendly event title
                    itemTitle:
                        eventTitles[
                            registration.itemId
                        ] ||
                        registration.itemId
                            ?.split("-")
                            .map(
                                (word: string) =>
                                    word
                                        .charAt(0)
                                        .toUpperCase() +
                                    word.slice(1)
                            )
                            .join(" ") ||
                        "Unknown Event",

                    // Coupon
                    couponCode:
                        registration.userDetails
                            ?.couponCode ||
                        registration.couponCode ||
                        null,

                    // Amount
                    amount: Number(
                        registration.amount || 0
                    ),

                    // Payment status
                    paymentStatus:
                        registration.paymentStatus ||
                        "unknown",

                    // Payment gateway
                    paymentGateway:
                        registration.paymentGateway ||
                        "generic",
                };
            }
        );

        // =========================================
        // 9. LOG RESULT
        // =========================================
        console.log(
            `[Admin Registrations] Found ${result.length} event registrations`
        );

        // =========================================
        // 10. RETURN RESPONSE
        // =========================================
        return NextResponse.json(result, {
            status: 200,
        });
    } catch (error: any) {
        // =========================================
        // ERROR HANDLING
        // =========================================
        console.error(
            "Fetch Registrations Error:",
            error
        );

        const message =
            error?.message ||
            "Failed to fetch registrations";

        // Authentication / authorization errors
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

        // Other server errors
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