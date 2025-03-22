import type { App } from "@/lib/hono";
import { createRoute, z } from "@hono/zod-openapi";
import { Response } from "@/lib/response";
import { errorResponses } from "@/utils/errorResponses";

const route = createRoute({
  method: "get",
  path: "/health",
  responses: {
    200: Response.schema(
      z.object({
        status: z.string(),
      }),
      {
        description: "Check the health of the server",
      }
    ),
    ...errorResponses,
  },
});

export const registerHealth = (app: App) => {
  app.openapi(route, (c) => {
    return Response.success({
      data: {
        status: "OK",
      },
    }).send(c);
  });
};
