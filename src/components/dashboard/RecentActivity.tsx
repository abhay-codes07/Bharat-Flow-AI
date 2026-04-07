"use client";

import { motion } from "framer-motion";
import { Receipt, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Transaction } from "@/types";

export default function RecentActivity({ data }: { data: Transaction[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-zinc-950/50 backdrop-blur-xl p-12 rounded-2xl shadow-lg border border-zinc-800/60 flex flex-col items-center justify-center text-center">
        <div className="bg-indigo-500/10 p-4 rounded-full mb-4">
          <Receipt className="h-10 w-10 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Ledger is Empty</h3>
        <p className="text-sm text-zinc-400 mt-2 max-w-[250px]">Get started by capturing a bill or using the Magic Mic to log an entry.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((tx, idx) => {
        // Mocking type based on amount for visual distinction if not present
        const isExpense = true; // since it comes from bills for now
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="group relative flex items-center justify-between p-4 bg-zinc-900/40 backdrop-blur-md rounded-xl border border-zinc-800/80 hover:bg-zinc-800/60 transition-all glow-hover overflow-hidden"
          >
            {/* Subtle glow effect indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500/50 to-rose-500/10"></div>
            
            <div className="flex gap-4 items-center pl-2">
              <div className={`p-2 rounded-lg ${isExpense ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {isExpense ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div>
                <h4 className="font-semibold text-zinc-200">{tx.vendorName}</h4>
                <p className="text-xs text-zinc-500">{tx.date}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className={`font-bold tracking-tight ${isExpense ? 'text-zinc-100' : 'text-emerald-400'}`}>
                {isExpense ? '-' : '+'}₹{tx.totalAmount}
              </span>
              <span className="text-xs px-2 py-0.5 mt-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                Completed
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
