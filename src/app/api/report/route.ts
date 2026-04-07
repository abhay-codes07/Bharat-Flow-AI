import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET() {
  try {
    let ledgerContext = "";
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      ledgerContext = "Sample Mock Data for Report";
    } else {
      const { data, error } = await supabaseAdmin
        .from('business_ledger')
        .select('*');
      if (error) throw new Error(error.message);
      ledgerContext = JSON.stringify(data);
    }
    
    // Simulate generation of report
    const systemInstruction = `You are a Chartered Accountant generating a brief Monthly Business Health summary for GST filing.`;
    
    let reportText = "Mocked: Your GST summary looks fine. Output: ₹45,000, Tax: ₹8,100.";
    if (process.env.GEMINI_API_KEY) {
      const res = await genai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: "user", parts: [{ text: `Generate summary based on:\n${ledgerContext}` }] }],
        config: { systemInstruction }
      });
      reportText = res.text || reportText;
    }

    return NextResponse.json({ success: true, report: reportText, rawData: ledgerContext });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
