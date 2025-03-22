import { Response } from "@/lib/response";
import { ErrorCodes } from "./errorCodes";

export const errorResponses = {
  400: Response.errorSchema(
    {
      description:
        "Bad Request - The request was malformed or contains invalid parameters.",
    },
    `Err${ErrorCodes.BAD_REQUEST}`
  ),
  401: Response.errorSchema(
    {
      description:
        "Unauthorized - Authentication is required and has failed or has not been provided.",
    },
    `Err${ErrorCodes.UNAUTHORIZED}`
  ),
  403: Response.errorSchema(
    {
      description:
        "Forbidden - You do not have permission to access this resource.",
    },
    `Err${ErrorCodes.FORBIDDEN}`
  ),
  404: Response.errorSchema(
    {
      description: "Not Found - The requested resource could not be found.",
    },
    `Err${ErrorCodes.NOT_FOUND}`
  ),
  409: Response.errorSchema(
    {
      description:
        "Conflict - The request conflicts with the current state of the server.",
    },
    `Err${ErrorCodes.CONFLICT}`
  ),
  422: Response.errorSchema(
    {
      description:
        "Unprocessable Entity - The request was well-formed but contains semantic errors.",
    },
    `Err${ErrorCodes.UNPROCESSABLE_ENTITY}`
  ),
  429: Response.errorSchema(
    {
      description:
        "Too Many Requests - You have sent too many requests in a given amount of time.",
    },
    `Err${ErrorCodes.TOO_MANY_REQUESTS}`
  ),
  500: Response.errorSchema(
    {
      description: "Internal Server Error - Something went wrong on our end.",
    },
    `Err${ErrorCodes.INTERNAL_SERVER_ERROR}`
  ),
};
