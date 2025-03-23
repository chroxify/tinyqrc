import { ColorInput } from "./ColorInput";
import { DataInput } from "./DataInput";
import { LogoInput } from "./LogoInput";
import { QRCodePreview } from "./QRCodePreview";

export function QRCodeCard() {
  return (
    <div className="flex flex-col gap-4 items-center w-full bg-muted/50 rounded-xl p-3 border">
      {/* Data Input */}
      <DataInput />

      {/* QR Code Preview */}
      <QRCodePreview />

      {/* QR Code Settings */}
      <div className="flex flex-col-reverse sm:flex-row gap-2 w-full h-full">
        {/* Logo */}
        <div className="flex flex-col gap-1 w-full">
          <LogoInput />
        </div>

        {/* Color */}
        <div className="flex flex-row gap-2 w-full">
          <ColorInput type="fg" />
          <ColorInput type="bg" />
        </div>
      </div>
    </div>
  );
}
