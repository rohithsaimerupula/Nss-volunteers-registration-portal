"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TripleIdentityGroup } from "@/components/branding/BrandIdentity";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* TIER 1: Official Institutional Top Ribbon */}
      <div className="bg-forest-dark text-ivory/80 text-[10px] sm:text-[11px] font-mono border-b border-gold/30 px-4 sm:px-6 py-1 sm:py-1.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {/* Indian National Tricolor Indicator */}
          <div className="flex items-center h-2.5 w-4 rounded-xs overflow-hidden border border-white/20 shadow-2xs">
            <div className="w-1/3 h-full bg-[#FF9933]" />
            <div className="w-1/3 h-full bg-white" />
            <div className="w-1/3 h-full bg-[#138808]" />
          </div>
          <span className="font-semibold text-ivory tracking-wide hidden sm:inline">
            Government of India &bull; Ministry of Youth Affairs and Sports
          </span>
          <span className="font-semibold text-ivory tracking-wide sm:hidden">
            Govt. of India &bull; MYAS
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <span className="text-gold/90 font-medium hidden md:inline">
            Vignan&apos;s Institute of Information Technology (Autonomous)
          </span>
          <span className="text-ivory/60 hidden lg:inline">&bull;</span>
          <span className="text-gold font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>NSS RECRUITMENT 2026</span>
          </span>
        </div>
      </div>

      {/* TIER 2: Main Navigation Bar */}
      <div
        className={`transition-all duration-200 border-b ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md border-forest/15 shadow-sm py-2.5"
            : "bg-ivory/90 backdrop-blur-xs border-forest/10 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Triple Identity Logo Medallions & Title */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="#home"
              className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-forest group"
              aria-label="NSS SETU Home"
            >
              {/* Linked Official Logo Trio Seal */}
              <div className="flex items-center -space-x-2 bg-white/80 p-1 rounded-full border border-forest/20 shadow-xs group-hover:border-gold transition-colors">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-forest/15 bg-white p-0.5 z-30 shadow-2xs">
                  <Image src="/viit-logo.png" alt="VIIT Logo" fill className="object-contain" sizes="28px" />
                </div>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gold bg-white p-0.5 z-20 shadow-xs">
                  <Image src="/nss-logo.png" alt="NSS Logo" fill className="object-contain" sizes="32px" />
                </div>
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-forest/15 bg-white p-0.5 z-10 shadow-2xs">
                  <Image src="/mybharat-logo.png" alt="MY BHARAT Logo" fill className="object-contain" sizes="28px" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-editorial text-lg md:text-xl font-bold tracking-wider text-forest group-hover:text-forest-dark transition-colors">
                    NSS SETU
                  </span>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-gold px-1.5 py-0.5 rounded border border-gold/30 bg-gold/10">
                    2026
                  </span>
                </div>
                <span className="text-[9px] tracking-wider text-charcoal/70 uppercase font-mono hidden sm:inline">
                  VIIT &bull; NSS &bull; MY BHARAT
                </span>
              </div>
            </Link>

            <div className="hidden xl:block h-6 w-px bg-forest/15" aria-hidden="true" />
            <div className="hidden lg:block">
              <TripleIdentityGroup size="compact" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <ul className="flex items-center gap-7">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs uppercase tracking-widest font-semibold text-charcoal/80 hover:text-forest transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forest hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-5 w-px bg-forest/15" aria-hidden="true" />

            {/* Primary CTA: Join NSS */}
            <Link
              href="#register"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-forest text-white hover:bg-forest-light transition-all border border-forest active:translate-y-px shadow-xs hover:shadow-md"
            >
              <span>Join NSS</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>

          {/* Mobile Action & Menu Button */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <Link
              href="#register"
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-forest text-white border border-forest shadow-xs"
            >
              Join
            </Link>

            <button
              type="button"
              className="p-2 text-forest border border-forest/20 bg-white/80 hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-forest"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-ivory border-b border-forest/15 px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
          id="mobile-navigation"
        >
          <div className="py-2 mb-3 border-b border-forest/10">
            <TripleIdentityGroup size="compact" />
          </div>
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-sm font-semibold tracking-wide text-charcoal hover:text-forest transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="#register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-widest bg-forest text-white"
                >
                  <span>Become a Volunteer</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
