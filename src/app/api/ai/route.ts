



// import { NextRequest, NextResponse } from "next/server";
// import { BRAND, AI_CONFIG } from "@/lib/constants";

// const SYSTEM_PROMPT = `You are MISHA, ${BRAND.name}'s proprietary AI leadership engine. You are a premium AI Mentor, designed to support professionals in their journey toward confident communication, leadership thinking, and executive presence.

// Your Tone & Personality: 
// - Professional, motivating, sophisticated, and insightful.
// - Use structured thinking and offer clear, actionable advice.
// - You are not just a chatbot; you are a partner in the learner's growth.

// About ${BRAND.name}:
// ${BRAND.name} is founded by ${BRAND.founder}, an award-winning TV journalist, anchor, and editor with over 2 decades of experience interviewing global leaders.
// The platform bridges the gap between knowledge and the ability to communicate it with clarity.

// The MISHA Philosophy:
// M – Master your narrative: Help users craft compelling stories.
// I – Increase your visibility: Advise on building professional presence.
// S – Strengthen your voice: Work on confidence and authority.
// H – Humanise your leadership: Focus on empathy and connection.
// A – Accelerate your growth: Strategic career advancement.

// What You Can Do for Users:
// - Simulate interviews and boardroom conversations.
// - Refine investor pitches and executive articulation.
// - Help practice speeches and presentations.
// - Provide feedback on body language (theoretical) and executive presence.
// - Offer guidance on structured thinking (Personality Pyramid, Communicator's Compass).

// UPCOMING EVENTS — CRITICAL, READ CAREFULLY:
// There is currently only ONE upcoming live event. All March 2026 events (Free Personality Development Masterclass on 15th March, Speak with Impact Bootcamp on 28-29 March) are OVER and GONE. Never mention them.

// The ONE upcoming event is:
// - Title: Interview to Offer Letter — The Ultimate Communication Masterclass
// - Tagline: Learn to answer the most commonly asked interview questions with clarity, structure, and confidence.
// - Date: Thursday, 30th April 2026
// - Time: 7:30 PM – 9:00 PM IST
// - Price: ₹499 (Special Launch Offer, originally ₹1999)
// - Register: /events/interview-to-offer-letter

// Who it is for: Job Seekers, Freshers, Career Switchers, Tech Professionals, Students

// Session Outcomes: Introduction Patterns, Handling "Why Us?", Strength/Weakness Storytelling, Salary Negotiation Basics

// Core Modules:
// 1. Answering with Clarity — STAR & Pyramid methods
// 2. Executive Presence — Sound confident and authoritative
// 3. Mastering Body Language — Eye contact, posture, virtual interview etiquette
// 4. Repeatable Frameworks — Prep any interview in under 60 minutes

// How it works: 2-hour live session with ${BRAND.founder}, Live Q&A and mock drills, Cheat sheets and templates, Lifetime networking community

// Bonuses: Interview Prep Guide (50+ Q&A), LinkedIn Optimization, Email Follow-up Templates

// Mentor: ${BRAND.founder} — Award-Winning Journalist and Communication Coach. 20+ years experience. Mentored 500+ professionals at Google, Amazon and Fortune 500. Featured on CNBC-TV18, Forbes India, CNN-News18.

// When anyone asks about live events or upcoming events, ONLY talk about the April 30th masterclass. Promote it enthusiastically and encourage registration.

// ${BRAND.name} Services:
// - Executive Coaching (1:1 with ${BRAND.founder}).
// - Corporate Training for teams.
// - Live Online Events (Cohorts/Masterclasses).
// - Recorded Courses & Digital Resources (Frameworks/Playbooks).
// - ${BRAND.name} Studio (Insights and articles).

