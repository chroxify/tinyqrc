import qrcodegen from "./codegen";

export const DEFAULT_SIZE = 128;
export const DEFAULT_LEVEL = "L";
export const DEFAULT_BGCOLOR = "#FFFFFF";
export const DEFAULT_FGCOLOR = "#000000";
export const DEFAULT_MARGIN = 2;
export const DEFAULT_IMG_SCALE = 0.1;

export const QR_LEVELS = ["L", "M", "Q", "H"] as const;

export function getErrorCorrectionLevel(level: string): qrcodegen.QrCode.Ecc {
  switch (level) {
    case "L":
      return qrcodegen.QrCode.Ecc.LOW;
    case "M":
      return qrcodegen.QrCode.Ecc.MEDIUM;
    case "Q":
      return qrcodegen.QrCode.Ecc.QUARTILE;
    case "H":
      return qrcodegen.QrCode.Ecc.HIGH;
    default:
      return qrcodegen.QrCode.Ecc.LOW;
  }
}
