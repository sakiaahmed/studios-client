"use client";

import Link from "next/link";
import { Camera, Menu, X, LayoutDashboard, PlusSquare, List, CalendarDays, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
import { toast } from "sonner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/studios" },
    { name: "Process", href: "/how-it-works" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo - Option 2 (Cinema Projector) */}
        <Link href="/" className="flex items-center gap-3 group">
          <Camera className="w-9 h-9 text-brand group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
          <span className="text-2xl font-display uppercase tracking-[0.2em] text-zinc-900 dark:text-white mt-1">
            Studio<span className="text-brand">Space</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-display text-lg tracking-widest uppercase transition-colors relative ${
                pathname === link.href ? "text-brand" : "text-zinc-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 focus:outline-none">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-9 h-9 border border-zinc-300 dark:border-neutral-700 object-cover" />
                ) : (
                  <div className="w-9 h-9 bg-zinc-200 dark:bg-neutral-800 border border-zinc-300 dark:border-neutral-700 text-zinc-900 dark:text-white flex items-center justify-center font-display text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-display text-lg uppercase tracking-wider text-zinc-900 dark:text-white mt-1">{user.name.split(' ')[0]}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-60 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-neutral-800 shadow-2xl py-2 flex flex-col">
                  <div className="px-5 py-3 border-b border-zinc-200 dark:border-neutral-800 mb-2">
                    <p className="text-zinc-900 dark:text-white font-display text-xl uppercase tracking-wider truncate">{user.name}</p>
                    <p className="text-zinc-500 text-xs truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm text-zinc-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-neutral-900 flex items-center gap-3 uppercase tracking-wider font-semibold transition-colors"><LayoutDashboard className="w-4 h-4 text-brand" /> Dashboard</Link>
                  <Link href="/add-studio" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm text-zinc-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-neutral-900 flex items-center gap-3 uppercase tracking-wider font-semibold transition-colors"><PlusSquare className="w-4 h-4 text-brand" /> Add Studio</Link>
                  <Link href="/my-listings" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm text-zinc-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-neutral-900 flex items-center gap-3 uppercase tracking-wider font-semibold transition-colors"><List className="w-4 h-4 text-brand" /> My Listings</Link>
                  <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="px-5 py-3 text-sm text-zinc-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-neutral-900 flex items-center gap-3 uppercase tracking-wider font-semibold transition-colors"><CalendarDays className="w-4 h-4 text-brand" /> My Bookings</Link>
                  <div className="border-t border-zinc-200 dark:border-neutral-800 mt-2 pt-2">
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-zinc-100 dark:hover:bg-neutral-900 flex items-center gap-3 uppercase tracking-wider font-semibold transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="font-display text-lg tracking-widest uppercase text-zinc-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="bg-brand text-white px-6 py-2 font-display text-lg tracking-widest uppercase hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900 dark:text-white">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-neutral-800 px-4 pt-2 pb-6 space-y-4">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="block font-display text-xl uppercase tracking-widest text-zinc-600 dark:text-neutral-400 hover:text-brand">
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-zinc-200 dark:border-neutral-800 flex flex-col gap-4">
            {user ? (
              <>
                <Link href="/add-studio" className="block font-display text-xl uppercase tracking-widest text-zinc-900 dark:text-white">Add Studio</Link>
                <Link href="/my-bookings" className="block font-display text-xl uppercase tracking-widest text-zinc-900 dark:text-white">My Bookings</Link>
                <button onClick={handleLogout} className="block text-left font-display text-xl uppercase tracking-widest text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-center py-3 border border-zinc-300 dark:border-neutral-800 font-display text-xl uppercase tracking-widest text-zinc-900 dark:text-white">Login</Link>
                <Link href="/register" className="block text-center py-3 bg-brand font-display text-xl uppercase tracking-widest text-white">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}