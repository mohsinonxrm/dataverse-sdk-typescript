/**
 * Opt-in validation of a create or update body against the column constraints the generator
 * writes into an entity's metadata (#347): `MaxLength`, `MinValue`/`MaxValue`, the choices of a
 * choice column, `RequiredLevel` and `IsValidForCreate`/`IsValidForUpdate`; and (#433) the
 * decimal places of a decimal or currency column, dates, file and image sizes, and whether a
 * status reason belongs to the state. Nothing calls it for you; Dataverse checks the same things
 * (except business-required columns) when the request arrives, so this is for failing early, for
 * example in a form.
 */
import type { AttributeMetadata, EntityMetadata, NavigationMetadata } from "./index.js";
import { isEntityReference } from "./entity-reference.js";

/** What {@link validateEntity} found wrong with one property. */
export type ValidationIssueCode =
  /** A business-required (ApplicationRequired) column or lookup is missing from a create, or set to `null`. */
  | "required"
  /** The column or lookup can't be set in a create (`IsValidForCreate` is false). */
  | "notValidForCreate"
  /** The column or lookup can't be set in an update (`IsValidForUpdate` is false). */
  | "notValidForUpdate"
  /** The text is longer than the column's `MaxLength`. */
  | "maxLength"
  /** The number is below the column's `MinValue`. */
  | "minValue"
  /** The number is above the column's `MaxValue`. */
  | "maxValue"
  /** A whole-number column was given a fraction. */
  | "notAnInteger"
  /** A choice (or choices) column was given a value that isn't one of its options. */
  | "invalidOption"
  /** The number has more decimal places than the decimal or currency column keeps (`Precision`). */
  | "precision"
  /**
   * Not a date: a date-only column takes `yyyy-mm-dd` text, a date and time column an ISO 8601
   * date and time (or a `Date`).
   */
  | "invalidDate"
  /** The date is outside the range Dataverse stores: 1753-01-01 to 9999-12-31. */
  | "dateOutOfRange"
  /** The file or image is larger than the column's `MaxSizeInKB`. */
  | "maxSize"
  /** The status reason (`statuscode`) doesn't belong to the state (`statecode`) the body sets. */
  | "invalidStatus"
  /** The value has the wrong type for the column: text for a number, an id for a lookup, … */
  | "invalidType";

/** A problem {@link validateEntity} found. */
export interface ValidationIssue {
  /** The property of the body: a column's logical name, or a lookup's navigation property. */
  property: string;
  /** What is wrong. */
  code: ValidationIssueCode;
  /** A sentence saying what is wrong, for a log or a message to the user. */
  message: string;
}

/** Options for {@link validateEntity}. */
export interface ValidateEntityOptions {
  /**
   * `"create"` (the default) also reports business-required columns and lookups the body leaves
   * out; `"update"` checks only what the body sets.
   */
  mode?: "create" | "update";

  /**
   * The organization's pricing decimal precision (`organization.pricingdecimalprecision`), for the
   * currency columns whose precision is `"pricing"`. Without it their decimal places aren't
   * checked.
   */
  pricingPrecision?: number;

  /**
   * The precision of the record's transaction currency (`transactioncurrency.currencyprecision`),
   * for the currency columns whose precision is `"currency"` (most of them). Without it their
   * decimal places aren't checked.
   */
  currencyPrecision?: number;
}

const TEXT = new Set(["String", "Memo", "EntityName"]);

/** The earliest and latest moments Dataverse stores in a date column, in UTC ms. */
const MIN_DATE_TIME = Date.UTC(1753, 0, 1);
const MAX_DATE_TIME = Date.UTC(9999, 11, 31, 23, 59, 59, 999);
const MIN_DATE = "1753-01-01";

/** A date: `yyyy-mm-dd`. */
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/** `yyyy-mm-dd`, optionally followed by a time and an offset (ISO 8601, as OData writes it). */
const DATE_TIME_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?$/;
const WHOLE_NUMBER = new Set(["Integer", "BigInt"]);
const NUMBER = new Set(["Integer", "BigInt", "Decimal", "Double", "Money"]);
const CHOICE = new Set(["Picklist", "State", "Status"]);

