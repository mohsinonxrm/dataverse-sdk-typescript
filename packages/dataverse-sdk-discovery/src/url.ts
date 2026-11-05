/**
 * The lower-cased origin of an absolute http(s) URL, or `undefined` when `value` is not one.
 * Used to match an environment by its `Url` or `ApiUrl`.
 */
export function originOf(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" && u.protocol !== "http:") return undefined;
    return u.origin;
  } catch {
    return undefined;
  }
}

/** Remove trailing `/` characters in linear time (a `/\/+$/` regex is quadratic on long runs). */
export function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47) end--;
  return value.slice(0, end);
}
