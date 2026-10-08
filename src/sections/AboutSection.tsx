"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-surface/30">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">About NSS</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-8 text-foreground">Service Before Self</h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-lg prose-invert mx-auto text-foreground/80"
          >
            <p className="text-xl leading-relaxed mb-6">
              The National Service Scheme (NSS) provides students with opportunities to contribute to society through community service, awareness activities, volunteering, and social initiatives.
            </p>
            <p className="text-lg leading-relaxed">
              At Vignan's Institute of Information Technology, our NSS unit is committed to building a bridge between the campus and the community. By joining, you become part of a dedicated team working towards meaningful social impact while developing your own leadership and organizational skills.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
