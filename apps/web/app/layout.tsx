import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Free QR Code API - TinyQRC",
  description:
    "Free QR Code API for developers. Generate unlimited QR codes programmatically.",
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
