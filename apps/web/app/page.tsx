"use client";

import { ColorInput } from "@/components/ColorInput";
import { DataInput } from "@/components/DataInput";
import { QRCodePreview } from "@/components/QRCodePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import Image from "next/image";
import { useQRStore } from "@/lib/qr/store";
import { QRCodeUrl } from "@/components/QRCodeUrl";

export default function Home() {
  const { logo, setLogo } = useQRStore();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {/* Title and description */}
        <div className="flex flex-col gap-2 items-center max-w-xl text-center">
          <h1 className="text-5xl font-semibold">QR Code API</h1>
          <p className="text-lg text-black/60">
            A free, simple and fast QR Code API for developers. Generate
            unlimited QR codes programmatically.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* QR Code Card */}
          <div className="flex flex-col gap-4 items-center max-w-xl w-full bg-muted/50 rounded-xl p-3 border">
            <DataInput />
            <div className="flex flex-col gap-4 w-full">
              <QRCodePreview />

              <div className="flex flex-row gap-2 w-full h-full">
                {/* Logo */}
                <div className="flex flex-col gap-1 w-full">
                  {/* <span className="text-sm text-black/60 ml-[1px]">Logo</span> */}
                  <Input
                    type="text"
                    placeholder="Logo URL (optional)"
                    className="w-full"
                    value={logo || ""}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </div>

                {/* Color */}
                <div className="flex flex-row gap-2 w-full">
                  <ColorInput type="fg" />
                  <ColorInput type="bg" />
                </div>
              </div>
            </div>
          </div>

          <QRCodeUrl />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
