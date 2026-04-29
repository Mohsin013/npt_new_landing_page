import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  StructuredData,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/components/StructuredData";
import CursorGlow from "@/components/CursorGlow";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default:
      "NorthPeak Technologies | Ship Your Product in 4 Weeks",
    template: "%s | NorthPeak Technologies",
  },
  description:
    "NorthPeak Technologies — MVP development, AI solutions, web & mobile apps. We build and ship production-ready products in 4 weeks.",
  keywords: [
    "MVP development services",
    "startup MVP",
    "build MVP fast",
    "minimum viable product development",
    "rapid MVP development",
    "4-week MVP",
    "MVP builder",
    "MVP consulting",
    "startup software company",
    "tech cofounder",
    "non-technical founders",
    "product development company",
    "SaaS development",
    "app development for startups",
    "MVP launch",
    "startup technology partner",
  ],
  openGraph: {
    title:
      "NorthPeak Technologies | Ship Your Product in 4 Weeks, Not 4 Months",
    description:
      "The engineering team behind 50+ successful product launches. MVP development, AI, web & mobile — shipped fast.",
    url: "https://northpeaktechnologies.com",
    siteName: "NorthPeak Technologies",
    images: [
      {
        url: "/company_logo.png",
        width: 1200,
        height: 630,
        alt: "NorthPeak Technologies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthPeak Technologies | Ship Your Product in 4 Weeks",
    description:
      "The engineering team behind 50+ successful product launches. MVP development, AI, web & mobile — shipped fast.",
    creator: "@northpeaktech",
    images: ["/company_logo.png"],
  },
  alternates: {
    canonical: "https://northpeaktechnologies.com",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/favicon_io/apple-touch-icon.png",
  },
  manifest: "/assets/favicon_io/site.webmanifest",
  metadataBase: new URL("https://northpeaktechnologies.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <StructuredData data={localBusinessSchema} />
        <GoogleAnalytics />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <CursorGlow />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
