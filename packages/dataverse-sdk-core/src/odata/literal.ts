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
   * `Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'`. A string is split on commas, so
   * `"Entity, Attributes"` gives the same literal. A member can also be a number (`'3'`).
   */
  enum(enumType: string, members: string | readonly string[]): string {
    if (typeof enumType !== "string" || !/^[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+$/.test(enumType)) {
      throw invalid("enum", enumType, "expected a qualified enum type name");
    }
    const list =
      typeof members === "string" ? members.split(",").map((m) => m.trim()) : [...members];
    if (list.length === 0 || list.some((m) => !/^(?:[A-Za-z_]\w*|-?\d+)$/.test(m))) {
      throw invalid("enum", members, "expected member names or numbers");
    }
    return `${enumType}'${list.join(",")}'`;
  },

  /** An `Edm.Duration`, ISO 8601: `P1DT2H` → `duration'P1DT2H'`. */
  duration(value: string): string {
    if (
      typeof value !== "string" ||
      !/^-?P(?=\d|T\d)(?:\d+D)?(?:T(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?)?$/.test(value)
    ) {
      throw invalid("duration", value, "expected an ISO 8601 duration such as P1DT2H");
    }
    return `duration'${value}'`;
  },

  /**
   * An `Edm.Binary` from base64 (or base64url) text: `AQID` → `binary'AQID'`. It is written in
   * base64url (`+` → `-`, `/` → `_`) without padding.
   */
  binary(base64: string): string {
    if (typeof base64 !== "string") throw invalid("binary", base64, "expected base64 text");
    let end = base64.length;
    // A loop rather than /=+$/, which backtracks on long runs of "=".
    while (end > 0 && base64[end - 1] === "=") end--;
    const body = base64.slice(0, end);
    if (!/^[A-Za-z0-9+/_-]*$/.test(body)) throw invalid("binary", base64, "expected base64 text");
    return `binary'${body.replace(/\+/g, "-").replace(/\//g, "_")}'`;
  },

  /**
   * The path of one record, `<entity set>(<key>)`, as `@odata.id` and bound operations use it:
   * `{ logicalName: "account", id, entitySetName: "accounts" }` → `accounts(<id>)`. The id is
   * written by {@link odataKey}, so a GUID loses its braces.
   *
   * @throws DataverseInvalidRequestError when the reference has no `entitySetName`.
   */
  recordPath(reference: ODataRecordReference): string {
    if (!reference.entitySetName) {
      throw DataverseInvalidRequestError.invalidParameter(
        "target",
        `the reference to '${reference.logicalName}' needs an entitySetName (e.g. "accounts")`
      );
    }
    return `${reference.entitySetName}(${odataKey(reference.id.trim())})`;
  },

  /**
   * A record reference as a parameter value: `{"@odata.id":"accounts(<id>)"}`.
   *
   * @throws DataverseInvalidRequestError when the reference has no `entitySetName`.
   */
  reference(reference: ODataRecordReference): string {
    return JSON.stringify({ "@odata.id": odataLiteral.recordPath(reference) });
  },

  /**
   * JSON for a complex value, a collection or an entity: `{"PageNumber":1}`, `["account"]`. A
   * record reference inside it (an object with a string `logicalName` and `id`) becomes
   * `{"@odata.id":"<entity set>(<id>)"}`.
   */
  json(value: unknown): string {
    return JSON.stringify(value, (_key, item: unknown) =>
      isRecordReference(item) ? { "@odata.id": odataLiteral.recordPath(item) } : item
    );
  },

  /**
   * The literal for an operation parameter of the given OData type, for a parameter alias
   * (`Fn(Name=@p1)?@p1=<literal>`, URL-encoded) or inline. The generated functions use it, through
   * `formatParameterAlias` in the functions and entities-runtime packages.
   *
   * | OData type                                 | Literal                                       |
   * | ------------------------------------------ | --------------------------------------------- |
   * | `Edm.String`                               | `'O''Brien'` (quoted, `'` doubled)            |
   * | `Edm.Guid`                                 | `00000000-0000-0000-0000-000000000001` (bare) |
   * | `Edm.DateTimeOffset` / `Edm.Date`          | `2024-05-01T10:00:00.000Z` / `2024-05-01`     |
   * | `Edm.Int32`, `Edm.Int64` (also a `bigint`) | `42`, `9007199254740993`                      |
   * | `Edm.Decimal`, `Edm.Double`, `Edm.Boolean` | `1.5`, `true`                                 |
   * | `Edm.Duration`, `Edm.Binary` (base64)      | `duration'P1D'`, `binary'AQID'` (base64url)   |
   * | enum type (`kind: "EnumerationType"`)      | `Microsoft.Dynamics.CRM.AccessRights'1'`      |
   * | entity type, given a reference             | `{"@odata.id":"accounts(<id>)"}`              |
   * | complex or entity type, collections        | JSON (`{"PageNumber":1}`, `["account"]`)      |
   *
   * `null` and `undefined` become `null`. A value that can't be a literal of its type (a GUID that
   * isn't one, `NaN`, an enum member with a quote) throws `DataverseInvalidRequestError` instead of
   * sending a request the Web API rejects.
   */
  parameter(value: unknown, odataType: string, kind: ODataParameterKind = "PrimitiveType"): string {
    if (value === null || value === undefined) return "null";

    if (kind === "Collection" || Array.isArray(value) || odataType.startsWith("Collection(")) {
      return odataLiteral.json(value);
    }

    if (value instanceof Date) {
      return odataType === "Edm.Date" ? odataLiteral.date(value) : odataLiteral.datetime(value);
    }

    if (kind === "EntityType" || kind === "ComplexType" || typeof value === "object") {
      return odataLiteral.json(value);
    }

    if (kind === "EnumerationType") {
      // An enum literal names its type (`mscrm.EntityFilters` → `Microsoft.Dynamics.CRM.EntityFilters`).
      return odataLiteral.enum(
        `Microsoft.Dynamics.CRM.${odataType.slice(odataType.lastIndexOf(".") + 1)}`,
        scalarText(value)
      );
    }

    switch (odataType) {
      case "Edm.String":
        return odataLiteral.string(scalarText(value));
      case "Edm.Guid":
        return odataLiteral.guid(scalarText(value).trim());
      case "Edm.Date": {
        // A date-time string gives its date.
        const text = scalarText(value);
        return odataLiteral.date(isDateTime(text) ? text.slice(0, 10) : text);
      }
      case "Edm.DateTimeOffset": {
        // The Web API also reads a date alone, as midnight UTC.
        const text = scalarText(value);
        return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : odataLiteral.datetime(text);
      }
      case "Edm.Duration":
        return odataLiteral.duration(scalarText(value));
      case "Edm.Binary":
        return odataLiteral.binary(scalarText(value));
      case "Edm.Boolean":
        return value === "true" || value === "false" ? value : odataLiteral.bool(value as boolean);
      case "Edm.Byte":
      case "Edm.SByte":
      case "Edm.Int16":
      case "Edm.Int32":
      case "Edm.Int64":
        return typeof value === "string" && /^-?\d+$/.test(value)
          ? value
          : odataLiteral.int(value as number | bigint);
      case "Edm.Decimal":
      case "Edm.Double":
      case "Edm.Single":
        if (typeof value === "string" && /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value)) {
          return value;
        }
        return typeof value === "bigint"
          ? odataLiteral.int(value)
          : odataLiteral.number(value as number);
      default:
        // Any other type: a number as written (finite only), a string or boolean as it is.
        return typeof value === "number" ? odataLiteral.number(value) : scalarText(value);
    }
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

/** Structural kind of an operation parameter, as the code generators classify it. */
export type ODataParameterKind =
  "PrimitiveType" | "EnumerationType" | "ComplexType" | "EntityType" | "Collection";

/** A record to bind an operation to, or to pass as an entity-typed parameter. */
export interface ODataRecordReference {
  /** Logical name of the table, e.g. `account`. */
  logicalName: string;
  /** The record's GUID (braces optional). */
  id: string;
  /** Entity set of the table, e.g. `accounts`. Needed to build the record's path. */
  entitySetName?: string;
}

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

function isRecordReference(value: unknown): value is ODataRecordReference {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ODataRecordReference).logicalName === "string" &&
    typeof (value as ODataRecordReference).id === "string"
  );
}

/** A scalar parameter value as text: a string as it is, a number, bigint or boolean as written. */
function scalarText(value: unknown): string {
  return typeof value === "string" ? value : String(value);
}

function isDateTime(text: string): boolean {
  try {
    odataLiteral.datetime(text);
    return true;
  } catch {
    return false;
  }
}

function invalid(helper: string, value: unknown, reason: string): DataverseInvalidRequestError {
  const shown = typeof value === "string" ? JSON.stringify(value.slice(0, 80)) : String(value);
  return DataverseInvalidRequestError.invalidParameter(
    `odataLiteral.${helper}`,
    `${reason}, got ${shown}`
  );
}
