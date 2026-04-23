// import { NextRequest, NextResponse } from "next/server";
// import { db, admin } from "@/lib/firebaseAdmin";
// import { verifyUser } from "@/lib/auth-server";
// import { razorpay } from "@/lib/razorpay";
// import { MailService } from "@/lib/mail";

// type CouponDiscountRule = (basePrice: number) => number;

// const COUPON_RULES: Record<string, Record<string, CouponDiscountRule>> = {
//     "speak-with-impact-bootcamp": {
//         FAMILYFREE: () => 0,
//         MENTORFREE: () => 0,
//         "CORP100%": () => 0,
//         EARLYBIRD: (basePrice) => Math.round(basePrice * 0.75),
//         TEAM: (basePrice) => Math.round(basePrice * 0.5)
//     },
//     "interview-to-offer-letter": {
//         MASTERCLASSFREE: () => 0,
//         "CORP100%": () => 0,
//         EARLYBIRD: (basePrice) => Math.round(basePrice * 0.75),
//         TEAM: (basePrice) => Math.round(basePrice * 0.5)
//     }
// };

// function normalizeCouponCode(value: unknown): string {
//     if (typeof value !== "string") return "";
//     return value.trim().toUpperCase();
// }

// export async function POST(req: NextRequest) {
//     try {
//         const decodedToken = await verifyUser(req);
//         const { itemId, itemType = "course", couponCode, userDetails } = await req.json();

//         if (!itemId) return NextResponse.json({ error: "Item ID is required" }, { status: 400 });

//         // 1. Fetch Item (Course or Event)
//         let itemData: any = null;
//         let price = 0;
//         const itemRef = db.collection(itemType === "course" ? "courses" : "events").doc(itemId);

//         if (itemId === "interview-to-offer-letter") {
//             itemData = {
//                 title: "Interview to Offer Letter",
//                 price: 499
//             };
//             price = 499;
//         } else {
//             const itemDoc = await itemRef.get();
//             if (!itemDoc.exists) return NextResponse.json({ error: "Item not found" }, { status: 404 });
//             itemData = itemDoc.data()!;
//             price = itemData.price || 0;
//         }

//         // --- NEW: General Interest Notification ---
//         // We notify admin as soon as the form is submitted (intent created)
//         try {
//             console.log(`[Checkout] Attempting to send interest notification for ${itemData.title}...`);
//             await MailService.sendAdminInterestNotification("ianutkarsh@gmail.com", userDetails, itemData.title);
//             console.log("[Checkout] Admin notification sent successfully.");
//         } catch (mailError: any) {
//             console.error("[Checkout] Failed to send admin notification:", mailError.message);
//             // Non-blocking but logged
//         }


//         // 3. Handle Discounts / Early Bird Logic
//         const rawSubmittedCoupon = couponCode || userDetails?.couponCode;
//         const normalizedCoupon = normalizeCouponCode(rawSubmittedCoupon);
//         console.log("[Checkout] Coupon code received:", {
//             couponCode,
//             userDetailsCoupon: userDetails?.couponCode,
//             normalizedCoupon
//         });

//         if (userDetails && normalizedCoupon) {
//             userDetails.couponCode = normalizedCoupon;
//         }

//         const ruleForItem = COUPON_RULES[itemId]?.[normalizedCoupon];
//         if (normalizedCoupon) {
//             if (!ruleForItem) {
//                 return NextResponse.json(
//                     { error: "Invalid invite code. Check code and retry." },
//                     { status: 400 }
//                 );
//             }
//             price = ruleForItem(price);
//         }

//         // 4. Handle Free Enrollment
//         // 4. Handle Free Enrollment
//         if (price === 0) {
//             const batch = db.batch();
//             const userRef = db.collection("users").doc(decodedToken.uid);
            
//             // Update user's enrollment list
//             if (itemType === "course") {
//                 batch.update(userRef, {
//                     enrolledCourses: admin.firestore.FieldValue.arrayUnion(itemId),
//                     ...(userDetails && { profileDetails: userDetails })
//                 });
//             } else {
//                 batch.update(userRef, {
//                     registeredEvents: admin.firestore.FieldValue.arrayUnion(itemId),
//                     ...(userDetails && { profileDetails: userDetails })
//                 });
//             }

//             // Increment enrollment count ONLY if item exists in Firestore
//             if (itemId !== "interview-to-offer-letter") {
//                 batch.update(itemRef, {
//                     enrollmentCount: admin.firestore.FieldValue.increment(1)
//                 });
//             }

//             // Create a "FREE" transaction record for admin tracking
//             const txRef = db.collection("transactions").doc();
//             batch.set(txRef, {
//                 userId: decodedToken.uid,
//                 itemId,
//                 itemType,
//                 paymentStatus: "success",
//                 paymentGateway: "free",
//                 amount: 0,
//                 userDetails: userDetails || {},
//                 createdAt: admin.firestore.FieldValue.serverTimestamp()
//             });

//             await batch.commit();

