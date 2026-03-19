import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://my-portfolio-vynguyen.vercel.app"),
  title: "Vy Nguyen | Full-Stack Developer",
  description: "Full-stack developer with 3 years of hands-on experience in Next.js, React, TypeScript, Python, and AI/ML. Based in Toronto, open to opportunities.",
  openGraph: {
    title: "Vy Nguyen | Full-Stack Developer",
    description: "Full-stack developer with 3 years of hands-on experience in Next.js, React, TypeScript, Python, and AI/ML. Based in Toronto, open to opportunities.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vy Nguyen | Full-Stack Developer",
    description: "Full-stack developer with 3 years of hands-on experience in Next.js, React, TypeScript, Python, and AI/ML.",
  },
  icons: {
    icon: "/sprites/mario-idle.png",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
