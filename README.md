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

TinyQRC is a lightweight and simple QR code generation library and API. Generate beautiful QR codes quickly and easily, whether through the web interface, API, or npm package.

## Features

- **Fast & Lightweight** - No dependencies, maximum performance
- **Multiple Integration Options** - Web interface, REST API, or npm package
- **Customization** - Control colors, size, and error correction levels
- **Developer-First** - Simple, intuitive, and fast API

## Quick Start

### Package

```ts
import { generateSVG } from "tinyqrc";

// Generate a QR code
const svg = await generateSVG({
  value: "https://example.com",
  size: 256,
});
```

### REST API

```bash
curl -X GET "https://api.tinyqrc.com/v1/qr\
?data=https://example.com\
&size=256"
```

[View API Documentation →](https://go.tinyqrc.com/docs)

### Web Interface

Generate QR codes instantly at [tinyqrc.com](https://tinyqrc.com).

## Credits

Code Gen is based on [nayuki/QR-Code-generator](https://github.com/nayuki/QR-Code-generator) with modifications.

## License

MIT License.
