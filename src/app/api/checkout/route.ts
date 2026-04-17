import { NextRequest, NextResponse } from "next/server";
import { db, admin } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/auth-server";
import { razorpay } from "@/lib/razorpay";
import { MailService } from "@/lib/mail";

export async function POST(req: NextRequest) {
    try {
        const decodedToken = await verifyUser(req);
        const { itemId, itemType = "course", couponCode, userDetails } = await req.json();

        if (!itemId) return NextResponse.json({ error: "Item ID is required" }, { status: 400 });

        // 1. Fetch Item (Course or Event)
        let itemData: any = null;
        let price = 0;
        const itemRef = db.collection(itemType === "course" ? "courses" : "events").doc(itemId);

        if (itemId === "interview-to-offer-letter") {
            itemData = {
                title: "Interview to Offer Letter",
                price: 499
            };
            price = 499;
        } else {
            const itemDoc = await itemRef.get();
            if (!itemDoc.exists) return NextResponse.json({ error: "Item not found" }, { status: 404 });
            itemData = itemDoc.data()!;
            price = itemData.price || 0;
        }

        // --- NEW: General Interest Notification ---
        // We notify admin as soon as the form is submitted (intent created)
        try {
            console.log(`[Checkout] Attempting to send interest notification for ${itemData.title}...`);
            await MailService.sendAdminInterestNotification("ianutkarsh@gmail.com", userDetails, itemData.title);
            console.log("[Checkout] Admin notification sent successfully.");
        } catch (mailError: any) {
            console.error("[Checkout] Failed to send admin notification:", mailError.message);
            // Non-blocking but logged
        }


        // 3. Handle Discounts / Early Bird Logic
        const submittedCoupon = couponCode || userDetails?.couponCode;

        if (itemId === "speak-with-impact-bootcamp") {
            if (submittedCoupon === "FAMILYFREE" || submittedCoupon === "MENTORFREE") {
                price = 0;
            } else {
                price = 1999;
            }
        }

        if (itemId === "interview-to-offer-letter") {
            if (submittedCoupon === "MASTERCLASSFREE") {
                price = 0;
            } else if (submittedCoupon === "CORP100%") {
                price = 0; // 100% Off
            } else if (submittedCoupon === "EARLYBIRD") {
                price = Math.round(499 * 0.75); // 25% Off = 374.25 rounded to 374
            } else if (submittedCoupon === "TEAM") {
                price = Math.round(499 * 0.5); // 50% Off = 249.50 rounded to 249
            } else {
                price = 499;
            }
        }

        // 4. Handle Free Enrollment
        // 4. Handle Free Enrollment
        if (price === 0) {
            const batch = db.batch();
            const userRef = db.collection("users").doc(decodedToken.uid);
            
            // Update user's enrollment list
            if (itemType === "course") {
                batch.update(userRef, {
                    enrolledCourses: admin.firestore.FieldValue.arrayUnion(itemId),
                    ...(userDetails && { profileDetails: userDetails })
                });
            } else {
                batch.update(userRef, {
                    registeredEvents: admin.firestore.FieldValue.arrayUnion(itemId),
                    ...(userDetails && { profileDetails: userDetails })
                });
            }

            // Increment enrollment count ONLY if item exists in Firestore
            if (itemId !== "interview-to-offer-letter") {
                batch.update(itemRef, {
                    enrollmentCount: admin.firestore.FieldValue.increment(1)
                });
            }

            // Create a "FREE" transaction record for admin tracking
            const txRef = db.collection("transactions").doc();
            batch.set(txRef, {
                userId: decodedToken.uid,
                itemId,
                itemType,
                paymentStatus: "success",
                paymentGateway: "free",
                amount: 0,
                userDetails: userDetails || {},
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            await batch.commit();

            // Send Booking Confirmation Email for Free Items
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
                    console.log(`[Checkout Free] Sending booking confirmation email to ${userEmail}...`);
                    await MailService.sendBookingConfirmation(userEmail, userName, itemTitle);
                    console.log("[Checkout Free] Booking confirmation email sent successfully.");
                } else {
                    console.warn("[Checkout Free] User email not found, skipping email notification.");
                }
            } catch (emailError: any) {
                console.error("[Checkout Free] Error sending booking confirmation email:", emailError.message);
                // Non-blocking - enrollment is already successful
            }

            return NextResponse.json({ success: true, type: "free" });
        }

        // 5. Create Razorpay Order
        const order = await razorpay.orders.create({
            amount: price * 100, // Amount in paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            notes: {
                userId: decodedToken.uid,
                itemId,
                itemType,
                userDetails: JSON.stringify(userDetails) // Persist details for verification
            }
        });

        return NextResponse.json({ 
            success: true, 
            type: "paid",
            orderId: order.id,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
