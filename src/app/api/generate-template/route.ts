import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ ONLY STABLE MODEL
      messages: [
        {
          role: "system",
          content: `
You generate design templates for a graphic editor.

RULES:
- Generate MAX 16 items
- Respond with ONLY valid JSON array
- No text before or after JSON

Each item format:
{
  "title": "Short title",
  "description": "Short description",
  "icon": "⭐ | ✔ | ⚡ | ❤️",
  "color": "#HEX"
}
          `,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const raw = completion.choices[0].message.content;

    if (!raw) {
      throw new Error("Empty response from AI");
    }

    // 🛡️ HARD JSON SAFETY (VERY IMPORTANT)
    const start = raw.indexOf("[");
    const end = raw.lastIndexOf("]");
    if (start === -1 || end === -1) {
      throw new Error("Invalid AI JSON response");
    }

    const items = JSON.parse(raw.slice(start, end + 1));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Template AI error:", error);

    return NextResponse.json(
      {
        error:
          "AI template service is temporarily unavailable. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
