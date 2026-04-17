import { NextRequest, NextResponse } from "next/server";
import { db, admin } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/auth-server";
import { razorpay } from "@/lib/razorpay";
import { MailService } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const decodedToken = await verifyUser(req);
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            itemId,
            itemType = "course"
        } = await req.json();

        // 1. Verify Signature
        const secret = process.env.RAZORPAY_KEY_SECRET!;
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        // 2. Fetch Order to get userDetails from notes
        const order = await razorpay.orders.fetch(razorpay_order_id);
        const userDetailsStr = order.notes?.userDetails;
        const userDetails = userDetailsStr ? JSON.parse(userDetailsStr as string) : null;

        // 3. Update User & Create Transaction
        const batch = db.batch();
        const userRef = db.collection("users").doc(decodedToken.uid);
        const txRef = db.collection("transactions").doc();

        if (itemType === "course") {
            batch.update(userRef, { 
                enrolledCourses: admin.firestore.FieldValue.arrayUnion(itemId),
                ...(userDetails && { profileDetails: userDetails })
            });
        } else if (itemType === "event") {
            batch.update(userRef, { 
                registeredEvents: admin.firestore.FieldValue.arrayUnion(itemId),
                ...(userDetails && { profileDetails: userDetails })
            });
        }

        batch.set(txRef, {
            userId: decodedToken.uid,
            itemId,
            itemType,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            paymentStatus: "success",
            paymentGateway: "razorpay",
            amount: (order.amount as number) / 100, // Save amount in INR
            userDetails: userDetails || {}, // Save details in transaction
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // 4. Update Item Enrollment Count
        const itemRef = db.collection(itemType === "course" ? "courses" : "events").doc(itemId);
        batch.update(itemRef, {
            enrollmentCount: admin.firestore.FieldValue.increment(1)
        });

        await batch.commit();

        // 5. Send Booking Confirmation Email
        try {
            const userDoc = await userRef.get();
            const userData = userDoc.data();
            const userEmail = userData?.email;
            const userName = userDetails?.name || userData?.name || userEmail?.split("@")[0] || "Student";

            let itemData: any = null;
            if (itemId === "interview-to-offer-letter") {
                itemData = { title: "Interview to Offer Letter" };
            } else {
                const itemDoc = await itemRef.get();
                itemData = itemDoc.data();
            }

            const itemTitle = itemData?.title || itemId;

            if (userEmail) {
                console.log(`[Payment Verify] Sending booking confirmation email to ${userEmail}...`);
                await MailService.sendBookingConfirmation(userEmail, userName, itemTitle);
                console.log("[Payment Verify] Booking confirmation email sent successfully.");
            } else {
                console.warn("[Payment Verify] User email not found, skipping email notification.");
            }
        } catch (emailError: any) {
            console.error("[Payment Verify] Error sending booking confirmation email:", emailError.message);
            // Non-blocking - payment is already successful
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
