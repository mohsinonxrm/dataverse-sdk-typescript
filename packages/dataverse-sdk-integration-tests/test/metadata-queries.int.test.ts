/**
 * Live tests for MetadataClient reads (#65): typed attribute casts with $expand and
 * LabelLanguages, the entity-set-name lookup, and escaped key values.
 * See ./env.ts for configuration. These tests only read; they create nothing.
 */
import { describe, expect, it } from "vitest";
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: metadata queries (#65)", () => {
  it("reads picklist columns through a type cast, with their options and LabelLanguages", async () => {
    const metadata = new MetadataClient(liveClient().client);
    const picklists = await metadata.getAttributeDefinitions("account", {
      cast: "PicklistAttributeMetadata",
      select: ["LogicalName"],
      expand: ["OptionSet($select=Options)", "GlobalOptionSet($select=Options)"],
      labelLanguages: 1033,
    });

    const industry = picklists.find((a) => a.LogicalName === "industrycode");
    expect(industry?.OptionSet?.Options?.length).toBeGreaterThan(0);
    expect(industry?.OptionSet?.Options?.[0]?.Label?.LocalizedLabels?.[0]?.LanguageCode).toBe(1033);
  });

  it("selects type-specific properties: lookup Targets and string MaxLength", async () => {
    const metadata = new MetadataClient(liveClient().client);
    const lookups = await metadata.getAttributeDefinitions("account", {
      cast: "LookupAttributeMetadata",
      select: ["LogicalName", "Targets"],
    });
    expect(lookups.find((a) => a.LogicalName === "primarycontactid")?.Targets).toEqual(["contact"]);

    const name = await metadata.getAttributeDefinition("account", "name", {
      cast: "StringAttributeMetadata",
      select: ["LogicalName", "MaxLength"],
    });
    expect(name.MaxLength).toBeGreaterThan(0);
  });

  it("getEntitySetName comes from metadata", async () => {
    const metadata = new MetadataClient(liveClient().client);
    await expect(metadata.getEntitySetName("account")).resolves.toBe("accounts");
    // Irregular plural: naive pluralization would give "opportunitys".
    await expect(metadata.getEntitySetName("opportunity")).resolves.toBe("opportunities");
  });

  it("escapes a quote in a key value: 'does not exist' instead of a malformed URL", async () => {
    const metadata = new MetadataClient(liveClient().client);
    await expect(metadata.getEntityDefinition("x'y")).rejects.toMatchObject({ status: 404 });
  });
});
