import type { CSSProperties } from "react";
import type qrcodegen from "./codegen";

export type Modules = ReturnType<qrcodegen.QrCode["getModules"]>;
export type Excavation = { x: number; y: number; w: number; h: number };

export type ImageSettings = {
  /** URL of the image to embed */
  src: string;
  /** Height of the image in pixels */
  height?: number;
  /** Width of the image in pixels */
  width?: number;
  /** X coordinate of the image in modules */
  x?: number;
  /** Y coordinate of the image in modules */
  y?: number;
  /** Whether to excavate (remove) QR code modules under the image */
  excavate?: boolean;
};

export type QRCodeOptions = {
  /** The content to encode in the QR code */
  value: string;
  /** Width and height of the QR code in pixels. Defaults to 600 */
  size?: number;
  /** Error correction level. "L" (7%), "M" (15%), "Q" (25%), or "H" (30%). Defaults to "L" */
  level?: string;
  /** Background color of the QR code. Accepts any valid CSS color. Defaults to "#FFFFFF" */
  bgColor?: string;
  /** Foreground color of the QR code. Accepts any valid CSS color. Defaults to "#000000" */
  fgColor?: string;
  /** Quiet zone margin around the QR code in modules. Defaults to 4 */
  margin?: number;
  /** Settings for embedding an image/logo in the QR code center */
  imageSettings?: ImageSettings;
  /** Additional attributes to be added to the SVG element */
  [key: string]: unknown;
};

export type QRProps = {
  value: string;
  size?: number;
  level?: string;
  bgColor?: string;
  fgColor?: string;
  margin?: number;
  style?: CSSProperties;
  imageSettings?: ImageSettings;
  isOGContext?: boolean;
};
export type QRPropsCanvas = QRProps &
  React.CanvasHTMLAttributes<HTMLCanvasElement>;
export type QRPropsSVG = QRProps & React.SVGProps<SVGSVGElement>;
