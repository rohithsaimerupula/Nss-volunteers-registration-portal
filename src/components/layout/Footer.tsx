"use client";

import React from "react";
import Link from "next/link";
import { CampaignWordmark, TripleIdentityGroup } from "@/components/branding/BrandIdentity";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, ShieldCheck, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-forest text-white border-t border-forest-light relative"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer Information</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Identity & Concept (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="bg-ivory p-3 rounded-xs mb-4 inline-block">
              <CampaignWordmark compact={false} />
            </div>

            <p className="text-sm text-ivory/80 leading-relaxed max-w-sm mb-6">
              Official volunteer recruitment campaign uniting Vignan&apos;s Institute of Information Technology, the National Service Scheme, and Mera Yuva Bharat in collective civic service.
            </p>

            <div className="pt-2">
              <TripleIdentityGroup size="compact" />
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-4">
              CAMPAIGN SECTIONS
            </span>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider text-ivory/80">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#register"
                  className="text-gold hover:text-gold-light transition-colors inline-block font-bold"
                >
                  Volunteer Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Contact & Compliance (4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-4">
              OFFICIAL CONTACT &amp; CAMPUS
            </span>

            <div className="space-y-3 text-xs text-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {siteConfig.contact.institutionName}<br />
                  {siteConfig.contact.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-gold underline underline-offset-2 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10 text-ivory/70">
                <ShieldCheck size={16} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Privacy Notice:</strong> Submitted student data is collected strictly for NSS volunteer enrollment and verified institutional participation.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Attribution, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div>
            &copy; 2026 Vignan&apos;s Institute of Information Technology. NSS SETU Campaign.
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] uppercase tracking-wider text-gold">
              Motto: Not Me But You
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
