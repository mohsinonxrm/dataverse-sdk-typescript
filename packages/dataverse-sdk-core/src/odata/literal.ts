import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";

/**
 * OData literals for values placed in URLs: keys (`accounts(accountnumber='A''1')`), function
 * parameters (`Fn(Name='O''Brien')` or `@p1='O''Brien'`) and `$filter` expressions.
 *
 * Every helper returns the literal as it appears in the URL before percent-encoding. Strings are
 * wrapped in single quotes with each embedded `'` doubled, as OData requires, so a value can't end
 * the literal early and change the query. Values that don't fit the type throw
 * `DataverseInvalidRequestError` (`InvalidParameter`) instead of producing a broken URL.
 *
 * @example
 * ```typescript
 * import { odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
 *
 * client.api(`EntityDefinitions(LogicalName=${odataLiteral.string(name)})`);
 * client.api("contacts").filter(`_parentcustomerid_value eq ${odataLiteral.guid(accountId)}`);
 * client.api(`RetrieveUserPrivilegeByPrivilegeName(PrivilegeName=@p1)?@p1=${encodeURIComponent(odataLiteral.string(p))}`);
 * ```
 */
export const odataLiteral = {
  /** `'value'`, with each `'` doubled: `O'Brien` → `'O''Brien'`. */
  string(value: string): string {
    if (typeof value !== "string") throw invalid("string", value, "expected a string");
    return `'${value.replace(/'/g, "''")}'`;
  },

  /**
   * A GUID, unquoted as OData writes `Edm.Guid`. Braces are removed: `{00000000-…}` → `00000000-…`.
   * Anything else throws, so an id can never carry other URL text.
   */
  guid(value: string): string {
    const bare =
      typeof value === "string" && value.startsWith("{") && value.endsWith("}")
        ? value.slice(1, -1)
        : value;
    if (
      typeof bare !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(bare)
    ) {
      throw invalid("guid", value, "expected a GUID");
    }
    return bare;
  },

  /** An integer (`Edm.Int32`/`Edm.Int64`). A `bigint` is written in full. */
  int(value: number | bigint): string {
    if (typeof value === "bigint") return value.toString();
    if (!Number.isSafeInteger(value)) throw invalid("int", value, "expected a safe integer");
    return String(value);
  },

  /** A finite number (`Edm.Decimal`/`Edm.Double`), e.g. `1000.5`. */
  number(value: number): string {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw invalid("number", value, "expected a finite number");
    }
    return String(value);
  },

  /** `true` or `false`. */
  bool(value: boolean): string {
    if (typeof value !== "boolean") throw invalid("bool", value, "expected a boolean");
    return value ? "true" : "false";
  },

  /**
   * An `Edm.DateTimeOffset`, unquoted: `2024-05-01T08:30:00.000Z`. A `Date` is written with
   * `toISOString()`; a string must already be ISO 8601 with a time and a zone (`Z` or `±hh:mm`).
   */
  datetime(value: Date | string): string {
    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) throw invalid("datetime", value, "invalid Date");
      return value.toISOString();
    }
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,7})?)?(?:Z|[+-]\d{2}:\d{2})$/i.test(value)
    ) {
      throw invalid("datetime", value, "expected a Date or an ISO 8601 date-time with a zone");
    }
    return value;
  },

  /** An `Edm.Date`, unquoted: `2024-05-01`. A `Date` gives its UTC date. */
  date(value: Date | string): string {
    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) throw invalid("date", value, "invalid Date");
      return value.toISOString().slice(0, 10);
    }
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw invalid("date", value, "expected a Date or YYYY-MM-DD");
    }
    return value;
  },

  /**
   * An enum member, `Namespace.Type'Member'`; several members are a flags value:
   * `enum("Microsoft.Dynamics.CRM.EntityFilters", ["Entity", "Attributes"])` →
   * `Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'`.
   */
  enum(enumType: string, members: string | readonly string[]): string {
    if (typeof enumType !== "string" || !/^[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+$/.test(enumType)) {
      throw invalid("enum", enumType, "expected a qualified enum type name");
    }
    const list = typeof members === "string" ? [members] : [...members];
    if (list.length === 0 || list.some((m) => !/^(?:[A-Za-z_]\w*|-?\d+)$/.test(m))) {
      throw invalid("enum", members, "expected member names or numbers");
    }
    return `${enumType}'${list.join(",")}'`;
  },

  /**
   * Pick the literal from the JavaScript type: string → `string`, integer → `int`, other numbers
   * → `number`, boolean → `bool`, `Date` → `datetime`, `null` → `null`. Use the typed helpers for
   * GUIDs, dates and enums, which a string can't express.
   */
  value(value: ODataScalar): string {
    if (value === null) return "null";
    if (typeof value === "string") return odataLiteral.string(value);
    if (typeof value === "boolean") return odataLiteral.bool(value);
    if (typeof value === "bigint") return odataLiteral.int(value);
    if (value instanceof Date) return odataLiteral.datetime(value);
    if (typeof value === "number") {
      return Number.isSafeInteger(value) ? odataLiteral.int(value) : odataLiteral.number(value);
    }
    throw invalid("value", value, "expected a string, number, bigint, boolean, Date or null");
  },
} as const;

