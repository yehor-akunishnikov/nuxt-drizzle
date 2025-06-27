import type { z, ZodType } from "zod/v4";

export function prettyPrintError<V extends ZodType>(validator: V) {
  return (body: unknown): z.infer<V> => {
    try {
      return validator.parse(body);
    }
    catch (e) {
      throw { message: "Invalid input" };
    }
  };
}
