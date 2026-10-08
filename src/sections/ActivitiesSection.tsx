"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sprout, Users, HeartPulse, GraduationCap, Tent, Trash2, Droplets, Flame, Megaphone } from "lucide-react";

const activities = [
  { icon: <Users size={24} />, title: "Community Service", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { icon: <Sprout size={24} />, title: "Environmental Activities", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  { icon: <Megaphone size={24} />, title: "Awareness Campaigns", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { icon: <Droplets size={24} />, title: "Blood Donation Drives", color: "bg-red-500/10 text-red-500 border-red-500/20" },
  { icon: <Trash2 size={24} />, title: "Cleanliness Drives", color: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
  { icon: <HeartPulse size={24} />, title: "Social Outreach", color: "bg-pink-500/10 text-pink-500 border-pink-500/20" },
  { icon: <GraduationCap size={24} />, title: "Educational Support", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  { icon: <Tent size={24} />, title: "Disaster/Relief Support", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  { icon: <Flame size={24} />, title: "Health & Awareness", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
];

export function ActivitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="activities" className="py-24 relative overflow-hidden bg-surface/30" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Volunteer Activities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            As a volunteer, you will have the opportunity to participate in various initiatives. Here are general areas where our volunteers contribute:
          </motion.p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <motion.div 
          style={{ x }}
          className="flex gap-6 px-4 md:px-6 w-max"
        >
          {activities.map((activity, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 px-6 py-4 rounded-full border ${activity.color} backdrop-blur-sm shadow-sm whitespace-nowrap`}
            >
              <div className="shrink-0">
                {activity.icon}
              </div>
              <span className="font-semibold text-lg text-foreground">
                {activity.title}
              </span>
            </div>
          ))}
          {/* Duplicate for infinite scroll feel */}
          {activities.map((activity, index) => (
            <div 
              key={`dup-${index}`}
              className={`flex items-center gap-4 px-6 py-4 rounded-full border ${activity.color} backdrop-blur-sm shadow-sm whitespace-nowrap`}
            >
              <div className="shrink-0">
                {activity.icon}
              </div>
              <span className="font-semibold text-lg text-foreground">
                {activity.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
