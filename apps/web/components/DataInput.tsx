"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useQRStore } from "@/lib/qr/store";
import { DataInputs } from "@/lib/qr/schema";
import type { QRDataType } from "@/lib/qr/types";

export function DataInput() {
  const { data, setData } = useQRStore();
  const type = data?.type || "text";
  const config = DataInputs[type];
  const isSeparated = config.inputs.length > 1;
  const containerRef = useRef<HTMLDivElement>(null);

  // Add validation state tracking
  const [validationState, setValidationState] = useState<
    Record<string, boolean>
  >({});

  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[config.layout?.columns ?? 1] ?? "grid-cols-1";

  // Handle input changes with validation
  const handleInputChange = (
    id: string,
    value: string,
    validation?: (value: string) => boolean
  ) => {
    const values = { ...data?.data } as Record<string, string>;
    values[id] = value;
    setData(type, values);

    if (validation) {
      setValidationState((prev) => ({
        ...prev,
        [id]: validation(value),
      }));
    }
  };

  // Animate height changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        container.style.height = `${entries[i].contentRect.height}px`;
      }
    });

    resizeObserver.observe(container.children[0]);
    return () => resizeObserver.disconnect();
  }, [type]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 w-full relative transition-[height] duration-300 ease-in-out"
      style={{ height: "40px" }}
    >
      <div className="absolute w-full">
        <div
          className={cn(
            "flex relative rounded-md transition-all duration-200",
            !isSeparated &&
              "focus-within:ring-[1.5px] focus-within:ring-primary"
          )}
        >
          <DataSelect type={type} onTypeSelect={(t) => setData(t, {})} />
          <Input
            type={config.inputs[0].type}
            id={config.inputs[0].id}
            value={data?.data?.[config.inputs[0].id] || ""}
            onChange={(e) =>
              handleInputChange(
                config.inputs[0].id,
                e.target.value,
                config.inputs[0].validation
              )
            }
            className={cn(
              "rounded-l-none focus-visible:ring-0 px-3 py-0",
              isSeparated && "rounded-l-md ml-3 focus-visible:ring-[1.5px]",
              validationState[config.inputs[0].id] === false &&
                "text-destructive"
            )}
            placeholder={config.inputs[0].placeholder}
          />
        </div>

        {isSeparated && (
          <div
            className={cn(
              "flex flex-col gap-2 mt-2",
              config.layout?.grid && `grid ${gridCols} gap-2`,
              "animate-in fade-in duration-300 ease-in-out"
            )}
          >
            {config.inputs.slice(1).map((input, index) => (
              <Input
                key={input.id}
                type={input.type}
                id={input.id}
                value={data?.data?.[input.id] || ""}
                onChange={(e) =>
                  handleInputChange(input.id, e.target.value, input.validation)
                }
                placeholder={input.placeholder}
                className={cn(
                  input.className,
                  "animate-in fade-in duration-300 ease-in-out",
                  `delay-[${index * 75}ms]`,
                  validationState[input.id] === false && "text-destructive"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DataSelect({
  type,
  onTypeSelect,
}: {
  type: QRDataType;
  onTypeSelect: (type: QRDataType) => void;
}) {
  const config = DataInputs[type];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "grid items-center relative rounded-l-md transition-all duration-300 ease-in-out border px-2 text-sm border-r-0 bg-muted cursor-pointer",
            config.inputs.length > 1 && "rounded-md border",
            config.inputs.length > 1
              ? "grid-cols-[18px_1fr] gap-1.5 pr-2.5"
              : "grid-cols-[18px_0fr] gap-0"
          )}
        >
          <config.icon className="text-foreground/60" />
          <span
            className={cn(
              "transition-all duration-300 ease-in-out whitespace-nowrap font-[450] text-foreground/60",
              config.inputs.length > 1
                ? "opacity-100"
                : "opacity-100 overflow-hidden"
            )}
          >
            {config.label}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[135px]">
        {Object.entries(DataInputs).map(([key, config]) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => onTypeSelect(key as QRDataType)}
          >
            <config.icon className="text-foreground/70 mr-2" />
            {config.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
