/**
 * Live tests for #72: entity references in action bodies (`@odata.type` + primary key) and function
 * parameters (`@odata.id` with the CSDL entity set). Creates two accounts named with this run's
 * id; afterAll deletes them.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  MergeAction,
  createEntityReference as actionReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  InitializeFromFunction,
  createEntityReference as functionReference,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

async function createAccount(name: string): Promise<string> {
  const { client } = liveClient();
  const id = await client.api("accounts").createAndGetId({ name });
  created.push(id);
  return id;
}

describe.skipIf(!live)("live: entity references (#72)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`accounts(${id})`).delete();
  });

  it("InitializeFrom takes an account reference as @odata.id", async () => {
    const { client } = liveClient();
    const id = await createAccount(`${runId} initfrom`);
    const result = (await client.execute(
      new InitializeFromFunction(
        functionReference("account", id),
        undefined,
        "contact",
        "ValidForCreate"
      )
    )) as unknown as Record<string, unknown>;
    // The new contact is pre-filled from the account: its parent customer is bound to it
    expect(JSON.stringify(result)).toContain(id);
  });

  it("the old { id, logicalName } shape is rejected (why the shape changed)", async () => {
    const { client } = liveClient();
    const target = await createAccount(`${runId} old shape`);
    const oldRef = (id: string) => ({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      id,
      logicalName: "account",
    });
    const res = await client.send({
      method: "POST",
      url: `${client.getBaseUrl()}/Merge`,
      headers: { "content-type": "application/json" },
      body: {
        Target: oldRef(target),
        Subordinate: oldRef(target),
        UpdateContent: oldRef(target),
        PerformParentingChecks: false,
      },
    });
    expect(res.status).toBe(400);
  });

  it("Merge takes account references in the Web API shape", async () => {
    const { client } = liveClient();
    const target = await createAccount(`${runId} merge target`);
    const subordinate = await createAccount(`${runId} merge subordinate`);

    await client.execute(
      new MergeAction(
        actionReference("account", target),
        actionReference("account", subordinate),
        actionReference("account", target),
        false
      )
    );

    const merged = await client
      .api(`accounts(${subordinate})`)
      .select("merged", "statecode")
      .get<{ merged: boolean; statecode: number }>();
    expect(merged).toMatchObject({ merged: true, statecode: 1 });
  });
});
