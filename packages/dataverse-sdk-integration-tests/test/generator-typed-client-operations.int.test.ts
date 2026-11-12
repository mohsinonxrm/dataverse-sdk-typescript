/**
 * Live tests for the generated typed client's record navigation, associate/disassociate, upsert
 * and paging (#432), generated from the org's account, contact and task metadata. The account and
 * contacts are created in `beforeAll` and named with this run's `runId`; every record is deleted
 * in `afterAll`. See ./env.ts for configuration.
 *
 * Upsert by alternate key isn't tested live: no standard table has an alternate key in a default
 * org. The unit tests cover what Dataverse answers to one (an `OData-EntityId` in key form, so the
 * typed client asks for the primary key with `Prefer: return=representation`).
 */
import { randomUUID } from "node:crypto";
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

export async function run(client: DataverseClient, id: string): Promise<unknown[]> {
  const typed = createTypedClient(client);
  await typed.tasks.create({ subject: "x", regardingobjectid: createEntityReference("account", id) });
  const regarding = await typed.tasks.byId(id).nav("regardingobjectid_contact_task").get({ select: ["fullname"] });
  console.log(regarding?.fullname);
  const contacts = typed.accounts.byId(id).nav("contact_customer_accounts");
  const listed = await contacts.list({ select: ["lastname"] });
  const primary = await typed.accounts.byId(id).nav("primarycontactid").get({ select: ["lastname"] });
  await typed.accounts.byId(id).associate("contact_customer_accounts", id);
  await typed.accounts.byId(id).disassociate("primarycontactid");
  const upserted = await typed.accounts.upsert(id, { name: "Contoso" }, { mode: "createOnly" });
  const page = await typed.contacts.listPage({ select: ["lastname"], pageSize: 1 });
  for await (const contact of typed.contacts.iterate({ select: ["lastname"], maxItems: 1 })) console.log(contact.lastname);
  // @ts-expect-error not selected
  console.log(listed[0]?.firstname);
  // @ts-expect-error a lookup has no list()
  await typed.accounts.byId(id).nav("primarycontactid").list();
  return [listed[0]?.lastname, primary?.lastname, upserted, page.nextLink];
}
`;

interface Page {
  records: Array<Record<string, unknown>>;
  nextLink?: string;
}
interface Typed {
  accounts: {
    create(entity: Record<string, unknown>): Promise<string>;
    upsert(key: unknown, entity: Record<string, unknown>, options?: unknown): Promise<string>;
    byId(id: string): {
      get(options?: unknown): Promise<Record<string, unknown>>;
      nav(name: string): {
        list(options?: unknown): Promise<Array<Record<string, unknown>>>;
        get(options?: unknown): Promise<Record<string, unknown> | null>;
      };
      associate(name: string, target: unknown): Promise<void>;
      disassociate(name: string, ...args: unknown[]): Promise<void>;
    };
  };
  tasks: {
    create(entity: Record<string, unknown>): Promise<string>;
    byId(id: string): {
      nav(name: string): { get(options?: unknown): Promise<Record<string, unknown> | null> };
      associate(name: string, target: unknown): Promise<void>;
      disassociate(name: string, ...args: unknown[]): Promise<void>;
    };
  };
  contacts: {
    create(entity: Record<string, unknown>): Promise<string>;
    listPage(options?: unknown): Promise<Page>;
    iterate(options?: unknown): AsyncIterable<Record<string, unknown>>;
  };
}

// Delete order matters: records that point at others go first.
const created: Array<{ set: string; id: string }> = [];

describe.skipIf(!live)("live: generated typed client operations (#432)", () => {
  let dir = "";
  let typed: Typed;
  // Unique to this run; contacts' lastname is at most 50 characters (runId is 31)
  const name = `${runId}-ops-${attemptId()}`;
  let accountId = "";
  const contactIds: string[] = [];

  beforeAll(async () => {
    dir = await generateLive({ entities: ["account", "contact", "task"], typedClient: true });
    await compileToJs(dir);
    const { createTypedClient } = await importGenerated<{
      createTypedClient: (client: DataverseClient) => Typed;
    }>(dir, "client.js");
    typed = createTypedClient(liveClient().client);
    for (const suffix of ["a", "b"]) {
      const id = await typed.contacts.create({ lastname: `${name}-${suffix}` });
      created.push({ set: "contacts", id });
      contactIds.push(id);
    }
    accountId = await typed.accounts.create({ name });
    created.unshift({ set: "accounts", id: accountId });
  }, SLOW);

  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const { set, id } of created) {
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
      await writeFile(path.join(dir, "typed-ops-usage.ts"), USAGE, "utf-8");
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );

  it(
    "associates, lists and disassociates a collection's records",
    async () => {
      const account = typed.accounts.byId(accountId);
      await account.associate("contact_customer_accounts", contactIds[0]);
      await account.associate("contact_customer_accounts", [contactIds[1]]);
      const related = account.nav("contact_customer_accounts");
      const names = async () =>
        (await related.list({ select: ["lastname"], orderBy: ["lastname asc"] })).map(
          (c) => c.lastname
        );
      expect(await names()).toEqual([`${name}-a`, `${name}-b`]);

      await account.disassociate("contact_customer_accounts", contactIds[0]);
      expect(await names()).toEqual([`${name}-b`]);
    },
    SLOW
  );

  it(
    "sets, reads and clears a lookup",
    async () => {
      const account = typed.accounts.byId(accountId);
      await account.associate("primarycontactid", contactIds[0]);
      expect(await account.nav("primarycontactid").get({ select: ["lastname"] })).toMatchObject({
        contactid: contactIds[0],
        lastname: `${name}-a`,
      });
      await account.disassociate("primarycontactid");
      expect(await account.get({ select: ["_primarycontactid_value"] })).toMatchObject({
        _primarycontactid_value: null,
      });
      // An empty lookup reads as null (Dataverse answers 204)
      expect(await account.nav("primarycontactid").get({ select: ["lastname"] })).toBeNull();
    },
    SLOW
  );

  it(
    "an activity's regarding lookup, by the Web API's suffixed names (regardingobjectid_account_task)",
    async () => {
      // Written through the consolidated lookup: the generated metadata's members give the name
      const taskId = await typed.tasks.create({
        subject: `${name}-task`,
        regardingobjectid: createEntityReference("account", accountId),
      });
      created.unshift({ set: "tasks", id: taskId });
      const task = typed.tasks.byId(taskId);
      expect(
        await task.nav("regardingobjectid_account_task").get({ select: ["name"] })
      ).toMatchObject({ accountid: accountId, name });

      await task.associate("regardingobjectid_contact_task", contactIds[0]);
      expect(
        await task.nav("regardingobjectid_contact_task").get({ select: ["lastname"] })
      ).toMatchObject({ contactid: contactIds[0], lastname: `${name}-a` });
      await task.disassociate("regardingobjectid_contact_task");
      expect(await task.nav("regardingobjectid_contact_task").get()).toBeNull();
    },
    SLOW
  );

  it(
    "upserts: creates, then updates, and createOnly refuses an existing record",
    async () => {
      const id = randomUUID();
      created.unshift({ set: "accounts", id });
      expect(await typed.accounts.upsert(id, { name: `${name}-upsert` })).toBe(id);
      expect(await typed.accounts.byId(id).get({ select: ["name"] })).toMatchObject({
        name: `${name}-upsert`,
      });
      await typed.accounts.upsert(id, { name: `${name}-upsert-2` });
      expect(await typed.accounts.byId(id).get({ select: ["name"] })).toMatchObject({
        name: `${name}-upsert-2`,
      });
      await expect(
        typed.accounts.upsert(id, { name: `${name}-upsert-3` }, { mode: "createOnly" })
      ).rejects.toMatchObject({ status: 412 });
    },
    SLOW
  );

  it(
    "pages with listPage() and nextLink, and iterates every page",
    async () => {
      const query = {
        select: ["lastname"],
        filter: `startswith(lastname,'${name}-')`,
        orderBy: ["lastname asc"],
        pageSize: 1,
      };
      const first = await typed.contacts.listPage(query);
      expect(first.records.map((c) => c.lastname)).toEqual([`${name}-a`]);
      expect(first.nextLink).toBeDefined();
      const second = await typed.contacts.listPage({ ...query, nextLink: first.nextLink });
      expect(second.records.map((c) => c.lastname)).toEqual([`${name}-b`]);

      const all: unknown[] = [];
      for await (const contact of typed.contacts.iterate(query)) all.push(contact.lastname);
      expect(all).toEqual([`${name}-a`, `${name}-b`]);
    },
    SLOW
  );
});
