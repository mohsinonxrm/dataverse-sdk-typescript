/**
 * Live tests for #251: a reference written by hand in the Web API shape (`WebApiEntityReference`)
 * works in an action body, and one shaped like `createEntityReference`'s properties
 * (`{ "@odata.type", logicalName, id }`) doesn't type-check, because that's not what Dataverse
 * reads. The `@ts-expect-error` lines are checked by this package's typecheck. Creates accounts
 * named with this run's id; afterAll deletes them.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  MergeAction,
  createEntityReference,
  type WebApiEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  MergeRequest,
  createEntityReference as messageReference,
  type WebApiEntityReference as MessageWebApiReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

async function createAccount(name: string): Promise<string> {
  const { client } = liveClient();
  const id = await client.api("accounts").createAndGetId({ name: `${runId} ${name}` });
  created.push(id);
  return id;
}

async function isMerged(id: string): Promise<boolean> {
  const { client } = liveClient();
  const row = await client.api(`accounts(${id})`).select("merged").get<{ merged: boolean }>();
  return row.merged;
}

describe.skipIf(!live)("live: hand-written entity references (#251)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`accounts(${id})`).delete();
  });

  it("MergeAction takes a WebApiEntityReference written by hand", async () => {
    const { client } = liveClient();
    const target = await createAccount("ref target");
    const subordinate = await createAccount("ref subordinate");
    const handWritten: WebApiEntityReference = {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountid: subordinate,
    };

    await client.execute(
      new MergeAction({
        Target: createEntityReference("account", target),
        Subordinate: handWritten,
        PerformParentingChecks: false,
      })
    );

    expect(await isMerged(subordinate)).toBe(true);
  });

  it("MergeRequest takes one too", async () => {
    const { client } = liveClient();
    const target = await createAccount("request ref target");
    const subordinate = await createAccount("request ref subordinate");
    const handWritten: MessageWebApiReference = {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      accountid: target,
    };

    await client.execute(
      new MergeRequest({
        Target: handWritten,
        Subordinate: messageReference("account", subordinate),
        PerformParentingChecks: false,
      })
    );

    expect(await isMerged(subordinate)).toBe(true);
  });

  it("the { logicalName, id } literal that used to type-check is rejected live", async () => {
    const { client } = liveClient();
    const target = await createAccount("literal target");
    const subordinate = await createAccount("literal subordinate");
    const literal = {
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      logicalName: "account",
      id: subordinate,
    };

    await expect(
      client.execute(
        new MergeAction({
          Target: createEntityReference("account", target),
          // @ts-expect-error #251: not an EntityReference (createEntityReference makes those), and not a payload
          Subordinate: literal,
          PerformParentingChecks: false,
        })
      )
    ).rejects.toThrow();

    expect(await isMerged(subordinate)).toBe(false);
  });
});
