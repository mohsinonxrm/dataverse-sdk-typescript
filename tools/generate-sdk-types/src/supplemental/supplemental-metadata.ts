/**
 * Operations that Dataverse runs but leaves out of `$metadata` (#75). The generator merges them
 * into the parsed CSDL before generating actions, functions and messages, unless the org's
 * `$metadata` already declares an operation or type of the same name (then the org's wins).
 *
 * Add an operation here only when it works through the Web API and its signature has been
 * checked against a live org. Each entry says where its definition comes from.
 */
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { parseEdmx } from "../parsers/edmx-parser.js";

/**
 * - `ExportToExcel`: the action behind model-driven apps' "Export to Excel" (FetchXML Studio uses
 *   it). It isn't in `$metadata`, but `POST /ExportToExcel` runs. Checked live:
 *   - all five parameters are required: leaving out `QueryApi` gives "One or more parameters of
 *     the operation 'ExportToExcel' are missing", and leaving out `QueryParameters` (or sending
 *     `{}`) gives "Required field 'QueryParameters' is missing". For no query parameters send
 *     `{ Arguments: { Count: 0, IsReadOnly: true, Keys: [], Values: [] } }`;
 *   - an unknown parameter is rejected;
 *   - `View` is a view reference (`savedquery` or `userquery`);
 *   - the response is `{ "ExcelFile": "<base64>" }`, an .xlsx file.
 */
export const SUPPLEMENTAL_METADATA = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <ComplexType Name="ExportToExcelResponse">
        <Property Name="ExcelFile" Type="Edm.Binary" />
      </ComplexType>
      <Action Name="ExportToExcel">
        <Parameter Name="View" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="LayoutXml" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="QueryApi" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="QueryParameters" Type="mscrm.InputArgumentCollection" Nullable="false" />
        <ReturnType Type="mscrm.ExportToExcelResponse" Nullable="false" />
      </Action>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

/**
 * `csdl` plus the supplemental operations and types it doesn't declare. `csdl` isn't changed.
 */
export function withSupplementalMetadata(csdl: CsdlSchema): CsdlSchema {
  const extra = parseEdmx(SUPPLEMENTAL_METADATA);
  const key = (t: { namespace: string; name: string }): string => `${t.namespace}.${t.name}`;
  const has = (list: ReadonlyArray<{ namespace: string; name: string }>): Set<string> =>
    new Set(list.map(key));
  const actions = has(csdl.actions);
  const functions = has(csdl.functions);
  const complexTypes = has(csdl.complexTypes);
  return {
    ...csdl,
    complexTypes: [
      ...csdl.complexTypes,
      ...extra.complexTypes.filter((t) => !complexTypes.has(key(t))),
    ],
    actions: [...csdl.actions, ...extra.actions.filter((a) => !actions.has(key(a)))],
    functions: [...csdl.functions, ...extra.functions.filter((f) => !functions.has(key(f)))],
  };
}