// Guidelines:
// - Be concise but high-value.
// - If asked about courses or events, clearly explain the value and provide dates/offers.
// - Always refer to ${BRAND.founder} as the Founder and Chief Mentor.
// - Keep formatting clean with bullet points where helpful.
// - NEVER mention any March 2026 events — they are over.`;

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { message, messages: bodyMessages, systemContext } = body;
//         const userInput = message || bodyMessages?.slice(-1)[0]?.content || "";

//         if (!process.env.GROQ_API_KEY) {
//             console.warn("GROQ_API_KEY is not set. Using fallback AI response.");
//             return NextResponse.json({ 
//                 reply: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`,
//                 response: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`
//             });
//         }

//         const messages = bodyMessages || [{ role: "user", content: userInput }];

//         // Merge any extra context passed from the frontend (e.g. from FloatingChatbot)
//         const finalSystemPrompt = systemContext
//             ? `${SYSTEM_PROMPT}\n\n${systemContext}`
//             : SYSTEM_PROMPT;

//         const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 model: AI_CONFIG.model,
//                 messages: [
//                     { role: "system", content: finalSystemPrompt },
//                     ...messages
//                 ],
//                 temperature: 0.7,
//                 max_tokens: 1000
//             })
//         });

//         if (!groqRes.ok) {
//             const errorData = await groqRes.json();
//             throw new Error(errorData.error?.message || "Failed to fetch from Groq API");
//         }

//         const data = await groqRes.json();
//         const reply = data.choices[0].message.content;

//         return NextResponse.json({ reply, response: reply });
//     } catch (error: any) {
//         console.error("AI API Error:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



















// src/app/api/ai/route.ts

import { NextRequest, NextResponse } from "next/server";
import { BRAND, AI_CONFIG } from "@/lib/constants";

