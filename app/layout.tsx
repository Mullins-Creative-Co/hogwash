import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import MetaPixel from "./MetaPixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hogwash-gilt.vercel.app"),
  title: "Hogwash Exterior Cleaning | Pressure Washing & House Washing",
  description:
    "Professional pressure washing serving the Dayton area. Driveways, siding, decks, fences, trailers, and more. Owner-operated, fully insured, and free quotes. Call or text 562-324-6588.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/hogwash/logo.jpg",
    apple: "/hogwash/logo.jpg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Hogwash Exterior Cleaning",
    title: "Hogwash Exterior Cleaning",
    description:
      "Fully insured pressure washing and exterior cleaning serving the Dayton area. Free quotes for homes and businesses.",
    images: [
      {
        url: "/hogwash/owner-rig.jpg",
        width: 1200,
        height: 630,
        alt: "Hogwash Exterior Cleaning owner and service rig",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hogwash Exterior Cleaning",
    description:
      "Fully insured pressure washing and exterior cleaning serving the Dayton area. Free quotes for homes and businesses.",
    images: ["/hogwash/owner-rig.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/hogwash/updates-2026-07-24/hero-poster.webp"
          fetchPriority="high"
        />
      </head>
      <body>
        {children}
        {metaPixelId ? <MetaPixel pixelId={metaPixelId} /> : null}
      </body>
    </html>
  );
}
