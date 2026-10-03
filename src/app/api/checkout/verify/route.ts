// // mentor-leap\src\app\api\checkout\verify\route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { db, admin } from "@/lib/firebaseAdmin";
// import { verifyUser } from "@/lib/auth-server";
// import { razorpay } from "@/lib/razorpay";
// import { MailService } from "@/lib/mail";
// import crypto from "crypto";

// export async function POST(req: NextRequest) {
//     try {
//         const decodedToken = await verifyUser(req);
//         const { 
//             razorpay_order_id, 
//             razorpay_payment_id, 
//             razorpay_signature,
//             itemId,
//             itemType = "course"
//         } = await req.json();

//         // 1. Verify Signature
//         const secret = process.env.RAZORPAY_KEY_SECRET!;
//         const generated_signature = crypto
//             .createHmac("sha256", secret)
//             .update(razorpay_order_id + "|" + razorpay_payment_id)
//             .digest("hex");

//         if (generated_signature !== razorpay_signature) {
//             return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
//         }

//         // 2. Fetch Order to get userDetails from notes
//         const order = await razorpay.orders.fetch(razorpay_order_id);
//         const userDetailsStr = order.notes?.userDetails;
//         const userDetails = userDetailsStr ? JSON.parse(userDetailsStr as string) : null;

//         // 3. Update User & Create Transaction
//         const batch = db.batch();
//         const userRef = db.collection("users").doc(decodedToken.uid);
//         const txRef = db.collection("transactions").doc();

//         if (itemType === "course") {
//             batch.update(userRef, { 
//                 enrolledCourses: admin.firestore.FieldValue.arrayUnion(itemId),
//                 ...(userDetails && { profileDetails: userDetails })
//             });
//         } else if (itemType === "event") {
//             batch.update(userRef, { 
//                 registeredEvents: admin.firestore.FieldValue.arrayUnion(itemId),
//                 ...(userDetails && { profileDetails: userDetails })
//             });
//         }

//         batch.set(txRef, {
//             userId: decodedToken.uid,
//             itemId,
//             itemType,
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//             paymentStatus: "success",
//             paymentGateway: "razorpay",
//             amount: (order.amount as number) / 100, // Save amount in INR
//             userDetails: userDetails || {}, // Save details in transaction
//             createdAt: admin.firestore.FieldValue.serverTimestamp()
//         });

//         // 4. Update Item Enrollment Count
//         const itemRef = db.collection(itemType === "course" ? "courses" : "events").doc(itemId);
//         batch.update(itemRef, {
//             enrollmentCount: admin.firestore.FieldValue.increment(1)
//         });

//         await batch.commit();

//         // 5. Send Booking Confirmation Email
//         try {
//             const userDoc = await userRef.get();
//             const userData = userDoc.data();
//             const userEmail = userData?.email;
//             const userName = userDetails?.name || userData?.name || userEmail?.split("@")[0] || "Student";

//             let itemData: any = null;
//             if (itemId === "interview-to-offer-letter") {
//                 itemData = { title: "Interview to Offer Letter" };
//             } else {
//                 const itemDoc = await itemRef.get();
//                 itemData = itemDoc.data();
//             }

//             const itemTitle = itemData?.title || itemId;

//             if (userEmail) {
//                 console.log(`[Payment Verify] Sending booking confirmation email to ${userEmail}...`);
//                 await MailService.sendBookingConfirmation(userEmail, userName, itemTitle);
//                 console.log("[Payment Verify] Booking confirmation email sent successfully.");
//             } else {
//                 console.warn("[Payment Verify] User email not found, skipping email notification.");
//             }
//         } catch (emailError: any) {
//             console.error("[Payment Verify] Error sending booking confirmation email:", emailError.message);
//             // Non-blocking - payment is already successful
//         }

//         return NextResponse.json({ success: true });

//     } catch (error: any) {
//         console.error("Verification Error:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }















import { NextRequest, NextResponse } from "next/server";
import { db, admin } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/auth-server";
import { razorpay } from "@/lib/razorpay";
import { MailService } from "@/lib/mail";
import crypto from "crypto";

