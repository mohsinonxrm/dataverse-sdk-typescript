/**
 * Escape a string value for safe use in OData filter expressions.
 * Doubles single-quote characters per OData spec (ABNF section 7.3.1).
 */
function escapeString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

/**
 * Type-safe OData filter expression builder with automatic value escaping.
 *
 * Use this instead of raw string interpolation to prevent OData injection
 * when user-supplied values are included in filters.
 *
 * @example
 * ```typescript
 * import { odata } from '@mohsinonxrm/dataverse-sdk-core';
 *
 * const filter = odata.and(
 *   odata.eq('name', userInput),       // single quotes escaped automatically
 *   odata.gt('revenue', 1000),
 *   odata.contains('emailaddress1', '@contoso.com')
 * );
 *
 * const results = await client.api('contacts').filter(filter).getAll();
 * ```
 */
export const odata = {
  eq: (field: string, value: string | number | boolean | null): string =>
    typeof value === "string"
      ? `${field} eq ${escapeString(value)}`
      : `${field} eq ${String(value)}`,

  ne: (field: string, value: string | number | boolean | null): string =>
    typeof value === "string"
      ? `${field} ne ${escapeString(value)}`
      : `${field} ne ${String(value)}`,

  gt: (field: string, value: number): string => `${field} gt ${String(value)}`,
  ge: (field: string, value: number): string => `${field} ge ${String(value)}`,
  lt: (field: string, value: number): string => `${field} lt ${String(value)}`,
  le: (field: string, value: number): string => `${field} le ${String(value)}`,

  contains: (field: string, value: string): string =>
    `contains(${field},${escapeString(value)})`,

  startsWith: (field: string, value: string): string =>
    `startswith(${field},${escapeString(value)})`,

  endsWith: (field: string, value: string): string =>
    `endswith(${field},${escapeString(value)})`,

  and: (...clauses: string[]): string => `(${clauses.join(" and ")})`,
  or: (...clauses: string[]): string => `(${clauses.join(" or ")})`,
  not: (clause: string): string => `not (${clause})`,
} as const;
