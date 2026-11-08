/**
 * Live tests for the metadata builders (#345): a temporary table with its primary name and a
 * text column (`Metadata.entity`, `Metadata.primaryName`, `Metadata.string`), then a choice with
 * options Dataverse numbers itself, a whole number and a date-only column
 * (`createAttributeDefinition`), and a lookup to account (`Metadata.lookup` and
 * `createOneToManyRelationship`), each read back.
 *
 * Everything is named with this run's id and deleted in `afterAll` by the exact MetadataId each
 * create returned, even when a test fails. See ./env.ts for configuration.
 *
 * New metadata reaches the org's servers' metadata caches over several seconds, so reads and
 * writes right after a create are retried by `eventually()`.
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { Metadata, MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import type { OneToManyRelationshipMetadata } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// A table create takes 30 to 70 seconds, a table delete up to two minutes.
const SLOW = 300_000;

const tag = (runId.split("-").at(-1) ?? "x").toLowerCase();
const table = `new_sdkitbd${tag}`;
const relationship = `new_account_sdkitbd${tag}`;
const description = `Created by SDK integration run ${runId}; safe to delete.`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry `fn` until it resolves, for up to `ms` (metadata cache propagation). An error that
 * `retryIf` rejects is thrown at once.
 */
async function eventually<T>(
  fn: () => Promise<T>,
  ms = 120_000,
  retryIf: (err: unknown) => boolean = () => true
): Promise<T> {
  const deadline = Date.now() + ms;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (Date.now() > deadline || !retryIf(err)) throw err;
      await sleep(5_000);
    }
  }
}

/**
 * Dataverse refused the request (400 or 404), so nothing was created and it is safe to send it
 * again: a create right after the table was created can reach a server that doesn't know the
 * table yet. Any other error (a timeout, a 5xx) is thrown, because the component may exist.
 */
const refused = (err: unknown): boolean =>
  err instanceof DataverseODataError && (err.status === 400 || err.status === 404);

/** The MetadataIds this run created, deleted in `afterAll`. */
const created: { tableId?: string; relationshipId?: string } = {};

/**
 * Delete `path`. Only a 204 or several 404s in a row count as gone: right after a create, a
 * server whose cache is behind answers 404 for a component that still exists.
 */
async function remove(path: string): Promise<boolean> {
  const { client } = liveClient();
  let notFound = 0;
  for (let attempt = 1; attempt <= 24; attempt++) {
    try {
      await client.api(path).delete<undefined>();
      return true;
    } catch (err) {
      notFound = (err as { status?: number }).status === 404 ? notFound + 1 : 0;
      if (notFound >= 3) return true;
    }
    await sleep(10_000);
  }
  return false;
}

afterAll(async () => {
  if (!live) return;
  const failures: string[] = [];
  const { tableId, relationshipId } = created;
  // The relationship first: it also changes account. Deleting the table removes its columns.
  if (relationshipId && !(await remove(`/RelationshipDefinitions(${relationshipId})`))) {
    failures.push(`the relationship ${relationship}`);
  }
  if (tableId && !(await remove(`/EntityDefinitions(${tableId})`))) {
    failures.push(`the table ${table}`);
  }
  if (failures.length > 0) {
    throw new Error(`Could not delete ${failures.join(", ")}; delete them by hand.`);
  }
}, 600_000);

