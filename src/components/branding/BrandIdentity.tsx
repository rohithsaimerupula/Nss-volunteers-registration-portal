"use client";

import React from "react";
import Image from "next/image";

/**
 * Institutional Branding: Official VIIT, NSS, and MY BHARAT Logos
 */

export function ViitLogoBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 border border-forest/20 bg-white text-forest rounded-xs font-semibold tracking-wider transition-all hover:border-gold hover:shadow-2xs group shadow-3xs ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      }`}
      title="Vignan's Institute of Information Technology (Autonomous)"
    >
      <div className={`relative shrink-0 rounded-full overflow-hidden bg-white p-0.5 ${compact ? "w-5 h-5" : "w-6 h-6"}`}>
        <Image
          src="/viit-logo.png"
          alt="VIIT Official Emblem"
          fill
          className="object-contain"
          sizes="24px"
        />
      </div>
      <span className="font-bold tracking-tight text-forest group-hover:text-forest-dark transition-colors">VIIT</span>
      {!compact && <span className="text-[10px] text-charcoal/70 uppercase border-l border-forest/20 pl-1.5 font-sans">Vignan</span>}
    </div>
  );
}

export function NssLogoBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 border border-forest/20 bg-white text-forest rounded-xs font-semibold tracking-wider transition-all hover:border-gold hover:shadow-2xs group shadow-3xs ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      }`}
      title="National Service Scheme — Official Konark Emblem"
    >
      <div className={`relative shrink-0 rounded-full overflow-hidden bg-white p-0.5 ${compact ? "w-5 h-5" : "w-6 h-6"}`}>
        <Image
          src="/nss-logo.png"
          alt="NSS Official Emblem"
          fill
          className="object-contain"
          sizes="24px"
        />
      </div>
      <span className="font-bold tracking-tight text-forest group-hover:text-gold transition-colors">NSS</span>
      {!compact && <span className="text-[10px] text-charcoal/70 uppercase border-l border-forest/20 pl-1.5 font-sans">National Service Scheme</span>}
    </div>
  );
}

export function MyBharatLogoBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 border border-forest/20 bg-white text-forest rounded-xs font-semibold tracking-wider transition-all hover:border-gold hover:shadow-2xs group shadow-3xs ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      }`}
      title="Mera Yuva Bharat — Government of India"
    >
      <div className={`relative shrink-0 rounded-full overflow-hidden bg-white p-0.5 ${compact ? "w-5 h-5" : "w-6 h-6"}`}>
        <Image
          src="/mybharat-logo.png"
          alt="MY BHARAT Official Emblem"
          fill
          className="object-contain"
          sizes="24px"
        />
      </div>
      <span className="font-bold tracking-tight text-forest group-hover:text-forest-dark transition-colors">MY BHARAT</span>
      {!compact && <span className="text-[10px] text-charcoal/70 uppercase border-l border-forest/20 pl-1.5 font-sans">Mera Yuva Bharat</span>}
    </div>
  );
}

export function TripleIdentityGroup({ size = "compact" }: { size?: "compact" | "regular" }) {
  const isCompact = size === "compact";
  return (
    <div className="flex items-center flex-wrap gap-1.5 sm:gap-2" aria-label="Affiliated Organizations: VIIT, NSS, and MY BHARAT">
      <ViitLogoBadge compact={isCompact} />
      <span className="text-charcoal/40 text-xs hidden sm:inline" aria-hidden="true">/</span>
      <NssLogoBadge compact={isCompact} />
      <span className="text-charcoal/40 text-xs hidden sm:inline" aria-hidden="true">/</span>
      <MyBharatLogoBadge compact={isCompact} />
    </div>
  );
}

export function CampaignWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1.5">
        <span className="font-editorial text-lg md:text-xl font-bold tracking-wider text-forest">
          NSS SETU
        </span>
        <span className="text-[10px] uppercase font-semibold tracking-widest text-gold px-1.5 py-0.5 rounded border border-gold/30 bg-gold/5 font-mono">
          2026 Drive
        </span>
      </div>
      {!compact && (
        <span className="text-[10px] tracking-wide text-charcoal/70 uppercase font-medium">
          Three Identities &bull; One Mission
        </span>
      )}
    </div>
  );
}
