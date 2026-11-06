/**
 * Live tests for #74: entity-typed action parameters take an entity payload (columns,
 * `@odata.type` and `<lookup>@odata.bind`), not only an `EntityReference`, so callers need no
 * `as any`. Creates accounts and an opportunity named with this run's id; afterAll deletes them.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  MergeAction,
  WinOpportunityAction,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  MergeRequest,
  createEntityReference as createMessageReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

const accounts: string[] = [];
const opportunities: string[] = [];

async function createAccount(name: string): Promise<string> {
  const { client } = liveClient();
  const id = await client.api("accounts").createAndGetId({ name: `${runId} ${name}` });
  accounts.push(id);
  return id;
}

describe.skipIf(!live)("live: entity payload parameters (#74)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of opportunities) await client.api(`opportunities(${id})`).delete();
    // A merged subordinate is deactivated, not deleted, so every account is still there.
    for (const id of accounts) await client.api(`accounts(${id})`).delete();
  });

  it("MergeAction sends UpdateContent as the target's new column values", async () => {
    const { client } = liveClient();
    const target = await createAccount("merge target");
    const subordinate = await createAccount("merge subordinate");

    await client.execute(
      new MergeAction(
        createEntityReference("account", target),
        createEntityReference("account", subordinate),
        { "@odata.type": "Microsoft.Dynamics.CRM.account", description: `${runId} merged` },
        false
      )
    );

    const merged = await client
      .api(`accounts(${target})`)
      .select("description")
      .get<{ description: string | null }>();
    expect(merged.description).toBe(`${runId} merged`);
  });

  it("MergeRequest takes the same payload", async () => {
    const { client } = liveClient();
    const target = await createAccount("merge request target");
    const subordinate = await createAccount("merge request subordinate");

    await client.execute(
      new MergeRequest(
        createMessageReference("account", target),
        createMessageReference("account", subordinate),
        { "@odata.type": "Microsoft.Dynamics.CRM.account", description: `${runId} merged` },
        false
      )
    );

    const merged = await client
      .api(`accounts(${target})`)
      .select("description")
      .get<{ description: string | null }>();
    expect(merged.description).toBe(`${runId} merged`);
  });

  it("WinOpportunityAction takes an opportunityclose with an @odata.bind lookup", async () => {
    const { client } = liveClient();
    const id = await client.api("opportunities").createAndGetId({ name: `${runId} win` });
    opportunities.push(id);

    await client.execute(
      new WinOpportunityAction(
        {
          "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
          subject: `${runId} won`,
          "opportunityid@odata.bind": `/opportunities(${id})`,
          actualrevenue: 1000,
        },
        "",
        3
      )
    );

    const won = await client
      .api(`opportunities(${id})`)
      .select("statecode")
      .get<{ statecode: number }>();
    expect(won.statecode).toBe(1);
  });
});
