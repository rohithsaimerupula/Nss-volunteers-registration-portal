import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NSS Volunteer Registration | Vignan's Institute of Information Technology",
  description: "Official NSS volunteer registration portal for Vignan's Institute of Information Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-nss-bg text-nss-text`}>
        {children}
      </body>
    </html>
  );
}
