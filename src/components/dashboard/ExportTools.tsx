"use client";

import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExportTools() {
  const handleDownload = async () => {
    try {
      const res = await fetch("/api/report");
      const data = await res.json();
      
      // Simulate CSV text
      const csvContent = "data:text/csv;charset=utf-8,Type,Amount\nMocked,45000\n" + (data.rawData || "");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "BharatFlow_GST_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Failed to export: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleShareCA = () => {
    const text = encodeURIComponent("Hello CA, here is my monthly ledger export attached via BharatFlow. Please review for GST filing.");
    window.open(`whatsapp://send?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-xl flex-1 justify-center py-6 shadow-lg shadow-indigo-900/20">
        <Download size={18} />
        Download CSV Report
      </Button>
      <Button onClick={handleShareCA} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 gap-2 rounded-xl flex-1 justify-center py-6 border border-zinc-700">
        <Share2 size={18} />
        Share to CA (WhatsApp)
      </Button>
    </div>
  );
}
