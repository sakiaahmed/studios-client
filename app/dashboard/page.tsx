import Link from "next/link";
import { PlusSquare, List, CalendarDays } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a] py-20 px-4 transition-colors">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">
          User <span className="text-brand">Dashboard</span>
        </h1>
        <p className="text-zinc-500 dark:text-neutral-400 mb-12">Manage your studios and bookings from one place.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/add-studio" className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 hover:border-brand transition-colors group">
            <PlusSquare className="w-10 h-10 text-brand mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-2xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">Add Studio</h2>
            <p className="text-zinc-500 text-sm">List a new creative space and start earning.</p>
          </Link>
          <Link href="/my-listings" className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 hover:border-brand transition-colors group">
            <List className="w-10 h-10 text-brand mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-2xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">My Listings</h2>
            <p className="text-zinc-500 text-sm">View, update, or delete your listed studios.</p>
          </Link>
          <Link href="/my-bookings" className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 hover:border-brand transition-colors group">
            <CalendarDays className="w-10 h-10 text-brand mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-2xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">My Bookings</h2>
            <p className="text-zinc-500 text-sm">Track and manage your upcoming studio sessions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}