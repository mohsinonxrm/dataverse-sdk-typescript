/**
 * Live tests for #231: complex types now have their navigation properties, so
 * `PrincipalAccess.Principal` exists and `GrantAccess` type-checks without a cast. Grants a team
 * access to an account, checks it, then revokes it. The account and team are named with this run's
 * id; afterAll deletes them. The `@ts-expect-error` line is checked by this package's typecheck.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  AccessRights,
  GrantAccessAction,
  RevokeAccessAction,
  createEntityReference,
  type WebApiEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  AccessRights as MessageAccessRights,
  GrantAccessRequest,
  RevokeAccessRequest,
  createEntityReference as messageReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
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
    new RetrievePrincipalAccess_teamFunction(teamId, {
      Target: functionReference("account", accountId),
    })
  );
  return String(result.AccessRights);
}

describe.skipIf(!live)("live: navigation properties of complex types (#231)", () => {
  beforeAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    accountId = await client.api("accounts").createAndGetId({ name: `${runId} principal access` });
    const who = await client.api("WhoAmI").get<{ BusinessUnitId: string }>();
    teamId = await client.api("teams").createAndGetId({
      name: `${runId} principal access`,
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

  it("GrantAccessAction takes PrincipalAccess.Principal, and RevokeAccessAction removes it", async () => {
    const { client } = liveClient();
    const target = createEntityReference("account", accountId);

    await client.execute(
      new GrantAccessAction({
        Target: target,
        PrincipalAccess: {
          Principal: createEntityReference("team", teamId),
          AccessMask: AccessRights.ReadAccess | AccessRights.WriteAccess,
        },
      })
    );
    expect(await teamAccess()).toBe("ReadAccess, WriteAccess");

    await client.execute(
      new RevokeAccessAction({ Target: target, Revokee: createEntityReference("team", teamId) })
    );
    expect(await teamAccess()).toBe("None");
  });

  it("the messages take it too, with a principal written in the Web API shape", async () => {
    const { client } = liveClient();
    const team: WebApiEntityReference = {
      "@odata.type": "Microsoft.Dynamics.CRM.team",
      teamid: teamId,
    };

    await client.execute(
      new GrantAccessRequest({
        Target: messageReference("account", accountId),
        PrincipalAccess: {
          Principal: team,
          AccessMask: MessageAccessRights.ReadAccess,
        },
      })
    );
    expect(await teamAccess()).toBe("ReadAccess");

    await client.execute(
      new RevokeAccessRequest({ Target: messageReference("account", accountId), Revokee: team })
    );
    expect(await teamAccess()).toBe("None");
  });

  it("Principal is required: GrantAccess without it doesn't type-check", () => {
    const action = new GrantAccessAction({
      Target: createEntityReference("account", accountId),
      // @ts-expect-error #231: PrincipalAccess.Principal is Nullable="false"
      PrincipalAccess: { AccessMask: AccessRights.ReadAccess },
    });
    expect(action).toBeInstanceOf(GrantAccessAction);
  });
});
