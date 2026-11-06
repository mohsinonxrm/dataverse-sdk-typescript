/**
 * Live tests for MetadataClient's function and action calls (#62, #63).
 * See ./env.ts for configuration. These tests only read; they create nothing.
 */
import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  MetadataClient,
  MetadataConditionOperator,
} from "@mohsinonxrm/dataverse-sdk-metadata";
import type { EntityQueryExpression } from "@mohsinonxrm/dataverse-sdk-metadata";
import { live, liveClient } from "./env.js";

// The generated enum members; the client must send them by name, which Dataverse requires.
const accountQuery: EntityQueryExpression = {
  Criteria: {
    FilterOperator: LogicalOperator.And,
    Conditions: [
      {
        PropertyName: "LogicalName",
        ConditionOperator: MetadataConditionOperator.Equals,
        Value: { Type: "System.String", Value: "account" },
      },
    ],
  },
  Properties: { AllProperties: false, PropertyNames: ["LogicalName", "SchemaName"] },
};

describe.skipIf(!live)("live: metadata functions and actions", () => {
  it("#62: retrieveMetadataChanges returns metadata, then only the changes since the stamp", async () => {
    const metadata = new MetadataClient(liveClient().client);

    const first = await metadata.retrieveMetadataChanges(accountQuery);
    expect(first.ServerVersionStamp).toMatch(/\S/);
    expect(first.EntityMetadata?.map((e) => e.LogicalName)).toEqual(["account"]);

    const changes = await metadata.retrieveMetadataChanges(
      accountQuery,
      first.ServerVersionStamp,
      "Default"
    );
    expect(changes.ServerVersionStamp).toMatch(/\S/);
    // Only what changed since the stamp comes back: normally nothing.
    expect(Array.isArray(changes.EntityMetadata)).toBe(true);
    expect(changes.EntityMetadata?.length ?? 0).toBeLessThanOrEqual(1);
  });

  it("#63: canBeReferenced, canBeReferencing and canManyToMany answer for account", async () => {
    const metadata = new MetadataClient(liveClient().client);
    await expect(metadata.canBeReferenced("account")).resolves.toBe(true);
    await expect(metadata.canBeReferencing("account")).resolves.toBe(true);
    await expect(metadata.canManyToMany("account")).resolves.toBe(true);
  });

  it("the relationship-eligibility functions return entity names", async () => {
    const metadata = new MetadataClient(liveClient().client);
    expect(await metadata.getValidReferencingEntities("account")).toContain("contact");
    expect(await metadata.getValidReferencedEntities("contact")).toContain("account");
    expect(await metadata.getValidManyToMany()).toContain("account");
  });
});
