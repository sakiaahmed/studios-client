import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand flex items-center justify-center">
                <Aperture className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-display uppercase tracking-widest text-white">
                Studio<span className="text-brand">Space</span>
              </span>
            </div>
            <p className="text-neutral-400 text-lg max-w-md">
              The premier peer-to-peer marketplace connecting creators with high-end production spaces. Discover, book, and create.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-2xl tracking-widest text-white mb-6">Explore</h3>
              <ul className="space-y-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                <li><Link href="/studios" className="hover:text-brand transition-colors">All Studios</Link></li>
                <li><Link href="/how-it-works" className="hover:text-brand transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl tracking-widest text-white mb-6">Legal</h3>
              <ul className="space-y-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-display text-xl tracking-wider text-neutral-600">
            © 2026 STUDIO SPACE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-600 hover:text-brand transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a href="#" className="text-neutral-600 hover:text-brand transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}