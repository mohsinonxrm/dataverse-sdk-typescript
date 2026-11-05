/**
 * The Web API messages MetadataClient calls must go out with the right HTTP shape:
 * functions as GET with parameter aliases, actions as POST with a JSON body.
 * #62: RetrieveMetadataChanges is a function (a POST gets 404).
 * #63: CanBeReferenced, CanBeReferencing and CanManyToMany are actions (a GET gets 400).
 */
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MetadataClient } from "../src/MetadataClient.js";
import {
  DeletedMetadataFilters,
  LogicalOperator,
  MetadataConditionOperator,
} from "../src/types/index.js";
import type { EntityQueryExpression } from "../src/types/index.js";

const BASE_URL = "https://contoso.crm.dynamics.com/api/data/v9.2";

interface Recorded {
  method: string;
  url: URL;
  body: string;
}

const requests: Recorded[] = [];
let reply: () => Response = () => HttpResponse.json({});

const server = setupServer(
  http.all(`${BASE_URL}/*`, async ({ request }) => {
    requests.push({
      method: request.method,
      url: new URL(request.url),
      body: await request.text(),
    });
    return reply();
  })
);

let metadata: MetadataClient;

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  // Created after msw patches fetch, so the client sends through it.
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

function last(): Recorded {
  const r = requests.at(-1);
  if (!r) throw new Error("no request was sent");
  return r;
}

/** The decoded value of a parameter alias such as `@p1`. */
function alias(url: URL, name: string): string | null {
  return url.searchParams.get(name);
}

const query: EntityQueryExpression = {
  Criteria: {
    FilterOperator: LogicalOperator.And,
    Conditions: [
      {
        PropertyName: "LogicalName",
        ConditionOperator: MetadataConditionOperator.Equals,
        Value: { Type: "System.String", Value: "account" },
      },
    ],
  },
  Properties: { AllProperties: false, PropertyNames: ["LogicalName"] },
};

describe("#62: retrieveMetadataChanges sends the RetrieveMetadataChanges function", () => {
  it("sends GET with the query as a JSON parameter alias, and no body", async () => {
    reply = () =>
      HttpResponse.json({
        ServerVersionStamp: "8881376!11/05/2026 22:00:28",
        DeletedMetadata: null,
        EntityMetadata: [{ LogicalName: "account" }],
      });

    const result = await metadata.retrieveMetadataChanges(query);

    const r = last();
    expect(r.method).toBe("GET");
    expect(r.body).toBe("");
    expect(decodeURIComponent(r.url.pathname)).toBe(
      "/api/data/v9.2/RetrieveMetadataChanges(Query=@p1)"
    );
    expect(JSON.parse(alias(r.url, "@p1") ?? "")).toEqual({
      Criteria: {
        FilterOperator: "And",
        Conditions: [
          {
            PropertyName: "LogicalName",
            ConditionOperator: "Equals",
            Value: { Type: "System.String", Value: "account" },
          },
        ],
      },
      Properties: { AllProperties: false, PropertyNames: ["LogicalName"] },
    });
    expect(result.ServerVersionStamp).toBe("8881376!11/05/2026 22:00:28");
    expect(result.EntityMetadata).toEqual([{ LogicalName: "account" }]);
  });

  it("writes enum members by name at any depth, since Dataverse rejects numbers", async () => {
    await metadata.retrieveMetadataChanges({
      Criteria: {
        FilterOperator: LogicalOperator.Or,
        Filters: [
          {
            FilterOperator: LogicalOperator.And,
            Conditions: [
              {
                PropertyName: "IsCustomEntity",
                ConditionOperator: MetadataConditionOperator.NotEquals,
              },
            ],
          },
        ],
      },
      AttributeQuery: {
        Criteria: {
          Conditions: [
            { PropertyName: "AttributeOf", ConditionOperator: MetadataConditionOperator.LessThan },
          ],
        },
      },
    });

    const sent = alias(last().url, "@p1") ?? "";
    expect(sent).not.toMatch(/"(FilterOperator|ConditionOperator)":\d/);
    expect(JSON.parse(sent)).toMatchObject({
      Criteria: {
        FilterOperator: "Or",
        Filters: [{ FilterOperator: "And", Conditions: [{ ConditionOperator: "NotEquals" }] }],
      },
      AttributeQuery: { Criteria: { Conditions: [{ ConditionOperator: "LessThan" }] } },
    });
  });

  it("passes the client version stamp as an OData string literal", async () => {
    await metadata.retrieveMetadataChanges(query, "8881376!11/05/2026 22:00:28");

    const r = last();
    expect(decodeURIComponent(r.url.pathname)).toBe(
      "/api/data/v9.2/RetrieveMetadataChanges(Query=@p1,ClientVersionStamp=@p2)"
    );
    expect(alias(r.url, "@p2")).toBe("'8881376!11/05/2026 22:00:28'");
  });

  it("passes DeletedMetadataFilters as an enum literal, by name or by number", async () => {
    await metadata.retrieveMetadataChanges(query, "1!x", "Attribute,Relationship");
    expect(decodeURIComponent(last().url.pathname)).toBe(
      "/api/data/v9.2/RetrieveMetadataChanges(Query=@p1,ClientVersionStamp=@p2,DeletedMetadataFilters=@p3)"
    );
    expect(alias(last().url, "@p3")).toBe(
      "Microsoft.Dynamics.CRM.DeletedMetadataFilters'Attribute,Relationship'"
    );

    // The member's value as is: Dataverse takes a member name or the numeric flag value.
    await metadata.retrieveMetadataChanges(query, "1!x", DeletedMetadataFilters.All);
    const all: string | number = DeletedMetadataFilters.All;
    expect(alias(last().url, "@p3")).toBe(
      `Microsoft.Dynamics.CRM.DeletedMetadataFilters'${String(all)}'`
    );
  });

  it("doubles single quotes in the version stamp", async () => {
    await metadata.retrieveMetadataChanges(query, "it's");
    expect(alias(last().url, "@p2")).toBe("'it''s'");
  });
});

describe("#63: canBeReferenced, canBeReferencing and canManyToMany send actions", () => {
  const cases = [
    ["canBeReferenced", "CanBeReferenced"],
    ["canBeReferencing", "CanBeReferencing"],
    ["canManyToMany", "CanManyToMany"],
  ] as const;

  for (const [method, action] of cases) {
    it(`${method} sends POST /${action} with the entity name in the body`, async () => {
      reply = () => HttpResponse.json({ [action]: true });

      await expect(metadata[method]("account")).resolves.toBe(true);

      const r = last();
      expect(r.method).toBe("POST");
      expect(r.url.pathname).toBe(`/api/data/v9.2/${action}`);
      expect(r.url.search).toBe("");
      expect(JSON.parse(r.body)).toEqual({ EntityName: "account" });
    });

    it(`${method} returns false when the response says false`, async () => {
      reply = () => HttpResponse.json({ [action]: false });
      await expect(metadata[method]("activitypointer")).resolves.toBe(false);
      expect(last().method).toBe("POST");
      expect(JSON.parse(last().body)).toEqual({ EntityName: "activitypointer" });
    });
  }
});
