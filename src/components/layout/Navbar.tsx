import { Menu, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import OmniSearch from "./OmniSearch";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b">
      <div className="flex items-center gap-2">
        <div className="bg-primary p-1 rounded-md">
          <Receipt className="text-primary-foreground h-4 w-4" />
        </div>
        <span className="font-bold text-lg tracking-tight">BharatFlow</span>
      </div>
      <div className="flex items-center gap-2">
        <OmniSearch />
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
