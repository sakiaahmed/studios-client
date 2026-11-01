import { Suspense } from "react";
import HeroSlider from "@/components/HeroSlider";
import StudioCard from "@/components/StudioCard";
import { Camera, Mic, Music, Palette, Film, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";


async function FeaturedStudios() {
  let featuredStudios = [];
  try {
    const res = await fetch("https://studio-server-xukt.onrender.com/api/studios?limit=4", { cache: "no-store" });
    if (res.ok) {
      featuredStudios = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch featured studios");
  }

  if (featuredStudios.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-neutral-800 text-zinc-500">
        No studios listed yet. Be the first to add one!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {featuredStudios.map((studio: any) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

// মেইন হোম পেজ
export default function Home() {
  const categories = [
    { name: "Photography", icon: <Camera className="w-6 h-6" />, slug: "Photo Studio", count: 12 },
    { name: "Film Stage", icon: <Film className="w-6 h-6" />, slug: "Film Stage", count: 8 },
    { name: "Podcast", icon: <Mic className="w-6 h-6" />, slug: "Podcast Lounge", count: 15 },
    { name: "Music", icon: <Music className="w-6 h-6" />, slug: "Music Suite", count: 10 },
    { name: "Workshops", icon: <Palette className="w-6 h-6" />, slug: "Art Workshop", count: 6 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] transition-colors">
      <HeroSlider />

      {/* Browse by Category */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-zinc-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-display text-5xl md:text-6xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">
              Browse <span className="text-brand">Sectors</span>
            </h2>
            <p className="text-zinc-600 dark:text-neutral-400">
              Select a category to find your specialized workspace.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-neutral-800 border border-zinc-200 dark:border-neutral-800">
          {categories.map((cat, idx) => (
            <Link 
              href={`/studios?category=${encodeURIComponent(cat.slug)}`} 
              key={idx} 
              className="group bg-white dark:bg-[#111111] hover:bg-zinc-900 dark:hover:bg-white transition-colors duration-300 p-8 flex flex-col items-start relative overflow-hidden"
            >
              <div className="text-zinc-400 dark:text-neutral-500 group-hover:text-brand mb-12 transition-colors">
                {cat.icon}
              </div>
              <h3 className="font-display text-2xl tracking-wider uppercase text-zinc-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-sm text-zinc-500 group-hover:text-neutral-400 dark:group-hover:text-neutral-600 transition-colors">
                {cat.count} Spaces
              </p>
              <ArrowRight className="absolute bottom-8 right-8 w-5 h-5 text-zinc-300 dark:text-neutral-700 group-hover:text-brand group-hover:translate-x-2 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Studios - WITH SUSPENSE */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">
              Handpicked <span className="text-brand">Spaces</span>
            </h2>
            <p className="text-zinc-600 dark:text-neutral-400">
              The best production studios available right now.
            </p>
          </div>
          <Link href="/studios" className="hidden md:flex items-center gap-2 font-display text-xl tracking-wider text-brand hover:text-zinc-900 dark:hover:text-white transition-colors">
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        { }
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
          </div>
        }>
          <FeaturedStudios />
        </Suspense>
        
        <Link href="/studios" className="md:hidden flex justify-center items-center gap-2 mt-8 font-display text-xl tracking-wider text-brand">
          View All Studios <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}