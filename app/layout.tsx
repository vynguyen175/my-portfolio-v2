import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import AppShell from "@/components/AppShell";
import StructuredData from "@/components/StructuredData";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.vynguyen.dev"),
  title: "Vy Nguyen | Full-Stack Developer",
  description: "Full-stack developer with 3 years of hands-on experience in Next.js, React, TypeScript, Python, and AI/ML. Based in Toronto, open to opportunities.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vy Nguyen | Full-Stack Developer",
    description: "Full-stack developer with 3 years of hands-on experience in Next.js, React, TypeScript, Python, and AI/ML. Based in Toronto, open to opportunities.",
    type: "website",
    locale: "en_CA",
    siteName: "Vy Nguyen Portfolio",
    url: "https://www.vynguyen.dev",
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

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <StructuredData />
        <ThemeProviderWrapper>
          <AppShell>
            {children}
          </AppShell>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
