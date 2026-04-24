import { db, admin } from "@/lib/firebaseAdmin";
import { Blog } from "@/models/Blog";

export const BlogService = {
    async createBlog(data: Omit<Blog, "id" | "createdAt">) {
        console.log("[BlogService] createBlog called with:", data);
        const blogRef = db.collection("BlogMentorleap").doc();
        console.log("[BlogService] Generated doc ID:", blogRef.id);
        const blogData = {
            ...data,
            id: blogRef.id,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        await blogRef.set(blogData);
        console.log("[BlogService] Blog created successfully:", blogRef.id);
        return blogData;
    },

    async updateBlog(blogId: string, data: Partial<Blog>) {
        console.log("[BlogService] updateBlog called for ID:", blogId, "with data:", data);
        await db.collection("BlogMentorleap").doc(blogId).update(data);
        console.log("[BlogService] Blog updated successfully:", blogId);
    },

    async deleteBlog(blogId: string) {
        console.log("[BlogService] deleteBlog called for ID:", blogId);
        await db.collection("BlogMentorleap").doc(blogId).delete();
        console.log("[BlogService] Blog deleted successfully:", blogId);
    },

    async getBlogs() {
        console.log("[BlogService] getBlogs called");
        const snapshot = await db.collection("BlogMentorleap").orderBy("createdAt", "desc").get();
        console.log("[BlogService] Fetched", snapshot.docs.length, "blogs");
        return snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }) as Blog);
    },

    async getBlog(blogId: string) {
        console.log("[BlogService] getBlog called for ID:", blogId);
        const doc = await db.collection("BlogMentorleap").doc(blogId).get();
        if (doc.exists) {
            console.log("[BlogService] Blog found:", blogId);
        } else {
            console.warn("[BlogService] Blog not found for ID:", blogId);
        }
        return doc.exists ? ({ ...doc.data(), id: doc.id } as Blog) : null;
    },
};