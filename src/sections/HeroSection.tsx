"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";

// Dynamically import the 3D scene to avoid SSR issues and improve initial load
const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then(mod => mod.HeroScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-background/50" />
});

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Background */}
      <HeroScene />
      
      {/* Gradient overlays to blend 3D with background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/50 to-background pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse" />
          Official NSS Recruitment Campaign
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 mb-6 max-w-5xl leading-[1.1]"
        >
          {siteConfig.brand.primaryTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-12 font-medium"
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
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(22,163,74,0.4)] flex items-center justify-center gap-2"
          >
            BECOME A VOLUNTEER
            <ChevronRight size={20} />
          </Link>
          
          <Link
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground font-semibold text-lg hover:bg-surface hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            EXPLORE NSS
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
