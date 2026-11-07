/**
 * Live tests for #358: Dataverse reads an enum member inside a JSON function parameter (a complex
 * type or a collection) only by name. The generated functions now send typed enum values in
 * RetrieveMetadataChanges' Query and QuerySchedule's TimeCodes as member names, as the generated
 * actions do in bodies (#232). These tests only read.
 */
import { describe, expect, it } from "vitest";
import {
  LogicalOperator,
  MetadataConditionOperator,
  QueryScheduleFunction,
  RetrieveMetadataChangesFunction,
  TimeCode,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: enum values in JSON function parameters (#358)", () => {
  it("RetrieveMetadataChanges with a typed MetadataConditionOperator condition", async () => {
    const { client } = liveClient();
    const fn = new RetrieveMetadataChangesFunction({
      Query: {
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
        Properties: { AllProperties: false, PropertyNames: ["LogicalName", "SchemaName"] },
      },
    });
    const url = decodeURIComponent(fn.toRequestInformation(client.getBaseUrl()).url);
    expect(url).toContain('"ConditionOperator":"Equals"');
    expect(url).toContain('"FilterOperator":"And"');

    const result = await client.execute(fn);
    expect(result.EntityMetadata.map((e) => e.LogicalName)).toEqual(["account"]);
    expect(result.ServerVersionStamp).toBeTruthy();
  });

  it("QuerySchedule with typed TimeCodes", async () => {
    const { client } = liveClient();
    const { UserId } = await client.api("WhoAmI").get<{ UserId: string }>();
    const start = new Date();
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    const fn = new QueryScheduleFunction({
      ResourceId: UserId,
      Start: start,
      End: end,
      TimeCodes: [TimeCode.Available, TimeCode.Busy],
    });
    const url = decodeURIComponent(fn.toRequestInformation(client.getBaseUrl()).url);
    expect(url).toContain('@p4=["Available","Busy"]');

    const result = await client.execute(fn);
    expect(Array.isArray(result.TimeInfos)).toBe(true);
  });
});
