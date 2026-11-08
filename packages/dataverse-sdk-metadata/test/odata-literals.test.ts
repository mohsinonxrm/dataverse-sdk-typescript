/**
 * #53: every key and literal in metadata URLs is built with core's `odataKey` / `odataLiteral`.
 * Names such as `O'Brien` are escaped, and ids and enum members that don't fit their type are
 * rejected before a request is sent.
 */
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient, DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "../src/MetadataClient.js";

const API = "https://contoso.crm.dynamics.com/api/data/v9.2";
const requests: string[] = [];

const server = setupServer(
  http.all(`${API}/*`, ({ request }) => {
    const url = new URL(request.url);
    requests.push(decodeURIComponent(url.pathname + url.search).replace("/api/data/v9.2", ""));
    return HttpResponse.json({});
  })
);

let metadata: MetadataClient;
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  const client = new DataverseClient({
    baseUrl: "https://contoso.crm.dynamics.com",
    tokenProvider: { getToken: () => Promise.resolve("test-token") },
  });
  metadata = new MetadataClient(client);
});
afterEach(() => {
  requests.length = 0;
});
afterAll(() => {
  server.close();
});

describe("#53: quotes in names are escaped", () => {
  it("logical, schema and option set names", async () => {
    await metadata.getEntityDefinition("O'Brien");
    await metadata.getAttributeDefinition("O'Brien", "O'Neil");
    await metadata.getRelationshipBySchemaName("O'Brien_rel");
    await metadata.getGlobalOptionSet("O'Brien_set");
    expect(requests).toEqual([
      "/EntityDefinitions(LogicalName='O''Brien')",
      "/EntityDefinitions(LogicalName='O''Brien')/Attributes(LogicalName='O''Neil')",
      "/RelationshipDefinitions(SchemaName='O''Brien_rel')",
      "/GlobalOptionSetDefinitions(Name='O''Brien_set')",
    ]);
  });

  it("the ClientVersionStamp parameter", async () => {
    await metadata.retrieveMetadataChanges({}, "1'2");
    expect(requests[0]).toContain("@p2='1''2'");
  });
});

describe("#53: values that don't fit their type are rejected", () => {
  it("a relationship id that isn't a GUID", async () => {
    await expect(metadata.deleteRelationship("x)/../y")).rejects.toBeInstanceOf(
      DataverseInvalidRequestError
    );
    await expect(metadata.getRelationshipByMetadataId("x')")).rejects.toBeInstanceOf(
      DataverseInvalidRequestError
    );
    expect(requests).toEqual([]);
  });

  it("getRelationshipByMetadataId casts to the kind of relationship asked for", async () => {
    const id = "00000000-0000-0000-0000-0000000000aa";
    await metadata.getRelationshipByMetadataId(id, {
      cast: "OneToManyRelationshipMetadata",
      select: ["ReferencedEntity"],
    });
    await metadata.getRelationshipByMetadataId(id, { select: ["SchemaName"] });
    expect(requests).toEqual([
      `/RelationshipDefinitions(${id})/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata?$select=ReferencedEntity`,
      `/RelationshipDefinitions(${id})?$select=SchemaName`,
    ]);
  });

  it("a DeletedMetadataFilters value that isn't an enum member", async () => {
    await expect(
      metadata.retrieveMetadataChanges({}, "1", "Entity' or 1 eq 1 or 'x")
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(requests).toEqual([]);
  });
});
