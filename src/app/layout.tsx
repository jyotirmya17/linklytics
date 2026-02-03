import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Linklytics",
  description:
    "One link. All platforms. Clear analytics. Track which Instagram Reels, YouTube Shorts, TikTok, and X posts drive real traffic to your content.",
  keywords: [
    "link analytics",
    "creator tools",
    "short-form content",
    "Instagram Reels",
    "YouTube Shorts",
    "TikTok",
    "link tracking",
    "platform attribution",
  ],
  authors: [{ name: "Linklytics" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Linklytics",
    description:
      "One link. All platforms. Clear analytics. Stop guessing which short-form content drives real traffic.",
    type: "website",
    locale: "en_US",
    siteName: "Linklytics",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linklytics",
    description:
      "One link. All platforms. Clear analytics. Stop guessing which short-form content drives real traffic.",
    images: ["/logo.png"],
  },
};

import UserSync from "@/components/auth/UserSync";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-slate-950 text-white`}>
        <ConvexClientProvider>
          <UserSync />
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
