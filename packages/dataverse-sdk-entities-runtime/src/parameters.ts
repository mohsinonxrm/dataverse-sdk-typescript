/**
 * Serialization of Web API operation parameters, shared by the code generators.
 *
 * Function parameters travel in the URL as parameter aliases
 * (`WhoAmI()`, `RetrieveTotalRecordCount(EntityNames=@p1)?@p1=["account"]`), so each value must
 * be an OData literal. These helpers build those literals from the parameter's OData type.
 *
 * They call `odataLiteral` in `@mohsinonxrm/dataverse-sdk-core` (#254), the one implementation of
 * OData literals that the generated functions package uses too.
 */
import {
  odataLiteral,
  type ODataParameterKind,
  type ODataRecordReference,
  type ODataTypeName,
} from "@mohsinonxrm/dataverse-sdk-core";

/** Structural kind of an operation parameter, as the generator classifies it. */
export type ParameterKind = ODataParameterKind;

/**
 * The path of one record, `<entity set>(<id>)`, for binding an operation to it. Same as core's
 * `odataLiteral.recordPath()`.
 *
 * @throws DataverseInvalidRequestError when the reference has no `entitySetName`.
 */
export function formatRecordPath(reference: ODataRecordReference): string {
  return odataLiteral.recordPath(reference);
}

/**
 * Format a function parameter value as the OData literal for a parameter alias. The caller
 * URL-encodes the result. Same as core's `odataLiteral.parameter()`.
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
 * `null` becomes `null`. A value that can't be a literal of its type throws
 * `DataverseInvalidRequestError`.
 */
export function formatParameterAlias(
  value: unknown,
  odataType: ODataTypeName,
  kind: ParameterKind = "PrimitiveType"
): string {
  return odataLiteral.parameter(value, odataType, kind);
}
