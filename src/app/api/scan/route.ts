import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure this uses the edge runtime if preferred, or standard node. Standard node is easier for Formidable/Busboy, 
// but we just use req.formData() which works in App Router on both.

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Mocked response for UI testing if no API key is provided
      console.warn("No GEMINI_API_KEY found, returning mocked data for UI demonstration.");
      await new Promise(r => setTimeout(r, 2000)); // simulate delay
      return NextResponse.json({
        success: true,
        extractedData: {
          vendorName: "Mocked Vendor Pvt Ltd",
          date: new Date().toISOString().split('T')[0],
          items: [{ name: "Mocked Item 1", price: 100 }, { name: "Mocked Item 2", price: 200 }],
          gstAmount: 54,
          totalAmount: 354
        }
      });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const prompt = `You are an expert OCR and data extraction system for Indian MSMEs. 
    Extract the following from the provided uploaded bill/receipt image:
    1. Vendor Name
    2. Date (format as YYYY-MM-DD)
    3. Item list (each with a 'name' and 'price')
    4. GST amount
    5. Total Amount

    Return strictly valid JSON with this exact structure:
    {
       "vendorName": string,
       "date": string,
       "items": [ { "name": string, "price": number } ],
       "gstAmount": number,
       "totalAmount": number
    }
    No markdown, no extra text. Just the JSON object.`;

    const response = await genai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64,
                mimeType: file.type,
              },
            },
          ],
        },
      ],
      config: {
        temperature: 0,
        responseMimeType: "application/json",
      }
    });

    const outputText = response.text;
    if (!outputText) throw new Error("No output from model");
    
    // Attempt to parse JSON strictly. 
    // Even though responseMimeType is json, sometimes Models wrap it.
    let parsed = {};
    try {
      parsed = JSON.parse(outputText);
    } catch {
      // fallback in case of markdown wrapping
      const cleaned = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    return NextResponse.json({ success: true, extractedData: parsed });
  } catch (error: unknown) {
    console.error("Error scanning bill:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
