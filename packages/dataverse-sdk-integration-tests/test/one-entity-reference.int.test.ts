/**
 * Live tests for #295: one `EntityReference` across the packages. References made by one
 * package's `createEntityReference` are passed to another package's action and message, against a
 * real org. Creates four accounts named with this run's id; afterAll deletes exactly those, by the
 * ids the creates returned.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  MergeAction,
  createEntityReference as actionReference,
} from "@mohsinonxrm/dataverse-sdk-actions";
import {
  MergeRequest,
  createEntityReference as messageReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
import {
  OrganizationService,
  createEntityReference as xrmReference,
} from "@mohsinonxrm/dataverse-sdk-xrm";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

async function createAccount(name: string): Promise<string> {
  const { client } = liveClient();
  const id = await client.api("accounts").createAndGetId({ name });
  created.push(id);
  return id;
}

/** statecode of an account: 1 once it was merged into another. */
async function stateOf(id: string): Promise<number> {
  const { client } = liveClient();
  const record = await client
    .api(`accounts(${id})`)
    .select("statecode")
    .get<{ statecode: number }>();
  return record.statecode;
}

describe.skipIf(!live)("live: one EntityReference across the packages (#295)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`accounts(${id})`).delete();
  });

  it("an action takes references from the messages and xrm packages", async () => {
    const { client } = liveClient();
    const target = await createAccount(`${runId} 295 action target`);
    const subordinate = await createAccount(`${runId} 295 action subordinate`);

    await client.execute(
      new MergeAction({
        Target: messageReference("account", target),
        Subordinate: xrmReference("account", subordinate),
        PerformParentingChecks: false,
      })
    );

    expect(await stateOf(subordinate)).toBe(1);
    expect(await stateOf(target)).toBe(0);
  });

  it("a message takes references from the actions package", async () => {
    const target = await createAccount(`${runId} 295 message target`);
    const subordinate = await createAccount(`${runId} 295 message subordinate`);
    const service = new OrganizationService(liveClient().client);

    await service.execute(
      new MergeRequest({
        Target: actionReference("account", target),
        Subordinate: actionReference("account", subordinate),
        PerformParentingChecks: false,
      })
    );

    expect(await stateOf(subordinate)).toBe(1);
    expect(await stateOf(target)).toBe(0);
  });
});
