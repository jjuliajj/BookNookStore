import type { Metadata } from "next";
import { Quicksand, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.booknookstore.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BookNook Store | Cozy Pastel Reading Corner & Digital Books",
    template: "%s | BookNook Store",
  },
  description: "Welcome to BookNook Store! Discover cozy digital reading corners, gentle pastel ebooks, and instant EPUB downloads.",
  keywords: ["BookNook Store", "Cozy Reading Corner", "Pastel Bookstore", "Gentle Ebooks"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "BookNook Store | Cozy Pastel Reading Corner",
    description: "Discover gentle digital reading corners at BookNook Store.",
    url: siteUrl,
    siteName: "BookNook Store",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "BookNook Store" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-quicksand bg-[#FBF4EF] text-[#3D344B]"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
