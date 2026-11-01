"use client";

import { useState } from "react";
import { X, CalendarDays, Clock, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

interface BookingModalProps {
  studio: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({ studio, onClose, onSuccess }: BookingModalProps) {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours > 0 ? hours * studio.hourlyRate : 0;
  };

  const totalPrice = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      toast.error("End time must be after start time.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://studio-server-xukt.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId: studio._id,
          userEmail: session?.user?.email,
          userName: session?.user?.name,
          date,
          startTime,
          endTime,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Booking Requested Successfully!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="font-display text-3xl uppercase tracking-widest text-zinc-900 dark:text-white mb-2">Book Studio</h2>
          <p className="text-zinc-500 text-sm mb-8">{studio.title}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Select Date</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                <input type="date" required min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                  <input type="time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                  <input type="time" required value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-neutral-900 p-5 border border-zinc-200 dark:border-neutral-800">
              <div className="flex justify-between text-zinc-600 dark:text-neutral-400 mb-2">
                <span>Hourly Rate</span>
                <span>${studio.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between text-zinc-900 dark:text-white font-display text-2xl pt-3 border-t border-zinc-200 dark:border-neutral-800">
                <span>Total Price</span>
                <span className="text-brand">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-xs mt-2 uppercase tracking-wider">
                <span>+ Security Deposit</span>
                <span>${studio.securityDeposit}</span>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-brand text-white font-display text-xl tracking-widest uppercase py-4 hover:bg-red-600 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
               <ShieldCheck className="w-5 h-5"/> {isLoading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}