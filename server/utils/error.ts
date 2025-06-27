export function createBadRequestError(
  message: string = "Invalid input data.",
) {
  return createError({
    status: 400,
    statusMessage: "Bad Request",
    message: message,
  });
}

export function createUnauthorizedError(message: string) {
  return createError({
    status: 401,
    statusMessage: "Unauthorized",
    message: message,
  });
}

export function createConflictError(message: string) {
  return createError({
    status: 409,
    statusMessage: message,
    message: message,
  });
}

export function createInternalServerError(
  message: string = "Failed to process the request.",
) {
  return createError({
    status: 500,
    statusMessage: "Internal server error",
    message: message,
  });
}
