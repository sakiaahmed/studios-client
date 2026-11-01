"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Aperture, Mail, Lock, User, Image as ImageIcon, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUppercase && hasLowercase && hasLength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(formData.password)) {
      toast.error("Password must contain uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoURL || undefined,
      });

      if (error) throw new Error(error.message);

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 bg-zinc-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-zinc-200 shadow-xl">
        <div className="text-center mb-8">
          <Aperture className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-zinc-900">Create an Account</h1>
          <p className="text-zinc-500 mt-2">Join StudioSpace to book or host studios.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
              <input type="text" name="name" required onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
              <input type="email" name="email" required onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Photo URL (Optional)</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
              <input type="url" name="photoURL" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="https://example.com/photo.jpg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
              <input type="password" name="password" required onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-10 pr-4 py-2.5 text-zinc-900 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="••••••••" />
            </div>
            <p className="text-xs text-zinc-500 mt-1">Must have uppercase, lowercase, and min 6 chars.</p>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
            {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</> : "Register"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-zinc-500">Or continue with</span>
          </div>
        </div>

        <button onClick={handleGoogleLogin} type="button" className="w-full flex items-center justify-center gap-3 bg-white text-zinc-800 border border-zinc-300 font-semibold py-3 rounded-lg hover:bg-zinc-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-zinc-500 mt-6">
          Already have an account? <Link href="/login" className="text-indigo-600 hover:underline font-medium">Login here</Link>
        </p>
      </div>
    </div>
  );
}