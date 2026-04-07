"use client";

import { useState } from "react";
import { Lock, Mail, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      alert("MVP Mock Mode: Authentication simulated. Proceeding to dashboard.");
      window.location.href = "/";
      return;
    }
    
    // Real Supabase Auth
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) alert("Error login: " + error.message);
    else window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <motion.div 
          animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.3 : 0.1 }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500 rounded-full blur-3xl transition-all duration-700"
        ></motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="h-16 w-16 bg-zinc-800 rounded-2xl flex items-center justify-center shadow-lg border border-zinc-700 mb-6">
            <Store className="h-8 w-8 text-indigo-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Bharat-Flow AI</h1>
          <p className="text-zinc-400 text-sm mb-8 text-center">Secure entry to your financial command center.</p>

          <form onSubmit={handleLogin} className="w-full space-y-4" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 font-semibold px-1 uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-zinc-200" 
                  placeholder="shopkeeper@bharat.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 font-semibold px-1 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-zinc-200" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl mt-4">
              Enter Dashboard
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
