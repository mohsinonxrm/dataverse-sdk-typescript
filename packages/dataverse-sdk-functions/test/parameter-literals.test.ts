/**
 * #67, #68: function parameters reach `fetch` as the OData literal of their type. Before, enums
 * went as `1` or `'Entity'`, GUIDs and DateTimeOffsets were quoted, and Dataverse answered 400
 * ("Expression of type 'Edm.Int32' cannot be converted to type '...EntityFilters'", "Edm.String
 * cannot be converted to type 'Edm.Guid'"). Requests go through a real DataverseClient and the
 * recording fake fetch.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as functions from "../src/index.js";
import {
  DeletedMetadataFilters,
  EntityFilters,
  LocalTimeFromUtcTimeFunction,
  RetrieveEntityFunction,
  RetrieveMetadataChangesFunction,
} from "../src/index.js";

const GUID = "00000000-0000-0000-0000-000000000000";
const APP = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

/** The decoded parameter-alias values of the URL that reached fetch. */
function aliases(url: string): Record<string, string | null> {
  const params = new URL(url).searchParams;
  return Object.fromEntries([...params.keys()].map((k) => [k, params.get(k)]));
}

async function send(fn: { toRequestInformation(baseUrl: string): unknown }) {
  const { client, fake } = createTestClient();
  fake.on("GET", /.*/, () => jsonResponse({}));
  await client.execute(fn as Parameters<typeof client.execute>[0]);
  return fake.last();
}

describe("#67: enum parameters", () => {
  it("the enums are exported as values from the package root", () => {
    expect("EntityFilters" in functions).toBe(true);
    expect(EntityFilters.Attributes).toBe(2);
  });

  it("RetrieveEntity(EntityFilters.Entity | EntityFilters.Attributes, ...) sends an enum literal", async () => {
    const r = await send(
      new RetrieveEntityFunction({
        EntityFilters: EntityFilters.Entity | EntityFilters.Attributes,
        LogicalName: "account",
        MetadataId: GUID,
        RetrieveAsIfPublished: false,
      })
    );
    expect(aliases(r.url)).toEqual({
      "@p1": "Microsoft.Dynamics.CRM.EntityFilters'3'",
      "@p2": "'account'",
      "@p3": GUID,
      "@p4": "false",
    });
  });

  it("an enum member name is accepted too", async () => {
    const r = await send(
      new RetrieveEntityFunction({
        EntityFilters: "Entity",
        LogicalName: "account",
        MetadataId: GUID,
        RetrieveAsIfPublished: false,
      })
    );
    expect(aliases(r.url)["@p1"]).toBe("Microsoft.Dynamics.CRM.EntityFilters'Entity'");
  });

  it("RetrieveMetadataChanges encodes DeletedMetadataFilters the same way", async () => {
    const r = await send(
      new RetrieveMetadataChangesFunction({
        DeletedMetadataFilters: DeletedMetadataFilters.Attribute,
      })
    );
    // Aliases are numbered by parameter position, so the second parameter is @p2
    expect(r.url).toContain("/RetrieveMetadataChanges(DeletedMetadataFilters=@p2)?");
    expect(aliases(r.url)).toEqual({
      "@p2": `Microsoft.Dynamics.CRM.DeletedMetadataFilters'${String(DeletedMetadataFilters.Attribute)}'`,
    });
  });
});

describe("#68: GUID and DateTimeOffset literals, optional parameters", () => {
  it("a GUID is sent unquoted", async () => {
    const r = await send(
      new RetrieveEntityFunction({
        EntityFilters: EntityFilters.Entity,
        LogicalName: "account",
        MetadataId: GUID,
        RetrieveAsIfPublished: false,
      })
    );
    expect(aliases(r.url)["@p3"]).toBe(GUID);
  });

  it("a DateTimeOffset is sent unquoted, from a string or a Date", async () => {
    const fromString = await send(
      new LocalTimeFromUtcTimeFunction({ TimeZoneCode: 85, UtcTime: "2026-01-01T00:00:00Z" })
    );
    expect(aliases(fromString.url)["@p2"]).toBe("2026-01-01T00:00:00Z");
    const fromDate = await send(
      new LocalTimeFromUtcTimeFunction({
        TimeZoneCode: 85,
        UtcTime: new Date("2026-01-01T00:00:00Z"),
      })
    );
    expect(aliases(fromDate.url)["@p2"]).toBe("2026-01-01T00:00:00.000Z");
  });

  it("parameters the CSDL leaves nullable can be left out", async () => {
    const none = await send(new RetrieveMetadataChangesFunction());
    expect(none.url.endsWith("/RetrieveMetadataChanges")).toBe(true);
    const app = await send(
      new RetrieveMetadataChangesFunction({ ClientVersionStamp: "", AppModuleId: APP })
    );
    expect(aliases(app.url)).toEqual({ "@p3": "''", "@p4": APP });
    // LogicalName is nullable but MetadataId after it isn't: it stays positional, undefined omits it
    const r = await send(
      new RetrieveEntityFunction({
        EntityFilters: EntityFilters.Entity,
        MetadataId: GUID,
        RetrieveAsIfPublished: false,
      })
    );
    expect(r.url).toContain(
      "/RetrieveEntity(EntityFilters=@p1,MetadataId=@p3,RetrieveAsIfPublished=@p4)?"
    );
  });
});
