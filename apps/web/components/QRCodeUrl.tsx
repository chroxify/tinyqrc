import { useQRStore, getQRCodeUrl } from "@/lib/qr/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "@/lib/icons";
import { useState } from "react";

export function QRCodeUrl() {
  const store = useQRStore();
  const qrUrl = getQRCodeUrl(store);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!qrUrl) return;
    await navigator.clipboard.writeText(decodeURIComponent(qrUrl));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div
      className="flex flex-row gap-2 max-w-xl bg-muted/50 items-center rounded-xl pl-3.5 p-2 border text-sm group hover:cursor-copy"
      onClick={handleCopy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCopy();
        }
      }}
    >
      <span className="text-muted-foreground truncate select-none">
        {decodeURIComponent(qrUrl || "")}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-md cursor-copy text-muted-foreground hover:text-foreground group-hover:text-foreground group-hover:bg-accent"
      >
        {isCopied ? (
          <Icons.Check className="w-4 h-4 text-green-500" />
        ) : (
          <Icons.Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
