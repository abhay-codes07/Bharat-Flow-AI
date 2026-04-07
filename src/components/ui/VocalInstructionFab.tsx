"use client";

import { Mic } from "lucide-react";
import { Button } from "./button";

export default function VocalInstructionFab() {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
      <div className="relative group">
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping blur-sm"></div>
        <Button 
          size="icon" 
          className="relative h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-transform hover:scale-105 border-4 border-background"
          onClick={() => alert("Vocal Instructions coming soon! Say 'Upload my last receipt'")}
        >
          <Mic className="h-6 w-6 text-white" />
        </Button>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white text-xs whitespace-nowrap rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Try Voice Commands
        </div>
      </div>
    </div>
  );
}