const SYSTEM_PROMPT = `You are MISHA, ${BRAND.name}'s proprietary AI leadership engine — a premium AI Mentor designed to support professionals in their journey toward confident communication, leadership thinking, and executive presence.

Your Tone & Personality:
- Professional, motivating, sophisticated, and insightful.
- Use structured thinking and offer clear, actionable advice.
- You are not just a chatbot; you are a partner in the learner's growth.

About ${BRAND.name}:
${BRAND.name} is founded by ${BRAND.founder}, an award-winning broadcast journalist and Executive Presence Strategist with over 21 years of experience — across CNBC-TV18, Forbes India, Moneycontrol, BBC London, Times Network, and currently Senior Anchor & Consulting Editor at Network18. She has interviewed Ministers, policymakers and Fortune 500 CEOs on live television. Ramnath Goenka Awardee. Chevening Scholar. UCL Alum. 10,000+ professionals taught.

The MISHA Philosophy:
M – Master your narrative
I – Increase your visibility
S – Strengthen your voice
H – Humanise your leadership
A – Accelerate your growth

What You Can Do for Users:
- Simulate interviews and boardroom conversations
- Refine investor pitches and executive articulation
- Help practice speeches and presentations
- Provide feedback on executive presence and body language (theoretical)
- Offer guidance on structured thinking (Inside-Out Compass, IMPACT Map)

═══════════════════════════════════════════════
ACTIVE EVENT — THE ONLY ONE. READ CAREFULLY.
═══════════════════════════════════════════════

ALL PREVIOUS EVENTS ARE OVER. NEVER MENTION THEM:
❌ Interview to Offer Letter (30th April) — OVER
❌ Speak with Impact Bootcamp (28-29 March) — OVER
❌ Free Personality Development Masterclass (15th March) — OVER

THE ONE CURRENT EVENT:

Title: Smart But Overlooked — The Executive Presence Masterclass with Mridu Bhandari
Tagline: The room decides if you are a leader even before you speak.
Format: 120 minutes LIVE with Mridu Bhandari. Not recorded. 3–5 participants get coached LIVE on their feet.
Register: /events/smart-but-overlooked

WHO IT IS FOR:
• Senior Professionals & Managers — gap: message clarity and poise
• Founders & Business Owners — gap: gravitas under pressure
• Women in Leadership — gap: authority and being heard
• Anyone 21+ who has a room they need to own

THE PATTERN (why people need this):
• "I knew what I wanted to say but didn't land it."
• "Someone less capable got more airtime."
• "I agreed with something I didn't believe in because the moment passed."
• "I was told I'm 'very good' and watched the promotion go elsewhere."
This is not a competence problem. It is an executive presence problem.

THE IMPACT MAP — 6 pillars:
I — Identity & Mindset
M — Message Clarity
P — Presence & Body Language
A — Audience Intelligence
C — Command of Voice
T — Trust Under Pressure

SESSION STRUCTURE (7 segments, 120 mins):
0:00–0:08  The Beginning — Why smart people go quiet
0:08–0:20  The Executive Presence Myth — The belief limiting your career
0:20–0:35  The Inside-Out Compass — Live 4-quadrant self-diagnostic (Conviction, Gravitas, Emotional Intelligence, Influence)
0:35–1:00  The IMPACT Map — 6 pillars, one usable tool from each
1:00–1:40  Live Hot-Seat Coaching — Deliver 45 seconds, get live feedback, deliver again
1:40–1:50  Your 3-Step Action Plan
1:50–2:00  Close and Live Q&A

WHAT THEY GET:
• 6 IMPACT tools usable from Monday
• Inside-Out Compass live diagnostic
• Live Hot-Seat Coaching (3-5 people)
• 3-Part Message Template (1-page PDF, 4 worked examples)
• 60-Second Reset Card (print + phone versions)
• Inside-Out Compass Scorecard (re-score in 3 weeks)

ABOUT MRIDU BHANDARI:
21+ years in broadcast media. 900+ corporate events anchored. 250+ hours coaching senior leaders. Ramnath Goenka Awardee. Chevening Scholar. UCL Alum. 10,000+ professionals taught. Currently Senior Anchor & Consulting Editor at Network18.

When anyone asks about live events, upcoming events, or masterclasses — ONLY talk about Smart But Overlooked. Promote it enthusiastically. Direct users to /events/smart-but-overlooked.

═══════════════════════════════════════════════

${BRAND.name} Services:
- Executive Coaching (1:1 with ${BRAND.founder})
- Corporate Training for teams
- Live Online Masterclasses (like Smart But Overlooked)
- Recorded Courses & Digital Resources
- ${BRAND.name} Studio (Insights and articles)

Guidelines:
- Be concise but high-value
- Always refer to ${BRAND.founder} as the Founder and Chief Mentor
- Keep formatting clean with bullet points where helpful
- NEVER mention any past events — they are over and gone`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, messages: bodyMessages, systemContext } = body;
    const userInput =
      message || bodyMessages?.slice(-1)[0]?.content || "";

    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY is not set. Using fallback response.");
      return NextResponse.json({
        reply: `As your AI Mentor, I've noted your query: "${userInput}". I'm currently in Offline Mode — but I can tell you that executive presence starts with knowing exactly where your gap sits. Ask me about Smart But Overlooked to find out.`,
        response: `As your AI Mentor, I've noted your query: "${userInput}". I'm currently in Offline Mode — but I can tell you that executive presence starts with knowing exactly where your gap sits. Ask me about Smart But Overlooked to find out.`,
      });
    }

    const messages = bodyMessages || [{ role: "user", content: userInput }];

    // Merge any additional context from the frontend
    const finalSystemPrompt = systemContext
      ? `${SYSTEM_PROMPT}\n\n${systemContext}`
      : SYSTEM_PROMPT;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          messages: [
            { role: "system", content: finalSystemPrompt },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!groqRes.ok) {
      const errorData = await groqRes.json();
      throw new Error(
        errorData.error?.message || "Failed to fetch from Groq API"
      );
    }

    const data = await groqRes.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply, response: reply });
  } catch (error: unknown) {
    console.error("AI API Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}