/**
 * Live tests for #67 and #68: function parameters are sent as the OData literal of their type.
 * Enums as `Microsoft.Dynamics.CRM.<Enum>'<value>'`, GUIDs and DateTimeOffsets unquoted, and
 * parameters the CSDL leaves nullable can be omitted. These tests only read.
 */
import { describe, expect, it } from "vitest";
import {
  EntityFilters,
  LocalTimeFromUtcTimeFunction,
  RetrieveEntityFunction,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient } from "./env.js";

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

interface EntityMetadataShape {
  LogicalName: string;
  Attributes?: unknown[];
}

describe.skipIf(!live)("live: function parameter literals (#67, #68)", () => {
  it("RetrieveEntity with flags combined from the exported enum and an unquoted GUID", async () => {
    const { client } = liveClient();
    const fn = new RetrieveEntityFunction({
      EntityFilters: EntityFilters.Entity | EntityFilters.Attributes,
      LogicalName: "account",
      MetadataId: EMPTY_GUID,
      RetrieveAsIfPublished: false,
    });
    const url = decodeURIComponent(fn.toRequestInformation(client.getBaseUrl()).url);
    expect(url).toContain("@p1=Microsoft.Dynamics.CRM.EntityFilters'3'");
    expect(url).toContain(`@p3=${EMPTY_GUID}`);

    const result = (await client.execute(fn)) as unknown as { EntityMetadata: EntityMetadataShape };
    expect(result.EntityMetadata.LogicalName).toBe("account");
    expect(result.EntityMetadata.Attributes?.length).toBeGreaterThan(0);
  });

  it("RetrieveEntity with an enum member name", async () => {
    const { client } = liveClient();
    const result = (await client.execute(
      new RetrieveEntityFunction({
        EntityFilters: "Entity",
        LogicalName: "contact",
        MetadataId: EMPTY_GUID,
        RetrieveAsIfPublished: false,
      })
    )) as unknown as { EntityMetadata: EntityMetadataShape };
    expect(result.EntityMetadata.LogicalName).toBe("contact");
  });

  it("LocalTimeFromUtcTime takes a Date and sends it unquoted", async () => {
    const { client } = liveClient();
    const fn = new LocalTimeFromUtcTimeFunction({
      TimeZoneCode: 85,
      UtcTime: new Date("2026-01-01T00:00:00Z"),
    });
    expect(decodeURIComponent(fn.toRequestInformation(client.getBaseUrl()).url)).toContain(
      "@p2=2026-01-01T00:00:00.000Z"
    );
    const result = await client.execute(fn);
    expect(result.LocalTime).toMatch(/^2026-01-01T/);
  });
});
