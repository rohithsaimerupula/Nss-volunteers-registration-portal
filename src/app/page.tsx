"use client";

import { useState } from "react";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { WhyJoinSection } from "@/sections/WhyJoinSection";
import { ActivitiesSection } from "@/sections/ActivitiesSection";
import { CampaignSection } from "@/sections/CampaignSection";
import { TargetSection } from "@/sections/TargetSection";
import { RegistrationSection } from "@/sections/RegistrationSection";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { motion } from "framer-motion";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={showSplash ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        <HeroSection />
        <AboutSection />
        <WhyJoinSection />
        <ActivitiesSection />
        <CampaignSection />
        <TargetSection />
        <RegistrationSection />
      </motion.div>
    </>
  );
}
