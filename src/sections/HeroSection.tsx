"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { TriadCenterpiece } from "@/components/interactive/TriadCenterpiece";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-forest/10 overflow-hidden bg-ivory"
      aria-labelledby="hero-heading"
    >
      {/* Decorative Gold Top Rule */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-forest via-gold to-forest opacity-80" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-forest/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Gold Light Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "25%", size: 4, delay: 0 },
          { x: "75%", y: "15%", size: 6, delay: 1.2 },
          { x: "85%", y: "65%", size: 3, delay: 2.4 },
          { x: "35%", y: "80%", size: 5, delay: 0.8 },
          { x: "50%", y: "45%", size: 4, delay: 1.8 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["0px", "-20px", "0px"],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: pt.delay,
              ease: "easeInOut",
            }}
            style={{
              left: pt.x,
              top: pt.y,
              width: pt.size,
              height: pt.size,
            }}
            className="absolute rounded-full bg-gold shadow-[0_0_8px_#C6A66B]"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline, Actions & The SETU Bridge Concept (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Grand Triple Identity Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3.5 px-3.5 py-1.5 bg-white border border-forest/20 text-forest text-xs font-semibold rounded-full mb-6 shadow-sm hover:border-gold transition-colors"
            >
              {/* Overlapping Triple Medallions */}
              <div className="flex items-center -space-x-1.5">
                <div className="relative w-5 h-5 aspect-square shrink-0 rounded-full overflow-hidden border border-forest/20 bg-white z-30 shadow-2xs">
                  <Image src="/viit-logo.png" alt="VIIT Logo" fill className="object-contain p-0.5" sizes="20px" />
                </div>
                <div className="relative w-6 h-6 aspect-square shrink-0 rounded-full overflow-hidden border-2 border-gold bg-white z-20 shadow-xs">
                  <Image src="/nss-logo.png" alt="NSS Logo" fill className="object-contain p-0.5" sizes="24px" />
                </div>
                <div className="relative w-5 h-5 aspect-square shrink-0 rounded-full overflow-hidden border border-forest/20 bg-white z-10 shadow-2xs">
                  <Image src="/mybharat-logo.png" alt="MY BHARAT Logo" fill className="object-contain p-0.5" sizes="20px" />
                </div>
              </div>

              <span className="font-mono text-[11px] uppercase tracking-wider text-forest font-bold">
                VIIT &bull; NSS &bull; MY BHARAT
              </span>

              <span className="h-3.5 w-px bg-forest/20" />

              <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">
                2026 DRIVE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-forest leading-[1.08] mb-6"
            >
              Be the Change. <br />
              <span className="text-forest-dark italic font-normal">Serve the Nation.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-charcoal/85 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Step forward, work together, and make a meaningful difference in your community. Join up to 100 dedicated student leaders shaping the future.
            </motion.p>

            {/* The SETU Interactive Bridge Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full p-4 sm:p-5 bg-white/95 border-2 border-forest/15 rounded-xl mb-8 shadow-sm backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest via-gold to-forest" />

              <div className="flex items-center justify-between mb-3.5">
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-charcoal/80 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-forest" />
                  <span>THREE IDENTITIES &bull; ONE MISSION</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-gold uppercase font-bold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                  <Sparkles size={11} />
                  <span>Not Me But You</span>
                </div>
              </div>

              {/* 3 Connected Identity Badges with Connecting Bridge Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
                {/* 1. VIIT */}
                <div className="p-3 bg-ivory/70 border border-forest/15 rounded-lg hover:border-forest/40 hover:bg-white transition-all shadow-3xs group flex flex-col justify-between">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="relative w-8 h-8 aspect-square shrink-0 rounded-full overflow-hidden bg-white border border-forest/20 shadow-2xs p-0.5 group-hover:scale-105 transition-transform">
                      <Image src="/viit-logo.png" alt="VIIT Logo" fill className="object-contain" sizes="32px" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest tracking-tight">VIIT</span>
                      <span className="block text-[9px] font-mono text-charcoal/60 uppercase">Host College</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-charcoal/70 leading-snug">
                    Vignan&apos;s Institute of Information Technology (Autonomous &bull; NAAC &apos;A+&apos;)
                  </p>
                </div>

                {/* 2. NSS */}
                <div className="p-3 bg-ivory/70 border-2 border-gold/40 rounded-lg hover:border-gold hover:bg-white transition-all shadow-3xs group flex flex-col justify-between relative">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="relative w-9 h-9 aspect-square shrink-0 rounded-full overflow-hidden bg-white border-2 border-gold shadow-2xs p-0.5 group-hover:scale-105 transition-transform">
                      <Image src="/nss-logo.png" alt="NSS Logo" fill className="object-contain" sizes="36px" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest tracking-tight group-hover:text-gold transition-colors">NSS</span>
                      <span className="block text-[9px] font-mono text-gold-dark font-semibold uppercase">Youth Movement</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-charcoal/70 leading-snug">
                    National Service Scheme &bull; Ministry of Youth Affairs &amp; Sports
                  </p>
                </div>

                {/* 3. MY BHARAT */}
                <div className="p-3 bg-ivory/70 border border-forest/15 rounded-lg hover:border-forest/40 hover:bg-white transition-all shadow-3xs group flex flex-col justify-between">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="relative w-8 h-8 aspect-square shrink-0 rounded-full overflow-hidden bg-white border border-forest/20 shadow-2xs p-0.5 group-hover:scale-105 transition-transform">
                      <Image src="/mybharat-logo.png" alt="MY BHARAT Logo" fill className="object-contain" sizes="32px" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-forest tracking-tight">MY BHARAT</span>
                      <span className="block text-[9px] font-mono text-charcoal/60 uppercase">Govt. Platform</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-charcoal/70 leading-snug">
                    Mera Yuva Bharat &bull; Experiential learning &amp; Yuva Shakti
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-forest/10 flex items-center justify-between text-xs text-charcoal/75">
                <p className="text-[11px] leading-relaxed">
                  The <span className="font-semibold text-forest font-editorial">SETU</span> initiative links academic excellence at VIIT with national civic empowerment.
                </p>
                <span className="font-mono text-[10px] text-gold uppercase font-bold hidden md:inline shrink-0 ml-4">
                  Autonomous &bull; State Cell
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="#register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-white hover:bg-forest-light text-xs font-bold uppercase tracking-widest border border-forest transition-all shadow-md active:translate-y-px hover:shadow-lg group"
              >
                <span>BECOME A VOLUNTEER</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </Link>

              <Link
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest hover:bg-ivory text-xs font-bold uppercase tracking-widest border-2 border-forest/30 transition-all active:translate-y-px hover:border-forest"
              >
                <span>DISCOVER NSS</span>
                <ArrowDown size={14} aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Credibility Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-forest/10 flex flex-wrap items-center gap-6 text-xs text-charcoal/70 font-mono"
            >
              <div>
                <span className="font-bold text-forest">Target:</span> 100 Selected Recruits
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div>
                <span className="font-bold text-forest">Eligibility:</span> UG &amp; PG Students
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div>
                <span className="font-bold text-forest">Status:</span> Recruitment Open
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Interactive SETU Triad Centerpiece (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center w-full"
          >
            <TriadCenterpiece />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
