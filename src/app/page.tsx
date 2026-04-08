"use client";

import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950 p-6">
      
      {/* Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] -z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ repeat: Infinity, duration: 12, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[100px] -z-10"
      />

      <div className="z-10 text-center max-w-3xl">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 text-sm mb-6"
        >
          <Building2 size={14} className="text-indigo-400" />
          The ultimate CFO Agent for Indian MSMEs
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 tracking-tight leading-tight mb-6"
        >
          Elevate Your <br /> Business Flow.
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Automate GST reporting, forecast revenue using Gemini Flash, and converse directly with your autonomous ledger.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/sign-up" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900"
          >
            Start Free Trial <ArrowRight size={18} />
          </Link>
          <Link 
            href="/sign-in" 
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold rounded-full flex items-center justify-center transition-all"
          >
            Sign In to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
