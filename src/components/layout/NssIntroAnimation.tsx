"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface NssIntroAnimationProps {
  onComplete: () => void;
}

export function NssIntroAnimation({ onComplete }: NssIntroAnimationProps) {
  const [stage, setStage] = useState<"enter" | "reveal" | "motto" | "exit">("enter");

  useEffect(() => {
    // Stage 1: Initial Wheel & Ring draw (0 - 800ms)
    const t1 = setTimeout(() => {
      setStage("reveal");
    }, 800);

    // Stage 2: Typography & Motto reveal (800ms - 2200ms)
    const t2 = setTimeout(() => {
      setStage("motto");
    }, 1800);

    // Stage 3: Transition into the website (3200ms)
    const t3 = setTimeout(() => {
      setStage("exit");
      setTimeout(onComplete, 750); // allow exit animation to complete
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage("exit");
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          key="nss-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest text-ivory overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,107,0.18)_0%,transparent_65%)] pointer-events-none" />

          {/* Geometric Background Lattice */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C6A66B_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          {/* Skip Intro Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-ivory/80 hover:text-white text-xs font-mono uppercase tracking-widest border border-white/15 backdrop-blur-md rounded-xs transition-all active:scale-95"
            >
              <span>Skip Intro</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Central Animated Composition */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-lg text-center">
            {/* Konark Chariot Sun Wheel Halo & NSS Logo */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-6">
              {/* Outer Rotating Spoke Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-gold/40"
              />

              {/* Counter-Rotating Sun Halo Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-gold/25"
              />

              {/* Pulsing Outer Radiance Ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-6 rounded-full border border-gold/20"
              />

              {/* SVG Glowing Stroke Drawing Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#C6A66B"
                  strokeWidth="1.5"
                  strokeDasharray="301.6"
                  initial={{ strokeDashoffset: 301.6 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>

              {/* Official NSS Logo Container with 3D Depth Entrance */}
              <motion.div
                initial={{ scale: 0.6, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.45)] border-2 border-gold/80 bg-white"
              >
                <Image
                  src="/nss-logo.png"
                  alt="National Service Scheme Official Logo"
                  fill
                  className="object-contain p-1"
                  sizes="160px"
                  priority
                />

                {/* Shimmer Light Reflection Sweep across Logo */}
                <motion.div
                  initial={{ x: "-150%", opacity: 0 }}
                  animate={{ x: "200%", opacity: [0, 0.6, 0] }}
                  transition={{ duration: 1.6, delay: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Typography Unveil */}
            <div className="flex flex-col items-center">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-gold font-bold mb-2"
              >
                NATIONAL SERVICE SCHEME
              </motion.div>

              {/* Devnagari Title */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="font-editorial text-2xl sm:text-3xl font-bold tracking-wide text-ivory mb-2"
              >
                राष्ट्रीय सेवा योजना
              </motion.h2>

              {/* Sacred Motto */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 my-1.5 bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.3em]"
              >
                NOT ME BUT YOU
              </motion.div>

              {/* Three Official Identities Lockup (VIIT + NSS + MY BHARAT) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 px-4 py-2 rounded-full bg-black/25 border border-gold/30 backdrop-blur-md flex items-center gap-3"
              >
                {/* VIIT */}
                <div className="flex items-center gap-1.5">
                  <div className="relative w-5 h-5 aspect-square rounded-full overflow-hidden bg-white shrink-0 p-0.5">
                    <Image src="/viit-logo.png" alt="VIIT Logo" fill className="object-contain" sizes="20px" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-bold text-white">VIIT</span>
                </div>

                <span className="text-gold/50 text-xs">&bull;</span>

                {/* NSS */}
                <div className="flex items-center gap-1.5">
                  <div className="relative w-5 h-5 aspect-square rounded-full overflow-hidden bg-white shrink-0 p-0.5">
                    <Image src="/nss-logo.png" alt="NSS Logo" fill className="object-contain" sizes="20px" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-bold text-gold">NSS</span>
                </div>

                <span className="text-gold/50 text-xs">&bull;</span>

                {/* MY BHARAT */}
                <div className="flex items-center gap-1.5">
                  <div className="relative w-5 h-5 aspect-square rounded-full overflow-hidden bg-white shrink-0 p-0.5">
                    <Image src="/mybharat-logo.png" alt="MY BHARAT Logo" fill className="object-contain" sizes="20px" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-bold text-white">MY BHARAT</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-ivory/60 mt-3"
              >
                THREE IDENTITIES &bull; ONE MISSION
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
