/**
 * Query options for one expanded navigation property, as in
 * `expand("primarycontactid", { select: ["fullname"], top: 5 })`.
 */
export interface ExpandOptions {
  /** `$select` inside the expansion. */
  select?: string[];
  /** `$filter` inside the expansion (collection-valued properties). */
  filter?: string;
  /** `$orderby` inside the expansion (collection-valued properties). */
  orderBy?: string | string[];
  /** `$top` inside the expansion (collection-valued properties). */
  top?: number;
  /** Nested expansions: a raw `$expand` string, or navigation properties with their options. */
  expand?: string | Record<string, ExpandOptions | true>;
}

/** `nav` or `nav($select=…;$filter=…;$orderby=…;$top=…;$expand=…)`. */
export function formatExpand(navigationProperty: string, options?: ExpandOptions): string {
  if (!options) return navigationProperty;
  const parts: string[] = [];
  if (options.select?.length) parts.push(`$select=${options.select.join(",")}`);
  if (options.filter) parts.push(`$filter=${options.filter}`);
  const orderBy = typeof options.orderBy === "string" ? [options.orderBy] : options.orderBy;
  if (orderBy?.length) parts.push(`$orderby=${orderBy.join(",")}`);
  if (options.top !== undefined) parts.push(`$top=${String(options.top)}`);
  if (typeof options.expand === "string") {
    if (options.expand) parts.push(`$expand=${options.expand}`);
  } else if (options.expand) {
    const nested = Object.entries(options.expand).map(([nav, o]) =>
      formatExpand(nav, o === true ? undefined : o)
    );
    if (nested.length) parts.push(`$expand=${nested.join(",")}`);
  }
  return parts.length ? `${navigationProperty}(${parts.join(";")})` : navigationProperty;
}