/**
 * Check a create or update body against the constraints in its table's generated metadata, and
 * return what's wrong (an empty array when nothing is). It reads the body as
 * `formatEntityForWrite()` takes it: columns by logical name, lookups by navigation property with
 * an `EntityReference`. Properties the metadata doesn't describe, annotations (`…@odata.bind`) and
 * `undefined` values are skipped.
 *
 * Checked:
 * - a column or lookup the mode can't set (`IsValidForCreate` / `IsValidForUpdate` false);
 * - a business-required (ApplicationRequired) column or lookup set to `null`, or, for a create,
 *   left out (system-required columns such as the primary key are filled in by Dataverse);
 * - text longer than `MaxLength`, a number outside `MinValue`/`MaxValue`, a fraction in a whole
 *   number column, and a value that isn't one of a choice column's options (for a choices
 *   column, each of the comma-separated values);
 * - more decimal places than a decimal or currency column keeps (`precision`; for a currency
 *   column that takes the pricing or the currency precision, only with
 *   `options.pricingPrecision` / `options.currencyPrecision`);
 * - a date-only column (`Edm.Date`) given anything but `yyyy-mm-dd` text, a date and time column
 *   given something that isn't an ISO 8601 date and time or a `Date`, and a date before
 *   1753-01-01 or after 9999-12-31 (the range of every Dataverse date column);
 * - a file or image (base64 text, `ArrayBuffer`, typed array or `Blob`) larger than the column's
 *   `maxSizeInKB`;
 * - a status reason that doesn't belong to the state, when the body sets both (`optionStates`);
 * - a value of the wrong type for the column, and a lookup that isn't an `EntityReference`.
 *
 * The constraints come from the metadata `dataverse-gen` generates; metadata without them (written
 * by hand, or by an older generator) checks only what it has.
 *
 * @example
 * ```typescript
 * const issues = validateEntity(account, AccountMetadata);
 * if (issues.length > 0) throw new Error(issues.map((i) => i.message).join("\n"));
 * ```
 */
export function validateEntity(
  entity: object,
  metadata: EntityMetadata,
  options: ValidateEntityOptions = {}
): ValidationIssue[] {
  const mode = options.mode ?? "create";
  const issues: ValidationIssue[] = [];
  const attributes = metadata.attributes ?? {};
  const lookups = lookupNavigation(metadata);

  for (const [property, value] of Object.entries(entity)) {
    if (value === undefined || property.includes("@")) continue;
    const attribute = own(attributes, property);
    const lookup = attribute ? undefined : own(lookups, property);
    const constraints = attribute ?? lookup;
    if (!constraints) continue;

    if (mode === "create" && constraints.isValidForCreate === false) {
      issues.push(issue(property, "notValidForCreate", `${property} can't be set in a create.`));
      continue;
    }
    if (mode === "update" && constraints.isValidForUpdate === false) {
      issues.push(issue(property, "notValidForUpdate", `${property} can't be set in an update.`));
      continue;
    }
    if (value === null) {
      if (constraints.isRequired === true) {
        issues.push(issue(property, "required", `${property} is required; it can't be null.`));
      }
      continue;
    }
    if (lookup) {
      if (!isEntityReference(value)) {
        issues.push(
          issue(property, "invalidType", `${property} is a lookup; set it with an EntityReference.`)
        );
      }
      continue;
    }
    if (attribute) issues.push(...checkValue(property, value, attribute, options));
  }

  issues.push(...checkStatus(entity as Record<string, unknown>, attributes, issues));

  if (mode === "create") {
    const required = [...Object.entries(attributes), ...Object.entries(lookups)].filter(
      ([property, c]) =>
        c.isRequired === true &&
        c.isValidForCreate !== false &&
        (entity as Record<string, unknown>)[property] === undefined
    );
    for (const [property] of required) {
      issues.push(issue(property, "required", `${property} is required.`));
    }
  }

  return issues;
}

