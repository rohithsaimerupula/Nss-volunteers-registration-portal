"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then(mod => mod.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-surface" />
});

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Gradient overlays to blend 3D with background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/80 to-white pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <span className="flex w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          Official NSS Recruitment Campaign
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-6 max-w-5xl leading-[1.1]"
        >
          Be the Change. <br/><span className="text-primary">Serve the Nation.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 font-medium leading-relaxed"
        >
          {siteConfig.brand.subTitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(21,128,61,0.3)] flex items-center justify-center gap-2"
          >
            BECOME A VOLUNTEER
            <ChevronRight size={20} />
          </Link>
          
          <Link
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            EXPLORE NSS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
