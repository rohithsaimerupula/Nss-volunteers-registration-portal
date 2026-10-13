"use client";

import React from "react";
import { Users, Sprout, BookOpen, HeartPulse, CalendarCheck, Laptop } from "lucide-react";

const activityCategories = [
  {
    number: "01",
    title: "Community Service",
    description: "Hands-on neighborhood engagement, village adoption initiatives, sanitation drives, and grassroots community support.",
    icon: Users,
  },
  {
    number: "02",
    title: "Environmental Initiatives",
    description: "Campus plantation campaigns, waste segregation drives, water conservation workshops, and eco-sustainability rallies.",
    icon: Sprout,
  },
  {
    number: "03",
    title: "Education and Outreach",
    description: "Foundational tutoring for underprivileged students, digital literacy programs, and career guidance sessions in local schools.",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Health Awareness",
    description: "Voluntary blood donation camps, preventive health check-ups, nutrition guidance, and seasonal hygiene advocacy.",
    icon: HeartPulse,
  },
  {
    number: "05",
    title: "Event Coordination",
    description: "Logistical management, ceremonial protocol, stage direction, and volunteer mobilization for institutional celebrations.",
    icon: CalendarCheck,
  },
  {
    number: "06",
    title: "Technology and Media",
    description: "Creative digital campaigns, documentation, photography, social outreach, and technology-assisted civic projects.",
    icon: Laptop,
  },
];

export function ActivitiesSection() {
  return (
    <section
      id="activities"
      className="py-20 md:py-28 bg-ivory border-b border-forest/10"
      aria-labelledby="activities-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-3">
            <span>SECTION 03</span>
            <span className="w-4 h-px bg-gold" aria-hidden="true" />
            <span>CORE PILLARS</span>
          </div>

          <h2
            id="activities-heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest mb-4 leading-tight"
          >
            Put Purpose Into Action.
          </h2>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
            As an NSS volunteer, your efforts translate directly into impactful community interventions. The following six domains represent the core activity categories volunteers engage with throughout the academic year.
          </p>
        </div>

        {/* Six Consistently Designed Items (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activityCategories.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="group p-7 sm:p-8 bg-white border border-forest/15 rounded-sm hover:border-forest/50 transition-colors shadow-2xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-forest/10">
                    <span className="font-mono text-xs font-bold text-gold tracking-widest">
                      DOMAIN {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-ivory border border-forest/15 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                      <IconComponent size={20} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-forest mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-charcoal/80 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-forest/5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-charcoal/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest/40" />
                  <span>General Activity Category</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification & Scope Disclaimer */}
        <div className="mt-10 p-4 bg-white/70 border border-forest/10 rounded-sm text-center">
          <p className="text-xs text-charcoal/70 italic">
            * Note: These descriptions outline general NSS focus areas at VIIT. Specific dates, village camps, and schedules will be confirmed through official coordination meetings post-recruitment.
          </p>
        </div>
      </div>
    </section>
  );
}
