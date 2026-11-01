import { Search, Clock, CalendarDays, Aperture } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    { icon: <Search className="w-8 h-8 text-brand" />, title: "1. Discover Spaces", desc: "Browse our curated list of premium studios." },
    { icon: <Clock className="w-8 h-8 text-brand" />, title: "2. Select Hours", desc: "Choose your preferred date and time slot." },
    { icon: <CalendarDays className="w-8 h-8 text-brand" />, title: "3. Book Instantly", desc: "Confirm your booking with our secure system." },
    { icon: <Aperture className="w-8 h-8 text-brand" />, title: "4. Create & Produce", desc: "Show up and bring your creative vision to life." },
  ];

  return (
    <div className="min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a] py-20 px-4 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
            How It <span className="text-brand">Works</span>
          </h1>
          <p className="text-zinc-600 dark:text-neutral-400 text-lg">
            Get your studio booked in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111111] p-8 border border-zinc-200 dark:border-neutral-800 text-center relative">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider text-zinc-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}