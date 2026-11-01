"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StudioCard from "@/components/StudioCard";
import { Aperture, Loader2 } from "lucide-react";
import Link from "next/link";

function StudiosContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [studios, setStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        let url = "https://studio-server-xukt.onrender.com/api/studios";
        if (categoryParam) {
          url += `?category=${encodeURIComponent(categoryParam)}`;
        }
        
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        setStudios(data);
      } catch (error) {
        console.error("Failed to fetch studios", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudios();
  }, [categoryParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl md:text-7xl uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
          {categoryParam ? `${categoryParam} ` : "Explore "}
          <span className="text-brand">Spaces</span>
        </h1>
        <p className="text-zinc-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Find the perfect studio for your next project. From photo studios to film stages, we have it all.
        </p>
        {categoryParam && (
          <Link href="/studios" className="inline-block mt-4 text-brand hover:text-red-600 font-display text-lg tracking-wider uppercase">
            Clear Filter
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand animate-spin mb-4" />
          <p className="text-zinc-500 dark:text-neutral-500 font-display text-xl tracking-wider uppercase">Loading Studios...</p>
        </div>
      ) : studios.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="font-display text-3xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">No Studios Found</h2>
          <p className="text-zinc-600 dark:text-neutral-400 mb-8">There are no studios listed here yet.</p>
          <Link href="/add-studio" className="bg-brand text-white font-display text-xl tracking-widest uppercase px-8 py-3 hover:bg-red-600 transition-colors">
            Add Your Studio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio: any) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreStudiosPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-brand animate-spin" /></div>}>
      <StudiosContent />
    </Suspense>
  );
}