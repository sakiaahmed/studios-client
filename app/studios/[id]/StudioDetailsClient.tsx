"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { MapPin, Star, ShieldCheck, Users, CheckCircle, ArrowLeft, CalendarDays, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import BookingModal from "@/components/BookingModal"; // মডাল ইম্পোর্ট করা হলো

export default function StudioDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [studio, setStudio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // মডাল স্টেট

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`https://studio-server-xukt.onrender.com/api/studios/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setStudio(data);
        } else {
          toast.error("Studio not found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchStudio();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a]">
        <Loader2 className="w-12 h-12 text-brand animate-spin" />
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="text-center py-32 min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a]">
        <h2 className="font-display text-4xl uppercase tracking-widest text-zinc-900 dark:text-white mb-4">Studio Not Found</h2>
        <Link href="/studios" className="text-brand hover:underline font-bold uppercase tracking-wider">Back to Studios</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-zinc-50 dark:bg-[#0a0a0a] transition-colors min-h-screen">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 hover:text-brand mb-8 transition-colors font-display tracking-wider uppercase">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side - Images & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl overflow-hidden h-[400px] border border-zinc-200 dark:border-neutral-800">
            <img 
              src={studio.imageURL || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000"} 
              alt={studio.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-8 shadow-sm">
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white mb-4">{studio.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-zinc-600 dark:text-neutral-400 mb-8 border-b border-zinc-100 dark:border-neutral-800 pb-6">
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-brand" /> {studio.location}</span>
              <span className="bg-zinc-100 dark:bg-neutral-900 px-3 py-1 text-sm font-bold uppercase tracking-wider text-brand">{studio.category}</span>
            </div>

            <h2 className="font-display text-2xl uppercase tracking-wider text-zinc-900 dark:text-white mb-4">About this space</h2>
            <p className="text-zinc-600 dark:text-neutral-400 leading-relaxed mb-10">{studio.overview}</p>

            <h2 className="font-display text-2xl uppercase tracking-wider text-zinc-900 dark:text-white mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {studio.amenities?.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-zinc-700 dark:text-neutral-300 bg-zinc-50 dark:bg-neutral-900 p-3 border border-zinc-200 dark:border-neutral-800">
                  <CheckCircle className="w-5 h-5 text-brand" /> {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-8 sticky top-28 shadow-xl">
            <div className="flex items-end gap-2 mb-8 pb-6 border-b border-zinc-100 dark:border-neutral-800">
              <span className="text-5xl font-display text-brand">${studio.hourlyRate}</span>
              <span className="text-zinc-500 uppercase tracking-wider text-sm mb-1">/ hour</span>
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex items-center justify-between text-zinc-700 dark:text-neutral-300">
                <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-zinc-400" /> Security Deposit</span>
                <span className="font-bold">${studio.securityDeposit}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-700 dark:text-neutral-300">
                <span className="flex items-center gap-2"><Users className="w-5 h-5 text-zinc-400" /> Max Capacity</span>
                <span className="font-bold">{studio.maxCapacity} People</span>
              </div>
              <div className="flex items-center justify-between text-zinc-700 dark:text-neutral-300">
                <span className="flex items-center gap-2"><Star className="w-5 h-5 text-zinc-400" /> Hosted By</span>
                <span className="font-bold">{studio.ownerName}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                if (!session?.user) {
                  toast.error("Please login to book");
                  router.push('/login');
                } else {
                  setIsModalOpen(true); // মডাল ওপেন হবে
                }
              }}
              className="w-full bg-brand text-white font-display text-xl tracking-widest uppercase py-4 hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <CalendarDays className="w-5 h-5" /> Book Workspace Now
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4 uppercase tracking-wider">You won't be charged yet</p>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal 
          studio={studio} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            router.push('/my-bookings'); 
          }} 
        />
      )}
    </div>
  );
}