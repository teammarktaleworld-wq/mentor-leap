import { config } from "dotenv";
config({ path: ".env.local" });
import { db, admin } from "../lib/firebaseAdmin";

async function setupCoupons() {
  console.log("--- Setting Up Coupon System ---");

  // Clear existing coupons
  const couponSnapshot = await db.collection("coupons").get();
  for (const doc of couponSnapshot.docs) {
    await doc.ref.delete();
  }

  // Add new coupons
  const coupons = [
    {
      code: "CORP100%",
      description: "100% Off - Corporate Partner",
      discountType: "percentage",
      discountValue: 100,
      applicableItems: ["interview-to-offer-letter"],
      maxUses: -1, // Unlimited
      usedCount: 0,
      isActive: true,
      createdAt: new Date()
    },
    {
      code: "EARLYBIRD",
      description: "25% Off - Early Bird Special",
      discountType: "percentage",
      discountValue: 25,
      applicableItems: ["interview-to-offer-letter"],
      maxUses: -1, // Unlimited
      usedCount: 0,
      isActive: true,
      createdAt: new Date()
    },
    {
      code: "TEAM",
      description: "50% Off - Team Discount",
      discountType: "percentage",
      discountValue: 50,
      applicableItems: ["interview-to-offer-letter"],
      maxUses: -1, // Unlimited
      usedCount: 0,
      isActive: true,
      createdAt: new Date()
    }
  ];

  for (const coupon of coupons) {
    await db.collection("coupons").doc(coupon.code).set(coupon);
    console.log(`✅ Created coupon: ${coupon.code} - ${coupon.description}`);
  }

  console.log("--- Coupon Setup Complete ---");
  process.exit(0);
}

setupCoupons().catch((err) => {
  console.error(err);
  process.exit(1);
});
