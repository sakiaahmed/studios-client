"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarDays, Clock, MapPin, XCircle, X, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const userEmail = session?.user?.email;

  const fetchBookings = async () => {
    if (!userEmail) return;

    try {
      const res = await fetch(`https://studio-server-xukt.onrender.com/api/bookings/my-bookings?email=${userEmail}`, {
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      if (!userEmail) {
        window.location.href = "/login";
      } else {
        fetchBookings();
      }
    }
  }, [isPending, userEmail]);

  const confirmCancel = async () => {
    if (!cancelId || !userEmail) return;
    setIsCancelling(true);

    try {
      const res = await fetch(`https://studio-server-xukt.onrender.com/api/bookings/${cancelId}/cancel?email=${userEmail}`, {
        method: "PATCH",
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Booking cancelled successfully");
      fetchBookings(); 
      setCancelId(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'Completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/30';
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
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white">
          My <span className="text-brand">Bookings</span>
        </h1>
        <p className="text-zinc-500 dark:text-neutral-400 mt-2">Manage your upcoming studio sessions.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800">
          <CalendarDays className="w-16 h-16 text-zinc-300 dark:text-neutral-700 mx-auto mb-4" />
          <h2 className="font-display text-3xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">No Bookings Yet</h2>
          <p className="text-zinc-500 dark:text-neutral-400 mb-8">You haven't booked any studios yet.</p>
          <Link href="/studios" className="bg-brand text-white font-display text-xl tracking-widest uppercase px-8 py-3 hover:bg-red-600 transition-colors">
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-neutral-900 flex items-center justify-center">
                    <CalendarDays className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-wider text-zinc-900 dark:text-white">{booking.date}</h3>
                    <p className="text-sm text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 border text-xs font-bold uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="mb-6 flex-1">
                <p className="text-zinc-600 dark:text-neutral-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand" /> Total Price: <span className="text-brand font-bold text-lg">${booking.totalPrice}</span>
                </p>
              </div>

              {booking.status === 'Pending' && (
                <button 
                  onClick={() => setCancelId(booking._id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 py-3 hover:bg-red-500 hover:text-white transition-colors font-display tracking-widest uppercase text-sm"
                >
                  <XCircle className="w-4 h-4" /> Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Cancel Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setCancelId(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <X className="w-6 h-6"/>
            </button>
            <h3 className="font-display text-3xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">Cancel Booking?</h3>
            <p className="text-zinc-500 dark:text-neutral-400 mb-8">Are you sure you want to cancel this booking? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setCancelId(null)} className="flex-1 py-3 border border-zinc-300 dark:border-neutral-700 text-zinc-700 dark:text-neutral-300 hover:bg-zinc-100 dark:hover:bg-neutral-900 font-display tracking-wider uppercase">
                Keep It
              </button>
              <button onClick={confirmCancel} disabled={isCancelling} className="flex-1 py-3 bg-brand text-white hover:bg-red-600 font-display tracking-wider uppercase disabled:opacity-50">
                {isCancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}