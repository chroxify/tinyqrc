import { QRCodeUrl } from "@/components/QRCodeUrl";
import { QRCodeCard } from "@/components/QRCodeCard";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[100dvh] p-4 sm:p-8 pb-20 gap-16 ">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {/* Title and description */}
        <div className="flex flex-col gap-2 items-center max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold">QR Code API</h1>
          <h2 className="sm:text-lg text-black/60 font-normal">
            Generate dynamic QR codes instantly with our developer-first API.
            <br className="hidden sm:block" /> Seamless integration, unlimited
            requests, lightning-fast response times.
          </h2>
        </div>

        <div className="flex flex-col gap-4 max-w-xl w-full">
          <QRCodeCard />
          <QRCodeUrl />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center" />
    </div>
  );
}
