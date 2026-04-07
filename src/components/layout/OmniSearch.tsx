"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, FileText, Settings, X, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OmniSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex gap-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
      >
        <Search size={16} />
        <span>Search ledger or ask AI...</span>
        <kbd className="ml-4 px-1.5 py-0.5 bg-zinc-800 rounded font-mono text-[10px] hidden lg:inline-flex items-center gap-1">
          <Command size={10} /> K
        </kbd>
      </Button>

      {/* Floating Action for Mobile */}
      <Button 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 right-16 z-40 bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-800"
      >
        <Search size={18} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-zinc-900/90 backdrop-blur-2xl border border-zinc-700/50 shadow-2xl rounded-2xl overflow-hidden z-[60]"
            >
              <div className="flex items-center px-4 py-4 border-b border-zinc-800">
                <Search size={20} className="text-zinc-400 mr-3" />
                <input 
                  autoFocus
                  type="text" 
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for 'milk bills' or 'analyze this month'..."
                  className="flex-1 bg-transparent border-none outline-none text-zinc-100 text-lg placeholder:text-zinc-500"
                />
                <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full text-zinc-400">
                  <X size={18} />
                </Button>
              </div>

              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-zinc-500">SUGGESTIONS</div>
                <div className="flex flex-col gap-1">
                  <OmniRow icon={<Search size={16} />} text="What was my total profit last week?" action={() => alert("Forwarded to AI")} />
                  <OmniRow icon={<PlusCircle size={16} />} text="Record a new manual expense" action={() => alert("Open Entry Modal")} />
                  <OmniRow icon={<FileText size={16} />} text="Generate GST Report" action={() => alert("Generating CSV")} />
                  <OmniRow icon={<Settings size={16} />} text="Profile & Language Settings" action={() => window.location.href = '/profile'} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function OmniRow({ icon, text, action }: { icon: React.ReactNode, text: string, action: () => void }) {
  return (
    <button 
      onClick={action}
      className="flex items-center gap-3 w-full px-3 py-3 text-sm text-zinc-300 hover:text-white hover:bg-indigo-600/20 rounded-xl transition-colors text-left"
    >
      <div className="text-indigo-400">{icon}</div>
      {text}
    </button>
  );
}
