/**
 * #64: metadata creates return `204 No Content` with the new id in `OData-EntityId`, not a body.
 * Creates and updates also take a solution, and `mergeAndUpdateEntityDefinition` keeps the
 * properties a `PUT` would otherwise reset. #359: updates take the full definition, and the
 * attribute, relationship and global choice merge helpers read it with `Consistency: Strong`.
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

/** A retrieved table and text column, as the GETs of the merge helpers return them. */
const currentTable = {
  MetadataId: ID,
  LogicalName: "new_project",
  SchemaName: "new_Project",
  HasNotes: true,
};
const currentNote = {
  MetadataId: ID,
  LogicalName: "new_note",
  SchemaName: "new_Note",
  MaxLength: 200,
  FormatName: { Value: "Text" as const },
  RequiredLevel: { Value: "None" as const, CanBeChanged: true },
  DisplayName: { LocalizedLabels: [{ Label: "Note", LanguageCode: 1033 }] },
};

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

    // Full definitions, as a PUT replaces the definition: `@odata.type` is required (#359).
    await metadata.updateEntityDefinition(
      "new_project",
      { ...currentTable, "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata" },
      o
    );
    await metadata.updateAttributeDefinition(
      "new_project",
      "new_note",
      { ...currentNote, "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata" },
      o
    );
    await metadata.updateOneToManyRelationship(
      "new_account_project",
      {
        "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
        SchemaName: "new_account_project",
        ReferencedEntity: "account",
        ReferencingEntity: "new_project",
      },
      o
    );
    await metadata.updateManyToManyRelationship(
      "new_project_contact",
      {
        "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
        SchemaName: "new_project_contact",
        Entity1LogicalName: "new_project",
        Entity2LogicalName: "contact",
      },
      o
    );
    await metadata.updateGlobalOptionSet(
      "new_colors",
      {
        "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
        Name: "new_colors",
        DisplayName: label,
        IsGlobal: true,
      },
      o
    );

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
    // #359: a cached copy, up to ~30 s old, would make the PUT revert a recent change.
    expect(requests[0].headers.get("consistency")).toBe("Strong");
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

/** Answer GETs with `body` (plus OData annotations) and everything else with 204. */
function answerGet(context: string, body: Record<string, unknown>): void {
  reply = (r) =>
    r.method === "GET"
      ? HttpResponse.json({
          "@odata.context": `${API}/$metadata#${context}/$entity`,
          "@odata.etag": 'W/"1"',
          "DisplayName@odata.type": "#Microsoft.Dynamics.CRM.Label",
          ...body,
        })
      : new HttpResponse(null, { status: 204 });
}

