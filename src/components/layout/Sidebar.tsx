import Link from "next/link";
import { LayoutDashboard, Receipt, BarChart3, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 p-4">
      <div className="flex items-center gap-2 px-2 py-4 mb-6">
        <div className="bg-primary p-1.5 rounded-lg">
          <Receipt className="text-primary-foreground h-5 w-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">BharatFlow</span>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarLink href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <SidebarLink href="#" icon={<Receipt size={20} />} label="Invoices" />
        <SidebarLink href="#" icon={<BarChart3 size={20} />} label="Reports" />
        <SidebarLink href="#" icon={<Settings size={20} />} label="Settings" />
      </nav>

      <div className="mt-auto p-4 border rounded-xl bg-orange-50 dark:bg-orange-950/20 text-sm">
        <h4 className="font-semibold text-orange-800 dark:text-orange-400">Pro Plan Active</h4>
        <p className="text-orange-600/80 dark:text-orange-500/80 mt-1">You have 45 AI scans remaining.</p>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium ${
        active 
          ? "bg-indigo-500/10 text-indigo-400 shadow-inner border border-indigo-500/20" 
          : "text-muted-foreground hover:bg-zinc-900 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
