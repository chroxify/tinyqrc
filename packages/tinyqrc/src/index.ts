import qrcodegen from "./codegen";
import {
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_IMG_SCALE,
  DEFAULT_LEVEL,
  DEFAULT_MARGIN,
  DEFAULT_SIZE,
  ERROR_LEVEL_MAP,
} from "./constants";
import type { Excavation, ImageSettings, Modules } from "./types";

// Adding new type definition to replace QRPropsSVG
export type QRCodeSVGOptions = {
  value: string;
  size?: number;
  level?: string;
  bgColor?: string;
  fgColor?: string;
  margin?: number;
  isOGContext?: boolean;
  imageSettings?: ImageSettings;
  [key: string]: unknown; // For any additional attributes
};

export function getImageSettings(
  cells: Modules,
  size: number,
  margin: number,
  imageSettings?: ImageSettings
): null | {
  x: number;
  y: number;
  h: number;
  w: number;
  excavation: Excavation | null;
} {
  if (imageSettings == null) {
    return null;
  }

  const qrCodeSize = cells.length;
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
  const scale = qrCodeSize / size;
  const w = (imageSettings.width || defaultSize) * scale;
  const h = (imageSettings.height || defaultSize) * scale;

  // Center the image in the QR code area (without margins)
  const x =
    imageSettings.x == null ? qrCodeSize / 2 - w / 2 : imageSettings.x * scale;
  const y =
    imageSettings.y == null ? qrCodeSize / 2 - h / 2 : imageSettings.y * scale;

  let excavation: Excavation | null = null;
  if (imageSettings.excavate) {
    const floorX = Math.floor(x);
    const floorY = Math.floor(y);
    const ceilW = Math.ceil(w + x - floorX);
    const ceilH = Math.ceil(h + y - floorY);
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH };
  }

  return { x, y, h, w, excavation };
}

export function generatePath(modules: Modules, margin = 0): string {
  const ops: Array<string> = [];
  modules.forEach((row: boolean[], y: number) => {
    let start: number | null = null;
    row.forEach((cell: boolean, x: number) => {
      if (!cell && start !== null) {
        // M0 0h7v1H0z injects the space with the move and drops the comma,
        // saving a char per operation
        ops.push(
          `M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`
        );
        start = null;
        return;
      }

      // end of row, clean up or skip
      if (x === row.length - 1) {
        if (!cell) {
          // We would have closed the op above already so this can only mean
          // 2+ light modules in a row.
          return;
        }
        if (start === null) {
          // Just a single dark module.
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
        } else {
          // Otherwise finish the current line.
          ops.push(
            `M${start + margin},${y + margin} h${x + 1 - start}v1H${
              start + margin
            }z`
          );
        }
        return;
      }

      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join("");
}

// We could just do this in generatePath, except that we want to support
// non-Path2D canvas, so we need to keep it an explicit step.
export function excavateModules(
  modules: Modules,
  excavation: Excavation
): Modules {
  return modules.slice().map((row: boolean[], y: number) => {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row;
    }
    return row.map((cell: boolean, x: number) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell;
      }
      return false;
    });
  });
}

export function convertImageSettingsToPixels(
  calculatedImageSettings: {
    x: number;
    y: number;
    w: number;
    h: number;
    excavation: Excavation | null;
  },
  size: number,
  numCells: number,
  margin: number
) {
  const pixelRatio = size / numCells;
  const imgWidth = calculatedImageSettings.w * pixelRatio;
  const imgHeight = calculatedImageSettings.h * pixelRatio;
  const imgLeft = (calculatedImageSettings.x + margin) * pixelRatio;
  const imgTop = (calculatedImageSettings.y + margin) * pixelRatio;

  return { imgWidth, imgHeight, imgLeft, imgTop };
}

/**
 * Generates an SVG QR code as a string
 */
export function QRCodeSVG(options: QRCodeSVGOptions): string {
  const {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    margin = DEFAULT_MARGIN,
    isOGContext = false,
    imageSettings,
    ...otherProps
  } = options;

  const shouldUseHigherErrorLevel =
    isOGContext && imageSettings?.excavate && (level === "L" || level === "M");

  // Use a higher error correction level 'Q' when excavation is enabled
  // to ensure the QR code remains scannable despite the removed modules.
  const effectiveLevel = shouldUseHigherErrorLevel ? "Q" : level;

  let cells = qrcodegen.QrCode.encodeText(
    value,
    ERROR_LEVEL_MAP[effectiveLevel]
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

    if (isOGContext) {
      const { imgWidth, imgHeight, imgLeft, imgTop } =
        convertImageSettingsToPixels(
          calculatedImageSettings,
          size,
          numCells,
          margin
        );

      // Create an HTML img tag for OG context
      imageTag = `<img
        src="${imageSettings.src}"
        alt="Logo"
        style="position: absolute; left: ${imgLeft}px; top: ${imgTop}px; width: ${imgWidth}px; height: ${imgHeight}px;"
      />`;
    } else {
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

/**
 * Creates an SVG DOM element with the QR code
 */
export function createQRCodeSVG(options: QRCodeSVGOptions): SVGElement {
  const svgString = QRCodeSVG(options);
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const element = doc.documentElement;
  // Ensure that the element is an SVG element
  if (!(element instanceof SVGElement)) {
    throw new Error("Failed to create SVG element");
  }
  return element;
}
