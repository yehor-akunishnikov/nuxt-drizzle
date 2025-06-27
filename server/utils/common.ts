type ObjectKeysList<T extends object> = (keyof T)[];

export function pick<
  T extends object,
  K extends ObjectKeysList<T>,
>(
  data: T,
  pickKeys: K,
): Pick<T, K[number]> {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key]) => pickKeys.includes(key as keyof T),
    ),
  ) as Pick<T, K[number]>;
}

export function omit<
  T extends object,
  K extends ObjectKeysList<T>,
>(
  data: T,
  omitKeys: K,
): Omit<T, K[number]> {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key]) => !omitKeys.includes(key as keyof T),
    ),
  ) as Omit<T, K[number]>;
}
