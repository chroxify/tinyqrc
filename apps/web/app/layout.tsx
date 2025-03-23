import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Free QR Code API - TinyQRC",
  description:
    "Lightning-fast QR code generation API built for developers. Seamless integration, unlimited requests, and exceptional developer experience - all the tools you need to embed QR codes at scale, for free.",
  metadataBase: new URL("https://tinyqrc.com"),
  keywords: [
    "qr code api",
    "free qr code generator",
    "qr code generator api",
    "qr code generator",
    "qr code rest api",
    "developer qr code",
    "programmatic qr codes",
  ],
  authors: [{ name: "TinyQRC Team" }],
  creator: "TinyQRC",
  publisher: "TinyQRC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  // manifest: "/manifest.json",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tinyqrc.com",
    title: "Free QR Code API - TinyQRC",
    description:
      "Lightning-fast QR code generation API built for developers. Seamless integration, unlimited requests, and exceptional developer experience.",
    siteName: "TinyQRC",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TinyQRC - Free QR Code API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code API - TinyQRC",
    description:
      "Lightning-fast QR code generation API built for developers. Seamless integration, unlimited requests, and exceptional developer experience.",
    images: ["/opengraph-image.png"],
    creator: "@chroxify",
    site: "@chroxify",
  },
  alternates: {
    canonical: "https://tinyqrc.com",
  },
};

export const viewport: Viewport = {
  // Prevents auto-zoom on mobile for input fields
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "79afd4c4712c4091816b45fd29bef4ac"}'
        />
        <Script
          async
          src="https://cdn.seline.so/seline.js"
          data-token="3cce126529eb953"
        />
      </head>
      <body className={`${instrumentSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
