/**
 * #66: the Web API reads and writes metadata enum members by name. A create with
 * `"OwnershipType": 1` or `"RequiredLevel": { "Value": 2 }` is rejected (0x80048d19), and
 * responses carry `"UserOwned"`, so the generated enums are string-valued.
 */
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "../src/MetadataClient.js";
import * as types from "../src/types/index.js";
import { AttributeRequiredLevel, OwnershipTypes, StringFormat } from "../src/types/index.js";

const API = "https://contoso.crm.dynamics.com/api/data/v9.2";
const ID = "3fd0fdd5-7b1f-4ed1-90bc-b830d3ed1984";
const bodies: string[] = [];

const server = setupServer(
  http.all(`${API}/*`, async ({ request }) => {
    bodies.push(await request.text());
    // A body as well as the header, so this holds whichever one the client reads.
    return HttpResponse.json(
      { MetadataId: ID },
      {
        status: 201,
        headers: { "OData-EntityId": `${API}/EntityDefinitions(${ID})` },
      }
    );
  })
);

let metadata: MetadataClient;

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  metadata = new MetadataClient(
    new DataverseClient({
      baseUrl: "https://contoso.crm.dynamics.com",
      tokenProvider: { getToken: () => Promise.resolve("test-token") },
    })
  );
});
afterEach(() => {
  bodies.length = 0;
});
afterAll(() => {
  server.close();
});

/** The exported enum objects: plain objects whose every value is a string or number. */
const enums = Object.entries(types).filter(
  (entry): entry is [string, Record<string, string | number>] =>
    typeof entry[1] === "object" &&
    Object.values(entry[1] as object).every((v) => typeof v === "string" || typeof v === "number")
);

describe("#66: metadata enums are member names", () => {
  it("exports the generated enums", () => {
    expect(enums.length).toBeGreaterThanOrEqual(60);
    expect(enums.map(([name]) => name)).toEqual(
      expect.arrayContaining(["OwnershipTypes", "AttributeRequiredLevel", "DeletedMetadataFilters"])
    );
  });

  it("every member's value is its own name", () => {
    for (const [name, members] of enums) {
      for (const [key, value] of Object.entries(members)) {
        expect(value, `${name}.${key}`).toBe(key);
      }
    }
  });

  it("a table create sends OwnershipType by name", async () => {
    await metadata.createEntityDefinition({
      SchemaName: "new_Project",
      OwnershipType: OwnershipTypes.UserOwned,
      HasActivities: false,
    });
    expect(JSON.parse(bodies[0] ?? "")).toMatchObject({ OwnershipType: "UserOwned" });
  });

  it("a column create sends RequiredLevel and FormatName by name", async () => {
    await metadata.createAttributeDefinition("new_project", {
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Note",
      RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
      Format: StringFormat.Email,
      MaxLength: 100,
    });
    expect(JSON.parse(bodies[0] ?? "")).toMatchObject({
      RequiredLevel: { Value: "ApplicationRequired" },
      Format: "Email",
    });
  });
});
