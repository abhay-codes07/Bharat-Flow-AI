"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileType, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

interface BillScannerProps {
  onScanComplete: (data: Transaction) => void;
}

export default function BillScanner({ onScanComplete }: BillScannerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    
    setIsScanning(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        onScanComplete(data.extractedData);
      } else {
        alert("Found an issue during scan: " + (data.error || "Unknown"));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to scan the bill.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row gap-6">
        <div 
          className="flex-1 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview ? (
            <div className="relative w-full max-w-[200px] aspect-[3/4] rounded-lg overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Receipt preview" className="object-cover w-full h-full" />
            </div>
          ) : (
            <>
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Quick Upload</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Capture or upload an image of your receipt/invoice for AI scanning
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-col justify-end gap-3 min-w-[200px]">
           {file && (
             <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-sm border">
               <FileType className="h-5 w-5 text-blue-500" />
               <span className="truncate flex-1 font-medium">{file.name}</span>
             </div>
           )}
           <Button 
            size="lg" 
            className="w-full h-14 text-base font-semibold"
            disabled={!file || isScanning}
            onClick={handleScan}
           >
             {isScanning ? (
               <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>
             ) : (
               "Process with AI"
             )}
           </Button>
        </div>
      </div>
    </div>
  );
}