/** The value checks of one column. */
function checkValue(
  property: string,
  value: unknown,
  attribute: AttributeMetadata,
  options: ValidateEntityOptions
): ValidationIssue[] {
  const type = attribute.attributeType;
  const wrongType = (expected: string) => [
    issue(property, "invalidType", `${property} takes ${expected}.`),
  ];

  if (attribute.maxSizeInKB !== undefined) {
    const bytes = byteSize(value);
    const max = attribute.maxSizeInKB * 1024;
    return bytes !== undefined && bytes > max
      ? [
          issue(
            property,
            "maxSize",
            `${property} is ${String(Math.ceil(bytes / 1024))} KB; the column takes at most ${String(attribute.maxSizeInKB)} KB.`
          ),
        ]
      : [];
  }

  if (isDateOnly(attribute)) return checkDateOnly(property, value);
  if (isDateTime(attribute)) return checkDateTime(property, value);

  if (attribute.isMultiSelect === true) {
    if (typeof value !== "string") return wrongType('comma-separated option values, such as "1,2"');
    const values = value === "" ? [] : value.split(",").map((v) => Number(v.trim()));
    const invalid = values.filter((v) => !isOption(v, attribute));
    return invalid.length > 0
      ? [
          issue(
            property,
            "invalidOption",
            `${property} has ${invalid.join(", ")}, not among its options (${optionList(attribute)}).`
          ),
        ]
      : [];
  }

  if (CHOICE.has(type) || attribute.optionValues !== undefined) {
    if (typeof value !== "number") return wrongType("an option value (a number)");
    return isOption(value, attribute)
      ? []
      : [
          issue(
            property,
            "invalidOption",
            `${property} is ${String(value)}, not one of its options (${optionList(attribute)}).`
          ),
        ];
  }

  if (TEXT.has(type)) {
    if (typeof value !== "string") return wrongType("text");
    const max = attribute.maxLength;
    return max !== undefined && value.length > max
      ? [
          issue(
            property,
            "maxLength",
            `${property} is ${String(value.length)} characters long; the column holds at most ${String(max)}.`
          ),
        ]
      : [];
  }

  if (NUMBER.has(type)) {
    if (typeof value !== "number" || !Number.isFinite(value)) return wrongType("a number");
    if (WHOLE_NUMBER.has(type) && !Number.isInteger(value)) {
      return [issue(property, "notAnInteger", `${property} takes a whole number.`)];
    }
    if (attribute.minValue !== undefined && value < attribute.minValue) {
      return [
        issue(
          property,
          "minValue",
          `${property} is ${String(value)}; the column's minimum is ${String(attribute.minValue)}.`
        ),
      ];
    }
    if (attribute.maxValue !== undefined && value > attribute.maxValue) {
      return [
        issue(
          property,
          "maxValue",
          `${property} is ${String(value)}; the column's maximum is ${String(attribute.maxValue)}.`
        ),
      ];
    }
    const precision = decimalPlacesKept(attribute, options);
    if (precision !== undefined && decimalPlaces(value) > precision) {
      return [
        issue(
          property,
          "precision",
          `${property} is ${String(value)}; the column keeps ${String(precision)} decimal place${precision === 1 ? "" : "s"}.`
        ),
      ];
    }
    return [];
  }

  if (type === "Boolean" && typeof value !== "boolean") return wrongType("true or false");
  return [];
}

/**
 * A status reason that doesn't belong to the state the body sets: checked when the body sets
 * both (with numbers), the status reason column has `optionStates`, and neither value already has
 * an issue. Without a state in the body, the record's state isn't known here.
 */
function checkStatus(
  entity: Record<string, unknown>,
  attributes: Record<string, AttributeMetadata>,
  found: ValidationIssue[]
): ValidationIssue[] {
  const columns = Object.entries(attributes);
  const state = columns.find(([, a]) => a.attributeType === "State")?.[0];
  const status = columns.find(([, a]) => a.attributeType === "Status" && a.optionStates)?.[0];
  if (state === undefined || status === undefined) return [];
  const stateValue = entity[state];
  const statusValue = entity[status];
  if (typeof stateValue !== "number" || typeof statusValue !== "number") return [];
  if (found.some((i) => i.property === state || i.property === status)) return [];
  const states = attributes[status].optionStates ?? {};
  const belongsTo = Object.prototype.hasOwnProperty.call(states, statusValue)
    ? states[statusValue]
    : undefined;
  return belongsTo === undefined || belongsTo === stateValue
    ? []
    : [
        issue(
          status,
          "invalidStatus",
          `${status} ${String(statusValue)} belongs to ${state} ${String(belongsTo)}, not ${String(stateValue)}.`
        ),
      ];
}

/** A date-only column: written as `yyyy-mm-dd`. */
function isDateOnly(attribute: AttributeMetadata): boolean {
  return attribute.odataType === "Edm.Date" || attribute.attributeType === "Edm.Date";
}

/** A date and time column. */
function isDateTime(attribute: AttributeMetadata): boolean {
  return (
    attribute.attributeType === "DateTime" ||
    attribute.odataType === "Edm.DateTimeOffset" ||
    attribute.attributeType === "Edm.DateTimeOffset"
  );
}

function checkDateOnly(property: string, value: unknown): ValidationIssue[] {
  const parts = typeof value === "string" ? DATE_PATTERN.exec(value) : null;
  if (!parts || !isCalendarDate(parts)) {
    return [
      issue(
        property,
        "invalidDate",
        `${property} takes a date as yyyy-mm-dd text, such as "2024-12-31".`
      ),
    ];
  }
  return (value as string) < MIN_DATE ? [outOfRange(property, value as string)] : [];
}

