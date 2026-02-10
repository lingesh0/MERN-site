import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giakaa | AI-First IT Services & Digital Transformation",
  description: "Giakaa provides AI-first IT consulting services, cloud engineering, and digital transformation, delivering GenAI solutions and AI agents for enterprises across the USA and Europe.",
  keywords: ["AI consulting", "digital transformation", "IT services", "GenAI", "cloud engineering", "enterprise solutions"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.giakaa.com'),
  openGraph: {
    title: "Giakaa | AI-First IT Services & Digital Transformation",
    description: "AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries",
    url: "https://www.giakaa.com",
    siteName: "Giakaa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Giakaa - AI-First IT Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giakaa | AI-First IT Services & Digital Transformation",
    description: "AI-first consulting firm delivering high-impact solutions across 40+ industries",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

