import { QRCodeUrl } from "@/components/QRCodeUrl";
import { QRCodeCard } from "@/components/QRCodeCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[100dvh] p-4 sm:p-8 pb-10 sm:pb-14 gap-16 ">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {/* Title and description */}
        <div className="flex flex-col gap-2 items-center max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold">QR Code API</h1>
          <h2 className="sm:text-lg text-black/60 font-normal">
            A simple, fast and free QR code API designed for developers.
            <br className="hidden sm:block" /> Enjoy seamless integration,
            unlimited requests, and instant generation.
          </h2>
        </div>

        <div className="flex flex-col gap-4 max-w-xl w-full">
          <QRCodeCard />
          <QRCodeUrl />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="https://go.tinyqrc.com/docs"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-all duration-200"
        >
          Documentation
        </Link>
        <Link
          href="https://go.tinyqrc.com/github"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-all duration-200"
        >
          Github
        </Link>
        <Link
          href="https://go.tinyqrc.com/contact"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-all duration-200"
        >
          Contact
        </Link>
      </footer>
    </div>
  );
}
