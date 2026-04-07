import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { vendor, amount } = await req.json();

    if (!vendor || !amount) {
      return NextResponse.json({ error: "Vendor and amount are required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      await new Promise(r => setTimeout(r, 1000));
      return NextResponse.json({
        success: true,
        template: `Namaste ${vendor} ji, aapka ₹${amount} ka payment pending hai. Kripya jald se jald clear karein. Dhanyavad!`
      });
    }

    const systemInstruction = `You are a professional and polite Indian Business Chief of Staff. 
Your goal is to draft a short WhatsApp recovery message in Hinglish or English to warmly ask a vendor or client to pay their pending dues.
The message should sound polite but clear about the amount. Do not include placeholders, generate a ready-to-send text.
Vendor Context: Name is "${vendor}". Amount owed is ₹${amount}.`;

    const response = await genai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: "Draft the WhatsApp message." }] }],
      config: {
        systemInstruction,
        temperature: 0.4
      }
    });

    const template = response.text || `Hello ${vendor}, your payment of ₹${amount} is pending. Please complete it.`;

    return NextResponse.json({ success: true, template });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
