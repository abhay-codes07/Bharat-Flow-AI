import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MagicMic from "@/components/ui/MagicMic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bharat-Flow AI",
  description: "AI-first platform for Indian MSMEs to manage their business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground flex min-h-screen`}>
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-64 border-r bg-muted/20">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 pb-16 md:pb-0">
          {/* Top Navbar for mobile */}
          <div className="md:hidden">
            <Navbar />
          </div>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full relative">
            {children}
            {/* Floating Action Button */}
            <MagicMic />
          </main>
        </div>
      </body>
    </html>
  );
}
