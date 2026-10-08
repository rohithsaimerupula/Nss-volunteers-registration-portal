"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About NSS" },
  { href: "#why-join", label: "Why Join" },
  { href: "#activities", label: "Activities" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-white/5 py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logos & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2">
            {/* Logos placeholder - ideally replace with actual Next/Image */}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              VIIT
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center text-blue-500 font-bold text-xs">
              NSS
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-wide text-foreground group-hover:text-primary transition-colors">
              VIIT NSS
            </span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              MY BHARAT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#register"
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(22,163,74,0.3)]"
          >
            JOIN NSS
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0 border-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-white/10">
            <Link
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-center w-full px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all"
            >
              JOIN NSS
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
