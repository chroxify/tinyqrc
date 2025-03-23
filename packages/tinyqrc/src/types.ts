import type { CSSProperties } from "react";
import type qrcodegen from "./codegen";

export type Modules = ReturnType<qrcodegen.QrCode["getModules"]>;
export type Excavation = { x: number; y: number; w: number; h: number };

export type ImageSettings = {
  /** URL or data URI of the image to embed */
  src: string;
  /** Height of the embedded image in pixels */
  height: number;
  /** Width of the embedded image in pixels */
  width: number;
  /** Whether to remove QR code modules under the image for better visibility */
  excavate: boolean;
  /** Optional X position of the image. Centered if not specified */
  x?: number;
  /** Optional Y position of the image. Centered if not specified */
  y?: number;
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
