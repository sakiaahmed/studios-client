import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

interface StudioCardProps {
  studio: {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    location: string;
    imageURL: string;
    rating?: number;
  };
}

export default function StudioCard({ studio }: StudioCardProps) {
  return (
    <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 flex flex-col sm:flex-row group hover:border-brand/60 transition-all duration-300">
      {/* Image - Left Side */}
      <div className="relative w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden shrink-0">
        <img 
          src={studio.imageURL} 
          alt={studio.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      </div>

      {/* Content - Right Side */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-brand text-xs font-bold uppercase tracking-[0.2em]">{studio.category}</span>
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-neutral-900 px-2 py-1 text-zinc-900 dark:text-white text-xs font-bold">
              <Star className="w-3.5 h-3.5 text-brand fill-brand" />
              {studio.rating || "New"}
            </div>
          </div>
          
          <h3 className="text-2xl font-display uppercase tracking-wider text-zinc-900 dark:text-white mb-2 group-hover:text-brand transition-colors">
            {studio.title}
          </h3>
          
          <div className="flex items-center gap-2 text-zinc-500 text-sm mb-6">
            <MapPin className="w-4 h-4 text-brand" />
            <span className="line-clamp-1">{studio.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-neutral-800">
          <div>
            <span className="text-3xl font-display text-zinc-900 dark:text-white">${studio.hourlyRate}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-widest ml-1">/ Hour</span>
          </div>
          
          <Link 
            href={`/studios/${studio._id}`}
            className="w-10 h-10 bg-zinc-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-brand transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-zinc-900 dark:text-white group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}