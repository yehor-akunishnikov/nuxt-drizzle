import type { z, ZodType } from "zod/v4";

export function prettyPrintError<V extends ZodType>(validator: V) {
  return (body: unknown): z.infer<V> => {
    const { data } = validator.safeParse(body);

    if (data) {
      return data;
    }
    else {
      throw { message: "Invalid input" };
    }
  };
}
