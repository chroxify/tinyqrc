"use client";

import { Icons } from "@/lib/icons";
import { Button } from "./ui/button";
import { useQRStore, getQRCodeSVG, getQRCodeUrl } from "@/lib/qr/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { svgToJpeg, svgToPng } from "@/lib/utils";

export function QRCodePreview() {
  const store = useQRStore();
  const svgString = getQRCodeSVG({ state: store });

  const downloadAs = async (format: "svg" | "png" | "jpg") => {
    if (!svgString) return;

    let data = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    if (format === "png") {
      data = await svgToPng(svgString, 2048, 2048);
    } else if (format === "jpg") {
      data = await svgToJpeg(svgString, 2048, 2048);
    }

    const a = document.createElement("a");
    a.href = data;
    a.download = `QR Code.${format}`;
    a.click();
  };

  const copyToClipboard = async (type: "png" | "url") => {
    if (!svgString) return;
    if (type === "png") {
      const pngDataUrl = await svgToPng(svgString, 2048, 2048);
      const response = await fetch(pngDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } else {
      await navigator.clipboard.writeText(getQRCodeUrl(store) || "");
    }
  };

  return (
    <div className="flex select-none relative items-center justify-center w-full rounded-lg border bg-white overflow-hidden">
      <div
        className={`w-full transition-[height] duration-[250ms] ease-in-out ${svgString ? "h-[162px]" : "h-[54px]"}`}
      >
        <div className="p-4 h-full flex items-center justify-center">
          <div
            className={`absolute transition-all duration-[250ms] ease-in-out ${
              svgString
                ? "scale-100 opacity-100 blur-0"
                : "scale-0 opacity-0 blur-sm"
            }`}
          >
            {svgString && (
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: svgString }}
              />
            )}
          </div>
          <div
            className={`absolute transition-all duration-[250ms] ease-in-out ${
              svgString
                ? "scale-50 opacity-0 blur-sm"
                : "scale-100 opacity-100 blur-0"
            }`}
          >
            <div className="text-sm text-muted-foreground">
              Enter data to generate QR code
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {svgString && (
          <div className="flex absolute top-1.5 right-1.5 flex-row gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-sm text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  <Icons.Download className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => downloadAs("png")}>
                  <Icons.PNG className="w-4 h-4" />
                  Download as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => downloadAs("svg")}>
                  <Icons.SVG className="w-4 h-4" />
                  Download as SVG
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => downloadAs("jpg")}>
                  <Icons.JPG className="w-4 h-4" />
                  Download as JPG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-sm text-muted-foreground hover:text-foreground"
                >
                  <Icons.Copy className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => copyToClipboard("png")}>
                  <Icons.QRCode className="w-4 h-4" />
                  Copy as Image
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => copyToClipboard("url")}>
                  <Icons.URL className="w-4 h-4" />
                  Copy URL
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
