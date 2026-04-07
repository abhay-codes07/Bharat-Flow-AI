import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ success: false, error: "No text provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("No GEMINI_API_KEY. Mocking Voice Agent response.");
      return NextResponse.json({
        success: true,
        intent: "RECORD",
        payload: {
          insight: "Mocked recording of income",
          type: "income",
          amount: 500,
          category: "Sales"
        }
      });
    }

    const prompt = `You are a highly intelligent "Business Chief of Staff" for an Indian MSME.
    The user has given a Voice Instruction: "${text}"

    Classify the voice instruction into one of the following intentions:
    1. "QUERY" (asking for information, analytics, history)
    2. "ACTION" (setting a reminder, paying a bill, doing something functional)
    3. "RECORD" (adding an income or expense to the ledger)

    Respond ONLY in strict JSON format with this structure:
    {
      "intent": "QUERY" | "ACTION" | "RECORD",
      "payload": {
        "insight": "A brief, professional response to the user's request (under 15 words) as if you are their smart assistant.",
        "type": "income" | "expense" | null,
        "amount": number | null,
        "category": "string" | null
      }
    }
    
    If intent is RECORD, attempt to guess the type (income/expense), amount, and category from the text. Otherwise leave them null.
    No other markdown or text.`;

    const response = await genai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
      }
    });

    const outputText = response.text;
    if (!outputText) throw new Error("No output from model");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsed: any = {};
    try {
      parsed = JSON.parse(outputText);
    } catch {
      const cleaned = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    // Phase 1 / Phase 2 intersection - Persist "RECORD" intents directly!
    if (parsed.intent === "RECORD" && parsed.payload?.amount && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabaseAdmin.from('business_ledger').insert({
        type: parsed.payload.type || 'income',
        amount: parsed.payload.amount,
        vendor: 'Voice Entry',
        category: parsed.payload.category || 'General',
        items: []
      });
    }

    return NextResponse.json({ 
      success: true, 
      intent: parsed.intent, 
      payload: parsed.payload 
    });

  } catch (error: unknown) {
    console.error("Agent error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
