"use client";

import { useState } from "react";
import BillScanner from "@/components/dashboard/BillScanner";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { Transaction } from "@/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleScanComplete = (data: Transaction) => {
    setTransactions((prev) => [data, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Manage your cash flow and digital records efficiently.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="Revenue (MTD)" value="₹45,231" trend="+12.5%" />
        <KPICard title="Pending Bills" value="₹12,400" trend="-2.4%" />
        <KPICard title="GST Claimable" value="₹4,015" trend="+5.0%" />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Scan New Bill</h2>
        <BillScanner onScanComplete={handleScanComplete} />
      </section>

      <section className="space-y-4 mt-12 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
        </div>
        <TransactionsTable data={transactions} />
      </section>
    </div>
  );
}

function KPICard({ title, value, trend }: { title: string; value: string; trend: string }) {
  const isPositive = trend.startsWith("+");
  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-sm font-medium ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