function checkDateTime(property: string, value: unknown): ValidationIssue[] {
  const time = dateTimeValue(value);
  if (time === undefined) {
    return [
      issue(
        property,
        "invalidDate",
        `${property} takes a date and time: ISO 8601 text, such as "2024-12-31T09:30:00Z", or a Date.`
      ),
    ];
  }
  return time < MIN_DATE_TIME || time > MAX_DATE_TIME
    ? [outOfRange(property, value instanceof Date ? value.toISOString() : String(value))]
    : [];
}

function outOfRange(property: string, value: string): ValidationIssue {
  return issue(
    property,
    "dateOutOfRange",
    `${property} is ${value}; Dataverse stores dates from 1753-01-01 to 9999-12-31.`
  );
}

/** The UTC ms of a date and time (ISO 8601 text or a `Date`), or `undefined` when it isn't one. */
function dateTimeValue(value: unknown): number | undefined {
  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isNaN(time) ? undefined : time;
  }
  if (typeof value !== "string") return undefined;
  const parts = DATE_TIME_PATTERN.exec(value);
  if (!parts || !isCalendarDate(parts)) return undefined;
  const [, , , , hour = "0", minute = "0", second = "0", fraction = "", offset = "Z"] = parts;
  if (Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) return undefined;
  // Date.UTC reads a year below 100 as 19xx, so the year is set separately
  const date = new Date(
    Date.UTC(
      2000,
      Number(parts[2]) - 1,
      Number(parts[3]),
      Number(hour),
      Number(minute),
      Number(second),
      Math.floor(Number(`0${fraction}`) * 1000)
    )
  );
  date.setUTCFullYear(Number(parts[1]));
  const offsetMinutes =
    offset === "Z"
      ? 0
      : (offset.startsWith("-") ? -1 : 1) *
        (Number(offset.slice(1, 3)) * 60 + Number(offset.slice(4, 6)));
  return date.getTime() - offsetMinutes * 60_000;
}

/** Whether the year, month and day of a {@link DATE_PATTERN} or {@link DATE_TIME_PATTERN} match are a real date. */
function isCalendarDate(parts: RegExpExecArray): boolean {
  const year = Number(parts[1]);
  const month = Number(parts[2]);
  const day = Number(parts[3]);
  if (month < 1 || month > 12 || day < 1) return false;
  const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  return day <= days;
}

/**
 * The size of a file or image in bytes: base64 text (as the Web API takes it), an `ArrayBuffer`,
 * a typed array or a `Blob`. `undefined` for anything else.
 */
function byteSize(value: unknown): number | undefined {
  if (typeof value === "string") {
    const base64 = value.replace(/\s/g, "");
    const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
    return Math.floor((base64.length * 3) / 4) - padding;
  }
  if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) return value.byteLength;
  if (typeof Blob !== "undefined" && value instanceof Blob) return value.size;
  return undefined;
}

/** The decimal places a number column keeps, when it is known. */
function decimalPlacesKept(
  attribute: AttributeMetadata,
  options: ValidateEntityOptions
): number | undefined {
  const precision = attribute.precision;
  if (precision === "pricing") return options.pricingPrecision;
  if (precision === "currency") return options.currencyPrecision;
  return precision;
}

/**
 * The decimal places of a number (`1.25` → 2, `1.5e-7` → 8), read from its 15 significant digits
 * (all a double holds exactly) so that floating point noise doesn't count: `0.1 + 0.2`
 * (`0.30000000000000004`) has 1, `1.1 * 3` (`3.3000000000000003`) has 1.
 */
function decimalPlaces(value: number): number {
  const [mantissa, exponent = "0"] = String(Number(value.toPrecision(15)))
    .toLowerCase()
    .split("e");
  const fraction = mantissa.split(".")[1]?.length ?? 0;
  return Math.max(0, fraction - Number(exponent));
}

/** The lookups' navigation properties (those the generator marks with `lookupAttribute`). */
function lookupNavigation(metadata: EntityMetadata): Record<string, NavigationMetadata> {
  return Object.fromEntries(
    Object.entries(metadata.navigation).filter(
      ([, nav]) => !nav.isCollection && nav.lookupAttribute !== undefined
    )
  );
}

function isOption(value: number, attribute: AttributeMetadata): boolean {
  return attribute.optionValues === undefined || attribute.optionValues.includes(value);
}

function optionList(attribute: AttributeMetadata): string {
  return (attribute.optionValues ?? []).join(", ");
}

function own<T>(record: Record<string, T>, key: string): T | undefined {
  return Object.prototype.hasOwnProperty.call(record, key) ? record[key] : undefined;
}

function issue(property: string, code: ValidationIssueCode, message: string): ValidationIssue {
  return { property, code, message };
}
