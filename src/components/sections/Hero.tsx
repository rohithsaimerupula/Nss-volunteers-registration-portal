"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [capacityInfo, setCapacityInfo] = useState({ total: 100, applied: 0, remaining: 100 });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setCapacityInfo(data))
      .catch(console.error);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 p-3 px-6 rounded-full glass-effect shadow-sm border border-white/40 flex items-center gap-6 sm:gap-10 bg-white/40 backdrop-blur-md"
        >
          {/* Replace src with your official transparent PNGs */}
          <img src="/logos/viit-logo.svg" alt="Vignan's Institute of Information Technology" className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform" />
          
          <div className="w-[1px] h-10 bg-nss-primary/20"></div>
          
          <img src="/logos/nss-logo.svg" alt="NSS Logo" className="h-12 sm:h-14 w-auto object-contain hover:scale-105 transition-transform drop-shadow-sm" />
          
          <div className="w-[1px] h-10 bg-nss-primary/20"></div>
          
          <img src="/logos/mybharat-logo.svg" alt="MY Bharat Logo" className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-nss-dark tracking-tight mb-6"
        >
          NOT ME, <span className="text-gradient">BUT YOU</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-nss-muted font-medium max-w-2xl mb-4"
        >
          Volunteer for change. Serve the community. Grow as a leader.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-lg text-nss-text font-semibold mb-12"
        >
          Vignan's Institute of Information Technology<br />
          <span className="text-sm font-normal text-nss-muted">UG & PG Volunteer Registration</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/register"
            className="flex items-center justify-center gap-2 bg-nss-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-[0_8px_30px_rgb(26,60,41,0.3)] hover:shadow-[0_8px_30px_rgb(26,60,41,0.5)] hover:-translate-y-1 transition-all duration-300"
          >
            BECOME A VOLUNTEER
            <ArrowRight size={20} />
          </Link>
          <Link
            href="#about"
            className="flex items-center justify-center gap-2 bg-white text-nss-primary border border-nss-primary/20 px-8 py-4 rounded-full text-lg font-semibold shadow-sm hover:bg-nss-bg transition-all duration-300"
          >
            EXPLORE NSS
          </Link>
        </motion.div>

        {/* Live Registration Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-16 bg-white/60 backdrop-blur-md border border-white p-6 rounded-2xl shadow-lg max-w-sm w-full"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-nss-primary">
            <Users size={20} />
            <h3 className="font-bold tracking-wide uppercase text-sm">Volunteer Registration</h3>
          </div>
          <div className="text-4xl font-black text-nss-dark mb-1">
            {capacityInfo.total}
          </div>
          <div className="text-xs font-semibold text-nss-muted uppercase tracking-wider mb-4">
            Total Volunteer Capacity
          </div>
          
          <div className="w-full bg-nss-bg rounded-full h-2 mb-3 overflow-hidden">
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
