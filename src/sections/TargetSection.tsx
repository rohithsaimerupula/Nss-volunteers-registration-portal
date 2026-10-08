"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function TargetSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            Help Us Build a Strong Volunteer Team
          </h2>
          
          <div className="inline-flex flex-col items-center justify-center p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl">
            <span className="text-6xl md:text-8xl font-black tracking-tighter mb-2">
              {siteConfig.targetVolunteers}+
            </span>
            <span className="text-lg md:text-xl font-medium text-white/90 uppercase tracking-widest">
              Volunteer Opportunities
            </span>
          </div>
          
          {/* Real live count can be implemented here later */}
          {/* <p className="mt-6 text-white/80 font-medium">XX / {siteConfig.targetVolunteers} volunteers registered</p> */}
        </motion.div>
      </div>
    </section>
  );
}
