"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Aperture, Edit, Trash2, MapPin, X, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function MyListingsPage() {
  const { data: session, isPending } = useSession();
  const [studios, setStudios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const userEmail = session?.user?.email;

  const fetchMyStudios = async () => {
    if (!userEmail) return;

    try {
      const res = await fetch(`https://studio-server-xukt.onrender.com/api/studios/my-listings?email=${userEmail}`, {
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        setStudios(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      if (!userEmail) {
        window.location.href = "/login";
      } else {
        fetchMyStudios();
      }
    }
  }, [isPending, userEmail]);

  const confirmDelete = async () => {
    if (!deleteId || !userEmail) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`https://studio-server-xukt.onrender.com/api/studios/${deleteId}?email=${userEmail}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Studio deleted successfully!");
      setStudios(studios.filter((s) => s._id !== deleteId));
      setDeleteId(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a]">
        <Loader2 className="w-12 h-12 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a] transition-colors relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white">
            My Studio <span className="text-brand">Listings</span>
          </h1>
          <p className="text-zinc-500 dark:text-neutral-400 mt-2">Manage your listed spaces.</p>
        </div>
        <Link href="/add-studio" className="bg-brand text-white font-display text-lg tracking-widest uppercase px-6 py-3 hover:bg-red-600 transition-colors w-full md:w-auto text-center">
          + Add New Studio
        </Link>
      </div>

      {studios.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800">
          <h2 className="font-display text-3xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">No Studios Found</h2>
          <p className="text-zinc-500 dark:text-neutral-400">You haven't added any studios yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => (
            <div key={studio._id} className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 flex flex-col group">
              <div className="h-56 relative overflow-hidden">
                <img 
  src={studio.imageURL || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000"} 
  alt={studio.title} 
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
/>
                <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 border border-neutral-700">{studio.category}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-display uppercase tracking-wider text-zinc-900 dark:text-white mb-2">{studio.title}</h3>
                <p className="text-zinc-500 text-sm flex items-center gap-2 mb-6"><MapPin className="w-4 h-4 text-brand"/> {studio.location}</p>
                
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-neutral-800 flex gap-3">
                  <Link href={`/studios/edit/${studio._id}`} className="flex-1 flex justify-center items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-zinc-900 dark:text-white py-2.5 transition-colors font-display tracking-wider uppercase text-sm">
                    <Edit className="w-4 h-4" /> Update
                  </Link>
                  <button onClick={() => setDeleteId(studio._id)} className="flex-1 flex justify-center items-center gap-2 bg-red-500/10 hover:bg-brand text-brand hover:text-white py-2.5 transition-colors font-display tracking-wider uppercase text-sm">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setDeleteId(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <X className="w-6 h-6"/>
            </button>
            <h3 className="font-display text-3xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">Delete Studio?</h3>
            <p className="text-zinc-500 dark:text-neutral-400 mb-8">Are you sure you want to delete this listing? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 border border-zinc-300 dark:border-neutral-700 text-zinc-700 dark:text-neutral-300 hover:bg-zinc-100 dark:hover:bg-neutral-900 font-display tracking-wider uppercase">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 py-3 bg-brand text-white hover:bg-red-600 font-display tracking-wider uppercase disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}