describe.skipIf(!live)("live: metadata builders (#345)", () => {
  const metadata = () => new MetadataClient(liveClient().client);

  it(
    "creates a table with its primary name and a text column from Metadata.entity",
    async () => {
      const md = metadata();
      created.tableId = await md.createEntityDefinition(
        Metadata.entity(table, {
          displayName: `SDK builders ${tag}`,
          displayCollectionName: `SDK builders ${tag}`,
          description,
          primaryName: Metadata.primaryName("new_Name", { displayName: "Name", maxLength: 120 }),
          attributes: [
            Metadata.string("new_Code", {
              displayName: "Code",
              description: "A short code",
              maxLength: 20,
              requiredLevel: "Recommended",
            }),
          ],
        })
      );
      expect(created.tableId).toMatch(GUID);

      const def = await eventually(() =>
        md.getEntityDefinition(table, {
          select: ["LogicalName", "PrimaryNameAttribute", "OwnershipType", "HasNotes"],
        })
      );
      expect(def.PrimaryNameAttribute).toBe("new_name");
      expect(def.OwnershipType).toBe("UserOwned");
      expect(def.HasNotes).toBe(false);

      const name = await eventually(() =>
        md.getAttributeDefinition(table, "new_name", {
          cast: "StringAttributeMetadata",
          select: ["IsPrimaryName", "MaxLength"],
        })
      );
      expect(name.IsPrimaryName).toBe(true);
      expect(name.MaxLength).toBe(120);

      const code = await eventually(() =>
        md.getAttributeDefinition(table, "new_code", {
          cast: "StringAttributeMetadata",
          select: ["MaxLength", "RequiredLevel", "DisplayName", "Description"],
          labelLanguages: 1033,
        })
      );
      expect(code.MaxLength).toBe(20);
      expect(code.RequiredLevel?.Value).toBe("Recommended");
      expect(code.DisplayName?.LocalizedLabels?.[0]).toMatchObject({
        Label: "Code",
        LanguageCode: 1033,
      });
      expect(code.Description?.LocalizedLabels?.[0]?.Label).toBe("A short code");
    },
    SLOW
  );

  it(
    "adds a choice, a whole number and a date-only column with createAttributeDefinition",
    async () => {
      const md = metadata();
      if (!created.tableId) throw new Error("The table wasn't created.");

      const choiceId = await eventually(
        () =>
          md.createAttributeDefinition(
            table,
            Metadata.picklist("new_Size", {
              displayName: "Size",
              // No values: Dataverse numbers them from the publisher's choice value prefix.
              options: ["Small", "Large"],
            })
          ),
        120_000,
        refused
      );
      expect(choiceId).toMatch(GUID);

      const countId = await eventually(
        () =>
          md.createAttributeDefinition(
            table,
            Metadata.integer("new_Count", { displayName: "Count", minValue: 0, maxValue: 500 })
          ),
        120_000,
        refused
      );
      expect(countId).toMatch(GUID);

      const dueId = await eventually(
        () =>
          md.createAttributeDefinition(
            table,
            Metadata.dateTime("new_Due", {
              displayName: "Due",
              format: "DateOnly",
              behavior: "DateOnly",
            })
          ),
        120_000,
        refused
      );
      expect(dueId).toMatch(GUID);

      const size = await eventually(() =>
        md.getAttributeDefinition(table, "new_size", {
          cast: "PicklistAttributeMetadata",
          select: ["MetadataId"],
          expand: "OptionSet($select=IsGlobal,Options)",
          labelLanguages: 1033,
        })
      );
      expect(size.MetadataId).toBe(choiceId);
      expect(size.OptionSet?.IsGlobal).toBe(false);
      const options = size.OptionSet?.Options ?? [];
      expect(options.map((o) => o.Label?.LocalizedLabels?.[0]?.Label)).toEqual(["Small", "Large"]);
      for (const option of options) expect(typeof option.Value).toBe("number");
      expect(new Set(options.map((o) => o.Value)).size).toBe(2);

      const count = await eventually(() =>
        md.getAttributeDefinition(table, "new_count", {
          cast: "IntegerAttributeMetadata",
          select: ["MinValue", "MaxValue", "Format"],
        })
      );
      expect(count).toMatchObject({ MinValue: 0, MaxValue: 500, Format: "None" });

      const due = await eventually(() =>
        md.getAttributeDefinition(table, "new_due", {
          cast: "DateTimeAttributeMetadata",
          select: ["Format", "DateTimeBehavior"],
        })
      );
      expect(due.Format).toBe("DateOnly");
      expect(due.DateTimeBehavior?.Value).toBe("DateOnly");
    },
    SLOW
  );

  it(
    "creates a lookup to account with Metadata.lookup and createOneToManyRelationship",
    async () => {
      const md = metadata();
      if (!created.tableId) throw new Error("The table wasn't created.");

      created.relationshipId = await eventually(
        () =>
          md.createOneToManyRelationship(
            Metadata.lookup("new_AccountId", {
              displayName: "Account",
              description,
              referencingEntity: table,
              referencedEntity: "account",
              relationshipSchemaName: relationship,
            })
          ),
        120_000,
        refused
      );
      expect(created.relationshipId).toMatch(GUID);
      const id = created.relationshipId;

      const rel = (await eventually(() =>
        md.getRelationshipByMetadataId(id, {
          select: ["SchemaName", "ReferencedEntity", "ReferencedAttribute", "ReferencingEntity"],
        })
      )) as OneToManyRelationshipMetadata;
      expect(rel).toMatchObject({
        SchemaName: relationship,
        ReferencedEntity: "account",
        // The builder leaves ReferencedAttribute out: Dataverse uses the primary key.
        ReferencedAttribute: "accountid",
        ReferencingEntity: table,
      });

      const lookup = await eventually(() =>
        md.getAttributeDefinition(table, "new_accountid", {
          cast: "LookupAttributeMetadata",
          select: ["Targets", "RequiredLevel"],
        })
      );
      expect(lookup.Targets).toEqual(["account"]);
      expect(lookup.RequiredLevel?.Value).toBe("None");
    },
    SLOW
  );
});
