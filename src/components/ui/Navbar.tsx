"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About NSS", href: "#about" },
    { name: "MY Bharat", href: "#my-bharat" },
    { name: "Activities", href: "#activities" },
    { name: "Team", href: "#team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-nss-bg/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logos/nss-logo.svg" 
            alt="NSS" 
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
          />
          <div className="hidden sm:block">
            <h1 className="font-bold text-nss-primary leading-tight text-sm tracking-wide">
              NATIONAL SERVICE SCHEME
            </h1>
            <p className="text-xs text-nss-muted font-medium">
              VIGNAN'S INSTITUTE OF I.T.
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-nss-text/80 hover:text-nss-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/register"
            className="bg-nss-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-nss-secondary transition-all hover:shadow-lg active:scale-95"
          >
            BECOME A VOLUNTEER
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-nss-text p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden flex flex-col p-4 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-nss-text/80 hover:text-nss-primary p-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/register"
            className="bg-nss-primary text-white text-center px-5 py-3 rounded-md text-sm font-semibold shadow-sm hover:bg-nss-secondary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            BECOME A VOLUNTEER
          </Link>
        </motion.div>
      )}
    </header>
  );
}
