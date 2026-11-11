/**
 * Live tests for the generator's typed client (#312, `typedClient: true`): `createTypedClient()`
 * generated from the org's account and contact metadata type-checks, and its `create`, `get`,
 * `list`, `update` and `delete` work against the org. Every record is named with this run's
 * `runId` and deleted in `afterAll`. See ./env.ts for configuration.
 */
import { writeFile } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { attemptId, live, liveClient, runId } from "./env.js";
import {
  compileToJs,
  generateLive,
  importGenerated,
  removeGenerated,
  typecheck,
} from "./generated.js";

const SLOW = 120_000;

// Each @ts-expect-error must have an error under it, or the type-check fails.
const USAGE = `
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { createTypedClient } from "./client.js";

export async function run(client: DataverseClient, id: string): Promise<void> {
  const typed = createTypedClient(client);
  const contactId = await typed.contacts.create({ lastname: "Doe" });
  await typed.accounts.create({ name: "Contoso", primarycontactid: createEntityReference("contact", contactId) });
  const account = await typed.accounts.byId(id).get({ select: ["name", "_primarycontactid_value"] });
  console.log(account.name, await typed.contacts.list({ select: ["fullname"], top: 5 }));
  await typed.accounts.byId(id).update({ name: "Contoso Ltd", primarycontactid: null });
  await typed.accounts.byId(id).delete();
  // @ts-expect-error not a column of account
  await typed.accounts.byId(id).get({ select: ["fullname"] });
  // @ts-expect-error createdon is set by Dataverse
  await typed.accounts.create({ createdon: "2024-01-01T00:00:00Z" });
}
`;

interface Typed {
  accounts: RecordSet;
  contacts: RecordSet;
}
interface RecordSet {
  create(entity: Record<string, unknown>): Promise<string>;
  list(options: Record<string, unknown>): Promise<Array<Record<string, unknown>>>;
  byId(id: string): {
    get(options?: Record<string, unknown>): Promise<Record<string, unknown>>;
    update(entity: Record<string, unknown>): Promise<void>;
    delete(): Promise<void>;
  };
}

// Delete order matters: records that point at others go first.
const created: Array<{ set: string; id: string }> = [];

describe.skipIf(!live)("live: generated typed client (#312)", () => {
  let dir = "";

  beforeAll(async () => {
    dir = await generateLive({ entities: ["account", "contact"], typedClient: true });
  }, SLOW);

  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const { set, id } of created.reverse()) {
      await client
        .api(`${set}(${id})`)
        .delete()
        .catch(() => undefined);
    }
    await removeGenerated();
  });

  it(
    "type-checks against the org's account and contact",
    async () => {
      await writeFile(path.join(dir, "typed-usage.ts"), USAGE, "utf-8");
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );

  it(
    "creates, reads, lists, updates and deletes",
    async () => {
      await compileToJs(dir);
      const { createTypedClient } = await importGenerated<{
        createTypedClient: (client: DataverseClient) => Typed;
      }>(dir, "client.js");
      const typed = createTypedClient(liveClient().client);
      // Unique to this attempt: list() below looks the account up by name. It's the contact's
      // lastname too, so at most 50 characters (runId is 31).
      const name = `${runId}-typed-${attemptId()}`;

      const contactId = await typed.contacts.create({ lastname: name });
      created.push({ set: "contacts", id: contactId });
      const accountId = await typed.accounts.create({
        name,
        primarycontactid: createEntityReference("contact", contactId),
      });
      created.push({ set: "accounts", id: accountId });

      const account = await typed.accounts
        .byId(accountId)
        .get({ select: ["name", "_primarycontactid_value"] });
      expect(account.name).toBe(name);
      expect(account._primarycontactid_value).toBe(contactId);

      const listed = await typed.accounts.list({
        select: ["name"],
        filter: `name eq '${name}'`,
      });
      expect(listed.map((a) => a.name)).toEqual([name]);

      await typed.accounts.byId(accountId).update({ primarycontactid: null });
      const updated = await typed.accounts
        .byId(accountId)
        .get({ select: ["_primarycontactid_value"] });
      expect(updated._primarycontactid_value).toBeNull();

      await typed.accounts.byId(accountId).delete();
      await expect(typed.accounts.byId(accountId).get()).rejects.toMatchObject({ status: 404 });
      // update() sends If-Match: *, so it doesn't recreate the deleted record
      await expect(typed.accounts.byId(accountId).update({ name })).rejects.toMatchObject({
        status: 404,
      });
    },
    SLOW
  );
});
