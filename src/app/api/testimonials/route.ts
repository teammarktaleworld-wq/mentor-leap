import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

type RawTestimonial = {
  name?: string;
  message?: string;
  time?: string | null;
};

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "testimonial.json");
    const file = await readFile(filePath, "utf8");
    const parsed = JSON.parse(file) as RawTestimonial[];

    const testimonials = Array.isArray(parsed)
      ? parsed
          .filter((item) => typeof item?.message === "string" && item.message.trim().length > 0)
          .map((item, index) => ({
            id: `local-${index + 1}`,
            name: item.name?.trim() || "Anonymous",
            location: item.time ? `Shared at ${item.time}` : "MentorLeap Learner",
            text: item.message?.trim(),
            stars: 5,
          }))
      : [];

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Failed to read testimonial.json:", error);
    return NextResponse.json([]);
  }
}
