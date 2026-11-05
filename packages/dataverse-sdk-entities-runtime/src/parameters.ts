/**
 * Serialization of Web API operation parameters, shared by the code generators.
 *
 * Function parameters travel in the URL as parameter aliases
 * (`WhoAmI()`, `RetrieveTotalRecordCount(EntityNames=@p1)?@p1=["account"]`), so each value must
 * be an OData literal. These helpers build those literals from the parameter's OData type.
 */
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";

/** Structural kind of an operation parameter, as the generator classifies it. */
export type ParameterKind =
  "PrimitiveType" | "EnumerationType" | "ComplexType" | "EntityType" | "Collection";

/** A record to bind an operation to, or to pass as an entity-typed parameter. */
interface RecordReference {
  logicalName: string;
  id: string;
  entitySetName?: string;
}

function isRecordReference(value: unknown): value is RecordReference {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as RecordReference).logicalName === "string" &&
    typeof (value as RecordReference).id === "string"
  );
}

/** A GUID without the braces some APIs put around it. */
function bareGuid(id: string): string {
  return id.trim().replace(/^\{|\}$/g, "");
}

/** The schema type name without its namespace or alias (`mscrm.AccessRights` -> `AccessRights`). */
function typeName(odataType: string): string {
  const name = odataType.replace(/^Collection\((.*)\)$/, "$1");
  return name.slice(name.lastIndexOf(".") + 1);
}

/**
 * The path of one record, `<entity set>(<id>)`, for binding an operation to it.
 *
 * @throws DataverseInvalidRequestError when the reference has no `entitySetName`.
 */
export function formatRecordPath(reference: RecordReference): string {
  if (!reference.entitySetName) {
    throw DataverseInvalidRequestError.invalidParameter(
      "target",
      `the reference to '${reference.logicalName}' needs an entitySetName (e.g. "accounts")`
    );
  }
  return `${reference.entitySetName}(${bareGuid(reference.id)})`;
}

/** JSON for a structured value; a record reference becomes `{"@odata.id": "<set>(<id>)"}`. */
function toJson(value: unknown): string {
  return JSON.stringify(value, (_key, item: unknown) =>
    isRecordReference(item) ? { "@odata.id": formatRecordPath(item) } : item
  );
}

/**
 * Format a function parameter value as the OData literal for a parameter alias. The caller
 * URL-encodes the result.
 *
 * | OData type                               | Literal                                         |
 * | ---------------------------------------- | ----------------------------------------------- |
 * | `Edm.String`                             | `'O''Brien'` (quoted, `'` doubled)              |
 * | `Edm.Guid`                               | `00000000-0000-0000-0000-000000000001` (bare)   |
 * | `Edm.DateTimeOffset` / `Edm.Date`        | `2024-05-01T10:00:00.000Z` / `2024-05-01`       |
 * | `Edm.Int32`, `Edm.Decimal`, `Edm.Boolean`| `42`, `1.5`, `true`                             |
 * | `Edm.Duration`, `Edm.Binary` (base64)    | `duration'P1D'`, `binary'AQID'` (base64url)     |
 * | enum type (`kind: "EnumerationType"`)    | `Microsoft.Dynamics.CRM.AccessRights'1'`        |
 * | entity type, given a reference           | `{"@odata.id":"accounts(<id>)"}`                |
 * | complex or entity type, collections      | JSON (`{"PageNumber":1}`, `["account"]`)        |
 *
 * `null` becomes `null`.
 */
export function formatParameterAlias(
  value: unknown,
  odataType: string,
  kind: ParameterKind = "PrimitiveType"
): string {
  if (value === null || value === undefined) return "null";

  if (kind === "Collection" || Array.isArray(value) || odataType.startsWith("Collection(")) {
    return toJson(value);
  }

  if (value instanceof Date) {
    const iso = value.toISOString();
    return odataType === "Edm.Date" ? iso.slice(0, 10) : iso;
  }

  if (kind === "EntityType" || kind === "ComplexType" || typeof value === "object") {
    return toJson(value);
  }

  // A scalar: a string as it is, a number or boolean as JSON writes it.
  const text = typeof value === "string" ? value : JSON.stringify(value);

  if (kind === "EnumerationType") {
    // An enum literal names its type; the value can be a member name or its number.
    return `Microsoft.Dynamics.CRM.${typeName(odataType)}'${text}'`;
  }

  switch (odataType) {
    case "Edm.String":
      return `'${text.replace(/'/g, "''")}'`;
    case "Edm.Guid":
      return bareGuid(text);
    case "Edm.Date":
      return text.slice(0, 10);
    case "Edm.Duration":
      return `duration'${text}'`;
    case "Edm.Binary":
      // The literal takes base64url.
      return `binary'${text.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}'`;
    default:
      // Numbers, booleans, and DateTimeOffset given as an ISO string.
      return text;
  }
}
