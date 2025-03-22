import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { Response } from "./response";
import { ApiError, NotFoundError, InternalServerError } from "./errors";
import type { StatusCode } from "hono/utils/http-status";

type Bindings = {
  ASSETS: {
    fetch: typeof fetch;
  };
};

export function App() {
  const app = new OpenAPIHono<{ Bindings: Bindings }>({
    defaultHook: (result, c) => {
      if (!result.success) {
        return Response.error({
          error: {
            code: "VALIDATION",
            message: "Validation error",
            details: result.error.issues,
          },
        })
          .status(422)
          .send(c);
      }
    },
  });

  app.onError((err, c) => {
    if (err instanceof ApiError) {
      return Response.error({
        error: {
          code: err.code,
          message: err.message,
          details: err.details,
        },
      })
        .status(err.status as StatusCode)
        .send(c);
    }

    // Handle unknown errors
    const internalError = new InternalServerError({ message: err.message });
    return Response.error({
      error: {
        code: internalError.code,
        message: internalError.message,
      },
    })
      .status(internalError.status)
      .send(c);
  });

  app.notFound((c) => {
    const notFoundError = new NotFoundError();
    return Response.error({
      error: {
        code: notFoundError.code,
        message: notFoundError.message,
      },
    })
      .status(notFoundError.status)
      .send(c);
  });

  app.doc("openapi.json", {
    openapi: "3.1.0",
    info: {
      title: "Tinyqrc API",
      version: "1.0.0",
    },
  });

  app.get(
    "/swagger",
    apiReference({
      spec: {
        url: "/openapi.json",
      },
    })
  );

  return app;
}

export type App = ReturnType<typeof App>;
