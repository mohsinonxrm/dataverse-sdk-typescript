/**
 * #64: metadata creates return `204 No Content` with the new id in `OData-EntityId`, not a body.
 * Creates and updates also take a solution, and `mergeAndUpdateEntityDefinition` keeps the
 * properties a `PUT` would otherwise reset.
 */
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  DataverseClient,
  DataverseInvalidRequestError,
  DataverseODataError,
} from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "../src/MetadataClient.js";

const API = "https://contoso.crm.dynamics.com/api/data/v9.2";
const ID = "3fd0fdd5-7b1f-4ed1-90bc-b830d3ed1984";

interface Recorded {
  method: string;
  path: string;
  headers: Headers;
  body: string;
}

const requests: Recorded[] = [];
let reply: (r: Recorded) => Response = () => new HttpResponse(null, { status: 204 });

const server = setupServer(
  http.all(`${API}/*`, async ({ request }) => {
    const r: Recorded = {
      method: request.method,
      path: decodeURIComponent(new URL(request.url).pathname).replace("/api/data/v9.2", ""),
      headers: request.headers,
      body: await request.text(),
    };
    requests.push(r);
    return reply(r);
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
  requests.length = 0;
});
afterAll(() => {
  server.close();
});

/** What Dataverse sends for a metadata create: 204, no body, the id in OData-EntityId. */
function created(collection: string): Response {
  return new HttpResponse(null, {
    status: 204,
    headers: { "OData-EntityId": `${API}/${collection}(${ID})` },
  });
}

const label = { LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }] };

const creates = [
  {
    name: "createEntityDefinition",
    path: "/EntityDefinitions",
    run: (o?: { solutionUniqueName: string }) =>
      metadata.createEntityDefinition({ SchemaName: "new_Project", DisplayName: label }, o),
  },
  {
    name: "createAttributeDefinition",
    path: "/EntityDefinitions(LogicalName='new_project')/Attributes",
    run: (o?: { solutionUniqueName: string }) =>
      metadata.createAttributeDefinition("new_project", { SchemaName: "new_Note" }, o),
  },
  {
    name: "createOneToManyRelationship",
    path: "/RelationshipDefinitions",
    run: (o?: { solutionUniqueName: string }) =>
      metadata.createOneToManyRelationship(
        { SchemaName: "new_account_project", ReferencedEntity: "account" },
        o
      ),
  },
  {
    name: "createManyToManyRelationship",
    path: "/RelationshipDefinitions",
    run: (o?: { solutionUniqueName: string }) =>
      metadata.createManyToManyRelationship({ SchemaName: "new_project_contact" }, o),
  },
  {
    name: "createGlobalOptionSet",
    path: "/GlobalOptionSetDefinitions",
    run: (o?: { solutionUniqueName: string }) =>
      metadata.createGlobalOptionSet({ Name: "new_colors" }, o),
  },
];

describe("#64: metadata creates read the id from OData-EntityId", () => {
  for (const c of creates) {
    it(`${c.name} returns the id from a 204 with no body`, async () => {
      reply = () => created(c.path.includes("Relationship") ? "RelationshipDefinitions" : "x");

      await expect(c.run()).resolves.toBe(ID);

      const r = requests.at(-1);
      expect(r?.method).toBe("POST");
      expect(r?.path).toBe(c.path);
      // No return=representation: Dataverse would serialize the whole new definition back.
      expect(r?.headers.get("prefer") ?? "").not.toMatch(/return=representation/);
      expect(r?.headers.get("mscrm.solutionuniquename")).toBeNull();
    });

    it(`${c.name} sends MSCRM.SolutionUniqueName when a solution is given`, async () => {
      reply = () => created("x");
      await c.run({ solutionUniqueName: "SdkTests" });
      expect(requests.at(-1)?.headers.get("mscrm.solutionuniquename")).toBe("SdkTests");
    });
  }

  it("falls back to MetadataId in a JSON body when there is no OData-EntityId", async () => {
    reply = () => HttpResponse.json({ MetadataId: ID }, { status: 201 });
    await expect(
      metadata.createEntityDefinition({ SchemaName: "new_Project", DisplayName: label })
    ).resolves.toBe(ID);
  });

  it("rejects with a clear error when neither the header nor the body has an id", async () => {
    reply = () => new HttpResponse(null, { status: 204 });
    await expect(
      metadata.createEntityDefinition({ SchemaName: "new_Project" })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
  });

  it("rejects with the Dataverse error for a failed create", async () => {
    reply = () =>
      HttpResponse.json(
        { error: { code: "0x80044363", message: "A table with this name already exists." } },
        { status: 400 }
      );
    const err: unknown = await metadata
      .createEntityDefinition({ SchemaName: "new_Project" })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect((err as DataverseODataError).status).toBe(400);
    expect((err as DataverseODataError).message).toBe("A table with this name already exists.");
  });
});

describe("#64: metadata updates", () => {
  it("every update sends PUT with MSCRM.MergeLabels and the solution", async () => {
    reply = () => new HttpResponse(null, { status: 204 });
    const o = { solutionUniqueName: "SdkTests" };

    await metadata.updateEntityDefinition("new_project", { DisplayName: label }, o);
    await metadata.updateAttributeDefinition("new_project", "new_note", { DisplayName: label }, o);
    await metadata.updateOneToManyRelationship("new_account_project", {}, o);
    await metadata.updateManyToManyRelationship("new_project_contact", {}, o);
    await metadata.updateGlobalOptionSet("new_colors", {}, o);

    expect(requests.map((r) => `${r.method} ${r.path}`)).toEqual([
      "PUT /EntityDefinitions(LogicalName='new_project')",
      "PUT /EntityDefinitions(LogicalName='new_project')/Attributes(LogicalName='new_note')",
      "PUT /RelationshipDefinitions(SchemaName='new_account_project')",
      "PUT /RelationshipDefinitions(SchemaName='new_project_contact')",
      "PUT /GlobalOptionSetDefinitions(Name='new_colors')",
    ]);
    for (const r of requests) {
      expect(r.headers.get("mscrm.mergelabels")).toBe("true");
      expect(r.headers.get("mscrm.solutionuniquename")).toBe("SdkTests");
    }
  });

  it("mergeAndUpdateEntityDefinition PUTs the current definition with the changes applied", async () => {
    const current = {
      "@odata.context": `${API}/$metadata#EntityDefinitions/$entity`,
      MetadataId: ID,
      LogicalName: "new_project",
      SchemaName: "new_Project",
      HasNotes: true,
      IsAuditEnabled: { Value: true, CanBeChanged: true },
      Description: { LocalizedLabels: [{ Label: "Old", LanguageCode: 1033 }] },
    };
    reply = (r) =>
      r.method === "GET" ? HttpResponse.json(current) : new HttpResponse(null, { status: 204 });

    const description = { LocalizedLabels: [{ Label: "New", LanguageCode: 1033 }] };
    await metadata.mergeAndUpdateEntityDefinition("new_project", { Description: description });

    expect(requests.map((r) => `${r.method} ${r.path}`)).toEqual([
      "GET /EntityDefinitions(LogicalName='new_project')",
      "PUT /EntityDefinitions(LogicalName='new_project')",
    ]);
    const put = requests[1];
    expect(put.headers.get("mscrm.mergelabels")).toBe("true");
    expect(JSON.parse(put.body)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
      MetadataId: ID,
      LogicalName: "new_project",
      SchemaName: "new_Project",
      HasNotes: true,
      IsAuditEnabled: { Value: true, CanBeChanged: true },
      Description: description,
    });
  });
});
