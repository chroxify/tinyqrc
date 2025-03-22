import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full text-sm rounded-md transition-all duration-200 border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary h-9",
        className
      )}
      {...props}
    />
  );
}

export { Input };
