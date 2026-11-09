/**
 * Live tests for MetadataClient creates (#64): a temporary table, a column and a 1:N
 * relationship are created, their ids read from the `OData-EntityId` header, then deleted. The
 * merge helpers (#359) update the table, the relationship and a throwaway column, and the
 * properties they don't change keep their values.
 * See ./env.ts for configuration. Everything is named with this run's id and removed in
 * `afterAll`, even when a test fails.
 *
 * New metadata reaches the org's servers' metadata caches over several seconds, so a read or
 * delete right after a create can get "does not exist" from one server and succeed on the next.
 * `eventually()` retries for that.
 */
import { afterAll, describe, expect, it } from "vitest";
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import type { Label, OneToManyRelationshipMetadata } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// A table create takes 30 to 70 seconds.
const SLOW = 300_000;

const tag = (runId.split("-").at(-1) ?? "x").toLowerCase();
const table = `new_sdkit${tag}`;
const relationship = `new_account_sdkit${tag}`;

const label = (text: string): Label => ({
  "@odata.type": "Microsoft.Dynamics.CRM.Label",
  LocalizedLabels: [
    { "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel", Label: text, LanguageCode: 1033 },
  ],
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retry `fn` until it resolves, for up to `ms` (metadata cache propagation). */
async function eventually<T>(fn: () => Promise<T>, ms = 120_000): Promise<T> {
  const deadline = Date.now() + ms;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (Date.now() > deadline) throw err;
      await sleep(5_000);
    }
  }
}

let tableId: string | undefined;

/**
 * Delete the table. Only a 204 or several 404s in a row count as gone: right after a create,
 * a server whose cache is behind answers 404 for a table that still exists.
 */
async function deleteTable(metadata: MetadataClient): Promise<void> {
  let notFound = 0;
  for (let attempt = 1; attempt <= 20; attempt++) {
    try {
      await metadata.deleteEntityDefinition(table);
      return;
    } catch (err) {
      notFound = (err as { status?: number }).status === 404 ? notFound + 1 : 0;
      if (notFound >= 3) return;
    }
    await sleep(10_000);
  }
  throw new Error(`Could not delete the temporary table ${table}; delete it by hand.`);
}

afterAll(async () => {
  if (!live || !tableId) return;
  await deleteTable(new MetadataClient(liveClient().client));
}, SLOW);