// -------------------------------------------------------------
// HARDCODED EVENTS
// -------------------------------------------------------------

const HARDCODED_ITEMS: Record<
    string,
    {
        title: string;
    }
> = {
    "interview-to-offer-letter": {
        title: "Interview to Offer Letter",
    },

    "smart-but-overlooked": {
        title: "Smart But Overlooked: The Executive Presence Masterclass",
    },
};

export async function POST(req: NextRequest) {
    try {
        // ---------------------------------------------------------
        // 1. VERIFY LOGGED-IN USER
        // ---------------------------------------------------------

        const decodedToken = await verifyUser(req);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            itemId,
            itemType = "course",
        } = await req.json();

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return NextResponse.json(
                {
                    error:
                        "Missing Razorpay payment information",
                },
                {
                    status: 400,
                }
            );
        }

        if (!itemId) {
            return NextResponse.json(
                {
                    error: "Item ID is required",
                },
                {
                    status: 400,
                }
            );
        }

        console.log(
            "[Payment Verify] Starting verification:",
            {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                itemId,
                itemType,
                userId: decodedToken.uid,
            }
        );

        // ---------------------------------------------------------
        // 2. VERIFY RAZORPAY SIGNATURE
        // ---------------------------------------------------------

        const secret =
            process.env.RAZORPAY_KEY_SECRET;

        if (!secret) {
            throw new Error(
                "RAZORPAY_KEY_SECRET is not configured"
            );
        }

        const generatedSignature =
            crypto
                .createHmac("sha256", secret)
                .update(
                    razorpay_order_id +
                        "|" +
                        razorpay_payment_id
                )
                .digest("hex");

        if (
            generatedSignature !==
            razorpay_signature
        ) {
            console.error(
                "[Payment Verify] Invalid Razorpay signature"
            );

            return NextResponse.json(
                {
                    error:
                        "Invalid payment signature",
                },
                {
                    status: 400,
                }
            );
        }

        console.log(
            "[Payment Verify] Razorpay signature verified successfully."
        );

        // ---------------------------------------------------------
        // 3. FETCH RAZORPAY ORDER
        // ---------------------------------------------------------

        const order =
            await razorpay.orders.fetch(
                razorpay_order_id
            );

        console.log(
            "[Payment Verify] Razorpay order fetched:",
            {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
            }
        );

        // ---------------------------------------------------------
        // 4. GET USER DETAILS FROM RAZORPAY ORDER NOTES
        // ---------------------------------------------------------

        const userDetailsStr =
            order.notes?.userDetails;

        const userDetails =
            userDetailsStr
                ? JSON.parse(
                      userDetailsStr as string
                  )
                : {};

        // ---------------------------------------------------------
        // 5. CHECK IF PAYMENT WAS ALREADY PROCESSED
        // ---------------------------------------------------------

        const existingTransactionSnapshot =
            await db
                .collection("transactions")
                .where(
                    "paymentId",
                    "==",
                    razorpay_payment_id
                )
                .limit(1)
                .get();

        if (!existingTransactionSnapshot.empty) {
            const existingTransaction =
                existingTransactionSnapshot.docs[0];

            console.log(
                "[Payment Verify] Payment already processed:",
                existingTransaction.id
            );

            return NextResponse.json({
                success: true,
                alreadyProcessed: true,
            });
        }

        // ---------------------------------------------------------
        // 6. CREATE FIRESTORE BATCH
        // ---------------------------------------------------------

        const batch = db.batch();

        const userRef = db
            .collection("users")
            .doc(decodedToken.uid);

        const txRef = db
            .collection("transactions")
            .doc();

        // ---------------------------------------------------------
        // 7. REGISTER USER
        // ---------------------------------------------------------

        if (itemType === "course") {
            batch.update(userRef, {
                enrolledCourses:
                    admin.firestore.FieldValue.arrayUnion(
                        itemId
                    ),

                ...(userDetails && {
                    profileDetails: userDetails,
                }),
            });
        } else if (itemType === "event") {
            batch.update(userRef, {
                registeredEvents:
                    admin.firestore.FieldValue.arrayUnion(
                        itemId
                    ),

                ...(userDetails && {
                    profileDetails: userDetails,
                }),
            });
        } else {
            return NextResponse.json(
                {
                    error:
                        "Invalid item type",
                },
                {
                    status: 400,
                }
            );
        }

        // ---------------------------------------------------------
        // 8. CREATE PAYMENT TRANSACTION
        // ---------------------------------------------------------

        batch.set(txRef, {
            userId: decodedToken.uid,

            itemId,

            itemType,

            orderId: razorpay_order_id,

            paymentId: razorpay_payment_id,

            paymentStatus: "success",

            paymentGateway: "razorpay",

            // Razorpay stores amount in paise.
            // Firestore stores amount in INR.
            amount:
                (order.amount as number) / 100,

            currency: "INR",

            userDetails:
                userDetails || {},

            createdAt:
                admin.firestore.FieldValue.serverTimestamp(),
        });

        // ---------------------------------------------------------
        // 9. UPDATE ENROLLMENT COUNT
        // ---------------------------------------------------------

        const hardcodedItem =
            HARDCODED_ITEMS[itemId];

        const itemRef = db
            .collection(
                itemType === "course"
                    ? "courses"
                    : "events"
            )
            .doc(itemId);

        // IMPORTANT:
        //
        // Hardcoded events do not exist in Firestore.
        //
        // Therefore DO NOT call:
        //
        // batch.update(itemRef, ...)
        //
        // for them.
        //
        // This prevents:
        //
        // "No document to update:
        // events/smart-but-overlooked"

        if (!hardcodedItem) {
            batch.update(itemRef, {
                enrollmentCount:
                    admin.firestore.FieldValue.increment(
                        1
                    ),
            });
        }

        // ---------------------------------------------------------
        // 10. COMMIT EVERYTHING
        // ---------------------------------------------------------

        await batch.commit();

        console.log(
            "[Payment Verify] Firestore transaction committed successfully."
        );

        console.log(
            "[Payment Verify] Registration completed:",
            {
                userId: decodedToken.uid,
                itemId,
                itemType,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                amount:
                    (order.amount as number) / 100,
                transactionId: txRef.id,
            }
        );

        // ---------------------------------------------------------
        // 11. SEND BOOKING CONFIRMATION EMAIL
        // ---------------------------------------------------------

        try {
            const userDoc =
                await userRef.get();

            const userData =
                userDoc.data();

            const userEmail =
                userData?.email;

            const userName =
                userDetails?.name ||
                userDetails?.fullName ||
                userData?.name ||
                userEmail?.split("@")[0] ||
                "Student";

            // -----------------------------------------------------
            // Determine item title
            // -----------------------------------------------------

            let itemTitle = itemId;

            if (hardcodedItem) {
                itemTitle =
                    hardcodedItem.title;
            } else {
                const itemDoc =
                    await itemRef.get();

                const itemData =
                    itemDoc.data();

                itemTitle =
                    itemData?.title ||
                    itemId;
            }

            if (userEmail) {
                console.log(
                    `[Payment Verify] Sending booking confirmation email to ${userEmail}...`
                );

                await MailService.sendBookingConfirmation(
                    userEmail,
                    userName,
                    itemTitle
                );

                console.log(
                    "[Payment Verify] Booking confirmation email sent successfully."
                );
            } else {
                console.warn(
                    "[Payment Verify] User email not found, skipping email notification."
                );
            }
        } catch (emailError: any) {
            console.error(
                "[Payment Verify] Error sending booking confirmation email:",
                emailError.message
            );

            // Payment and registration are already successful.
            // Email failure should not make payment fail.
        }

        // ---------------------------------------------------------
        // 12. SUCCESS RESPONSE
        // ---------------------------------------------------------

        return NextResponse.json({
            success: true,

            transactionId: txRef.id,

            paymentId:
                razorpay_payment_id,

            orderId:
                razorpay_order_id,
        });
    } catch (error: any) {
        console.error(
            "[Payment Verify] Verification Error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    error?.message ||
                    "Payment verification failed",
            },
            {
                status: 500,
            }
        );
    }
}