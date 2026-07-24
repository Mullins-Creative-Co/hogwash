import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
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
    "Professional pressure washing for driveways, siding, decks, fences, trailers, and more. Owner-operated, free quotes, and results you can see from the street. Call or text 562-324-6588.",
  icons: {
    icon: "/hogwash/logo.jpg",
    apple: "/hogwash/logo.jpg",
  },
  openGraph: {
    type: "website",
    title: "Hogwash Exterior Cleaning",
    description:
      "Restore. Protect. Impress. Professional exterior cleaning with free quotes and results you can see.",
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
      "Restore. Protect. Impress. Professional exterior cleaning with free quotes.",
    images: ["/hogwash/owner-rig.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