describe.skipIf(!live)("live: metadata creates (#64)", () => {
  it(
    "createEntityDefinition returns the new table's MetadataId from OData-EntityId",
    async () => {
      const metadata = new MetadataClient(liveClient().client);
      tableId = await metadata.createEntityDefinition({
        "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
        SchemaName: table,
        DisplayName: label(`SDK test ${tag}`),
        DisplayCollectionName: label(`SDK tests ${tag}`),
        Description: label("Created by the SDK integration tests; safe to delete."),
        OwnershipType: "UserOwned",
        HasActivities: false,
        HasNotes: false,
        IsActivity: false,
        Attributes: [
          {
            "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
            SchemaName: "new_Name",
            IsPrimaryName: true,
            RequiredLevel: { Value: "None" },
            MaxLength: 100,
            FormatName: { Value: "Text" },
            DisplayName: label("Name"),
          },
        ],
        // The create types gain `@odata.type` and string enum members with #66 / #171.
      });

      expect(tableId).toMatch(GUID);
      const id = tableId;
      const def = await eventually(() =>
        liveClient()
          .client.api(`EntityDefinitions(${id})`)
          .select("LogicalName")
          .get<{ LogicalName: string }>()
      );
      expect(def.LogicalName).toBe(table);
    },
    SLOW
  );

  it(
    "createAttributeDefinition returns the new column's MetadataId",
    async () => {
      const metadata = new MetadataClient(liveClient().client);
      const id = await eventually(() =>
        metadata.createAttributeDefinition(table, {
          "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
          SchemaName: "new_Note",
          RequiredLevel: { Value: "None" },
          MaxLength: 200,
          FormatName: { Value: "Text" },
          DisplayName: label("Note"),
        })
      );

      expect(id).toMatch(GUID);
      const attr = await eventually(() =>
        metadata.getAttributeDefinition(table, "new_note", { select: ["MetadataId"] })
      );
      expect(attr.MetadataId).toBe(id);

      await eventually(() => metadata.deleteAttributeDefinition(table, "new_note"));
    },
    SLOW
  );

  it(
    "createOneToManyRelationship returns the new relationship's MetadataId",
    async () => {
      const metadata = new MetadataClient(liveClient().client);
      const id = await eventually(() =>
        metadata.createOneToManyRelationship({
          "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
          SchemaName: relationship,
          ReferencedEntity: "account",
          ReferencedAttribute: "accountid",
          ReferencingEntity: table,
          Lookup: {
            "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
            SchemaName: "new_AccountId",
            RequiredLevel: { Value: "None" },
            DisplayName: label("Account"),
          },
        })
      );

      expect(id).toMatch(GUID);
      try {
        const rel = await eventually(() =>
          metadata.getRelationshipByMetadataId(id, { select: ["SchemaName"] })
        );
        expect(rel.SchemaName).toBe(relationship);

        // #359: a merge-update changes one property and keeps the type's own properties.
        const read = () =>
          liveClient()
            .client.api(
              `RelationshipDefinitions(${id})/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata`
            )
            .header("Consistency", "Strong")
            .select("IsValidForAdvancedFind", "ReferencedAttribute", "CascadeConfiguration")
            .get<OneToManyRelationshipMetadata>();
        const before = await eventually(read);
        await eventually(() =>
          metadata.mergeAndUpdateRelationship(relationship, {
            "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
            IsValidForAdvancedFind: !before.IsValidForAdvancedFind,
          })
        );
        const after = await eventually(async () => {
          const def = await read();
          expect(def.IsValidForAdvancedFind).toBe(!before.IsValidForAdvancedFind);
          return def;
        });
        expect(after.ReferencedAttribute).toBe("accountid");
        expect(after.CascadeConfiguration).toEqual(before.CascadeConfiguration);
      } finally {
        await eventually(() => metadata.deleteRelationship(id));
      }
    },
    SLOW
  );

  it(
    "mergeAndUpdateAttributeDefinition changes the display name and keeps MaxLength (#359)",
    async () => {
      const metadata = new MetadataClient(liveClient().client);
      const column = "new_merge";
      const id = await eventually(() =>
        metadata.createAttributeDefinition(table, {
          "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
          SchemaName: "new_Merge",
          RequiredLevel: { Value: "None" },
          MaxLength: 150,
          FormatName: { Value: "Text" },
          DisplayName: label("Merge"),
          Description: label("Created by the SDK integration tests; safe to delete."),
        })
      );
      expect(id).toMatch(GUID);

      try {
        const read = () =>
          metadata.getAttributeDefinition(table, column, {
            cast: "StringAttributeMetadata",
            select: ["DisplayName", "Description", "MaxLength", "RequiredLevel"],
          });
        await eventually(read);

        const displayName = `Merged ${tag}`;
        await eventually(() =>
          metadata.mergeAndUpdateAttributeDefinition(table, column, {
            "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
            DisplayName: label(displayName),
          })
        );

        const after = await eventually(async () => {
          const def = await read();
          expect(def.DisplayName?.UserLocalizedLabel?.Label).toBe(displayName);
          return def;
        });
        // A PUT of only the changes would have reset these to their defaults.
        expect(after.MaxLength).toBe(150);
        expect(after.Description?.UserLocalizedLabel?.Label).toBe(
          "Created by the SDK integration tests; safe to delete."
        );
        expect(after.RequiredLevel?.Value).toBe("None");
      } finally {
        await eventually(() => metadata.deleteAttributeDefinition(table, column));
      }
    },
    SLOW
  );

  it(
    "mergeAndUpdateEntityDefinition changes one property and keeps the rest",
    async () => {
      const metadata = new MetadataClient(liveClient().client);
      const select = ["Description", "DisplayName", "OwnershipType", "HasNotes"];
      const before = await eventually(() => metadata.getEntityDefinition(table, { select }));

      const description = `Updated by run ${tag}`;
      await eventually(() =>
        metadata.mergeAndUpdateEntityDefinition(table, { Description: label(description) })
      );

      const after = await eventually(async () => {
        const def = await metadata.getEntityDefinition(table, { select });
        expect(def.Description?.UserLocalizedLabel?.Label).toBe(description);
        return def;
      });
      expect(after.DisplayName?.UserLocalizedLabel?.Label).toBe(
        before.DisplayName?.UserLocalizedLabel?.Label
      );
      expect(after.OwnershipType).toBe(before.OwnershipType);
      expect(after.HasNotes).toBe(before.HasNotes);
    },
    SLOW
  );

  it(
    "deleteEntityDefinition removes the table",
    async () => {
      const metadata = new MetadataClient(liveClient().client);
      await deleteTable(metadata);
      tableId = undefined;
    },
    SLOW
  );
});
