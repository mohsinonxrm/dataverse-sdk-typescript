/**
 * #65: typed attribute casts with $expand, LabelLanguages, a cached entity-set-name lookup, and
 * escaped key values.
 */
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "../src/MetadataClient.js";

const API = "https://contoso.crm.dynamics.com/api/data/v9.2";

interface Recorded {
  method: string;
  url: URL;
  /** Decoded path relative to the Web API root. */
  path: string;
}

const requests: Recorded[] = [];
let reply: (r: Recorded) => Response = () => HttpResponse.json({ value: [] });

const server = setupServer(
  http.all(`${API}/*`, ({ request }) => {
    const url = new URL(request.url);
    const r: Recorded = {
      method: request.method,
      url,
      path: decodeURIComponent(url.pathname).replace("/api/data/v9.2", ""),
    };
    requests.push(r);
    return reply(r);
  })
);

let client: DataverseClient;
let metadata: MetadataClient;

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  client = new DataverseClient({
    baseUrl: "https://contoso.crm.dynamics.com",
    tokenProvider: { getToken: () => Promise.resolve("test-token") },
  });
  metadata = new MetadataClient(client);
});
afterEach(() => {
  requests.length = 0;
  reply = () => HttpResponse.json({ value: [] });
});
afterAll(() => {
  server.close();
});

function last(): Recorded {
  const r = requests.at(-1);
  if (!r) throw new Error("no request was sent");
  return r;
}

describe("#65: typed attribute casts", () => {
  it("produces the documented picklist URL, with $expand and LabelLanguages", async () => {
    reply = () =>
      HttpResponse.json({
        value: [{ LogicalName: "industrycode", OptionSet: { Options: [{ Value: 1 }] } }],
      });

    const picklists = await metadata.getAttributeDefinitions("account", {
      cast: "PicklistAttributeMetadata",
      select: ["LogicalName"],
      expand: ["OptionSet($select=Options)", "GlobalOptionSet($select=Options)"],
      labelLanguages: 1033,
    });

    const r = last();
    expect(r.method).toBe("GET");
    expect(r.path).toBe(
      "/EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata"
    );
    expect(r.url.searchParams.get("$select")).toBe("LogicalName");
    expect(r.url.searchParams.get("$expand")).toBe(
      "OptionSet($select=Options),GlobalOptionSet($select=Options)"
    );
    expect(r.url.searchParams.get("LabelLanguages")).toBe("1033");
    // Typed as PicklistAttributeMetadata: OptionSet is reachable without a cast.
    expect(picklists[0]?.OptionSet?.Options).toEqual([{ Value: 1 }]);
  });

  it.each([
    "StringAttributeMetadata",
    "MoneyAttributeMetadata",
    "DateTimeAttributeMetadata",
    "DecimalAttributeMetadata",
    "DoubleAttributeMetadata",
    "LookupAttributeMetadata",
    "StatusAttributeMetadata",
    "StateAttributeMetadata",
  ] as const)("casts to %s", async (cast) => {
    await metadata.getAttributeDefinitions("account", { cast });
    expect(last().path).toBe(
      `/EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.${cast}`
    );
  });

  it("casts a single attribute and expands it", async () => {
    reply = () => HttpResponse.json({ LogicalName: "industrycode" });
    await metadata.getAttributeDefinition("account", "industrycode", {
      cast: "PicklistAttributeMetadata",
      select: ["LogicalName"],
      expand: "OptionSet",
    });
    expect(last().path).toBe(
      "/EntityDefinitions(LogicalName='account')/Attributes(LogicalName='industrycode')/Microsoft.Dynamics.CRM.PicklistAttributeMetadata"
    );
    expect(last().url.searchParams.get("$expand")).toBe("OptionSet");
  });

  it("without a cast, still reads the base Attributes collection", async () => {
    await metadata.getAttributeDefinitions("account", {
      filter: "IsValidForAdvancedFind/Value eq true",
    });
    expect(last().path).toBe("/EntityDefinitions(LogicalName='account')/Attributes");
    expect(last().url.searchParams.get("$filter")).toBe("IsValidForAdvancedFind/Value eq true");
  });
});

describe("#65: LabelLanguages", () => {
  it("sends several languages as one comma-separated LabelLanguages", async () => {
    reply = () => HttpResponse.json({ LogicalName: "account" });
    await metadata.getEntityDefinition("account", {
      select: ["DisplayName"],
      labelLanguages: [1033, 1036],
    });
    expect(last().url.searchParams.get("LabelLanguages")).toBe("1033,1036");
    expect(last().url.searchParams.get("$select")).toBe("DisplayName");
  });

  it("applies to the collection reads too", async () => {
    await metadata.getEntityDefinitions({ labelLanguages: 1041, expand: ["Attributes"] });
    expect(last().url.searchParams.get("LabelLanguages")).toBe("1041");
    expect(last().url.searchParams.get("$expand")).toBe("Attributes");

    await metadata.getGlobalOptionSets({ labelLanguages: 1041 });
    expect(last().url.searchParams.get("LabelLanguages")).toBe("1041");

    await metadata.getOneToManyRelationships("account", { labelLanguages: 1041 });
    expect(last().url.searchParams.get("LabelLanguages")).toBe("1041");
  });

  it("is not sent when not asked for", async () => {
    await metadata.getEntityDefinitions();
    expect(last().url.search).toBe("");
  });
});

