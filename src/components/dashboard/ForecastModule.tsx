"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Loader2, Sparkles } from "lucide-react";
import AILivelinessBar from "@/components/ui/AILivelinessBar";
import { motion, AnimatePresence } from "framer-motion";

export function ForecastModule() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForecast() {
      setLoading(true);
      try {
        const res = await fetch("/api/forecast");
        const data = await res.json();
        if (data.success) {
          setInsight(data.insight);
        }
      } catch (e) {
        setInsight("Unable to generate cash-flow forecast at this time.");
      } finally {
        setLoading(false);
      }
    }
    fetchForecast();
  }, []);

  return (
    <div className="relative overflow-hidden bg-zinc-950/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-xl h-full flex flex-col group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 right-0">
        <AILivelinessBar isActive={loading} />
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-sm font-medium text-emerald-400 flex items-center gap-2">
          <TrendingUp size={16} /> Predictive Cash-Flow
        </h3>
        <Sparkles size={16} className="text-emerald-500/50" />
      </div>

      <div className="flex-1 relative z-10 flex items-center min-h-[100px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-zinc-500 text-sm italic"
            >
              <Loader2 size={16} className="animate-spin" />
              CFO is analyzing recent cash flows...
            </motion.div>
          ) : (
            <motion.div
              key="insight"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-zinc-200 text-base leading-relaxed font-medium"
            >
              {insight}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
