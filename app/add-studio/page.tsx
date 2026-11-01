"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { Aperture, Image as ImageIcon, DollarSign, MapPin, Users, ShieldCheck, Loader2, Upload, CheckCircle } from "lucide-react";

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studio",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageURL: "",
    amenities: "",
    overview: "",
  });

 
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please login to add a studio");
      router.push("/login");
    }
  }, [user, isPending, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (data.success) {
        setFormData((prev) => ({ ...prev, imageURL: data.data.url }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.imageURL) {
      toast.error("Please upload an image first");
      return;
    }

    setIsSubmitting(true);

    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: formData.amenities.split(",").map(item => item.trim()).filter(item => item !== ""),
      ownerEmail: user.email,
      ownerName: user.name,
    };

    try {
      const res = await fetch("https://studio-server-xukt.onrender.com/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add studio");

      toast.success("Studio added successfully!");
      router.push("/my-listings"); 
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a]">
        <Loader2 className="w-12 h-12 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="text-center mb-12">
        <Aperture className="w-12 h-12 text-brand mx-auto mb-4" />
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest text-zinc-900 dark:text-white">
          List Your <span className="text-brand">Studio</span>
        </h1>
        <p className="text-zinc-500 dark:text-neutral-400 mt-2">Share your creative space with the world.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-8 shadow-xl space-y-8">
        
        {/* Read Only User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-50 dark:bg-neutral-900 border border-zinc-200 dark:border-neutral-800">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Host Name (Read Only)</label>
            <input type="text" value={user?.name || ""} readOnly className="w-full bg-transparent text-zinc-900 dark:text-white font-display text-xl uppercase tracking-wider mt-1 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Host Email (Read Only)</label>
            <input type="text" value={user?.email || ""} readOnly className="w-full bg-transparent text-zinc-900 dark:text-white font-display text-xl uppercase tracking-wider mt-1 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Studio Title</label>
            <input type="text" name="title" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="e.g., Ultimate Photo Studio" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Category</label>
            <select name="category" onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors">
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Art Workshop">Art Workshop</option>
            </select>
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Hourly Rate ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="number" name="hourlyRate" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="50" />
            </div>
          </div>

          {/* Security Deposit */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Security Deposit ($)</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="number" name="securityDeposit" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="100" />
            </div>
          </div>

          {/* Max Capacity */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Max Capacity</label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="number" name="maxCapacity" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="10" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Location/Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="text" name="location" required onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="Dhaka, Bangladesh" />
            </div>
          </div>
        </div>

        {/* Image Upload (ImgBB) */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Studio Image</label>
          <div className="flex items-center gap-4">
            <label className={`flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed px-6 py-4 w-full transition-colors ${isUploading ? 'border-brand bg-brand/10' : 'border-zinc-300 dark:border-neutral-700 hover:border-brand'}`}>
              {isUploading ? (
                <><Loader2 className="w-5 h-5 animate-spin text-brand" /> <span className="text-brand font-bold">Uploading...</span></>
              ) : (
                <><Upload className="w-5 h-5 text-zinc-500" /> <span className="text-zinc-600 dark:text-neutral-400 font-medium">Upload Image (Max 5MB)</span></>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
            </label>
          </div>
          {formData.imageURL && (
            <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-500 text-sm font-bold">
              <CheckCircle className="w-4 h-4" /> Image uploaded successfully!
            </div>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Amenities (Comma separated)</label>
          <input type="text" name="amenities" onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="WiFi, Lighting, AC, Green Screen" />
        </div>

        {/* Detailed Overview */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Detailed Overview</label>
          <textarea name="overview" required rows={5} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" placeholder="Describe your studio space..."></textarea>
        </div>

        <button type="submit" disabled={isSubmitting || isUploading} className="w-full bg-brand text-white font-display text-xl tracking-widest uppercase py-4 hover:bg-red-600 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
          {isSubmitting ? <><Loader2 className="w-6 h-6 animate-spin" /> Saving...</> : "Publish Studio Listing"}
        </button>
      </form>
    </div>
  );
}