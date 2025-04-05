[![TinyQRC](https://tinyqrc.com/banner.png)](https://tinyqrc.com)

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/tinyqrc">
    <img alt="" src="https://badgen.net/npm/v/tinyqrc">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=tinyqrc">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/tinyqrc">
  </a>
  <a aria-label="License" href="https://github.com/chroxify/tinyqrc/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/tinyqrc">
  </a>
</p>

## Introduction

TinyQRC is a lightweight and simple QR code generation library. Generate beautiful QR codes quickly and easily with zero dependencies.

## Features

- **Fast & Lightweight** - No dependencies, maximum performance
- **Simple API** - Intuitive and easy to use
- **Customization** - Control colors, size, and error correction levels
- **Type Safe** - Written in TypeScript with full type support

## Installation

```bash
npm install tinyqrc
# or
yarn add tinyqrc
# or
pnpm add tinyqrc
# or
bun add tinyqrc
```

## Usage

```ts
import { generateSVG } from "tinyqrc";

// Generate a QR code
const svg = await generateSVG({
  value: "https://example.com",
  size: 256,
});
```

## API Reference

### generateSVG(options)

Generates a QR code as an SVG string.

```ts
type Options = {
  value: string; // Content to encode
  size?: number; // Size in pixels (default: 128)
  level?: "L" | "M" | "Q" | "H"; // Error correction level (default: "L")
  bgColor?: string; // Background color (default: "#FFFFFF")
  fgColor?: string; // Foreground color (default: "#000000")
  margin?: number; // Margin around QR code (default: 2)
  imageSettings?: {
    src: string; // URL of the image to embed
    height?: number; // Image height
    width?: number; // Image width
    x?: number; // X position
    y?: number; // Y position
    excavate?: boolean; // Whether to clear QR code modules under the image
  };
  // Any additional SVG attributes are passed through to the root SVG element
};
```

#### Error Correction Levels

- `L`: Low (7% of data can be restored)
- `M`: Medium (15% of data can be restored)
- `Q`: Quartile (25% of data can be restored)
- `H`: High (30% of data can be restored)

Note: When using `imageSettings` with `excavate: true`, the error correction level will automatically be increased to at least 'Q' to ensure better scannability.

## Credits

Code Gen is based on [nayuki/QR-Code-generator](https://github.com/nayuki/QR-Code-generator) with modifications.

## License

MIT License.
