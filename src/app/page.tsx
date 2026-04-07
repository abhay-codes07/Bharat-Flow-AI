"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BillScanner from "@/components/dashboard/BillScanner";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Transaction } from "@/types";
import { TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleScanComplete = (data: Transaction) => {
    setTransactions((prev) => [data, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
          Command Center
        </h1>
        <p className="text-zinc-400 mt-2 text-lg">Your elite financial intelligence dashboard.</p>
      </header>

      {/* Executive Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Cash Flow Sparkline Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-xl p-6 rounded-2xl border border-zinc-800 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-400">Net Cash Flow</h3>
              <div className="text-3xl font-bold text-zinc-100 mt-1">₹142,300</div>
            </div>
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>
          {/* Simple SVG Sparkline */}
          <div className="w-full h-16 mt-4 opacity-80">
            <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible">
              <path 
                d="M0,40 Q20,30 40,35 T80,20 T120,25 T160,10 T200,5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                className="text-indigo-500" 
                strokeLinecap="round" 
              />
              <path 
                d="M0,40 Q20,30 40,35 T80,20 T120,25 T160,10 T200,5 L200,50 L0,50 Z" 
                fill="url(#sparkline-gradient)" 
                className="text-indigo-500/20" 
              />
              <defs>
                <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* AI Insights Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-xl p-6 rounded-2xl border border-rose-900/50 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-rose-400 flex items-center gap-2">
              <Sparkles size={16} /> Chief of Staff Insight
            </h3>
          </div>
          <p className="text-zinc-200 text-lg leading-relaxed font-medium">
            "Your raw material inventory cost is up <span className="text-rose-400">12%</span> over the last 14 days. Recommend auditing vendor Y."
          </p>
        </motion.div>

        {/* Agent Tasks Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-zinc-950/50 backdrop-blur-xl p-6 rounded-2xl border border-zinc-800 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Agent Tasks</h3>
            <div className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full font-semibold">2 Pending</div>
          </div>
          <ul className="space-y-3 mt-2">
            <li className="flex gap-3 items-center text-sm text-zinc-300">
              <div className="h-4 w-4 rounded-full border border-zinc-600"></div>
              Pay electricity bill (Due tmrw)
            </li>
            <li className="flex gap-3 items-center text-sm text-zinc-300">
              <div className="h-4 w-4 rounded-full border border-zinc-600"></div>
              Follow up with Client X for ₹50k
            </li>
            <li className="flex gap-3 items-center text-sm text-zinc-500 line-through">
              <CheckCircle2 size={16} className="text-emerald-500" />
              File monthly GST return
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">Intelligent Ledger Entry</h2>
          <BillScanner onScanComplete={handleScanComplete} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">Recent Activity</h2>
          </div>
          <RecentActivity data={transactions} />
        </section>
      </div>
    </div>
  );
}
