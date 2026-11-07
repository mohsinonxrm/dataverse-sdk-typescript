/**
 * Live tests for choice metadata (#324): a temporary global choice, a temporary table with a
 * choice column bound to that global choice ("GlobalOptionSet@odata.bind"), a choice column with
 * its own (local) options and a date column. An option is inserted, updated and deleted on the
 * global choice (which the bound column shows) and on the local choice.
 *
 * Everything is named with this run's id and deleted in `afterAll` by the exact MetadataId each
 * create returned, never by name or query. See ./env.ts for configuration.
 *
 * New metadata reaches the org's servers' metadata caches over several seconds, so reads and
 * writes right after a create are retried by `eventually()`.
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import type { Label, OptionMetadata } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// A table create takes 30 to 70 seconds, a table delete up to two minutes.
const SLOW = 300_000;

const tag = (runId.split("-").at(-1) ?? "x").toLowerCase();
const globalChoice = `new_sdkitgc${tag}`;
const table = `new_sdkitch${tag}`;

const label = (text: string): Label => ({
  LocalizedLabels: [{ Label: text, LanguageCode: 1033 }],
});
const text = (option: OptionMetadata | undefined): string | undefined =>
  option?.Label?.LocalizedLabels?.find((l) => l.LanguageCode === 1033)?.Label;

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

/** The MetadataIds this run created, deleted in `afterAll`. */
const created: { globalChoiceId?: string; tableId?: string; columnIds: string[] } = {
  columnIds: [],
};

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  const failures: string[] = [];
  const remove = async (what: string, path: string, ms: number) => {
    try {
      await eventually(() => client.api(path).delete<undefined>(), ms);
    } catch {
      failures.push(what);
    }
  };
  const { globalChoiceId, tableId, columnIds } = created;
  try {
    if (tableId) {
      for (const columnId of columnIds.reverse()) {
        await remove("a column", `/EntityDefinitions(${tableId})/Attributes(${columnId})`, 60_000);
      }
      await remove(`the table ${table}`, `/EntityDefinitions(${tableId})`, 240_000);
    }
  } finally {
    // The global choice goes last: Dataverse refuses to delete it while a column uses it.
    if (globalChoiceId) {
      await remove(
        `the global choice ${globalChoice}`,
        `/GlobalOptionSetDefinitions(${globalChoiceId})`,
        120_000
      );
    }
  }
  if (failures.length > 0) {
    throw new Error(`Could not delete ${failures.join(", ")}; delete them by hand.`);
  }
}, 600_000);

