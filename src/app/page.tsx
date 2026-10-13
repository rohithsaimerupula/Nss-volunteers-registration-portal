"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NssIntroAnimation } from "@/components/layout/NssIntroAnimation";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { ActivitiesSection } from "@/sections/ActivitiesSection";
import { WhyJoinSection } from "@/sections/WhyJoinSection";
import { TargetSection } from "@/sections/TargetSection";
import { RegistrationSection } from "@/sections/RegistrationSection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Super Impressive Full-Screen NSS Logo Cinematic Intro */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <NssIntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Campaign Website */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{
          opacity: showIntro ? 0 : 1,
          filter: showIntro ? "blur(6px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={showIntro ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        {/* SECTION B — HERO */}
        <HeroSection />

        {/* SECTION C — ABOUT NSS */}
        <AboutSection />

        {/* SECTION D — ACTIVITIES */}
        <ActivitiesSection />

        {/* SECTION E — WHY JOIN */}
        <WhyJoinSection />

        {/* SECTION F — VOLUNTEER TARGET */}
        <TargetSection />

        {/* SECTION G — REGISTRATION */}
        <RegistrationSection />
      </motion.div>
    </>
  );
}
