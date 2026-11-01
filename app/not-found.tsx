import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-zinc-50 dark:bg-[#0a0a0a] text-center">
      <Ghost className="w-32 h-32 text-brand mb-8 animate-bounce" />
      <h1 className="font-display text-6xl md:text-8xl uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
        404
      </h1>
      <h2 className="font-display text-3xl uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-4">
        Page Not Found
      </h2>
      <p className="text-zinc-500 dark:text-neutral-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="flex items-center gap-2 bg-brand text-white font-display text-xl tracking-widest uppercase px-8 py-4 hover:bg-red-600 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Return to Home
      </Link>
    </div>
  );
}