describe.skipIf(!live)("live: choices and option values (#324)", () => {
  const metadata = () => new MetadataClient(liveClient().client);

  it(
    "creates a global choice, a table, a column bound to the choice, a local choice and a date",
    async () => {
      const md = metadata();
      created.globalChoiceId = await md.createGlobalOptionSet({
        "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
        Name: globalChoice,
        DisplayName: label(`SDK test ${tag}`),
        Description: label(`Created by SDK integration run ${runId}; safe to delete.`),
        IsGlobal: true,
        OptionSetType: "Picklist",
        Options: [
          { Value: 100000, Label: label("Red") },
          { Value: 100001, Label: label("Blue") },
        ],
      });
      expect(created.globalChoiceId).toMatch(GUID);

      created.tableId = await md.createEntityDefinition({
        SchemaName: table,
        DisplayName: label(`SDK test ${tag}`),
        DisplayCollectionName: label(`SDK tests ${tag}`),
        Description: label(`Created by SDK integration run ${runId}; safe to delete.`),
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
            DisplayName: label("Name"),
          },
        ],
      });
      expect(created.tableId).toMatch(GUID);
      await eventually(() => md.getEntityDefinition(table, { select: ["LogicalName"] }));

      // Bound to the global choice by MetadataId: no OptionSet of its own.
      const bound = await eventually(() =>
        md.createAttributeDefinition(table, {
          "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
          SchemaName: "new_Color",
          DisplayName: label("Color"),
          RequiredLevel: { Value: "None" },
          "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${created.globalChoiceId ?? ""})`,
        })
      );
      created.columnIds.push(bound);
      const boundMulti = await md.createAttributeDefinition(table, {
        "@odata.type": "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata",
        SchemaName: "new_Colors",
        DisplayName: label("Colors"),
        RequiredLevel: { Value: "None" },
        "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${created.globalChoiceId ?? ""})`,
      });
      created.columnIds.push(boundMulti);

      // Its own options, without @odata.type or OptionSetType on the nested OptionSet.
      const local = await md.createAttributeDefinition(table, {
        "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
        SchemaName: "new_Size",
        DisplayName: label("Size"),
        RequiredLevel: { Value: "None" },
        OptionSet: {
          IsGlobal: false,
          Options: [
            { Value: 100000000, Label: label("Small") },
            { Value: 100000001, Label: label("Large") },
          ],
        },
      });
      created.columnIds.push(local);

      // No MinSupportedValue / MaxSupportedValue: Dataverse sets them.
      const date = await md.createAttributeDefinition(table, {
        "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
        SchemaName: "new_DueDate",
        DisplayName: label("Due date"),
        RequiredLevel: { Value: "None" },
        Format: "DateOnly",
      });
      created.columnIds.push(date);

      for (const id of created.columnIds) expect(id).toMatch(GUID);

      const color = await eventually(() =>
        md.getAttributeDefinition(table, "new_color", {
          cast: "PicklistAttributeMetadata",
          select: ["MetadataId"],
          expand: "GlobalOptionSet($select=MetadataId,Name)",
        })
      );
      expect(color.MetadataId).toBe(bound);
      expect(color.GlobalOptionSet?.MetadataId).toBe(created.globalChoiceId);
      expect(color.GlobalOptionSet?.Name).toBe(globalChoice);

      const dueDate = await eventually(() =>
        md.getAttributeDefinition(table, "new_duedate", {
          cast: "DateTimeAttributeMetadata",
          select: ["MetadataId", "Format"],
        })
      );
      expect(dueDate.MetadataId).toBe(date);
      expect(dueDate.Format).toBe("DateOnly");
    },
    SLOW
  );

  it(
    "inserts, updates and deletes an option of the global choice, which the bound column shows",
    async () => {
      const md = metadata();
      const choiceId = created.globalChoiceId;
      expect(choiceId).toMatch(GUID);
      if (!choiceId) return;
      const boundOptions = async () => {
        const column = await md.getAttributeDefinition(table, "new_color", {
          cast: "PicklistAttributeMetadata",
          select: ["LogicalName"],
          expand: "GlobalOptionSet($select=Options)",
        });
        return column.GlobalOptionSet?.Options ?? [];
      };

      const inserted = await eventually(() =>
        md.insertOptionValue({
          OptionSetName: globalChoice,
          Value: 100002,
          Label: label("Green"),
        })
      );
      expect(inserted.NewOptionValue).toBe(100002);

      await md.updateOptionValue({
        OptionSetName: globalChoice,
        Value: 100002,
        Label: label("Lime"),
        MergeLabels: true,
      });
      await eventually(async () => {
        const choice = await md.getGlobalOptionSet(choiceId);
        expect(text(choice.Options?.find((o) => o.Value === 100002))).toBe("Lime");
        expect(text((await boundOptions()).find((o) => o.Value === 100002))).toBe("Lime");
      });

      await md.deleteOptionValue({ OptionSetName: globalChoice, Value: 100002 });
      await eventually(async () => {
        const choice = await md.getGlobalOptionSet(choiceId);
        expect(choice.Options?.map((o) => o.Value)).toEqual([100000, 100001]);
        expect((await boundOptions()).map((o) => o.Value)).toEqual([100000, 100001]);
      });
    },
    SLOW
  );

  it(
    "rejects a bound column as a local target: its options belong to the global choice",
    async () => {
      const md = metadata();
      const err: unknown = await md
        .insertOptionValue({
          EntityLogicalName: table,
          AttributeLogicalName: "new_color",
          Value: 100003,
          Label: label("Black"),
        })
        .catch((e: unknown) => e);
      expect(err).toBeInstanceOf(DataverseODataError);
      expect((err as Error).message).toMatch(/not Local/i);
    },
    SLOW
  );

  it(
    "inserts, updates and deletes an option of the local choice",
    async () => {
      const md = metadata();
      const target = { EntityLogicalName: table, AttributeLogicalName: "new_size" } as const;
      const options = async () => {
        const column = await md.getAttributeDefinition(table, "new_size", {
          cast: "PicklistAttributeMetadata",
          select: ["LogicalName"],
          expand: "OptionSet($select=Options)",
        });
        return column.OptionSet?.Options ?? [];
      };

      const inserted = await eventually(() =>
        md.insertOptionValue({ ...target, Value: 100000002, Label: label("Medium") })
      );
      expect(inserted.NewOptionValue).toBe(100000002);

      await md.updateOptionValue({
        ...target,
        Value: 100000002,
        Label: label("Mid"),
        MergeLabels: true,
      });
      await eventually(async () => {
        expect(text((await options()).find((o) => o.Value === 100000002))).toBe("Mid");
      });

      await md.deleteOptionValue({ ...target, Value: 100000002 });
      await eventually(async () => {
        expect((await options()).map((o) => o.Value)).toEqual([100000000, 100000001]);
      });
    },
    SLOW
  );
});
