"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export function TriadCenterpiece() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdentity, setActiveIdentity] = useState<"viit" | "nss" | "mybharat" | null>(null);

  // 3D Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveIdentity(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] mx-auto select-none perspective-[1200px]"
    >
      {/* 3D Tilting Monument Frame */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative bg-gradient-to-b from-white via-white/95 to-ivory border-2 border-forest/20 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(26,60,41,0.15)] backdrop-blur-md overflow-hidden transition-shadow duration-500 hover:shadow-[0_25px_70px_-15px_rgba(198,166,107,0.3)]"
      >
        {/* Dynamic Specular Lighting Layer */}
        <motion.div
          style={{
            background: `radial-gradient(circle at 50% 40%, rgba(198,166,107,0.18) 0%, transparent 70%)`,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Architectural Grid & Corner Notches */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gold" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold" />

        {/* Top Header Tag */}
        <div className="flex items-center justify-between pb-4 border-b border-forest/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-forest font-bold">
              THE SETU TRIAD OF SERVICE
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-gold uppercase font-bold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
            <Sparkles size={10} />
            <span>2026 Drive</span>
          </div>
        </div>

        {/* Sacred Triad Composition */}
        <div className="relative h-64 sm:h-72 w-full flex items-center justify-center my-2">
          {/* Animated Connecting SVG Bridge Arcs ("SETU") */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 280"
            fill="none"
          >
            {/* Bridge Arc from VIIT (left) to NSS (center) */}
            <path
              d="M 90 90 Q 150 180 200 130"
              stroke="#C6A66B"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            {/* Bridge Arc from NSS (center) to MY BHARAT (right) */}
            <path
              d="M 200 130 Q 250 180 310 90"
              stroke="#C6A66B"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            {/* Direct Horizontal Connecting Baseline */}
            <path
              d="M 90 90 C 150 20 250 20 310 90"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeOpacity="0.5"
            />

            {/* Glowing Flowing Energy Pulse (Left to Center) */}
            <motion.circle
              r="4"
              fill="#C6A66B"
              filter="drop-shadow(0 0 6px #C6A66B)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                offsetPath: "path('M 90 90 Q 150 180 200 130')",
              }}
            />
            {/* Glowing Flowing Energy Pulse (Center to Right) */}
            <motion.circle
              r="4"
              fill="#C6A66B"
              filter="drop-shadow(0 0 6px #C6A66B)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              style={{
                offsetPath: "path('M 200 130 Q 250 180 310 90')",
              }}
            />

            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A3C29" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C6A66B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1A3C29" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* SATELLITE 1: VIIT (Top Left) */}
          <motion.div
            style={{ transform: "translateZ(35px)" }}
            onMouseEnter={() => setActiveIdentity("viit")}
            className="absolute left-4 sm:left-6 top-6 flex flex-col items-center cursor-pointer group"
          >
            <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 aspect-square shrink-0 rounded-full p-1 bg-white border-2 border-forest/30 shadow-md group-hover:border-forest group-hover:shadow-xl transition-all duration-300">
              {/* Outer Pulse Ring */}
              <div className="absolute -inset-1 rounded-full border border-forest/20 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-1">
                <Image
                  src="/viit-logo.png"
                  alt="VIIT Official Logo"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="block text-[11px] font-bold text-forest tracking-tight font-mono">
                VIIT
              </span>
              <span className="block text-[9px] text-charcoal/60 font-sans">
                Host College
              </span>
            </div>
          </motion.div>

          {/* SATELLITE 2: MY BHARAT (Top Right) */}
          <motion.div
            style={{ transform: "translateZ(35px)" }}
            onMouseEnter={() => setActiveIdentity("mybharat")}
            className="absolute right-4 sm:right-6 top-6 flex flex-col items-center cursor-pointer group"
          >
            <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 aspect-square shrink-0 rounded-full p-1 bg-white border-2 border-gold/40 shadow-md group-hover:border-gold group-hover:shadow-xl transition-all duration-300">
              {/* Outer Pulse Ring */}
              <div className="absolute -inset-1 rounded-full border border-gold/25 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-1">
                <Image
                  src="/mybharat-logo.png"
                  alt="MY BHARAT Official Logo"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="block text-[11px] font-bold text-forest tracking-tight font-mono">
                MY BHARAT
              </span>
              <span className="block text-[9px] text-charcoal/60 font-sans">
                National Platform
              </span>
            </div>
          </motion.div>

          {/* CENTRAL EMBLEM: NSS KONARK SUN WHEEL (Center Bottom) */}
          <motion.div
            style={{ transform: "translateZ(60px)" }}
            onMouseEnter={() => setActiveIdentity("nss")}
            className="absolute bottom-2 sm:bottom-4 flex flex-col items-center cursor-pointer group"
          >
            {/* Spinning Konark Spoke Ring */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 aspect-square shrink-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-gold/60"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-forest/20"
              />

              {/* Main Official NSS Emblem in Gold Casing */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 aspect-square shrink-0 rounded-full overflow-hidden bg-white border-3 border-gold shadow-[0_10px_30px_rgba(198,166,107,0.4)] p-1 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/nss-logo.png"
                  alt="NSS Official Emblem"
                  fill
                  className="object-contain"
                  sizes="120px"
                  priority
                />
                {/* Specular Light Sweep */}
                <motion.div
                  initial={{ x: "-150%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none"
                />
              </div>
            </div>

            <div className="mt-2 text-center">
              <span className="inline-block px-2.5 py-0.5 bg-forest text-gold text-[10px] font-mono font-bold uppercase tracking-widest rounded-full shadow-xs">
                NSS Konark Core
              </span>
              <span className="block text-[10px] text-forest font-semibold mt-0.5">
                National Service Scheme
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Context Inspection Card */}
        <div className="min-h-[72px] mt-4 p-3 bg-ivory/80 border border-forest/15 rounded-md relative transition-all duration-300">
          {activeIdentity === "viit" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-forest mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-forest">Vignan&apos;s Institute of Information Technology</h4>
                <p className="text-[11px] text-charcoal/80 leading-snug">
                  Autonomous institution accredited NAAC &apos;A+&apos;. Providing educational leadership and infrastructure for student civic engagement.
                </p>
              </div>
            </motion.div>
          )}

          {activeIdentity === "nss" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-forest">National Service Scheme (NSS)</h4>
                <p className="text-[11px] text-charcoal/80 leading-snug">
                  Youth movement under the Ministry of Youth Affairs and Sports, Govt. of India. Guiding principle: <span className="font-semibold text-gold-dark">&quot;Not Me But You&quot;</span>.
                </p>
              </div>
            </motion.div>
          )}

          {activeIdentity === "mybharat" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-orange-600 mt-1.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-forest">Mera Yuva Bharat (MY BHARAT)</h4>
                <p className="text-[11px] text-charcoal/80 leading-snug">
                  Autonomous national platform empowering youth with experiential learning, volunteerism, and nation-building initiatives.
                </p>
              </div>
            </motion.div>
          )}

          {!activeIdentity && (
            <div className="flex items-center justify-between text-charcoal/70 text-[11px] py-1">
              <span className="font-mono text-[10px] uppercase text-forest font-semibold">
                Hover any emblem to explore partnership role
              </span>
              <span className="text-[10px] text-gold font-mono">&quot;NOT ME BUT YOU&quot;</span>
            </div>
          )}
        </div>

        {/* Institutional Specs Table */}
        <div className="mt-4 pt-3 border-t border-forest/10 grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="p-2 bg-white/70 rounded border border-forest/10">
            <span className="block text-[9px] text-charcoal/60 uppercase">Host</span>
            <span className="font-bold text-forest text-[11px]">VIIT (Auto)</span>
          </div>
          <div className="p-2 bg-white/70 rounded border border-forest/10">
            <span className="block text-[9px] text-charcoal/60 uppercase">Goal</span>
            <span className="font-bold text-gold text-[11px]">100 Recruits</span>
          </div>
          <div className="p-2 bg-white/70 rounded border border-forest/10">
            <span className="block text-[9px] text-charcoal/60 uppercase">Cell</span>
            <span className="font-bold text-forest text-[11px]">JNTUK / NSS</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
