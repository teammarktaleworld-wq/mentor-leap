require('dotenv').config({ path: '.env' });
const admin = require('firebase-admin');

// Initialize Firebase Admin using environment variables
const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined,
};

if (!firebaseAdminConfig.privateKey || !firebaseAdminConfig.clientEmail) {
  console.error("❌ Firebase Admin credentials missing!");
  console.error("Make sure FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL are set in .env");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});

const db = admin.firestore();

async function syncDynamicData() {
  console.log("--- Starting Dynamic Data Sync ---");

  try {
    // 1. EVENTS (Specific Cleanup & Seeding)
    console.log("Syncing Events...");
    const eventSnapshot = await db.collection("events").get();
    for (const doc of eventSnapshot.docs) {
      if (!["speak-with-impact-bootcamp", "interview-to-offer-letter"].includes(doc.id)) {
        await doc.ref.delete();
      }
    }

    const bootcampId = "speak-with-impact-bootcamp";
    await db.collection("events").doc(bootcampId).set({
      title: "Speak with Impact Bootcamp",
      description: "Transform the way you speak. Influence the way you lead. A two-day immersive learning experience designed to help professionals develop confident communication and structured thinking for the modern workplace. This bootcamp is designed for one outcome: To help you speak with clarity, confidence, and authority—every single time.",
      price: 7999,
      date: "Saturday, 28th March & Sunday, 29th March 2026",
      time: "7:00 PM – 9:00 PM IST on both days",
      speaker: "Mridu Bhandari",
      seats: 50,
      banner: "/events/speak-with-impact.png",
      highlights: [
        "Speak with Confidence in High-Stakes Moments",
        "Structure Your Thoughts Like a Leader",
        "Master Voice, Presence & Delivery",
        "Tell Stories That Influence & Inspire",
        "Build Executive Presence (Even on Zoom)",
        "Speak with Impact Power Phrases Guide",
        "Own the Screen Cheatsheet",
        "Eye Contact Mastery Guide",
        "Access to Mentorleap Resources"
      ],
      offer: "10 participants will receive FREE access to the Bootcamp. The next 50 participants will receive 50 percent discount on the Bootcamp fee.",
      category: "Communication",
      imageUrl: "https://images.unsplash.com/photo-1475721027187-402ad2989a3b?w=1000&q=80",
      zoomLink: "https://us05web.zoom.us/j/85625593374?pwd=VqabWHfa5B5Uf4lkBXCsjtPLOLPw6C.1",
      meetingId: "856 2559 3374",
      passcode: "2VZXAJ",
      updatedAt: new Date(),
      enrollmentCount: 0
    }, { merge: true });

    console.log("✅ Speak with Impact Bootcamp created successfully!");

    const masterclassId = "interview-to-offer-letter";
    await db.collection("events").doc(masterclassId).set({
      title: "Interview to Offer Letter",
      category: "Communication Masterclass",
      description: "The Ultimate Communication Masterclass. Learn how to answer the most commonly asked interview questions with clarity, structure, and confidence.",
      price: 499,
      date: "Thursday, 30th April 2026",
      time: "7:30 PM IST",
      speaker: "Mridu Bhandari",
      seats: 100,
      banner: "/events/interview-to-offer-banner.png",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
      zoomLink: "https://us05web.zoom.us/j/123456789?pwd=example",
      meetingId: "123 456 789",
      passcode: "MASTER",
      updatedAt: new Date(),
      enrollmentCount: 0
    }, { merge: true });

    console.log("✅ Interview to Offer Letter event created successfully!");
    console.log("--- Dynamic Data Sync Complete ---");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during sync:", error);
    process.exit(1);
  }
}

syncDynamicData();
