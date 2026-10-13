"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Award, HandHeart } from "lucide-react";

const benefits = [
  {
    numeral: "I",
    title: "Develop leadership and teamwork.",
    tagline: "Character under responsibility",
    description:
      "Step into real-world leadership outside academic theory. Organising civic campaigns, coordinating peer cohorts, and steering on-ground initiatives instills emotional intelligence, decisive problem solving, and collaborative accountability that distinguish you throughout your professional career.",
    icon: Compass,
  },
  {
    numeral: "II",
    title: "Learn through practical community engagement.",
    tagline: "Experiential education beyond the classroom",
    description:
      "Gain direct exposure to social realities across neighboring rural and urban communities. Working alongside grassroots stakeholders sharpens your situational awareness, cultural perspective, and ability to build pragmatic solutions with limited resources.",
    icon: Award,
  },
  {
    numeral: "III",
    title: "Contribute to meaningful social initiatives.",
    tagline: "Tangible, lasting community impact",
    description:
      "Transform goodwill into systematic public welfare. Whether restoring local green cover, mobilizing vital blood donations, or educating first-generation learners, your service creates lasting, measurable benefits for society while cementing a lifelong commitment to national progress.",
    icon: HandHeart,
  },
];

export function WhyJoinSection() {
  return (
    <section
      id="why-join"
      className="py-20 md:py-28 bg-white border-b border-forest/10"
      aria-labelledby="why-join-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-3">
            <span>SECTION 04</span>
            <span className="w-4 h-px bg-gold" aria-hidden="true" />
            <span>VALUE &amp; GROWTH</span>
          </div>

          <h2
            id="why-join-heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest mb-4 leading-tight"
          >
            Grow Through Service.
          </h2>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
            Volunteering with the National Service Scheme is an investment in your personal character and ethical leadership. Here are the three pillars of student growth.
          </p>
        </div>

        {/* Editorial Layout: Distinct Split/Row Structure (Not a repetitive grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Manifesto Column (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="p-8 bg-ivory border border-forest/15 rounded-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold block mb-3">
                THE VOLUNTEER PLEDGE
              </span>
              <blockquote className="font-editorial text-xl sm:text-2xl text-forest font-bold leading-snug mb-6">
                &ldquo;He who serves his fellows is of all the greatest.&rdquo;
              </blockquote>
              <p className="text-xs text-charcoal/75 leading-relaxed mb-6">
                Joining NSS is not simply adding an extracurricular credential; it is a conscious commitment to national progress, selfless brotherhood, and responsible citizenship.
              </p>
              <div className="pt-6 border-t border-forest/10">
                <Link
                  href="#register"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-forest-light transition-colors"
                >
                  <span>Step forward today</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sequential Benefits Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-forest/15">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.numeral} className="py-8 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Roman Numeral Accent */}
                    <div className="shrink-0 w-12 h-12 bg-ivory border border-forest/15 flex items-center justify-center font-editorial font-bold text-forest text-lg">
                      {benefit.numeral}
                    </div>

                    <div className="flex-1">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-gold font-semibold mb-1">
                        {benefit.tagline}
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-forest mb-3">
                        {benefit.title}
                      </h3>

                      <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
