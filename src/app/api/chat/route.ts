import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabase";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The tool logic
async function get_ledger_summary() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Mocked return if no supabase configured
    return {
      status: "success",
      data: {
        totalIncome: 45000,
        totalExpense: 12000,
        netProfit: 33000,
        insight: "10% higher than last week"
      }
    };
  }

  // Real Supabase interaction
  const { data, error } = await supabaseAdmin
    .from('business_ledger')
    .select('type, amount');

  if (error) {
    return { status: "error", message: error.message };
  }

  let totalIncome = 0;
  let totalExpense = 0;

  data?.forEach(row => {
    if (row.type === 'income') totalIncome += Number(row.amount);
    if (row.type === 'expense') totalExpense += Number(row.amount);
  });

  return {
    status: "success",
    data: {
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense
    }
  };
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) return NextResponse.json({ error: "No query provided" }, { status: 400 });

    if (!process.env.GEMINI_API_KEY) {
      // Mocked UI Fallback
      await new Promise(r => setTimeout(r, 1500));
      return NextResponse.json({
        success: true,
        briefing: "Mocked Briefing: You made ₹45,000 this week, which is 10% higher than last week. Great job navigating seasonal demands!",
        usedTool: true
      });
    }

    const toolDeclaration = {
      functionDeclarations: [
        {
          name: "get_ledger_summary",
          description: "Queries the business ledger to retrieve total income, expense, and net profit.",
        }
      ]
    };

    const systemInstruction = `You are a World-Class CFO for a Small Indian Business. 
You provide highly professional, concise, and encouraging financial briefings. 
If the user asks about profits, expenses, or ledger details, strictly use the get_ledger_summary tool.
Always format your response beautifully. Do not use generic AI tones, be an elite executive.`;

    // 1. Initial Prompt with Tool Definition
    const chat = genai.chats.create({
      model: "gemini-1.5-flash",
      config: {
        systemInstruction,
        temperature: 0.2,
        tools: [toolDeclaration],
      }
    });

    const initialResponse = await chat.sendMessage({ message: query });
    let finalBriefing = initialResponse.text;
    let usedTool = false;

    // 2. Check if Gemini invoked the tool
    const calls = initialResponse.functionCalls;
    if (calls && calls.length > 0) {
      usedTool = true;
      const call = calls[0];
      
      if (call.name === "get_ledger_summary") {
        const toolResult = await get_ledger_summary();
        
        // 3. Send the result back to Gemini to synthesize the CFO briefing
        const followUpResponse = await chat.sendMessage({
          message: [
            {
              functionResponse: {
                name: call.name,
                response: toolResult
              }
            }
          ]
        });
        
        finalBriefing = followUpResponse.text;
      }
    }

    return NextResponse.json({ success: true, briefing: finalBriefing, usedTool });

  } catch (error: unknown) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
