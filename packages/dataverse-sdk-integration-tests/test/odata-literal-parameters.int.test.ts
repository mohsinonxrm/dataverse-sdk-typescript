/**
 * #254 live: function parameter aliases written by core's `odataLiteral.parameter()`, through the
 * generated functions and through entities-runtime's `formatParameterAlias`. These tests only read.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError, odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import {
  LocalTimeFromUtcTimeFunction,
  RetrieveEntityFunction,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient } from "./env.js";

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

describe.skipIf(!live)("live: one OData literal serializer (#254)", () => {
  it("an enum given as comma-separated names is read as flags", async () => {
    const { client } = liveClient();
    const result = (await client.execute(
      new RetrieveEntityFunction({
        EntityFilters: "Entity, Attributes" as unknown as "Entity",
        LogicalName: "account",
        MetadataId: EMPTY_GUID,
        RetrieveAsIfPublished: false,
      })
    )) as unknown as { EntityMetadata: { LogicalName: string; Attributes?: unknown[] } };
    expect(result.EntityMetadata.LogicalName).toBe("account");
    expect(result.EntityMetadata.Attributes?.length).toBeGreaterThan(0);
  });

  it("a DateTimeOffset given as a date alone or with an offset", async () => {
    const { client } = liveClient();
    const dateOnly = await client.execute(
      new LocalTimeFromUtcTimeFunction({ TimeZoneCode: 85, UtcTime: "2026-01-01" })
    );
    expect(dateOnly.LocalTime).toMatch(/^2026-01-01T00:00:00/);
    const offset = await client.execute(
      new LocalTimeFromUtcTimeFunction({ TimeZoneCode: 85, UtcTime: "2026-01-01T00:00:00+02:00" })
    );
    expect(offset.LocalTime).toMatch(/^2025-12-31T22:00:00/);
  });

  it("entities-runtime and core write the same aliases, which the Web API reads", async () => {
    const { client } = liveClient();
    const p1 = formatParameterAlias("Entity", "mscrm.EntityFilters", "EnumerationType");
    const p2 = formatParameterAlias(`{${EMPTY_GUID}}`, "Edm.Guid");
    const p3 = formatParameterAlias("account", "Edm.String");
    expect([p1, p2, p3]).toEqual([
      odataLiteral.parameter("Entity", "mscrm.EntityFilters", "EnumerationType"),
      odataLiteral.parameter(`{${EMPTY_GUID}}`, "Edm.Guid"),
      odataLiteral.parameter("account", "Edm.String"),
    ]);
    const enc = encodeURIComponent;
    const result = await client
      .api(
        "RetrieveEntity(EntityFilters=@p1,MetadataId=@p2,LogicalName=@p3,RetrieveAsIfPublished=false)" +
          `?@p1=${enc(p1)}&@p2=${enc(p2)}&@p3=${enc(p3)}`
      )
      .get<{ EntityMetadata: { LogicalName: string } }>();
    expect(result.EntityMetadata.LogicalName).toBe("account");
  });

  it("a GUID that isn't one throws before the request (the Web API answers 500 to it)", async () => {
    const { client } = liveClient();
    await expect(
      client.execute(
        new RetrieveEntityFunction({
          EntityFilters: "Entity",
          LogicalName: "account",
          MetadataId: "abc",
          RetrieveAsIfPublished: false,
        })
      )
    ).rejects.toThrow(DataverseInvalidRequestError);
  });
});