describe("#359: merge helpers read the current definition (Consistency: Strong) and PUT it back", () => {
  it("mergeAndUpdateAttributeDefinition casts the GET to the column's type and keeps MaxLength", async () => {
    answerGet(
      "EntityDefinitions('new_project')/Attributes/Microsoft.Dynamics.CRM.StringAttributeMetadata",
      currentNote
    );

    const displayName = { LocalizedLabels: [{ Label: "Comment", LanguageCode: 1033 }] };
    await metadata.mergeAndUpdateAttributeDefinition(
      "new_project",
      "new_note",
      { "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata", DisplayName: displayName },
      { solutionUniqueName: "SdkTests" }
    );

    expect(requests.map((r) => `${r.method} ${r.path}`)).toEqual([
      "GET /EntityDefinitions(LogicalName='new_project')/Attributes(LogicalName='new_note')/Microsoft.Dynamics.CRM.StringAttributeMetadata",
      "PUT /EntityDefinitions(LogicalName='new_project')/Attributes(LogicalName='new_note')",
    ]);
    const [get, put] = requests;
    expect(get.headers.get("consistency")).toBe("Strong");
    expect(put.headers.get("mscrm.mergelabels")).toBe("true");
    expect(put.headers.get("mscrm.solutionuniquename")).toBe("SdkTests");
    expect(JSON.parse(put.body)).toEqual({
      ...currentNote,
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      DisplayName: displayName,
    });
  });

  it("mergeAndUpdateRelationship casts the GET to the relationship's type", async () => {
    const current = {
      MetadataId: ID,
      SchemaName: "new_account_project",
      ReferencedEntity: "account",
      ReferencingEntity: "new_project",
      CascadeConfiguration: { Delete: "RemoveLink", Assign: "NoCascade" },
      IsValidForAdvancedFind: true,
    };
    answerGet(
      "RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      current
    );

    await metadata.mergeAndUpdateRelationship("new_account_project", {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      IsValidForAdvancedFind: false,
    });

    expect(requests.map((r) => `${r.method} ${r.path}`)).toEqual([
      "GET /RelationshipDefinitions(SchemaName='new_account_project')/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      "PUT /RelationshipDefinitions(SchemaName='new_account_project')",
    ]);
    expect(requests[0].headers.get("consistency")).toBe("Strong");
    expect(JSON.parse(requests[1].body)).toEqual({
      ...current,
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      IsValidForAdvancedFind: false,
    });
  });

  it("mergeAndUpdateRelationship reads an N:N relationship as ManyToManyRelationshipMetadata", async () => {
    answerGet("RelationshipDefinitions/Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata", {
      SchemaName: "new_project_contact",
    });

    await metadata.mergeAndUpdateRelationship("new_project_contact", {
      "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
      IsValidForAdvancedFind: false,
    });

    expect(requests[0].path).toBe(
      "/RelationshipDefinitions(SchemaName='new_project_contact')/Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata"
    );
    expect(JSON.parse(requests[1].body)).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
      SchemaName: "new_project_contact",
      IsValidForAdvancedFind: false,
    });
  });

  it("mergeAndUpdateGlobalOptionSet keeps the other properties and leaves the options out", async () => {
    const current = {
      MetadataId: ID,
      Name: "new_colors",
      IsGlobal: true,
      OptionSetType: "Picklist",
      DisplayName: { LocalizedLabels: [{ Label: "Colors", LanguageCode: 1033 }] },
      Options: [{ Value: 1, Label: { LocalizedLabels: [{ Label: "Red", LanguageCode: 1033 }] } }],
    };
    answerGet("GlobalOptionSetDefinitions/Microsoft.Dynamics.CRM.OptionSetMetadata", current);

    const description = { LocalizedLabels: [{ Label: "Paint colors", LanguageCode: 1033 }] };
    await metadata.mergeAndUpdateGlobalOptionSet("new_colors", { Description: description });

    expect(requests.map((r) => `${r.method} ${r.path}`)).toEqual([
      "GET /GlobalOptionSetDefinitions(Name='new_colors')/Microsoft.Dynamics.CRM.OptionSetMetadata",
      "PUT /GlobalOptionSetDefinitions(Name='new_colors')",
    ]);
    expect(requests[0].headers.get("consistency")).toBe("Strong");
    const { Options: _options, ...rest } = current;
    // Options aren't updated by a PUT: InsertOptionValue, UpdateOptionValue and friends do that.
    expect(JSON.parse(requests[1].body)).toEqual({
      ...rest,
      "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
      Description: description,
    });
  });

  it("mergeAndUpdateGlobalOptionSet takes a MetadataId", async () => {
    answerGet("GlobalOptionSetDefinitions/Microsoft.Dynamics.CRM.OptionSetMetadata", { Name: "x" });
    await metadata.mergeAndUpdateGlobalOptionSet(ID, { IsCustomizable: { Value: true } });
    expect(requests.map((r) => `${r.method} ${r.path}`)).toEqual([
      `GET /GlobalOptionSetDefinitions(${ID})/Microsoft.Dynamics.CRM.OptionSetMetadata`,
      `PUT /GlobalOptionSetDefinitions(${ID})`,
    ]);
  });

  it("rejects changes without a usable @odata.type before sending anything", async () => {
    const untyped = metadata as unknown as {
      mergeAndUpdateAttributeDefinition(e: string, a: string, c: object): Promise<void>;
      mergeAndUpdateRelationship(s: string, c: object): Promise<void>;
    };
    await expect(
      untyped.mergeAndUpdateAttributeDefinition("new_project", "new_note", { MaxLength: 1 })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    await expect(
      untyped.mergeAndUpdateRelationship("new_rel", { "@odata.type": "x)/../../Things" })
    ).rejects.toBeInstanceOf(DataverseInvalidRequestError);
    expect(requests).toEqual([]);
  });

  it("a failed GET is thrown and nothing is PUT", async () => {
    reply = () =>
      HttpResponse.json(
        { error: { code: "0x80040217", message: "Could not find the attribute." } },
        { status: 404 }
      );
    await expect(
      metadata.mergeAndUpdateAttributeDefinition("new_project", "new_nope", {
        "@odata.type": "Microsoft.Dynamics.CRM.MemoAttributeMetadata",
        MaxLength: 4000,
      })
    ).rejects.toBeInstanceOf(DataverseODataError);
    expect(requests.map((r) => r.method)).toEqual(["GET"]);
  });
});
