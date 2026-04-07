"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function DynamicIsland() {
  const [notification, setNotification] = useState<{ title: string; subtitle: string; } | null>(null);

  // Expose a global method securely by attaching to window purely for MVP visual simulation
  useEffect(() => {
    (window as any).triggerIsland = (title: string, subtitle: string) => {
      setNotification({ title, subtitle });
      setTimeout(() => setNotification(null), 4000);
    };
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ height: 32, width: 140, opacity: 0, scale: 0.9 }}
            animate={{ height: "auto", width: 340, opacity: 1, scale: 1 }}
            exit={{ height: 32, width: 140, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="bg-black text-white rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-800 flex items-center p-3"
          >
            <div className="bg-indigo-500/20 p-2 rounded-full mr-3 text-indigo-400 shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm truncate">{notification.title}</span>
              <span className="text-xs text-zinc-400 truncate">{notification.subtitle}</span>
            </div>
            <div className="ml-auto text-emerald-400 pr-2 shrink-0">
               <CheckCircle2 size={16} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
