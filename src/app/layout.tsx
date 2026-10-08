import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSS Volunteer Drive | Vignan's Institute of Information Technology",
  description: "Join the NSS volunteer drive at Vignan's Institute of Information Technology and contribute to meaningful community service initiatives.",
  openGraph: {
    title: "NSS Volunteer Drive | VIIT",
    description: "Join the NSS volunteer movement and make a meaningful impact.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="py-8 border-t border-black/10 bg-surface/50 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Vignan's Institute of Information Technology. NSS Volunteer Campaign.
          </p>
        </footer>
      </body>
    </html>
  );
}
