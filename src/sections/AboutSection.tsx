"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white border-b border-forest/10"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-4">
              <span>SECTION 02</span>
              <span className="w-4 h-px bg-gold" aria-hidden="true" />
              <span>INSTITUTIONAL PURPOSE</span>
            </div>

            <h2
              id="about-heading"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest mb-8 leading-tight"
            >
              Service Beyond Yourself.
            </h2>

            <div className="space-y-5 text-charcoal/85 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                The National Service Scheme (NSS) is a flagship public service movement designed to channel student leadership directly into community welfare and grassroots development.
              </p>
              <p>
                Through sustained civic participation, volunteers develop personal responsibility and empathy, bridging academic learning with real social challenges faced by local communities.
              </p>
              <p>
                Participation builds practical teamwork, ethical character, and organizational capability through literacy outreach, environmental conservation, and public health awareness drives.
              </p>
              <p className="text-forest font-medium pt-2 border-l-2 border-forest pl-4 italic">
                At Vignan&apos;s Institute of Information Technology, the volunteer drive invites students to embody the foundational NSS motto: &ldquo;NOT ME BUT YOU.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: One Relevant Institutional Visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-8 sm:p-10 bg-ivory border border-forest/20 shadow-sm relative">
              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gold" />

              <div className="flex flex-col items-center text-center">
                {/* Official NSS Logo with Rotating Konark Gold Ring Halo */}
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-gold/40 animate-spin [animation-duration:18s]" />
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-forest/30 -animate-spin [animation-duration:24s]" />
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-sm border-2 border-gold/60 bg-white">
                    <Image
                      src="/nss-logo.png"
                      alt="National Service Scheme Official Emblem"
                      fill
                      className="object-contain p-0.5"
                      sizes="64px"
                    />
                  </div>
                </div>

                <div className="font-editorial text-xl font-bold text-forest tracking-wider uppercase mb-1">
                  National Service Scheme
                </div>

                <div className="text-xs uppercase font-semibold tracking-widest text-gold mb-6">
                  Not Me But You
                </div>

                <div className="w-full h-px bg-forest/15 my-2" />

                <div className="mt-4 space-y-3 text-xs text-charcoal/80 text-left w-full">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                    <span><strong>NSS Cell:</strong> Vignan&apos;s Institute of Information Technology</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                    <span><strong>Affiliation:</strong> JNTUK / State NSS Cell, AP</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                    <span><strong>Partner Initiative:</strong> Mera Yuva Bharat (MY BHARAT)</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-forest/10 w-full flex items-center justify-between text-[11px] font-mono text-charcoal/60">
                  <span>CAMPAIGN RECRUITMENT</span>
                  <span className="text-forest font-semibold">COHORT 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
