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

/**
 * The known values of properties CSDL types as strings or numbers (#482): constant objects too, but
 * not enums ($metadata has no enum for them), and the numeric ones are sent as numbers.
 */
const KNOWN_VALUES = new Set([
  "AttributeSourceType",
  "AttributeTypeDisplayNameValue",
  "DateTimeBehaviorValue",
  "MemoFormatNameValue",
  "RelationshipBehavior",
]);

/** The exported enum objects: plain objects whose every value is a string or number. */
const enums = Object.entries(types).filter(
  (entry): entry is [string, Record<string, string | number>] =>
    !KNOWN_VALUES.has(entry[0]) &&
    typeof entry[1] === "object" &&
    Object.values(entry[1] as object).every((v) => typeof v === "string" || typeof v === "number")
);

describe("#482: known values of string and number properties", () => {
  it("are exported constant objects", () => {
    expect(types.DateTimeBehaviorValue.DateOnly).toBe("DateOnly");
    expect(types.MemoFormatNameValue.RichText).toBe("RichText");
    expect(types.AttributeTypeDisplayNameValue.MultiSelectPicklistType).toBe(
      "MultiSelectPicklistType"
    );
    expect(types.AttributeSourceType).toEqual({
      Simple: 0,
      Calculated: 1,
      Rollup: 2,
      Formula: 3,
      Prompt: 4,
    });
    expect(types.RelationshipBehavior).toEqual({ Referential: 0, Parental: 1, Custom: 2 });
    for (const name of KNOWN_VALUES) expect(name in types, name).toBe(true);
  });
});

describe("#66: metadata enums are member names", () => {
  it("exports the generated enums", () => {
    // The enums of the metadata types only (#385), not every Web API enum
    expect(enums.length).toBe(23);
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