describe("#65: getEntitySetName", () => {
  const all = {
    value: [
      { LogicalName: "account", EntitySetName: "accounts" },
      { LogicalName: "new_activity", EntitySetName: "new_activities" },
      { LogicalName: "new_person", EntitySetName: "new_people" },
    ],
  };

  it("reads every entity set name once and answers from the cache after that", async () => {
    const fresh = new MetadataClient(client);
    reply = () => HttpResponse.json(all);

    await expect(fresh.getEntitySetName("account")).resolves.toBe("accounts");
    await expect(fresh.getEntitySetName("new_person")).resolves.toBe("new_people");
    await expect(fresh.getEntitySetName("New_Activity")).resolves.toBe("new_activities");

    expect(requests).toHaveLength(1);
    expect(last().path).toBe("/EntityDefinitions");
    expect(last().url.searchParams.get("$select")).toBe("LogicalName,EntitySetName");
  });

  it("shares one load between concurrent calls", async () => {
    const fresh = new MetadataClient(client);
    reply = () => HttpResponse.json(all);
    const names = await Promise.all([
      fresh.getEntitySetName("account"),
      fresh.getEntitySetName("new_person"),
    ]);
    expect(names).toEqual(["accounts", "new_people"]);
    expect(requests).toHaveLength(1);
  });

  it("looks up a table missing from the cache on its own, and caches it", async () => {
    const fresh = new MetadataClient(client);
    reply = (r) =>
      r.path === "/EntityDefinitions"
        ? HttpResponse.json(all)
        : HttpResponse.json({ LogicalName: "new_late", EntitySetName: "new_lates" });

    await expect(fresh.getEntitySetName("new_late")).resolves.toBe("new_lates");
    await expect(fresh.getEntitySetName("new_late")).resolves.toBe("new_lates");

    expect(requests.map((r) => r.path)).toEqual([
      "/EntityDefinitions",
      "/EntityDefinitions(LogicalName='new_late')",
    ]);
  });

  it("does not cache a failed load", async () => {
    const fresh = new MetadataClient(client);
    reply = () => HttpResponse.json({ error: { message: "busy" } }, { status: 500 });
    await expect(fresh.getEntitySetName("account")).rejects.toThrow();

    reply = () => HttpResponse.json(all);
    await expect(fresh.getEntitySetName("account")).resolves.toBe("accounts");
  });

  it("reloads after clearEntitySetNameCache()", async () => {
    const fresh = new MetadataClient(client);
    reply = () => HttpResponse.json(all);
    await fresh.getEntitySetName("account");
    fresh.clearEntitySetNameCache();
    await fresh.getEntitySetName("account");
    expect(requests.filter((r) => r.path === "/EntityDefinitions")).toHaveLength(2);
  });
});

describe("#65: key values are escaped", () => {
  it("doubles single quotes in a logical name", async () => {
    reply = () => HttpResponse.json({});
    await metadata.getEntityDefinition("x'y");
    expect(last().path).toBe("/EntityDefinitions(LogicalName='x''y')");
  });

  it("escapes characters that would end the path", async () => {
    reply = () => HttpResponse.json({});
    await metadata.getEntityDefinition("a#b?c");
    expect(last().url.pathname).toBe("/api/data/v9.2/EntityDefinitions(LogicalName='a%23b%3Fc')");
  });

  it("escapes every kind of key", async () => {
    reply = () => new HttpResponse(null, { status: 204 });
    await metadata.getAttributeDefinition("o'e", "a'b");
    await metadata.getRelationshipBySchemaName("r'1");
    await metadata.getGlobalOptionSet("c'olors");
    await metadata.deleteEntityDefinition("o'e");
    await metadata.deleteAttributeDefinition("o'e", "a'b");
    await metadata.deleteRelationshipBySchemaName("r'1");
    await metadata.deleteGlobalOptionSet("c'olors");

    expect(requests.map((r) => r.path)).toEqual([
      "/EntityDefinitions(LogicalName='o''e')/Attributes(LogicalName='a''b')",
      "/RelationshipDefinitions(SchemaName='r''1')",
      "/GlobalOptionSetDefinitions(Name='c''olors')",
      "/EntityDefinitions(LogicalName='o''e')",
      "/EntityDefinitions(LogicalName='o''e')/Attributes(LogicalName='a''b')",
      "/RelationshipDefinitions(SchemaName='r''1')",
      "/GlobalOptionSetDefinitions(Name='c''olors')",
    ]);
  });

  it("escapes the GetValid* function parameters", async () => {
    reply = () => HttpResponse.json({ EntityNames: [] });
    await metadata.getValidReferencingEntities("o'e");
    await metadata.getValidReferencedEntities("o'e");
    expect(requests.map((r) => r.path)).toEqual([
      "/GetValidReferencingEntities(ReferencedEntityName='o''e')",
      "/GetValidReferencedEntities(ReferencingEntityName='o''e')",
    ]);
  });
});