//             // Send Booking Confirmation Email for Free Items
//             try {
//                 const userDoc = await userRef.get();
//                 const userData = userDoc.data();
//                 const userEmail = userData?.email;
//                 const userName = userDetails?.name || userData?.name || userEmail?.split("@")[0] || "Student";

//                 let itemData: any = null;
//                 if (itemId === "interview-to-offer-letter") {
//                     itemData = { title: "Interview to Offer Letter" };
//                 } else {
//                     const itemDoc = await itemRef.get();
//                     itemData = itemDoc.data();
//                 }

//                 const itemTitle = itemData?.title || itemId;

//                 if (userEmail) {
//                     console.log(`[Checkout Free] Sending booking confirmation email to ${userEmail}...`);
//                     await MailService.sendBookingConfirmation(userEmail, userName, itemTitle);
//                     console.log("[Checkout Free] Booking confirmation email sent successfully.");
//                 } else {
//                     console.warn("[Checkout Free] User email not found, skipping email notification.");
//                 }
//             } catch (emailError: any) {
//                 console.error("[Checkout Free] Error sending booking confirmation email:", emailError.message);
//                 // Non-blocking - enrollment is already successful
//             }

//             return NextResponse.json({ success: true, type: "free" });
//         }

//         // 5. Create Razorpay Order
//         console.log(`[Checkout] Creating Razorpay order for ${itemId} with price ₹${price}`);
//         const order = await razorpay.orders.create({
//             amount: price * 100, // Amount in paise
//             currency: "INR",
//             receipt: `rcpt_${Date.now()}`,
//             notes: {
//                 userId: decodedToken.uid,
//                 itemId,
//                 itemType,
//                 userDetails: JSON.stringify(userDetails) // Persist details for verification
//             }
//         });

//         console.log(`[Checkout] Order created successfully with ID: ${order.id}`);
//         return NextResponse.json({ 
//             success: true, 
//             type: "paid",
//             orderId: order.id,
//             amount: order.amount,
//             key: process.env.RAZORPAY_KEY_ID
//         });

//     } catch (error: any) {
//         console.error("Checkout Error:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



import { NextRequest, NextResponse } from "next/server";
import { db, admin } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/auth-server";
import { razorpay } from "@/lib/razorpay";
import { MailService } from "@/lib/mail";

type CouponDiscountRule = (basePrice: number) => number;

const COUPON_RULES: Record<string, Record<string, CouponDiscountRule>> = {
    "speak-with-impact-bootcamp": {
        FAMILYFREE: () => 0,
        MENTORFREE: () => 0,
        "CORP100%": () => 1,
        EARLYBIRD: (basePrice) => Math.round(basePrice * 0.75),
        TEAM: (basePrice) => Math.round(basePrice * 0.5)
    },
    "interview-to-offer-letter": {
        MASTERCLASSFREE: () => 0,
        "CORP100%": () => 1,
        EARLYBIRD: (basePrice) => Math.round(basePrice * 0.75),
        TEAM: (basePrice) => Math.round(basePrice * 0.5)
    }
};

function normalizeCouponCode(value: unknown): string {
    if (typeof value !== "string") return "";
    // Strip display suffixes like " - 50%", " - 25% OFF", etc. added by the frontend
    // e.g. "TEAM - 50%" becomes "TEAM"
    return value.trim().toUpperCase().split(/\s*-\s*/)[0].trim();
}

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

        // --- General Interest Notification ---
        // Notify admin as soon as the form is submitted (intent created)
        try {
            console.log(`[Checkout] Attempting to send interest notification for ${itemData.title}...`);
            await MailService.sendAdminInterestNotification("ianutkarsh@gmail.com", userDetails, itemData.title);
            console.log("[Checkout] Admin notification sent successfully.");
        } catch (mailError: any) {
            console.error("[Checkout] Failed to send admin notification:", mailError.message);
            // Non-blocking but logged
        }

        // 3. Handle Discounts / Early Bird Logic
        const rawSubmittedCoupon = couponCode || userDetails?.couponCode;
        const normalizedCoupon = normalizeCouponCode(rawSubmittedCoupon);
        console.log("[Checkout] Coupon code received:", {
            couponCode,
            userDetailsCoupon: userDetails?.couponCode,
            normalizedCoupon
        });

        if (userDetails && normalizedCoupon) {
            userDetails.couponCode = normalizedCoupon;
        }

        const ruleForItem = COUPON_RULES[itemId]?.[normalizedCoupon];
        if (normalizedCoupon) {
            if (!ruleForItem) {
                return NextResponse.json(
                    { error: "Invalid invite code. Check code and retry." },
                    { status: 400 }
                );
            }
            price = ruleForItem(price);
        }

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

                let freeItemData: any = null;
                if (itemId === "interview-to-offer-letter") {
                    freeItemData = { title: "Interview to Offer Letter" };
                } else {
                    const itemDoc = await itemRef.get();
                    freeItemData = itemDoc.data();
                }

                const itemTitle = freeItemData?.title || itemId;

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
        console.log(`[Checkout] Creating Razorpay order for ${itemId} with price ₹${price}`);
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

        console.log(`[Checkout] Order created successfully with ID: ${order.id}`);
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