"use client";

import { Transaction, TransactionItem } from "@/types";

export default function TransactionsTable({ data }: { data: Transaction[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 p-12 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-medium text-zinc-500">No transactions recorded yet</h3>
        <p className="text-sm text-zinc-400 mt-1">Upload a receipt above to automatically populate</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-medium">
            <tr>
              <th className="px-6 py-4">Vendor</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4 text-right">GST</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {data.map((tx, idx) => (
              <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{tx.vendorName}</td>
                <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {tx.items?.map((item: TransactionItem, i: number) => (
                      <span key={i} className="inline-flex px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 border">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-muted-foreground">₹{tx.gstAmount}</td>
                <td className="px-6 py-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                  ₹{tx.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
