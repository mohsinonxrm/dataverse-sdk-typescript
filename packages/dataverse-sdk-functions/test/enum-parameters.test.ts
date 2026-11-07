/**
 * #358: Dataverse reads an enum member inside a JSON function parameter (a complex type or a
 * collection) only by name. The generated functions sent the numbers (`"ConditionOperator":0`,
 * `[0]`), so typed enum values in RetrieveMetadataChanges' Query or QuerySchedule's TimeCodes
 * failed. They now go through `enumBody`, as action bodies do (#232). Requests go through a real
 * DataverseClient and the recording fake fetch.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  LogicalOperator,
  MetadataConditionOperator,
  QueryMultipleSchedulesFunction,
  QueryScheduleFunction,
  RetrieveMetadataChangesFunction,
  TimeCode,
  type EntityQueryExpression,
} from "../src/index.js";

const USER = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

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

describe("#358: enum values inside complex and collection function parameters", () => {
  it("RetrieveMetadataChanges sends the Query's FilterOperator and ConditionOperator as names", async () => {
    const query: EntityQueryExpression = {
      Criteria: {
        FilterOperator: LogicalOperator.Or,
        Conditions: [
          {
            PropertyName: "LogicalName",
            ConditionOperator: MetadataConditionOperator.Equals,
            Value: { Type: "System.String", Value: "account" },
          },
          {
            PropertyName: "LogicalName",
            ConditionOperator: MetadataConditionOperator.NotEquals,
            Value: { Type: "System.String", Value: "contact" },
          },
        ],
      },
      Properties: { AllProperties: false, PropertyNames: ["LogicalName"] },
    };
    const r = await send(new RetrieveMetadataChangesFunction({ Query: query }));
    expect(r.url).toContain("/RetrieveMetadataChanges(Query=@p1)?");
    expect(JSON.parse(aliases(r.url)["@p1"] ?? "")).toEqual({
      Criteria: {
        FilterOperator: "Or",
        Conditions: [
          {
            PropertyName: "LogicalName",
            ConditionOperator: "Equals",
            Value: { Type: "System.String", Value: "account" },
          },
          {
            PropertyName: "LogicalName",
            ConditionOperator: "NotEquals",
            Value: { Type: "System.String", Value: "contact" },
          },
        ],
      },
      Properties: { AllProperties: false, PropertyNames: ["LogicalName"] },
    });
    // The caller's query isn't changed
    expect(query.Criteria?.Conditions?.[0]?.ConditionOperator).toBe(0);
  });

  it("QuerySchedule sends TimeCodes as member names", async () => {
    const r = await send(
      new QueryScheduleFunction({
        ResourceId: USER,
        Start: new Date("2026-01-01T00:00:00Z"),
        End: new Date("2026-01-02T00:00:00Z"),
        TimeCodes: [TimeCode.Available, TimeCode.Busy],
      })
    );
    expect(aliases(r.url)["@p4"]).toBe('["Available","Busy"]');
  });

  it("QueryMultipleSchedules sends TimeCodes as member names", async () => {
    const r = await send(
      new QueryMultipleSchedulesFunction({
        Resource: [{ "@odata.type": "Microsoft.Dynamics.CRM.resource", resourceid: USER }],
        Start: "2026-01-01T00:00:00Z",
        End: "2026-01-02T00:00:00Z",
        TimeCodes: [TimeCode.Unavailable],
      })
    );
    expect(JSON.parse(aliases(r.url)["@p1"] ?? "")).toEqual([
      { "@odata.type": "Microsoft.Dynamics.CRM.resource", resourceid: USER },
    ]);
    expect(aliases(r.url)["@p4"]).toBe('["Unavailable"]');
  });
});
