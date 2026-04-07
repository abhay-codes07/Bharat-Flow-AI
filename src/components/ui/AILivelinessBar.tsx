"use client";

import { motion } from "framer-motion";

export default function AILivelinessBar({ isActive }: { isActive: boolean }) {
  if (!isActive) return <div className="h-1 w-full bg-transparent" />;

  return (
    <div className="h-1 w-full bg-zinc-900 overflow-hidden relative">
      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        style={{ width: "100%" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 mix-blend-screen"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
          delay: 0.2
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
