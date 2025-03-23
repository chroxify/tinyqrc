"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useQRStore } from "@/lib/qr/store";

interface ColorInputProps {
  type: "fg" | "bg";
}

export function ColorInput({ type }: ColorInputProps) {
  const { fgColor, bgColor, setFgColor, setBgColor } = useQRStore();
  const color = type === "fg" ? fgColor : bgColor;
  const setColor = type === "fg" ? setFgColor : setBgColor;

  return (
    <div
      className={cn(
        "flex w-full rounded-md transition-all duration-200 border bg-background overflow-hidden",
        "focus-within:ring-[1.5px] focus-within:ring-primary focus-within:outline-none"
      )}
    >
      <div className="flex items-center justify-center min-w-9 text-sm bg-secondary border-r text-secondary-foreground">
        <div className="relative w-5 h-5">
          <div
            className="w-full h-full rounded-sm"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </div>
      </div>
      <Input
        className={cn(
          "border-0 ml-3 rounded-none h-[34px] focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0"
        )}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}