/** A value {@link odataLiteral.value} can format. */
export type ODataScalar = string | number | bigint | boolean | Date | null;

/**
 * A record key: a GUID, or the columns of an alternate key, e.g. `{ accountnumber: "A-1" }` or
 * `{ firstname: "Jo", lastname: "O'Brien" }`.
 */
export type ODataKey = string | Readonly<Record<string, ODataScalar>>;

/**
 * The key part of a record URL, without the parentheses, ready to put in a path or an
 * `@odata.bind` / `@odata.id` URL.
 *
 * - A GUID (braces optional) → `00000000-0000-0000-0000-000000000001`.
 * - An object → an alternate key with escaped values: `{ accountnumber: "A'1" }` →
 *   `accountnumber='A''1'`; several columns are joined with `,`. Characters that would end or
 *   change the path (`#`, `?`, `/`, `%`, `&`, spaces, non-ASCII, …) are percent-encoded; `'`, `(`,
 *   `)`, `=` and `,` stay as written.
 * - Any other string is used as written, for keys built by the caller. Prefer an object for
 *   alternate keys: its values are escaped.
 *
 * Use it for any key-as-segment URL, such as `EntityDefinitions(LogicalName='account')`:
 * `` `EntityDefinitions(${odataKey({ LogicalName: name })})` ``.
 *
 * @example
 * ```typescript
 * client.api(`accounts(${odataKey({ accountnumber: input })})`).get();
 * ```
 */
export function odataKey(key: ODataKey): string {
  if (typeof key === "string") {
    try {
      return odataLiteral.guid(key);
    } catch {
      if (key === "") throw DataverseInvalidRequestError.missingParameter("key");
      return key;
    }
  }
  const entries = Object.entries(key);
  if (entries.length === 0) throw DataverseInvalidRequestError.missingParameter("key");
  return entries
    .map(([column, value]) => {
      if (!/^[A-Za-z_]\w*$/.test(column)) {
        throw DataverseInvalidRequestError.invalidParameter(
          "key",
          `"${column}" is not a column name`
        );
      }
      return `${column}=${encodeKeyLiteral(odataLiteral.value(value))}`;
    })
    .join(",");
}

/** Percent-encode a literal for a URL path, keeping the characters OData keys are written with. */
function encodeKeyLiteral(literal: string): string {
  return encodeURIComponent(literal).replace(/%(?:2C|3A|3D|40|24)/gi, decodeURIComponent);
}

function invalid(helper: string, value: unknown, reason: string): DataverseInvalidRequestError {
  const shown = typeof value === "string" ? JSON.stringify(value.slice(0, 80)) : String(value);
  return DataverseInvalidRequestError.invalidParameter(
    `odataLiteral.${helper}`,
    `${reason}, got ${shown}`
  );
}
