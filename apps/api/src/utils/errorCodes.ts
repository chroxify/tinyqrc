export const ErrorCodes = {
  UNKNOWN: "UNKNOWN",
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  VALIDATION: "VALIDATION",
  PARSE: "PARSE",
  MISSING_PERMISSION: "MISSING_PERMISSION",
} as const;

export type ErrorCode = keyof typeof ErrorCodes;

interface ErrorInfo {
  message: string;
  status: number;
  details?: string;
}

export function getErrorInfo(code: ErrorCode): ErrorInfo {
  switch (code) {
    case ErrorCodes.BAD_REQUEST:
      return {
        message: "The request was malformed or contains invalid parameters",
        status: 400,
      };
    case ErrorCodes.UNAUTHORIZED:
      return {
        message:
          "Authentication is required and has failed or has not been provided",
        status: 401,
      };
    case ErrorCodes.FORBIDDEN:
      return {
        message: "You do not have permission to access this resource",
        status: 403,
      };
    case ErrorCodes.NOT_FOUND:
      return {
        message: "The requested resource could not be found",
        status: 404,
      };
    case ErrorCodes.CONFLICT:
      return {
        message: "The request conflicts with the current state of the server",
        status: 409,
      };
    case ErrorCodes.UNPROCESSABLE_ENTITY:
      return {
        message: "The request was well-formed but contains semantic errors",
        status: 422,
      };
    case ErrorCodes.TOO_MANY_REQUESTS:
      return {
        message: "You have sent too many requests in a given amount of time",
        status: 429,
      };
    case ErrorCodes.INTERNAL_SERVER_ERROR:
      return {
        message: "Something went wrong on our end",
        status: 500,
      };
    case ErrorCodes.VALIDATION:
      return {
        message: "Invalid input data",
        status: 400,
      };
    case ErrorCodes.PARSE:
      return {
        message: "Failed to parse request data",
        status: 400,
      };
    case ErrorCodes.MISSING_PERMISSION:
      return {
        message: "You do not have permission to perform this action",
        status: 403,
      };
    default:
      return {
        message: "An unknown error occurred",
        status: 500,
      };
  }
}
