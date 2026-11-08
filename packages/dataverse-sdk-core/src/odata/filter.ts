import { odataLiteral } from "./literal.js";

/** A value `odata.eq()` and `odata.ne()` compare with. */
/** A value `odata.eq()` / `odata.ne()` accept: formatted as an OData literal. */
export type EqValue = string | number | boolean | Date | null;

/**
 * Type-safe OData filter expression builder with automatic value escaping.
 *
 * Use this instead of raw string interpolation to prevent OData injection
 * when user-supplied values are included in filters. Values are written with
 * {@link odataLiteral}: strings are quoted with `'` doubled, numbers must be finite, and a `Date`
 * becomes an `Edm.DateTimeOffset` literal. For a GUID, use `odataLiteral.guid()` in the expression.
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
  eq: (field: string, value: EqValue): string => `${field} eq ${odataLiteral.value(value)}`,

  ne: (field: string, value: EqValue): string => `${field} ne ${odataLiteral.value(value)}`,

  gt: (field: string, value: number | Date): string => `${field} gt ${odataLiteral.value(value)}`,
  ge: (field: string, value: number | Date): string => `${field} ge ${odataLiteral.value(value)}`,
  lt: (field: string, value: number | Date): string => `${field} lt ${odataLiteral.value(value)}`,
  le: (field: string, value: number | Date): string => `${field} le ${odataLiteral.value(value)}`,

  contains: (field: string, value: string): string =>
    `contains(${field},${odataLiteral.string(value)})`,

  startsWith: (field: string, value: string): string =>
    `startswith(${field},${odataLiteral.string(value)})`,

  endsWith: (field: string, value: string): string =>
    `endswith(${field},${odataLiteral.string(value)})`,

  and: (...clauses: string[]): string => `(${clauses.join(" and ")})`,
  or: (...clauses: string[]): string => `(${clauses.join(" or ")})`,
  not: (clause: string): string => `not (${clause})`,
} as const;
