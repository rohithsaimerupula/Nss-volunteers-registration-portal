import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NSS SETU — Volunteer Recruitment Campaign | VIIT",
  description: "Official NSS volunteer recruitment drive for Vignan's Institute of Information Technology (Autonomous). Three Identities. One Mission. Be the Change. Serve the Nation.",
  keywords: ["NSS", "VIIT", "MY BHARAT", "NSS SETU", "Volunteer Recruitment", "Community Service", "Vignan"],
  openGraph: {
    title: "NSS SETU — Volunteer Recruitment Campaign | VIIT",
    description: "Be the Change. Serve the Nation. Join the NSS volunteer movement at Vignan's Institute of Information Technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-ivory text-charcoal selection:bg-forest selection:text-ivory">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
