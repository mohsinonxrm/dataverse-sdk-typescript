/**
 * #324: the option-value actions take a local choice (`EntityLogicalName` + `AttributeLogicalName`)
 * or a global one (`OptionSetName`), exactly one; choice columns can bind to an existing global
 * choice with `"GlobalOptionSet@odata.bind"`; date columns are created without the server-set
 * `MinSupportedValue` / `MaxSupportedValue`.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  createTestClient,
  createdResponse,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import { MetadataClient } from "../src/MetadataClient.js";
import type { Label } from "../src/types/index.js";

const ID = "3fd0fdd5-7b1f-4ed1-90bc-b830d3ed1984";
const label: Label = { LocalizedLabels: [{ Label: "Green", LanguageCode: 1033 }] };

function setup() {
  const { client, fake } = createTestClient();
  fake.on("POST", "/InsertOptionValue", () => jsonResponse({ NewOptionValue: 100000003 }));
  fake.on("POST", "/InsertStatusValue", () => jsonResponse({ NewOptionValue: 3 }));
  fake.on("POST", /^\/(UpdateOptionValue|DeleteOptionValue|OrderOption)$/, () => noContent());
  fake.on("POST", /\/Attributes$/, () => createdResponse("Attributes", ID));
  return { metadata: new MetadataClient(client), fake };
}

const body = (fake: ReturnType<typeof setup>["fake"]): unknown =>
  JSON.parse(fake.last().bodyText ?? "null");

describe("option-value actions on a global choice (#324)", () => {
  it("insertOptionValue sends OptionSetName and no table or column", async () => {
    const { metadata, fake } = setup();
    const result = await metadata.insertOptionValue({
      OptionSetName: "new_colors",
      Label: label,
      Value: 100000003,
      Color: "#00FF00",
    });

    expect(result.NewOptionValue).toBe(100000003);
    expect(fake.last().path).toBe("/InsertOptionValue");
    expect(body(fake)).toEqual({
      OptionSetName: "new_colors",
      Label: label,
      Value: 100000003,
      Color: "#00FF00",
    });
  });

  it("updateOptionValue, deleteOptionValue and orderOptions send OptionSetName", async () => {
    const { metadata, fake } = setup();
    await metadata.updateOptionValue({
      OptionSetName: "new_colors",
      Value: 1,
      Label: label,
      MergeLabels: true,
    });
    expect(fake.last().path).toBe("/UpdateOptionValue");
    expect(body(fake)).toEqual({
      OptionSetName: "new_colors",
      Value: 1,
      Label: label,
      MergeLabels: true,
    });

    await metadata.deleteOptionValue({ OptionSetName: "new_colors", Value: 1 });
    expect(fake.last().path).toBe("/DeleteOptionValue");
    expect(body(fake)).toEqual({ OptionSetName: "new_colors", Value: 1 });

    await metadata.orderOptions({ OptionSetName: "new_colors", Values: [2, 1] });
    expect(fake.last().path).toBe("/OrderOption");
    expect(body(fake)).toEqual({ OptionSetName: "new_colors", Values: [2, 1] });
  });
});

describe("option-value actions on a local choice (#324)", () => {
  it("sends EntityLogicalName and AttributeLogicalName", async () => {
    const { metadata, fake } = setup();
    await metadata.deleteOptionValue({
      EntityLogicalName: "account",
      AttributeLogicalName: "new_size",
      Value: 2,
      SolutionUniqueName: "MySolution",
    });
    expect(body(fake)).toEqual({
      EntityLogicalName: "account",
      AttributeLogicalName: "new_size",
      Value: 2,
      SolutionUniqueName: "MySolution",
    });

    await metadata.insertStatusValue({
      EntityLogicalName: "account",
      AttributeLogicalName: "statuscode",
      StateCode: 1,
      Label: label,
    });
    expect(fake.last().path).toBe("/InsertStatusValue");
    expect(body(fake)).toEqual({
      EntityLogicalName: "account",
      AttributeLogicalName: "statuscode",
      StateCode: 1,
      Label: label,
    });
  });
});

describe("option-value target checks (#324)", () => {
  // Untyped callers and casts can still pass both targets or none; Dataverse would then pick one.
  type Loose = Record<string, unknown>;

  const calls: Array<[string, (m: MetadataClient, p: Loose) => Promise<unknown>]> = [
    ["insertOptionValue", (m, p) => m.insertOptionValue({ Label: label, ...p } as never)],
    [
      "updateOptionValue",
      (m, p) => m.updateOptionValue({ Value: 1, MergeLabels: true, ...p } as never),
    ],
    ["deleteOptionValue", (m, p) => m.deleteOptionValue({ Value: 1, ...p } as never)],
    ["orderOptions", (m, p) => m.orderOptions({ Values: [1], ...p } as never)],
  ];

  it.each(calls)("%s rejects both targets without sending", async (_name, call) => {
    const { metadata, fake } = setup();
    const both = {
      OptionSetName: "new_colors",
      EntityLogicalName: "account",
      AttributeLogicalName: "new_size",
    };
    await expect(call(metadata, both)).rejects.toThrow(DataverseInvalidRequestError);
    await expect(call(metadata, both)).rejects.toThrow(/not both/);
    expect(fake.requests).toHaveLength(0);
  });

  it.each(calls)("%s rejects a missing target without sending", async (_name, call) => {
    const { metadata, fake } = setup();
    await expect(call(metadata, {})).rejects.toThrow(
      /OptionSetName, or EntityLogicalName and AttributeLogicalName/
    );
    await expect(call(metadata, { EntityLogicalName: "account" })).rejects.toThrow(
      /AttributeLogicalName/
    );
    await expect(call(metadata, { AttributeLogicalName: "new_size" })).rejects.toThrow(
      /EntityLogicalName/
    );
    expect(fake.requests).toHaveLength(0);
  });

  it("insertStatusValue rejects OptionSetName: status values are local", async () => {
    const { metadata, fake } = setup();
    await expect(
      metadata.insertStatusValue({
        OptionSetName: "new_colors",
        StateCode: 0,
        Label: label,
      } as never)
    ).rejects.toThrow(/statuscode/);
    expect(fake.requests).toHaveLength(0);
  });
});

describe("choice and date column creates (#324)", () => {
  it("sends GlobalOptionSet@odata.bind to bind a choice column to a global choice", async () => {
    const { metadata, fake } = setup();
    const id = await metadata.createAttributeDefinition("account", {
      "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
      SchemaName: "new_Color",
      DisplayName: label,
      "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${ID})`,
    });

    expect(id).toBe(ID);
    expect(fake.last().path).toBe("/EntityDefinitions(LogicalName='account')/Attributes");
    expect(body(fake)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
      SchemaName: "new_Color",
      DisplayName: label,
      "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${ID})`,
    });
  });

  it("creates a date column without MinSupportedValue or MaxSupportedValue", async () => {
    const { metadata, fake } = setup();
    await metadata.createAttributeDefinition("account", {
      "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
      SchemaName: "new_DueDate",
      Format: "DateOnly",
    });
    expect(body(fake)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
      SchemaName: "new_DueDate",
      Format: "DateOnly",
    });
  });
});
