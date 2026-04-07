import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET() {
  try {
    let ledgerContext = "";

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Mocked fallback context if no DB configured
      ledgerContext = `
      - Expense: Bought Raw Materials from Vendor A for ₹12000 on Friday
      - Income: Sold goods for ₹5000 on Monday
      - Expense: Paid Electricity for ₹2000 on Tuesday
      - Expense: Bought extra stock from Vendor A on Friday for ₹11000
      `;
    } else {
      const { data, error } = await supabaseAdmin
        .from('business_ledger')
        .select('type, amount, vendor, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw new Error(error.message);
      
      ledgerContext = data.map(d => `- ${d.type.toUpperCase()}: ₹${d.amount} with ${d.vendor} on ${new Date(d.created_at).toLocaleDateString()}`).join('\n');
    }

    if (!process.env.GEMINI_API_KEY) {
      await new Promise(r => setTimeout(r, 2000));
      return NextResponse.json({
        success: true,
        insight: "Alert: You usually buy stock on Fridays. You currently have ₹12,000 in cash; you might need ₹5,000 more for your usual order."
      });
    }

    const systemInstruction = `You are a World-Class CFO for a Small Indian Business.
Analyze the following recent ledger entries (up to 20).
Identify any patterns (like buying on specific days) and calculate potential risks or cash flow alerts.
Return ONE short, actionable 'Smart Insight' paragraph (under 30 words) summarizing a pattern or risk. Format beautifully.`;

    const response = await genai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: `Ledger Data:\n${ledgerContext || "No recent data."}` }] }],
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    return NextResponse.json({ success: true, insight: response.text });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
