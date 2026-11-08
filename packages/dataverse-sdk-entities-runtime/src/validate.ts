/**
 * Opt-in validation of a create or update body against the column constraints the generator
 * writes into an entity's metadata (#347): `MaxLength`, `MinValue`/`MaxValue`, the choices of a
 * choice column, `RequiredLevel` and `IsValidForCreate`/`IsValidForUpdate`. Nothing calls it for
 * you; Dataverse checks the same things (except business-required columns) when the request
 * arrives, so this is for failing early, for example in a form.
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
}

const TEXT = new Set(["String", "Memo", "EntityName"]);
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
    if (attribute) issues.push(...checkValue(property, value, attribute));
  }

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
  attribute: AttributeMetadata
): ValidationIssue[] {
  const type = attribute.attributeType;
  const wrongType = (expected: string) => [
    issue(property, "invalidType", `${property} takes ${expected}.`),
  ];

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
    return [];
  }

  if (type === "Boolean" && typeof value !== "boolean") return wrongType("true or false");
  return [];
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
