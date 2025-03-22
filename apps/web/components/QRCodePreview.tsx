import { Icons } from "@/lib/icons";
import { ColorInput } from "./ColorInput";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DataInput } from "./DataInput";
import { useQRStore, getQRCodeUrl } from "@/lib/qr/store";

export function QRCodePreview() {
  const store = useQRStore();
  const qrUrl = getQRCodeUrl(store);

  return (
    <div className="flex relative items-center h-full justify-center w-full rounded-lg border bg-white p-4">
      {qrUrl ? (
        <img src={qrUrl} alt="QR Code" width={128} height={128} className="" />
      ) : (
        <div className="text-sm text-muted-foreground">
          Enter data to generate QR code
        </div>
      )}

      {/* Action buttons */}
      {qrUrl && (
        <div className="flex absolute top-1.5 right-1.5 flex-row gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-sm text-muted-foreground hover:text-foreground"
            onClick={() => {
              const link = document.createElement("a");
              link.href = qrUrl;
              link.download = "qrcode.svg";
              link.click();
            }}
          >
            <Icons.Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-sm text-muted-foreground hover:text-foreground"
            onClick={() => navigator.clipboard.writeText(qrUrl)}
          >
            <Icons.Copy className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
