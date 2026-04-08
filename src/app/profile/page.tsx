"use client";

import { useState } from "react";
import { User, Languages, Building2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [businessName, setBusinessName] = useState("Pending Supply Co.");
  const [preferredLang, setPreferredLang] = useState("hi-IN");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating Supabase profiles table
    alert(`Profile saved:\nBusiness: ${businessName}\nLanguage: ${preferredLang}\n(MVP visually mocked logic)`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20 mt-10">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
            <User size={20} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Merchant Profile</h1>
        </div>
        <p className="text-zinc-400 text-sm">Manage your multi-tenant isolation and localization settings.</p>
      </header>

      {/* Subscription Tier Block */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/80 backdrop-blur-xl border border-indigo-500/30 p-8 rounded-3xl flex flex-col shadow-xl mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-indigo-600 font-bold px-4 py-1 text-xs rounded-bl-xl text-white">PRO TIER</div>
        <h2 className="text-xl font-bold text-white mb-2">Billing & Subscription</h2>
        <p className="text-zinc-400 text-sm mb-6">You are currently on the <strong className="text-indigo-400">Free Tier</strong> (5 Scans/day).</p>
        
        <div className="pt-4 border-t border-zinc-800">
          <Button 
            onClick={async () => {
              try {
                const res = await fetch("/api/stripe", { method: "POST" });
                const { url } = await res.json();
                if (url) window.location.href = url;
              } catch (e) {
                alert("Failed to initiate upgrade.");
              }
            }}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
          >
            Upgrade to Pro — Unlimited Scans
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl flex flex-col shadow-xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Building2 size={16} className="text-zinc-500" />
              Business Name
            </label>
            <input 
              type="text" 
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Languages size={16} className="text-zinc-500" />
              Preferred Language (Speech AI)
            </label>
            <select 
              value={preferredLang}
              onChange={e => setPreferredLang(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="en-IN">English (India)</option>
              <option value="hi-IN">Hindi / Hinglish</option>
              <option value="ta-IN">Tamil</option>
              <option value="bn-IN">Bengali</option>
            </select>
          </div>

          <div className="pt-4 border-t border-zinc-800">
             <Button type="submit" className="w-full sm:w-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl">
               <Save size={18} /> Save Settings
             </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
