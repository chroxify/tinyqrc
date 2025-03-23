"use client";

import { useQRStore } from "@/lib/qr/store";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function LogoInput() {
  const { logo, setLogo } = useQRStore();
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);

  useEffect(() => {
    if (!logo) {
      setIsValidImage(null);
      return;
    }

    const img = new Image();
    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
    img.src = logo;
  }, [logo]);

  return (
    <div className="flex w-full rounded-md transition-all duration-200 border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary">
      <div className="flex items-center justify-center min-w-9 text-sm bg-secondary border-r text-secondary-foreground">
        {isValidImage === true && logo ? (
          <img
            src={logo}
            alt="Logo preview"
            className="w-5 h-5 object-contain rounded-sm"
          />
        ) : (
          <div className="w-5 h-5 flex items-center justify-center font-medium text-muted-foreground">
            {isValidImage === false ? (
              "?"
            ) : (
              <Icons.Image className="!size-[20px] text-muted-foreground" />
            )}
          </div>
        )}
      </div>
      <Input
        type="text"
        placeholder="Logo URL"
        className={cn(
          "border-0 ml-3 rounded-none h-[34px] focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0",
          isValidImage === false && "text-destructive"
        )}
        value={logo || ""}
        onChange={(e) => setLogo(e.target.value)}
      />
    </div>
  );
}
