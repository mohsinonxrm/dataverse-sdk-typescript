/**
 * Live tests for #232: the Web API reads an enum value in an action body only as a string. A
 * number gets 400 ("Cannot read the value '1' as a quoted JSON string value"); a member name, a
 * flags combination ("ReadAccess, WriteAccess") or the number as a string works. The generated
 * actions now send member names. Creates an account and a team named with this run's id; afterAll
 * deletes them.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  AccessRights,
  ConditionOperator,
  GrantAccessAction,
  LogicalOperator,
  ModifyAccessAction,
  QueryExpressionToFetchXmlAction,
  RevokeAccessAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  RetrievePrincipalAccess_teamFunction,
  createEntityReference as functionReference,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient, runId } from "./env.js";

let accountId = "";
let teamId = "";

async function teamAccess(): Promise<string> {
  const { client } = liveClient();
  const result = await client.execute(
    new RetrievePrincipalAccess_teamFunction(teamId, functionReference("account", accountId))
  );
  return String(result.AccessRights);
}

describe.skipIf(!live)("live: enum values in action bodies (#232)", () => {
  beforeAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    accountId = await client.api("accounts").createAndGetId({ name: `${runId} enum body` });
    const who = await client.api("WhoAmI").get<{ BusinessUnitId: string }>();
    teamId = await client.api("teams").createAndGetId({
      name: `${runId} enum body`,
      teamtype: 0,
      "businessunitid@odata.bind": `/businessunits(${who.BusinessUnitId})`,
    });
  });

  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    if (teamId) await client.api(`teams(${teamId})`).delete();
    if (accountId) await client.api(`accounts(${accountId})`).delete();
  });

  it("the endpoint rejects a number and reads a name or a numeric string", async () => {
    const { client } = liveClient();
    const body = (AccessMask: unknown) => ({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: accountId },
      PrincipalAccess: {
        Principal: { "@odata.type": "Microsoft.Dynamics.CRM.team", teamid: teamId },
        AccessMask,
      },
    });
    await expect(client.api("GrantAccess").post(body(1))).rejects.toThrow(/quoted JSON string/);
    await client.api("GrantAccess").post(body("1"));
    expect(await teamAccess()).toBe("ReadAccess");
    await client.api("GrantAccess").post(body("ReadAccess, WriteAccess"));
    expect(await teamAccess()).toBe("ReadAccess, WriteAccess");
    // GrantAccess adds to what the team has: start the next test from none.
    await client.api("RevokeAccess").post({
      Target: body(undefined).Target,
      Revokee: body(undefined).PrincipalAccess.Principal,
    });
    expect(await teamAccess()).toBe("None");
  });

  it("GrantAccess, ModifyAccess and RevokeAccess send AccessMask as member names", async () => {
    const { client } = liveClient();
    const target = createEntityReference("account", accountId);
    const team = createEntityReference("team", teamId);
    await client.execute(
      new GrantAccessAction(target, {
        Principal: team,
        AccessMask: AccessRights.ReadAccess | AccessRights.AppendAccess,
      })
    );
    expect(await teamAccess()).toBe("ReadAccess, AppendAccess");

    await client.execute(
      new ModifyAccessAction(target, {
        Principal: team,
        AccessMask: AccessRights.ReadAccess | AccessRights.WriteAccess | AccessRights.ShareAccess,
      })
    );
    expect(await teamAccess()).toBe("ReadAccess, WriteAccess, ShareAccess");

    await client.execute(new RevokeAccessAction(target, team));
    expect(await teamAccess()).toBe("None");
  });

  it("QueryExpressionToFetchXml names the enums inside a QueryExpression", async () => {
    const { client } = liveClient();
    const result = await client.execute(
      new QueryExpressionToFetchXmlAction({
        "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression",
        EntityName: "account",
        Criteria: {
          FilterOperator: LogicalOperator.Or,
          Conditions: [{ AttributeName: "name", Operator: ConditionOperator.NotNull }],
        },
      })
    );
    expect(result.FetchXml).toContain('type="or"');
    expect(result.FetchXml).toContain('operator="not-null"');
  });
});
