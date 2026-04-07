"use client";

import { useState } from "react";
import { AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";
import { motion } from "framer-motion";

export default function RecoveryCenter({ transactions }: { transactions: Transaction[] }) {
  const pendingRecords = transactions.filter(t => t.status === "pending");
  const [draftingFor, setDraftingFor] = useState<number | null>(null);

  const handleDraft = async (idx: number, vendor: string, amount: number) => {
    setDraftingFor(idx);
    try {
      const res = await fetch("/api/draft-recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendor, amount })
      });
      const data = await res.json();
      
      if (data.success) {
        const textEncoded = encodeURIComponent(data.template);
        // Deep linking to WhatsApp
        window.open(`whatsapp://send?text=${textEncoded}`, "_blank");
      } else {
        alert("Failed to draft message.");
      }
    } catch {
      alert("Error reaching agent.");
    } finally {
      setDraftingFor(null);
    }
  };

  return (
    <div className="bg-zinc-950/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-rose-400 font-semibold">
          <AlertTriangle size={20} />
          <h2>Recovery Agent</h2>
        </div>
        <div className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded-full font-bold">
          {pendingRecords.length} Pending
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
        {pendingRecords.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-600 text-sm italic">
            All records are clear!
          </div>
        ) : (
          pendingRecords.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between gap-2"
            >
              <div className="overflow-hidden">
                <h4 className="font-semibold text-zinc-200 text-sm truncate">{t.vendorName}</h4>
                <p className="font-bold text-rose-500 text-sm">₹{t.totalAmount}</p>
              </div>
              <Button 
                onClick={() => handleDraft(idx, t.vendorName, t.totalAmount)}
                disabled={draftingFor === idx}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-xs flex-shrink-0 whitespace-nowrap"
              >
                {draftingFor === idx ? "Drafting..." : (
                  <>
                    <Send size={12} />
                    WhatsApp
                  </>
                )}
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
