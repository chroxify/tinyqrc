import type { App } from "@/lib/hono";
import { createRoute, z } from "@hono/zod-openapi";
import { Response } from "@/lib/response";
import { errorResponses } from "@/utils/errorResponses";
import { generateSVG } from "tinyqrc";
import {
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_LEVEL,
  DEFAULT_MARGIN,
  DEFAULT_SIZE,
  QR_LEVELS,
} from "tinyqrc";
import { InternalServerError } from "@/lib/errors";
import { generateHash } from "@/utils/hash";

const route = createRoute({
  method: "get",
  path: "/qr",
  request: {
    query: z.object({
      data: z.string().describe("The data to encode in the QR code."),
      logo: z
        .string()
        .optional()
        .describe("The logo to include in the QR code."),
      size: z.coerce
        .number()
        .optional()
        .default(DEFAULT_SIZE)
        .describe("The size of the QR code in pixels."),
      level: z
        .enum(QR_LEVELS)
        .optional()
        .default(DEFAULT_LEVEL)
        .describe("The level of error correction to use for the QR code."),
      fgColor: z
        .string()
        .optional()
        .default(DEFAULT_FGCOLOR)
        .describe("The foreground color of the QR code in hex format."),
      bgColor: z
        .string()
        .optional()
        .default(DEFAULT_BGCOLOR)
        .describe("The background color of the QR code in hex format."),
      margin: z
        .number()
        .optional()
        .default(DEFAULT_MARGIN)
        .describe("The size of the margin around the QR code."),
    }),
  },
  responses: {
    200: {
      description: "Returns a QR code SVG",
      content: {
        "image/svg+xml": {
          schema: z.string().describe("The SVG of the QR code."),
        },
      },
    },
    ...errorResponses,
  },
});

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, immutable, max-age=31536000", // Cache for 1 year
  "CDN-Cache-Control": "public, immutable, max-age=31536000", // Explicitly for CDNs including Cloudflare
  "Cloudflare-CDN-Cache-Control": "public, immutable, max-age=31536000", // Cloudflare-specific directive
};

const getQRCodeLogo = async ({
  data,
  logo,
}: {
  data: string;
  logo: string | undefined;
}) => {
  // If logo is passed, return it
  if (logo) {
    return logo;
  }

  // Default logo could be configured here
  return null;
};

export const registerQR = (app: App) => {
  app.openapi(route, async (c) => {
    try {
      const params = c.req.valid("query");
      const { data, logo, size, level, fgColor, bgColor, margin } = params;

      // Generate cache key based on all parameters
      const cacheKey = `${data}:${logo || "nologo"}:${size}:${level}:${fgColor}:${bgColor}:${margin}`;
      c.header("CF-Cache-Tag", cacheKey); // Add Cloudflare cache tag

      // Generate ETag for cache validation
      const etag = generateHash(cacheKey);
      c.header("ETag", `"${etag}"`);

      const qrCodeLogo = await getQRCodeLogo({ data, logo });

      // Generate SVG
      const svgString = generateSVG({
        value: data,
        size,
        level,
        fgColor,
        bgColor,
        margin,
        ...(qrCodeLogo
          ? {
              imageSettings: {
                src: qrCodeLogo,
                height: size / 4,
                width: size / 4,
                excavate: true,
              },
            }
          : {}),
      });

      return c.body(svgString, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "X-Content-Type-Options": "nosniff",
          "Content-Disposition": "inline",
          ETag: `"${etag}"`,
          ...CORS_HEADERS,
        },
      });
    } catch (error) {
      // Return error response
      const serverError = new InternalServerError({
        message: "Failed to generate QR code",
        details: error instanceof Error ? error.message : String(error),
      });

      return Response.error({
        error: {
          code: serverError.code,
          message: serverError.message,
          details: serverError.details,
        },
      })
        .status(serverError.status)
        .send(c);
    }
  });
};
