"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroSlider() {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070",
      title: "CINEMATIC",
      highlight: "SOUND STAGES",
      subtitle: "Industry-standard audio and lighting for your next production.",
    },
    {
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2070",
      title: "ULTIMATE",
      highlight: "PHOTO SPACES",
      subtitle: "Professional cyc walls and softboxes ready for your next shoot.",
    },
    {
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070",
      title: "ACOUSTIC",
      highlight: "PODCAST LOUNGES",
      subtitle: "Fully treated rooms to record crystal clear audio without echo.",
    },
  ];

  // যদি ব্রাউজারে লোড না হয়, তবে একটি ফাঁকা প্লেসহোল্ডার দেখাবে (এরর দেবে না)
  if (!isMounted) {
    return (
      <section className="relative w-full bg-zinc-50 dark:bg-[#0a0a0a] py-16 lg:py-0 min-h-[85vh]">
        <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center h-full">
          <div className="h-[400px] w-full bg-zinc-200 dark:bg-neutral-900 animate-pulse rounded-2xl"></div>
          <div className="h-[500px] w-full bg-zinc-200 dark:bg-neutral-900 animate-pulse rounded-2xl hidden lg:block"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-300 py-16 lg:py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh]">
        
        {/* Left Side - Fixed Typography */}
        <div className="flex flex-col items-start z-10 py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand/30 bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-brand animate-pulse"></span>
            Premium Studio Marketplace
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl lg:text-[7rem] uppercase leading-[0.85] text-zinc-900 dark:text-white mb-6 transition-colors">
            BOOK THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-600">
              IMPOSSIBLE
            </span>
          </h1>
          
          <p className="text-zinc-600 dark:text-neutral-400 text-lg max-w-md mb-10 transition-colors">
            Discover and reserve the most exclusive creative workspaces, photography sets, and sound stages in the country.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/studios"
              className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-display text-xl tracking-widest uppercase px-8 py-4 hover:bg-brand dark:hover:bg-brand hover:text-white dark:hover:text-white transition-all w-full sm:w-auto group"
            >
              Explore Spaces
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link
              href="/add-studio"
              className="flex items-center justify-center bg-transparent border-2 border-zinc-300 dark:border-neutral-800 text-zinc-900 dark:text-white font-display text-xl tracking-widest uppercase px-8 py-4 hover:border-brand dark:hover:border-brand hover:text-brand transition-all w-full sm:w-auto"
            >
              List Your Space
            </Link>
          </div>
        </div>

        {/* Right Side - The Slider */}
        <div className="relative h-[500px] lg:h-[650px] w-full hidden lg:block">
          <div className="absolute -inset-4 bg-brand/10 dark:bg-brand/5 blur-3xl rounded-full"></div>
          
          <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-neutral-800 z-10 bg-zinc-100 dark:bg-neutral-900">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="h-full w-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-10 left-8 right-8">
                      <h3 className="font-display text-4xl text-white uppercase tracking-wider mb-2">
                        {slide.title} <span className="text-brand">{slide.highlight}</span>
                      </h3>
                      <p className="text-neutral-300 text-sm">{slide.subtitle}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>
    </section>
  );
}