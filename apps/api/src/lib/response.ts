import type { Context } from 'hono';
import { s } from './sqids';
import type { StatusCode } from 'hono/utils/http-status';
import { z } from '@hono/zod-openapi';
import type { ResponseConfig as OpenAPIResponseConfig } from '@asteasolutions/zod-to-openapi';
import { ErrorCodes, type ErrorCode } from '@/utils/errorCodes';

// Define types for error and pagination
type ErrorType = {
  code: ErrorCode;
  message: string;
  details?: unknown;
};

type PaginationType = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
};

// Type utility to transform ids to sqids
type TransformIdToString<T> = T extends Array<infer U>
  ? Array<TransformIdToString<U>>
  : T extends object
    ? {
        [K in keyof T]: K extends string
          ? K extends `${string}id${string}`
            ? string
            : K extends `${string}Id${string}`
              ? string
              : T[K] extends object
                ? TransformIdToString<T[K]>
                : T[K]
          : T[K];
      }
    : T;

class AppError {
  constructor(
    private status: StatusCode,
    private code: ErrorCode,
    private message: string,
    private details?: unknown
  ) {}

  withDetails(details: unknown) {
    this.details = details;
    return this;
  }

  send(c?: Context) {
    if (c && this.status) {
      c.status(this.status);
    }
    return {
      success: false,
      data: null,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
      metadata: {
        timestamp: Date.now(),
        pagination: null,
      },
    };
  }
}

class AppErrorBuilder {
  constructor(
    private status: StatusCode,
    private code: ErrorCode,
    private message: string,
    private details?: unknown
  ) {}

  withDetails(details: unknown) {
    this.details = details;
    return this;
  }

  getError(): ErrorType {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }

  getStatus(): StatusCode {
    return this.status;
  }

  send(c: Context) {
    c.status(this.status);

    return c.json({
      success: false,
      data: null,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
      metadata: {
        timestamp: Date.now(),
        pagination: null,
      },
    });
  }
}

type SuccessParams<T> = {
  data: T;
  pagination?: PaginationType;
  ignoreTransform?: string[];
  forceTransform?: string[];
};

type ErrorParams = {
  error:
    | {
        code: ErrorCode;
        message: string;
        details?: unknown;
      }
    | AppErrorBuilder;
};

function transformIds<T>(data: T, ignoreKeys: string[] = [], forceTransform: string[] = []): T {
  if (!data || typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    // If array contains only numbers, transform the whole array
    if (data.every((item) => typeof item === 'number')) {
      return data.map((num) => s.encode([num])) as T;
    }
    return data.map((item) => transformIds(item, ignoreKeys, forceTransform)) as T;
  }

  const transformed = { ...data };
  for (const key in transformed) {
    // Skip if key is in ignoreKeys
    if (ignoreKeys.includes(key)) continue;

    // Transform if key is in forceTransform or contains 'id' and value is number
    if (
      (forceTransform.includes(key) && typeof transformed[key] === 'number') ||
      (key.toLowerCase().includes('id') && typeof transformed[key] === 'number')
    ) {
      // @ts-expect-error
      transformed[key] = s.encode([transformed[key]]);
    }
    // Recursively transform nested objects
    else if (typeof transformed[key] === 'object') {
      transformed[key] = transformIds(transformed[key], ignoreKeys, forceTransform);
    }
  }

  return transformed as T;
}

class SuccessResponseBuilder<T> {
  private _data: T;
  private _status: StatusCode = 200;
  private _pagination?: PaginationType;
  private _ignoreTransform: string[];
  private _forceTransform: string[];

  constructor(params: SuccessParams<T>) {
    this._data = params.data;
    this._pagination = params.pagination;
    this._ignoreTransform = params.ignoreTransform ?? [];
    this._forceTransform = params.forceTransform ?? [];
  }

  status(status: StatusCode) {
    this._status = status;
    return this;
  }

  send(c: Context) {
    c.status(this._status);

    const responseBody = {
      success: true,
      data: transformIds(this._data, this._ignoreTransform, this._forceTransform) as TransformIdToString<T>,
      error: null,
      metadata: {
        timestamp: Date.now(),
        pagination: this._pagination,
      },
    };

    return c.json(responseBody);
  }
}

class ErrorResponseBuilder {
  private _error: ErrorType;
  private _status: StatusCode = 500;

  constructor(params: ErrorParams) {
    if (params.error instanceof AppErrorBuilder) {
      this._error = params.error.getError();
      this._status = params.error.getStatus();
    } else {
      this._error = params.error;
    }
  }

  status(status: StatusCode) {
    this._status = status;
    return this;
  }

  send(c: Context) {
    c.status(this._status);

    const responseBody = {
      success: false,
      data: null,
      error: this._error,
      metadata: {
        timestamp: Date.now(),
        pagination: undefined,
      },
    };

    return c.json(responseBody);
  }
}

export const Response = {
  success: <T>(params: SuccessParams<T>) => new SuccessResponseBuilder(params),
  error: (params: ErrorParams) => new ErrorResponseBuilder(params),
  AppError: AppErrorBuilder,
  schema: (schema: z.ZodType, config: Partial<OpenAPIResponseConfig> = {}): OpenAPIResponseConfig => ({
    description: config.description ?? 'Successful response',
    headers: config.headers,
    links: config.links,
    content: {
      'application/json': {
        schema: z
          .object({
            success: z.literal(true),
            data: schema,
            error: z.null(),
            metadata: z.object({
              timestamp: z.number(),
              pagination: z
                .object({
                  page: z.number(),
                  limit: z.number(),
                  totalItems: z.number(),
                  totalPages: z.number(),
                  hasMore: z.boolean(),
                })
                .optional(),
            }),
          })
          .openapi('SuccessResponse'),
      },
    },
  }),
  errorSchema: (config: Partial<OpenAPIResponseConfig> = {}, name?: string): OpenAPIResponseConfig => ({
    description: config.description ?? 'Error response',
    headers: config.headers,
    links: config.links,
    content: {
      'application/json': {
        schema: z
          .object({
            success: z.literal(false),
            data: z.null(),
            error: z.object({
              code: z
                .enum([
                  ErrorCodes.UNKNOWN,
                  ErrorCodes.BAD_REQUEST,
                  ErrorCodes.UNAUTHORIZED,
                  ErrorCodes.FORBIDDEN,
                  ErrorCodes.NOT_FOUND,
                  ErrorCodes.CONFLICT,
                  ErrorCodes.UNPROCESSABLE_ENTITY,
                  ErrorCodes.TOO_MANY_REQUESTS,
                  ErrorCodes.INTERNAL_SERVER_ERROR,
                  ErrorCodes.VALIDATION,
                  ErrorCodes.PARSE,
                  ErrorCodes.MISSING_PERMISSION,
                ])
                .openapi({ type: 'string', description: 'Error code' }),
              message: z.string(),
              details: z.unknown().nullable().optional(),
            }),
            metadata: z.object({
              timestamp: z.number(),
              pagination: z.null(),
            }),
          })
          .openapi(name ?? 'ErrorResponse'),
      },
    },
  }),
};
