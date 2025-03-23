import Image from "next/image";
import { QRCodeUrl } from "@/components/QRCodeUrl";
import { QRCodeCard } from "@/components/QRCodeCard";
import Link from "next/link";

export default function Home() {
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
          <QRCodeCard />
          <QRCodeUrl />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center" />
    </div>
  );
}
