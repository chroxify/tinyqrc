import qrcodegen from "./codegen";
import {
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MARGIN,
  DEFAULT_SIZE,
  getErrorCorrectionLevel,
} from "./constants";
import type { QRCodeOptions } from "./types";
import { excavateModules, getImageSettings, generatePath } from "./utils";

/**
 * Generates an SVG QR code as a string. Use this when you need the raw SVG markup.
 */
export function generateSVG(options: QRCodeOptions): string {
  const {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    margin = DEFAULT_MARGIN,
    imageSettings,
    ...otherProps
  } = options;

  const shouldUseHigherErrorLevel =
    imageSettings?.excavate && (level === "L" || level === "M");

  // Use a higher error correction level 'Q' when excavation is enabled
  // to ensure the QR code remains scannable despite the removed modules.
  const effectiveLevel = shouldUseHigherErrorLevel ? "Q" : level;

  let cells = qrcodegen.QrCode.encodeText(
    value,
    getErrorCorrectionLevel(effectiveLevel)
  ).getModules();

  const numCells = cells.length + margin * 2;
  const calculatedImageSettings = getImageSettings(
    cells,
    size,
    margin,
    imageSettings
  );

  let imageTag = "";
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      cells = excavateModules(cells, calculatedImageSettings.excavation);
    }

    // Create an SVG image tag
    imageTag = `<image
        href="${imageSettings.src}"
        height="${calculatedImageSettings.h}"
        width="${calculatedImageSettings.w}"
        x="${calculatedImageSettings.x + margin}"
        y="${calculatedImageSettings.y + margin}"
        preserveAspectRatio="none"
      />`;
  }

  // Drawing strategy: instead of a rect per module, we're going to create a
  // single path for the dark modules and layer that on top of a light rect,
  // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
  // way faster than DOM ops.
  // For level 1, 441 nodes -> 2
  // For level 40, 31329 -> 2
  const fgPath = generatePath(cells, margin);

  // Convert additional props to attribute string
  let attributesString = "";
  for (const [key, value] of Object.entries(otherProps)) {
    if (value != null) {
      attributesString += ` ${key}="${value}"`;
    }
  }

  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${size}"
    width="${size}"
    viewBox="0 0 ${numCells} ${numCells}"
    role="img"
    aria-label="QR Code"
    data-generator="tinyqrc"
    ${attributesString}
  >
    <title>QR Code</title>
    <desc>Scan this QR code with your mobile device</desc>
    <path
      fill="${bgColor}"
      d="M0,0 h${numCells}v${numCells}H0z"
      shapeRendering="crispEdges"
    />
    <path fill="${fgColor}" d="${fgPath}" shapeRendering="crispEdges" />
    ${imageTag}
  </svg>`;
}
