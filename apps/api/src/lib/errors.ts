import { ErrorCodes, type ErrorCode, getErrorInfo } from "@/utils/errorCodes";
import type { StatusCode } from "hono/utils/http-status";

type ErrorParams = {
  message?: string;
  details?: unknown;
};

export class ApiError extends Error {
  public status: StatusCode;
  public details?: unknown;

  constructor(
    public code: ErrorCode,
    params: ErrorParams = {}
  ) {
    const errorInfo = getErrorInfo(code);
    super(params.message ?? errorInfo.message);
    this.status = errorInfo.status as StatusCode;
    this.details = params.details;
    this.name = this.constructor.name;
  }
}

// Create specific error classes
export class BadRequestError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.BAD_REQUEST, params);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.UNAUTHORIZED, params);
  }
}

export class ForbiddenError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.FORBIDDEN, params);
  }
}

export class NotFoundError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.NOT_FOUND, params);
  }
}

export class ConflictError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.CONFLICT, params);
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.UNPROCESSABLE_ENTITY, params);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.TOO_MANY_REQUESTS, params);
  }
}

export class InternalServerError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.INTERNAL_SERVER_ERROR, params);
  }
}

export class ValidationError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.VALIDATION, params);
  }
}

export class ParseError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.PARSE, params);
  }
}

export class MissingPermissionError extends ApiError {
  constructor(params: ErrorParams = {}) {
    super(ErrorCodes.MISSING_PERMISSION, params);
  }
}
