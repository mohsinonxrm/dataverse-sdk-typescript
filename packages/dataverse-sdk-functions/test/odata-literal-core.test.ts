/**
 * #254: the generated `internal/odataLiteral.ts` only calls core's `odataLiteral`, the one OData
 * literal serializer. Requests go through a real DataverseClient and the recording fake fetch.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError, odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import { LocalTimeFromUtcTimeFunction } from "../src/LocalTimeFromUtcTimeFunction.js";
import { RetrieveEntityFunction } from "../src/RetrieveEntityFunction.js";
import { formatParameterAlias, formatRecordPath } from "../src/internal/odataLiteral.js";

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
const id = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

/** The decoded alias values of the request URL (as the server decodes them). */
function aliasValues(url: string): Record<string, string | null> {
  const params = new URL(url).searchParams;
  return Object.fromEntries([...params.keys()].map((k) => [k, params.get(k)]));
}

describe("#254: functions use core's odataLiteral", () => {
  it.each<[unknown, string, ("EnumerationType" | "EntityType" | "Collection")?]>([
    ["O'Brien", "Edm.String"],
    [`{${id}}`, "Edm.Guid"],
    [9007199254740993n, "Edm.Int64"],
    [1.5, "Edm.Decimal"],
    [true, "Edm.Boolean"],
    [new Date("2024-05-01T10:00:00Z"), "Edm.DateTimeOffset"],
    ["2024-05-01", "Edm.DateTimeOffset"],
    ["Entity, Attributes", "mscrm.EntityFilters", "EnumerationType"],
    [
      { logicalName: "account", id, entitySetName: "accounts" },
      "mscrm.crmbaseentity",
      "EntityType",
    ],
    [["account", "contact"], "Collection(Edm.String)", "Collection"],
    [null, "Edm.String"],
  ])("formatParameterAlias(…, %s) is odataLiteral.parameter", (value, type, kind) => {
    expect(formatParameterAlias(value, type, kind)).toBe(odataLiteral.parameter(value, type, kind));
  });

  it("formatRecordPath is odataLiteral.recordPath", () => {
    const ref = { logicalName: "account", id: `{${id}}`, entitySetName: "accounts" };
    expect(formatRecordPath(ref)).toBe(odataLiteral.recordPath(ref));
    expect(formatRecordPath(ref)).toBe(`accounts(${id})`);
  });

  it("an enum given as comma-separated member names is one flags literal", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /^\/RetrieveEntity\(/, () => jsonResponse({ EntityMetadata: {} }));

    await client.execute(
      new RetrieveEntityFunction({
        EntityFilters: "Entity, Attributes" as unknown as "Entity",
        LogicalName: "account",
        MetadataId: EMPTY_GUID,
        RetrieveAsIfPublished: false,
      })
    );

    expect(aliasValues(fake.last().url)["@p1"]).toBe(
      "Microsoft.Dynamics.CRM.EntityFilters'Entity,Attributes'"
    );
  });

  it("a value that can't be its type's literal throws before any request is sent", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /./, () => jsonResponse({}));

    // The old helper wrote NaN as `null`, and passed a GUID that isn't one through (HTTP 500).
    await expect(
      client.execute(
        new LocalTimeFromUtcTimeFunction({
          TimeZoneCode: Number.NaN,
          UtcTime: "2026-01-01T00:00:00Z",
        })
      )
    ).rejects.toThrow(DataverseInvalidRequestError);
    await expect(
      client.execute(
        new RetrieveEntityFunction({
          EntityFilters: "Entity",
          LogicalName: "account",
          MetadataId: "not-a-guid",
          RetrieveAsIfPublished: false,
        })
      )
    ).rejects.toThrow(DataverseInvalidRequestError);
    // A date-time without a zone: the Web API answers 400.
    await expect(
      client.execute(
        new LocalTimeFromUtcTimeFunction({ TimeZoneCode: 85, UtcTime: "2026-01-01T00:00:00" })
      )
    ).rejects.toThrow(DataverseInvalidRequestError);
    expect(fake.requests).toHaveLength(0);
  });
});
