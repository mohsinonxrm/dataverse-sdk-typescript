/**
 * #232: the Web API reads an enum value in a JSON body only as a string (`"ReadAccess, WriteAccess"`)
 * and answers 400 to a number. The messages send member names, as the actions do.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  AccessRights,
  ConditionOperator,
  GrantAccessRequest,
  LogicalOperator,
  QueryExpressionToFetchXmlRequest,
  createEntityReference,
} from "../src/index.js";

describe("#232: enum values in message bodies", () => {
  it("GrantAccessRequest sends a flags AccessMask as member names", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/GrantAccess", () => noContent());

    await client.execute(
      new GrantAccessRequest(createEntityReference("account", "a1"), {
        AccessMask: AccessRights.ReadAccess | AccessRights.AppendToAccess,
      })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" },
      PrincipalAccess: { AccessMask: "ReadAccess, AppendToAccess" },
    });
  });

  it("QueryExpressionToFetchXmlRequest names the enums of a QueryExpression", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/QueryExpressionToFetchXml", () => jsonResponse({ FetchXml: "<fetch />" }));

    await client.execute(
      new QueryExpressionToFetchXmlRequest({
        "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
        EntityName: "account",
        Criteria: {
          FilterOperator: LogicalOperator.And,
          Conditions: [{ AttributeName: "name", Operator: ConditionOperator.Null }],
        },
      })
    );

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Query: {
        "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
        EntityName: "account",
        Criteria: {
          FilterOperator: "And",
          Conditions: [{ AttributeName: "name", Operator: "Null" }],
        },
      },
    });
  });
});
