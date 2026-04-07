"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Loader2, PlaySquare } from "lucide-react";
import { Button } from "./button";

export default function MagicMic() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize SpeechRecognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          stopListening();
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            // It stopped automatically, maybe end of speech
            processAudio();
          }
        };
      }
    }
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      processAudio();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert("Voice recognition is not supported in this browser. Try Chrome/Edge.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processAudio = async () => {
    stopListening();
    if (!transcript.trim()) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript })
      });
      const data = await response.json();
      
      console.log("Agent Response:", data);
      alert(`Intent: ${data.intent}\nPayload: ${JSON.stringify(data.payload, null, 2)}`);
      setTranscript("");

    } catch (error) {
      console.error("Error connecting to agent", error);
      alert("Failed to reach Chief of Staff.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4">
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800 text-sm max-w-[250px] shadow-lg"
          >
            <span className="text-zinc-200">"{transcript || "Listening..."}"</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {isListening && (
          <motion.div 
            animate={{ scale: [1, 1.4, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 bg-rose-500/40 rounded-full blur-md"
          />
        )}
        
        <Button 
          size="icon" 
          onClick={toggleListening}
          disabled={isProcessing}
          className={`relative h-14 w-14 rounded-full shadow-2xl transition-all duration-300 border-2 ${
            isListening 
              ? 'bg-rose-500 hover:bg-rose-600 border-rose-400 text-white' 
              : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300'
          }`}
        >
          {isProcessing ? (
             <Loader2 className="h-6 w-6 animate-spin" />
          ) : isListening ? (
             <PlaySquare className="h-6 w-6" />
          ) : (
             <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
}
