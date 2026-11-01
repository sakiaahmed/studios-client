import { Aperture, ShieldCheck, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a] py-20 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Aperture className="w-16 h-16 text-brand mx-auto mb-6" />
          <h1 className="font-display text-5xl md:text-6xl uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
            About <span className="text-brand">StudioSpace</span>
          </h1>
          <p className="text-zinc-600 dark:text-neutral-400 text-lg">
            The premier peer-to-peer marketplace connecting creators with high-end production spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 text-center">
            <ShieldCheck className="w-10 h-10 text-brand mx-auto mb-4" />
            <h3 className="font-display text-xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">Trusted Platform</h3>
            <p className="text-zinc-500 text-sm">Every host and creator goes through a verification process.</p>
          </div>
          <div className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 text-center">
            <Users className="w-10 h-10 text-brand mx-auto mb-4" />
            <h3 className="font-display text-xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">Community First</h3>
            <p className="text-zinc-500 text-sm">Built by creators, for creators. We understand your needs.</p>
          </div>
          <div className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 text-center">
            <Globe className="w-10 h-10 text-brand mx-auto mb-4" />
            <h3 className="font-display text-xl uppercase tracking-wider text-zinc-900 dark:text-white mb-2">Nationwide</h3>
            <p className="text-zinc-500 text-sm">Find premium spaces in all major cities across the country.</p>
          </div>
        </div>
      </div>
    </div>
  );
}