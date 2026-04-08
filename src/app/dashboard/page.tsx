"use client";

import { useState } from "react";
import BillScanner from "@/components/dashboard/BillScanner";
import RecentActivity from "@/components/dashboard/RecentActivity";
import NLQueryModule from "@/components/dashboard/NLQueryModule";
import RecoveryCenter from "@/components/dashboard/RecoveryCenter";
import { ForecastModule } from "@/components/dashboard/ForecastModule";
import { Transaction } from "@/types";
import { Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded } = useUser();
  // Shared state reflecting local changes until a full real-time push mechanism is built
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      vendorName: "Pending Supply Co.",
      date: "2023-11-20",
      items: [{ name: "Raw Material X", price: 1540 }],
      gstAmount: 180,
      totalAmount: 1720,
      status: "pending",
    },
    {
      vendorName: "Client Alpha",
      date: "2023-11-19",
      items: [{ name: "Service Fees", price: 50000 }],
      gstAmount: 9000,
      totalAmount: 59000,
      status: "completed",
    }
  ]);

  const handleScanComplete = (data: Transaction) => {
    setTransactions((prev) => [data, ...prev]);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500 flex items-center gap-3">
            {isLoaded && user ? `Welcome, ${user.firstName || 'Merchant'}` : "Command Center"}
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">Your elite financial intelligence dashboard.</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full hidden md:flex items-center gap-2"
        >
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-sm font-medium text-indigo-300">Agent Network Online</span>
        </motion.div>
        {/* MVP Mock Pro Badge logic */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full hidden md:flex items-center gap-2 ml-2"
        >
          <Crown size={16} className="text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">Bharat-Flow PRO</span>
        </motion.div>
      </header>

      {/* CSS Grid Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-6">
        
        {/* Top Left: Natural Language Query (Span 8 cols, 1 row on large displays) */}
        <div className="md:col-span-12 lg:col-span-8 row-span-2 shadow-2xl">
          <NLQueryModule />
        </div>

        {/* Top Right: Predictive Cash-Flow Forecast (Span 4 cols) */}
        <div className="md:col-span-6 lg:col-span-4 row-span-1 shadow-2xl">
          <ForecastModule />
        </div>

        {/* Middle Right: Payment Recovery Center (Span 4 cols) */}
        <div className="md:col-span-6 lg:col-span-4 row-span-2 shadow-2xl overflow-hidden">
          <RecoveryCenter transactions={transactions} />
        </div>

        {/* Bottom Left: Bill Scanner (Span 8 cols) */}
        <div className="md:col-span-12 lg:col-span-8 row-span-2 shadow-2xl">
          <div className="bg-zinc-950/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-xl h-full flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100 mb-4">Intelligent Ledger Entry</h2>
            <div className="flex-1">
              <BillScanner onScanComplete={handleScanComplete} />
            </div>
          </div>
        </div>

        {/* Bottom Full: Recent Activity (Span 12 cols) */}
        <div className="md:col-span-12 lg:col-span-12 row-span-2 shadow-2xl">
          <div className="bg-zinc-950/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-xl h-full">
             <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-zinc-100">Recent Activity Context</h2>
            </div>
            <RecentActivity data={transactions} />
          </div>
        </div>

      </div>
    </div>
  );
}
