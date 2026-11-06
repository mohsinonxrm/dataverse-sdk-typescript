/**
 * Metadata browser scenarios with `MetadataClient`. Each `#region` is shown on the page as the
 * code that runs.
 */
import { MetadataClient, type Label } from "@mohsinonxrm/dataverse-sdk-metadata";
import type { Sdk } from "../sdk/createSdk";

/** The user's label, or the first localized one. */
export function labelText(label: Label | undefined): string {
  return label?.UserLocalizedLabel?.Label ?? label?.LocalizedLabels?.[0]?.Label ?? "";
}

// #region tables
export async function listTables({ client }: Sdk) {
  const metadata = new MetadataClient(client);
  const tables = await metadata.getEntityDefinitions({
    select: [
      "LogicalName",
      "DisplayName",
      "EntitySetName",
      "PrimaryIdAttribute",
      "OwnershipType",
      "IsCustomEntity",
    ],
  });
  return tables
    .map((t) => ({
      logicalName: t.LogicalName ?? "",
      displayName: labelText(t.DisplayName),
      entitySetName: t.EntitySetName ?? "",
      primaryId: t.PrimaryIdAttribute ?? "",
      // Enums are member names: OwnershipTypes.UserOwned === "UserOwned".
      ownership: t.OwnershipType ?? "",
      custom: t.IsCustomEntity ?? false,
    }))
    .sort((a, b) => a.logicalName.localeCompare(b.logicalName));
}
// #endregion

// #region columns
export async function listColumns({ client }: Sdk, input: { table: string }) {
  const metadata = new MetadataClient(client);
  const columns = await metadata.getAttributeDefinitions(input.table, {
    select: ["LogicalName", "DisplayName", "AttributeType", "RequiredLevel", "IsCustomAttribute"],
  });
  return columns.map((c) => ({
    logicalName: c.LogicalName ?? "",
    displayName: labelText(c.DisplayName),
    type: c.AttributeType ?? "",
    required: c.RequiredLevel?.Value ?? "",
  }));
}
// #endregion

// #region picklist-cast
export async function choiceColumns({ client }: Sdk, input: { table: string }) {
  const metadata = new MetadataClient(client);
  // The cast reads only choice columns, typed as PicklistAttributeMetadata, so OptionSet
  // (which only choice columns have) can be expanded and read without a type assertion.
  const choices = await metadata.getAttributeDefinitions(input.table, {
    cast: "PicklistAttributeMetadata",
    select: ["LogicalName", "DisplayName"],
    expand: "OptionSet($select=Options)",
  });
  return choices.map((c) => ({
    logicalName: c.LogicalName ?? "",
    displayName: labelText(c.DisplayName),
    options: (c.OptionSet?.Options ?? []).map((o) => `${o.Value ?? "?"} ${labelText(o.Label)}`),
  }));
}
// #endregion

// #region string-cast
export async function textColumns({ client }: Sdk, input: { table: string }) {
  const metadata = new MetadataClient(client);
  const strings = await metadata.getAttributeDefinitions(input.table, {
    cast: "StringAttributeMetadata",
    select: ["LogicalName", "MaxLength"],
  });
  return strings.map((s) => ({ logicalName: s.LogicalName ?? "", maxLength: s.MaxLength }));
}
// #endregion

// #region lookup-cast
export async function lookupColumns({ client }: Sdk, input: { table: string }) {
  const metadata = new MetadataClient(client);
  const lookups = await metadata.getAttributeDefinitions(input.table, {
    cast: "LookupAttributeMetadata",
    select: ["LogicalName", "Targets"],
  });
  return lookups.map((l) => ({ logicalName: l.LogicalName ?? "", targets: l.Targets ?? [] }));
}
// #endregion
