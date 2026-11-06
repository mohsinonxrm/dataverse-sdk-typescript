/**
 * #232: the Web API reads an enum value in a JSON body only as a string, `"ReadAccess"` or, for a
 * flags enum, `"ReadAccess, WriteAccess"`. It answers 400 to a number ("Cannot read the value '1'
 * as a quoted JSON string value"). The generated enums are numeric, so the actions send member
 * names, at the top level and inside complex types, including derived types and arrays.
 */
import { describe, expect, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { createTestClient, jsonResponse, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import {
  AccessRights,
  BulkDeleteAction,
  ConditionOperator,
  GenerateSharedLinkAction,
  GrantAccessAction,
  JoinOperator,
  LogicalOperator,
  OrderType,
  QueryExpressionToFetchXmlAction,
  createEntityReference,
} from "../src/index.js";
import type { PrincipalAccess, QueryExpression } from "../src/types/index.js";

const account = createEntityReference("account", "a1");

async function bodyOf(action: Executable<unknown>): Promise<Record<string, unknown>> {
  const { client, fake } = createTestClient();
  fake.on("POST", /./, () => jsonResponse({ FetchXml: "<fetch />", SharedLink: "s" }));
  await client.execute(action);
  return JSON.parse(fake.last().bodyText ?? "") as Record<string, unknown>;
}

describe("#232: enum values in action bodies", () => {
  it("GrantAccess sends a flags AccessMask as member names", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/GrantAccess", () => noContent());
    const access: PrincipalAccess = {
      AccessMask: AccessRights.ReadAccess | AccessRights.WriteAccess | AccessRights.ShareAccess,
    };

    await client.execute(new GrantAccessAction({ Target: account, PrincipalAccess: access }));

    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "a1" },
      PrincipalAccess: { AccessMask: "ReadAccess, WriteAccess, ShareAccess" },
    });
    // The caller's object isn't changed.
    expect(access.AccessMask).toBe(262147);
  });

  it("a single member, zero, a name and an unknown bit", async () => {
    const mask = async (AccessMask: unknown) =>
      (
        (
          await bodyOf(
            new GrantAccessAction({
              Target: account,
              PrincipalAccess: { AccessMask } as PrincipalAccess,
            })
          )
        ).PrincipalAccess as { AccessMask: unknown }
      ).AccessMask;
    expect(await mask(AccessRights.ReadAccess)).toBe("ReadAccess");
    expect(await mask(AccessRights.None)).toBe("None");
    expect(await mask("ReadAccess, AppendAccess")).toBe("ReadAccess, AppendAccess");
    // 9 is ReadAccess plus 8, which isn't a member: sent as the number in a string, which
    // Dataverse also reads.
    expect(await mask(9)).toBe("9");
  });

  it("a top-level enum parameter is a member name", async () => {
    const body = await bodyOf(
      new GenerateSharedLinkAction({ Target: account, SharedRights: AccessRights.ReadAccess })
    );
    expect(body.SharedRights).toBe("ReadAccess");
  });

  it("names enums inside a derived type, picked by @odata.type, at every depth", async () => {
    const query: QueryExpression & { "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression" } = {
      "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
      EntityName: "account",
      Criteria: {
        FilterOperator: LogicalOperator.Or,
        Conditions: [{ AttributeName: "name", Operator: ConditionOperator.NotNull }],
        Filters: [{ FilterOperator: LogicalOperator.And }],
      },
      LinkEntities: [{ LinkToEntityName: "contact", JoinOperator: JoinOperator.LeftOuter }],
      Orders: [{ AttributeName: "name", OrderType: OrderType.Descending }],
      SubQueryExpression: { Criteria: { FilterOperator: LogicalOperator.Or } },
    };

    const body = await bodyOf(new QueryExpressionToFetchXmlAction({ Query: query }));

    expect(body.Query).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
      EntityName: "account",
      Criteria: {
        FilterOperator: "Or",
        Conditions: [{ AttributeName: "name", Operator: "NotNull" }],
        Filters: [{ FilterOperator: "And" }],
      },
      LinkEntities: [{ LinkToEntityName: "contact", JoinOperator: "LeftOuter" }],
      Orders: [{ AttributeName: "name", OrderType: "Descending" }],
      SubQueryExpression: { Criteria: { FilterOperator: "Or" } },
    });
  });

  it("names enums in each item of a collection parameter", async () => {
    const body = await bodyOf(
      new BulkDeleteAction({
        QuerySet: [{ EntityName: "account", Criteria: { FilterOperator: LogicalOperator.Or } }],
        JobName: "job",
        SendEmailNotification: false,
        ToRecipients: [],
        CCRecipients: [],
        RecurrencePattern: "",
        StartDateTime: "2026-01-01T00:00:00Z",
      })
    );
    expect(body.QuerySet).toEqual([{ EntityName: "account", Criteria: { FilterOperator: "Or" } }]);
  });
});
