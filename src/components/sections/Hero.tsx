"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [capacityInfo, setCapacityInfo] = useState({ total: 100, applied: 0, remaining: 100 });
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setCapacityInfo(data))
      .catch(console.error);
      
    // Set flag when the opening sequence finishes so hover effects work properly
    const timer = setTimeout(() => setAnimationComplete(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center mt-12 md:mt-20">
        
        {/* THREE IDENTITIES LOGO SEQUENCE */}
        <div className="relative h-24 sm:h-32 mb-12 flex items-center justify-center w-full max-w-2xl">
          
          {/* Final Glassmorphic Container (Fades in around the logos when they merge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, width: "100px" }}
            animate={{ opacity: 1, scale: 1, width: "100%" }}
            transition={{ duration: 1.5, delay: 3.5, ease: "anticipate" }}
            className="absolute inset-0 mx-auto rounded-full glass-effect shadow-sm border border-white/40 bg-white/40 backdrop-blur-md z-0"
          />

          {/* Vertical Dividers */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "40px" }}
            transition={{ duration: 0.8, delay: 3.8, ease: "easeOut" }}
            className="absolute left-1/3 w-[1px] bg-nss-primary/20 z-10 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "40px" }}
            transition={{ duration: 0.8, delay: 3.8, ease: "easeOut" }}
            className="absolute right-1/3 w-[1px] bg-nss-primary/20 z-10 hidden sm:block"
          />

          {/* VIIT Logo */}
          <motion.div
            initial={{ opacity: 0, x: -150, y: -50, scale: 1.2 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ 
              opacity: { duration: 1.2, delay: 1.5 },
              x: { duration: 2, delay: 1.5, ease: "anticipate" },
              y: { duration: 2, delay: 1.5, ease: "anticipate" },
              scale: { duration: 2, delay: 1.5, ease: "easeInOut" }
            }}
            className="absolute sm:relative z-20 flex-1 flex justify-center sm:left-0 left-[-30%]"
          >
            <img src="/logos/viit-logo.png" alt="VIIT Logo" className={`h-12 sm:h-16 w-auto object-contain drop-shadow-md ${animationComplete ? 'hover:scale-105 transition-transform duration-300' : ''}`} />
          </motion.div>

          {/* NSS Logo (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 1.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              opacity: { duration: 1.5, delay: 0.2 },
              y: { duration: 2.5, delay: 0.2, ease: "anticipate" },
              scale: { duration: 2, delay: 2, ease: "easeInOut" }
            }}
            className="absolute sm:relative z-30 flex-1 flex justify-center"
          >
            <img src="/logos/nss-logo.png" alt="NSS Logo" className={`h-16 sm:h-20 w-auto object-contain drop-shadow-lg ${animationComplete ? 'hover:scale-105 transition-transform duration-300' : ''}`} />
          </motion.div>

          {/* MY Bharat Logo */}
          <motion.div
            initial={{ opacity: 0, x: 150, y: -50, scale: 1.2 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ 
              opacity: { duration: 1.2, delay: 2.2 },
              x: { duration: 2, delay: 2.2, ease: "anticipate" },
              y: { duration: 2, delay: 2.2, ease: "anticipate" },
              scale: { duration: 2, delay: 2.2, ease: "easeInOut" }
            }}
            className="absolute sm:relative z-20 flex-1 flex justify-center sm:right-0 right-[-30%]"
          >
            <img src="/logos/mybharat-logo.png" alt="MY Bharat Logo" className={`h-12 sm:h-16 w-auto object-contain drop-shadow-md ${animationComplete ? 'hover:scale-105 transition-transform duration-300' : ''}`} />
          </motion.div>

        </div>

        {/* TEXT CONTENT - Fades in after logos settle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5, ease: "easeOut" }}
          className="inline-block mb-4"
        >
          <span className="text-sm md:text-base font-bold tracking-[0.2em] text-nss-primary uppercase bg-nss-primary/5 px-4 py-1.5 rounded-full border border-nss-primary/10">
            NSS SETU
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 4.7, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-nss-dark tracking-tight mb-6 leading-tight"
        >
          NOT ME, <span className="text-gradient">BUT YOU</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5.0, ease: "easeOut" }}
          className="text-xl md:text-2xl text-nss-muted font-medium max-w-2xl mb-12"
        >
          Volunteer for change. Serve the community. Grow as a leader.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 5.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20"
        >
          <Link
            href="/register"
            className="flex items-center justify-center gap-3 bg-nss-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-[0_8px_30px_rgb(26,60,41,0.3)] hover:shadow-[0_12px_40px_rgb(26,60,41,0.5)] hover:-translate-y-1 transition-all duration-300"
          >
            BECOME A VOLUNTEER
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Live Registration Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 5.6, ease: "easeOut" }}
          className="mt-16 bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-lg max-w-sm w-full relative z-20"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-nss-primary">
            <Users size={20} />
            <h3 className="font-bold tracking-wide uppercase text-sm">Volunteer Capacity</h3>
          </div>
          <div className="text-4xl font-black text-nss-dark mb-1">
            {capacityInfo.total}
          </div>
          
          <div className="w-full bg-gray-200/50 rounded-full h-2 mt-4 mb-3 overflow-hidden">
            <div 
              className="bg-nss-primary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(capacityInfo.applied / capacityInfo.total) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm font-medium">
            <span className="text-nss-muted">{capacityInfo.applied} Applications</span>
            <span className="text-nss-primary font-bold">{capacityInfo.remaining} Remaining</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
