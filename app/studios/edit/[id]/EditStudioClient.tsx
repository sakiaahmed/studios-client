"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { Aperture, DollarSign, MapPin, Users, ShieldCheck, Loader2, Upload, CheckCircle } from "lucide-react";

export default function EditStudioClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
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

  // ডাটা ফেচ করা
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(`https://studio-server-xukt.onrender.com/api/studios/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            category: data.category,
            hourlyRate: data.hourlyRate.toString(),
            securityDeposit: data.securityDeposit.toString(),
            maxCapacity: data.maxCapacity.toString(),
            location: data.location,
            imageURL: data.imageURL || "",
            amenities: data.amenities?.join(", ") || "",
            overview: data.overview,
          });
        }
      } catch (error) {
        toast.error("Failed to load studio data");
      } finally {
        setIsFetching(false);
      }
    };
    if (id) fetchStudio();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, imageURL: result.data.url }));
        toast.success("Image updated!");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setIsSubmitting(true);
    const studioData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: formData.amenities.split(",").map(item => item.trim()).filter(item => item !== ""),
    };

    try {
      const res = await fetch(`https://studio-server-xukt.onrender.com/api/studios/${id}?email=${session.user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Studio updated successfully!");
      router.push("/my-listings"); 
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
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
          Update <span className="text-brand">Studio</span>
        </h1>
        <p className="text-zinc-500 dark:text-neutral-400 mt-2">Modify your creative space details.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-neutral-800 p-8 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Studio Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors">
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Art Workshop">Art Workshop</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Hourly Rate ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="number" name="hourlyRate" required value={formData.hourlyRate} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Security Deposit ($)</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="number" name="securityDeposit" required value={formData.securityDeposit} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Max Capacity</label>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="number" name="maxCapacity" required value={formData.maxCapacity} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Update Image (Optional)</label>
          <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-zinc-300 dark:border-neutral-700 hover:border-brand px-6 py-4 w-full transition-colors">
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-brand" /> : <Upload className="w-5 h-5 text-zinc-500" />}
            <span className="text-zinc-600 dark:text-neutral-400 font-medium">{isUploading ? "Uploading..." : "Click to upload new image"}</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
          </label>
          {formData.imageURL && (
             <div className="mt-2 flex items-center gap-2 text-sm text-green-500 font-bold"><CheckCircle className="w-4 h-4"/> Image ready</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Amenities (Comma separated)</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 mb-2">Detailed Overview</label>
          <textarea name="overview" required rows={5} value={formData.overview} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-neutral-900 border border-zinc-300 dark:border-neutral-700 px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-brand transition-colors"></textarea>
        </div>

        <button type="submit" disabled={isSubmitting || isUploading} className="w-full bg-brand text-white font-display text-xl tracking-widest uppercase py-4 hover:bg-red-600 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
          {isSubmitting ? <><Loader2 className="w-6 h-6 animate-spin" /> Updating...</> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}