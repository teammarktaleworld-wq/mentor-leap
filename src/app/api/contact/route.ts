import { NextRequest, NextResponse } from "next/server";

// const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScBwC8yBrOgcWS0di_PBzY_3PhrkD8wzqdW6vDHnIaPKbIDRw/viewform?usp=pp_url";


// ✅ CORRECT — must end with /formResponse
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScBwC8yBrOgcWS0di_PBzY_3PhrkD8wzqdW6vDHnIaPKbIDRw/formResponse";
export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  const body = new URLSearchParams({
    "entry.125130012": name,
    "entry.2126497212": email,
    "entry.1067650312": subject,
    "entry.1269992321": message,
  });

  try {
    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}