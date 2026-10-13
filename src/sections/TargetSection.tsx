"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Target, Users } from "lucide-react";

interface StatsData {
  connected: boolean;
  count: number | null;
  target: number;
}

export function TargetSection() {
  const [stats, setStats] = useState<StatsData>({
    connected: false,
    count: null,
    target: 100,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const response = await fetch("/api/stats", {
          cache: "no-store",
        });
        if (response.ok) {
          const data: StatsData = await response.json();
          if (isMounted) {
            setStats(data);
          }
        }
      } catch (err) {
        console.warn("Could not retrieve live database count", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const count = stats.count ?? 0;
  const target = stats.target || 100;
  const percentage = Math.min(100, Math.round((count / target) * 100));

  return (
    <section
      className="py-20 md:py-28 bg-forest text-white border-b border-forest-light relative overflow-hidden"
      aria-labelledby="target-heading"
    >
      {/* Background Accent Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#F6F3EA_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Target Explanation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-4">
              <span>SECTION 05</span>
              <span className="w-4 h-px bg-gold" aria-hidden="true" />
              <span>RECRUITMENT OBJECTIVE</span>
            </div>

            <h2
              id="target-heading"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              Building a Dedicated Cohort of 100 Volunteers.
            </h2>

            <p className="text-base sm:text-lg text-ivory/85 leading-relaxed font-normal mb-6">
              This campaign is an intentional recruitment drive for Vignan&apos;s Institute of Information Technology. The objective is to induct up to 100 committed undergraduate and postgraduate students into active NSS service.
            </p>

            <div className="p-4 bg-forest-dark/70 border border-white/10 rounded-sm w-full max-w-xl text-xs text-ivory/75 space-y-2 mb-8">
              <div className="flex items-center gap-2 font-mono uppercase text-gold font-semibold">
                <Target size={14} aria-hidden="true" />
                <span>Fixed Campaign Capacity</span>
              </div>
              <p>
                Recruitment automatically closes once the 100-volunteer cohort threshold is attained across all participating departments.
              </p>
            </div>

            <Link
              href="#register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-forest font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-colors shadow-xs"
            >
              <span>Secure Your Volunteer Spot</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Right Column: Verified Database Counter & Progress (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-8 sm:p-10 bg-ivory text-charcoal border border-gold/40 shadow-xl relative rounded-xs">
              <div className="text-[11px] font-mono uppercase tracking-widest text-forest font-semibold mb-2 flex items-center justify-between">
                <span>CAMPAIGN METRICS</span>
                <span className="flex items-center gap-1 text-forest">
                  <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                  <span>DATABASE SYNC</span>
                </span>
              </div>

              <div className="my-6 text-center">
                <div className="font-editorial text-6xl sm:text-7xl font-bold text-forest leading-none mb-2">
                  100
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-charcoal/70">
                  Target Student Volunteers
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-4 border-t border-forest/15">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-charcoal/80">
                    {isLoading
                      ? "Verifying records..."
                      : stats.connected
                      ? `${count} of ${target} Registered`
                      : `Campaign Target: ${target}`}
                  </span>
                  <span className="text-forest font-mono">
                    {stats.connected ? `${percentage}%` : "Open"}
                  </span>
                </div>

                <div
                  className="w-full h-2.5 bg-forest/10 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={stats.connected ? count : 0}
                  aria-valuemin={0}
                  aria-valuemax={target}
                  aria-label="Volunteer registration progress"
                >
                  <div
                    className="h-full bg-forest transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(4, percentage)}%` }}
                  />
                </div>
              </div>

              {/* Verified Status Footnote */}
              <div className="mt-6 pt-4 border-t border-forest/10 flex items-start gap-2 text-[11px] text-charcoal/70">
                <CheckCircle2 size={14} className="text-forest shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {stats.connected
                    ? "Live verification active: Data queried directly from the secure institutional volunteer table."
                    : "Official campaign target fixed at 100 students across all undergraduate and postgraduate branches."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
