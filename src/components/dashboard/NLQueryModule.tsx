"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AILivelinessBar from "@/components/ui/AILivelinessBar";
import { motion, AnimatePresence } from "framer-motion";

export default function NLQueryModule() {
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [briefing, setBriefing] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsThinking(true);
    setBriefing(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.success) {
        setBriefing(data.briefing);
      } else {
        setBriefing("I encountred an error accessing the ledger.");
      }
    } catch (error) {
      setBriefing("Connection error. Could not reach Chief of Staff.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-zinc-950/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-xl flex flex-col h-full">
      <div className="absolute top-0 left-0 right-0">
        <AILivelinessBar isActive={isThinking} />
      </div>
      
      <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-4">
        <Sparkles size={20} />
        <h2>Natural Language Ledger Query</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
        <AnimatePresence mode="wait">
          {briefing ? (
            <motion.div
              key="briefing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-zinc-100 text-sm leading-relaxed"
            >
              {briefing}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center text-zinc-600 text-sm italic text-center"
            >
              Ask me something like:<br/>"What was my total profit last week?"
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          type="text"
          disabled={isThinking}
          placeholder="Ask Chief of Staff..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-200 placeholder:text-zinc-600 disabled:opacity-50 transition-shadow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isThinking || !query.trim()}
          variant="ghost"
          className="absolute right-1.5 top-1.5 h-9 w-9 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
