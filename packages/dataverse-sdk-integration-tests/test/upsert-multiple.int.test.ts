/**
 * Live tests: UpsertMultiple answers 204 No Content although the CSDL declares
 * `mscrm.UpsertMultipleResponse` ("The `UpsertMultiple` action returns `204 NoContent`. The
 * `UpsertMultipleResponse` complex type isn't returned.",
 * https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).
 * `execute()` threw "Unexpected end of JSON input" although the records were written; it now
 * resolves `null` (a message's `result` is `null`).
 *
 * Each Target carries `@odata.type` and no alternate key, so each one creates an account (named
 * with this run's id); afterAll finds them by name and deletes them.
 */
import { afterAll, describe, expect, it } from "vitest";
import { UpsertMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { UpsertMultipleRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

interface Account {
  accountid: string;
  name: string;
}

/** The accounts whose name starts with `prefix`, in name order. */
async function accountsNamed(prefix: string): Promise<Account[]> {
  const { client } = liveClient();
  const found = await client
    .api("accounts")
    .select("accountid", "name")
    .filter(`startswith(name,'${prefix}')`)
    .orderBy("name")
    .get<{ value: Account[] }>();
  return found.value;
}

const targets = (prefix: string): Array<Record<string, unknown>> => [
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${prefix} 1` },
  { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${prefix} 2` },
];

describe.skipIf(!live)("live: UpsertMultiple resolves null for Dataverse's 204", () => {
  // Found by name, so the records are deleted even when execute() throws after writing them
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const { accountid } of await accountsNamed(`${runId} upsert`)) {
      await client.api(`accounts(${accountid})`).delete();
    }
  });

  it("UpsertMultipleAction creates the records and resolves null", async () => {
    const { client } = liveClient();
    const prefix = `${runId} upsert action`;

    const result = await client.execute(
      new UpsertMultipleAction("accounts", { Targets: targets(prefix) })
    );

    expect(result).toBeNull();
    const accounts = await accountsNamed(prefix);
    expect(accounts.map((a) => a.name)).toEqual([`${prefix} 1`, `${prefix} 2`]);
  });

  it("UpsertMultipleRequest creates the records and its result is null", async () => {
    const { client } = liveClient();
    const prefix = `${runId} upsert message`;

    const response = await client.execute(
      new UpsertMultipleRequest("accounts", { Targets: targets(prefix) })
    );

    expect(response.result).toBeNull();
    const accounts = await accountsNamed(prefix);
    expect(accounts.map((a) => a.name)).toEqual([`${prefix} 1`, `${prefix} 2`]);
  });
});
