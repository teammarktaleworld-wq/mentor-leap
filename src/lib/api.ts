import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, query, where, Timestamp } from "firebase/firestore";

// Simulated server delays for UI smoothness
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function submitCoachingRequest(data: any) {
  try {
    await delay(1000);
    const docRef = await addDoc(collection(db, "coachingRequests"), {
      ...data,
      createdAt: Timestamp.now(),
      status: "pending"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Adding doc without proper config might fail. Mock fallback active.");
    return { success: true, id: "mock-id", mock: true };
  }
}

export async function submitAnchorRequest(data: any) {
  try {
    await delay(1000);
    const docRef = await addDoc(collection(db, "anchorRequests"), {
      ...data,
      createdAt: Timestamp.now(),
      status: "pending"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: true, id: "mock-id", mock: true };
  }
}

export async function fetchEvents() {
  try {
    const q = query(collection(db, "events"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}

export async function fetchCourseData() {
  try {
    const q = query(collection(db, "courses"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}

// export async function fetchBlogs() {
//   try {
//     const q = query(collection(db, "blogs"));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Firestore fetch error:", error);
//     return [];
//   }
// }

// export async function fetchBlogById(id: string) {
//   try {
//     const { doc, getDoc } = await import("firebase/firestore");
//     const docRef = doc(db, "blogs", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return { id: docSnap.id, ...docSnap.data() };
//     }
//     return null;
//   } catch (error) {
//     console.error("Firestore fetch error:", error);
//     return null;
//   }
// }

// export async function fetchBlogs() {
//   try {
//     const q = query(collection(db, "blogs"));
//     const snapshot = await getDocs(q);

//     const blogs = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     console.log("Fetched blogs:", blogs); // 👈 ADD THIS

//     return blogs;
//   } catch (error) {
//     console.error("Firestore fetch error:", error);
//     return [];
//   }
// }

// export async function fetchBlogById(id: string) {
//   try {
//     const { doc, getDoc } = await import("firebase/firestore");
//     const docRef = doc(db, "blogs", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const blog = { id: docSnap.id, ...docSnap.data() };
//       console.log("Fetched blog:", blog); // 👈 ADD THIS
//       return blog;
//     }

//     console.log("No blog found for ID:", id); // 👈 ADD THIS
//     return null;
//   } catch (error) {
//     console.error("Firestore fetch error:", error);
//     return null;
//   }
// }

export async function fetchBlogs() {
  try {
    const res = await fetch("/api/blogs");
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    const blogs = await res.json();
    console.log("[fetchBlogs] Fetched blogs:", blogs);
    return blogs;
  } catch (error) {
    console.error("[fetchBlogs] Error:", error);
    return [];
  }
}

export async function fetchBlogById(id: string) {
  try {
    const res = await fetch(`/api/blogs/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
    const blog = await res.json();
    console.log("[fetchBlogById] Fetched blog:", blog);
    return blog;
  } catch (error) {
    console.error("[fetchBlogById] Error:", error);
    return null;
  }
}


export async function fetchReviews() {
  try {
    const response = await fetch("/api/testimonials", { cache: "no-store" });
    if (response.ok) {
      const localReviews = await response.json();
      if (Array.isArray(localReviews) && localReviews.length > 0) {
        return localReviews;
      }
    }
  } catch (error) {
    console.warn("Local testimonials fetch failed. Falling back to Firestore.", error);
  }

  try {
    const q = query(collection(db, "reviews"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}

export async function fetchFAQs() {
  try {
    const q = query(collection(db, "faqs"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}

export async function fetchServices() {
  try {
    const q = query(collection(db, "services"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}

export async function fetchFounderInfo() {
  try {
    const q = query(collection(db, "site_settings"), where("type", "==", "founder"));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return null;
  }
}

export async function fetchResources() {
  try {
    const q = query(collection(db, "resources"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}
export async function fetchCoachingPrograms() {
  try {
    const q = query(collection(db, "coaching_programs"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore fetch error:", error);
    return [];
  }
}
