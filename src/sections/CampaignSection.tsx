"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const timeline = [
  { day: "01", title: "Orientation" },
  { day: "02", title: "Team Formation" },
  { day: "03", title: "Community Activity" },
  { day: "04", title: "Awareness" },
  { day: "05", title: "Service" },
  { day: "06", title: "Outreach" },
  { day: "07", title: "Collaboration" },
  { day: "08", title: "Impact Activity" },
  { day: "09", title: "Reflection" },
  { day: "10", title: "Closing / Recognition" },
];

export function CampaignSection() {
  return (
    <section className="py-24 relative bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/20 blur-[80px] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-black mb-12 relative z-10 text-foreground">
            Your {siteConfig.campaignDurationDays} Days Can Create a Difference
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 relative z-10 text-left">
            {timeline.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-2"
              >
                <div className="text-primary font-mono font-bold text-lg">
                  DAY {item.day}
                </div>
                <div className="h-0.5 w-full bg-white/10 relative">
                  <div className="absolute top-0 left-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-500" />
                  {/* Small dot */}
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="text-sm font-medium text-foreground/80 mt-2">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground/60 italic relative z-10 text-center">
            * Note: This is an example timeline. Actual schedule will be provided post-registration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
