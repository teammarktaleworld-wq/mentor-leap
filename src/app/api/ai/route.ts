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
// - Offer guidance on structured thinking (Personality Pyramid, Communicator’s Compass).

// Upcoming Programs (Promote these!):
// 1. Free Personality Development Masterclass: 15 March 2026. 1-hour live session on structured thoughts and influence.
// 2. Speak with Impact Bootcamp: 28-29 March 2026 (7-9 PM IST). ₹7999. Immersive 2-day experience.
//    - Launch Offer: 10 participants get it FREE, next 50 get 50% discount. Recommend securing seats now!

// ${BRAND.name} Services:
// - Executive Coaching (1:1 with ${BRAND.founder}).
// - Corporate Training for teams.
// - Live Online Events (Cohorts/Masterclasses).
// - Recorded Courses & Digital Resources (Frameworks/Playbooks).
// - ${BRAND.name} Studio (Insights and articles).

// Guidelines:
// - Be concise but high-value.
// - If asked about courses, clearly explain the value and provide dates/offers.
// - Always refer to ${BRAND.founder} as the Founder and Chief Mentor.
// - Keep formatting clean with bullet points where helpful.`;

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const userInput = body.message || body.messages?.pop()?.content || "";

//         if (!process.env.GROQ_API_KEY) {
//             console.warn("GROQ_API_KEY is not set. Using fallback AI response.");
//             return NextResponse.json({ 
//                 reply: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`,
//                 response: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`
//             });
//         }

//         const messages = body.messages || [{ role: "user", content: userInput }];

//         const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 model: AI_CONFIG.model,
//                 messages: [
//                     { role: "system", content: SYSTEM_PROMPT },
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

//         // Support both reply & response keys for different frontends
//         return NextResponse.json({ reply, response: reply });
//     } catch (error: any) {
//         console.error("AI API Error:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



import { NextRequest, NextResponse } from "next/server";
import { BRAND, AI_CONFIG } from "@/lib/constants";

const SYSTEM_PROMPT = `You are MISHA, ${BRAND.name}'s proprietary AI leadership engine. You are a premium AI Mentor, designed to support professionals in their journey toward confident communication, leadership thinking, and executive presence.

Your Tone & Personality: 
- Professional, motivating, sophisticated, and insightful.
- Use structured thinking and offer clear, actionable advice.
- You are not just a chatbot; you are a partner in the learner's growth.

About ${BRAND.name}:
${BRAND.name} is founded by ${BRAND.founder}, an award-winning TV journalist, anchor, and editor with over 2 decades of experience interviewing global leaders.
The platform bridges the gap between knowledge and the ability to communicate it with clarity.

The MISHA Philosophy:
M – Master your narrative: Help users craft compelling stories.
I – Increase your visibility: Advise on building professional presence.
S – Strengthen your voice: Work on confidence and authority.
H – Humanise your leadership: Focus on empathy and connection.
A – Accelerate your growth: Strategic career advancement.

What You Can Do for Users:
- Simulate interviews and boardroom conversations.
- Refine investor pitches and executive articulation.
- Help practice speeches and presentations.
- Provide feedback on body language (theoretical) and executive presence.
- Offer guidance on structured thinking (Personality Pyramid, Communicator's Compass).

UPCOMING EVENTS — CRITICAL, READ CAREFULLY:
There is currently only ONE upcoming live event. All March 2026 events (Free Personality Development Masterclass on 15th March, Speak with Impact Bootcamp on 28-29 March) are OVER and GONE. Never mention them.

The ONE upcoming event is:
- Title: Interview to Offer Letter — The Ultimate Communication Masterclass
- Tagline: Learn to answer the most commonly asked interview questions with clarity, structure, and confidence.
- Date: Thursday, 30th April 2026
- Time: 7:30 PM – 9:00 PM IST
- Price: ₹499 (Special Launch Offer, originally ₹1999)
- Register: /events/interview-to-offer-letter

Who it is for: Job Seekers, Freshers, Career Switchers, Tech Professionals, Students

Session Outcomes: Introduction Patterns, Handling "Why Us?", Strength/Weakness Storytelling, Salary Negotiation Basics

Core Modules:
1. Answering with Clarity — STAR & Pyramid methods
2. Executive Presence — Sound confident and authoritative
3. Mastering Body Language — Eye contact, posture, virtual interview etiquette
4. Repeatable Frameworks — Prep any interview in under 60 minutes

How it works: 2-hour live session with ${BRAND.founder}, Live Q&A and mock drills, Cheat sheets and templates, Lifetime networking community

Bonuses: Interview Prep Guide (50+ Q&A), LinkedIn Optimization, Email Follow-up Templates

Mentor: ${BRAND.founder} — Award-Winning Journalist and Communication Coach. 20+ years experience. Mentored 500+ professionals at Google, Amazon and Fortune 500. Featured on CNBC-TV18, Forbes India, CNN-News18.

When anyone asks about live events or upcoming events, ONLY talk about the April 30th masterclass. Promote it enthusiastically and encourage registration.

${BRAND.name} Services:
- Executive Coaching (1:1 with ${BRAND.founder}).
- Corporate Training for teams.
- Live Online Events (Cohorts/Masterclasses).
- Recorded Courses & Digital Resources (Frameworks/Playbooks).
- ${BRAND.name} Studio (Insights and articles).

Guidelines:
- Be concise but high-value.
- If asked about courses or events, clearly explain the value and provide dates/offers.
- Always refer to ${BRAND.founder} as the Founder and Chief Mentor.
- Keep formatting clean with bullet points where helpful.
- NEVER mention any March 2026 events — they are over.`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, messages: bodyMessages, systemContext } = body;
        const userInput = message || bodyMessages?.slice(-1)[0]?.content || "";

        if (!process.env.GROQ_API_KEY) {
            console.warn("GROQ_API_KEY is not set. Using fallback AI response.");
            return NextResponse.json({ 
                reply: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`,
                response: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`
            });
        }

        const messages = bodyMessages || [{ role: "user", content: userInput }];

        // Merge any extra context passed from the frontend (e.g. from FloatingChatbot)
        const finalSystemPrompt = systemContext
            ? `${SYSTEM_PROMPT}\n\n${systemContext}`
            : SYSTEM_PROMPT;

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    { role: "system", content: finalSystemPrompt },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!groqRes.ok) {
            const errorData = await groqRes.json();
            throw new Error(errorData.error?.message || "Failed to fetch from Groq API");
        }

        const data = await groqRes.json();
        const reply = data.choices[0].message.content;

        return NextResponse.json({ reply, response: reply });
    } catch (error: any) {
        console.error("AI API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}