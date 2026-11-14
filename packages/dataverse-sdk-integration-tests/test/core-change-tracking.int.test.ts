/**
 * #319 live: change tracking on `account`. An initial sync returns a delta link; after this run
 * creates two accounts, updates one and deletes the other, the delta sync returns the updated one
 * as changed and the deleted one as deleted. Skips when change tracking is off for `account`.
 * Creates and deletes only its own records.
 *
 * A change can take a few seconds to reach change tracking: a delta sync made right after it may
 * not have it yet (seen once in a release rehearsal, 2026-11-14). Each delta sync is read again
 * from the same delta link, for up to a minute, until it shows the changes; reading a delta link
 * again is safe, it doesn't move the link.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { TrackedChangesPage } from "@mohsinonxrm/dataverse-sdk-core";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

interface Account {
  accountid: string;
  name: string;
}

const prefix = `sdk-int change tracking ${runId}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Call `read` until `done` says its result has the changes, for up to a minute. */
async function until<T>(read: () => Promise<T>, done: (result: T) => boolean): Promise<T> {
  const deadline = Date.now() + 60_000;
  for (;;) {
    const result = await read();
    if (done(result) || Date.now() > deadline) return result;
    await sleep(5_000);
  }
}
const created: string[] = [];
let enabled = false;

beforeAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  const meta = await client
    .api("EntityDefinitions(LogicalName='account')")
    .select("ChangeTrackingEnabled")
    .get<{ ChangeTrackingEnabled: boolean }>();
  enabled = meta.ChangeTrackingEnabled;
  if (!enabled) {
    console.warn(
      "Skipping the change tracking tests: change tracking is off for the account table in this org (EntityDefinitions ChangeTrackingEnabled = false)."
    );
  }
});

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of created) {
    await client
      .api(`accounts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: change tracking (#319)", () => {
  it("initial sync, then a delta sync sees a create, an update and a delete", async (ctx) => {
    if (!enabled) ctx.skip();
    const { client } = liveClient();

    // Initial sync: every account, as of now, and the delta link.
    const initial = await client.api("accounts").select("name").trackChanges<Account>();
    expect(initial.deltaLink).toMatch(/[$]deltatoken=|%24deltatoken=/i);
    expect(initial.deleted).toEqual([]);

    const create = async (name: string): Promise<string> => {
      const res = await client.api("accounts").response("POST", { name });
      const id = idFromEntityId(res.headers.get("odata-entityid"));
      created.push(id);
      return id;
    };
    const kept = await create(`${prefix} kept`);
    const removed = await create(`${prefix} removed`);
    await client.api(`accounts(${kept})`).patch({ name: `${prefix} kept, renamed` });
    await client.api(`accounts(${removed})`).delete();
    created.splice(created.indexOf(removed), 1);

    // Delta sync, one row per page, so @odata.nextLink is followed when Dataverse pages it; read
    // again until it has both changes (they reach change tracking a little after the requests).
    const pages = await until(
      async () => {
        const read: Array<TrackedChangesPage<Account>> = [];
        for await (const page of client.iterateChangesSince<Account>(initial.deltaLink, {
          maxPageSize: 1,
        })) {
          read.push(page);
        }
        return read;
      },
      (read) =>
        read.some((p) => p.changed.some((r) => r.accountid === kept)) &&
        read.some((p) => p.deleted.some((d) => d.id === removed))
    );
    const changed = pages.flatMap((p) => p.changed);
    const deleted = pages.flatMap((p) => p.deleted);
    const deltaLink = pages.at(-1)?.deltaLink;

    expect(changed.find((r) => r.accountid === kept)?.name).toBe(`${prefix} kept, renamed`);
    // Created and deleted between the syncs: Dataverse reports it as deleted (the docs say so).
    expect(deleted).toContainEqual({ id: removed, reason: "deleted" });
    expect(changed.some((r) => r.accountid === removed)).toBe(false);
    expect(deltaLink).toMatch(/[$]deltatoken=|%24deltatoken=/i);
    expect(deltaLink).not.toBe(initial.deltaLink);

    // The new delta link carries on from there: deleting the other account shows up next time.
    await client.api(`accounts(${kept})`).delete();
    created.splice(created.indexOf(kept), 1);
    const next = await until(
      () => client.changesSince<Account>(deltaLink ?? ""),
      (result) => result.deleted.some((d) => d.id === kept)
    );
    expect(next.deleted).toContainEqual({ id: kept, reason: "deleted" });
    expect(next.changed.some((r) => r.accountid === kept)).toBe(false);
  });

  it("iterateChanges() follows @odata.nextLink on the initial sync", async (ctx) => {
    if (!enabled) ctx.skip();
    const { client } = liveClient();
    // Two rows per page; stop after two pages so a large account table isn't read in full.
    const pages: Array<TrackedChangesPage<Account>> = [];
    for await (const page of client
      .api("accounts")
      .select("name")
      .iterateChanges<Account>({ maxPageSize: 2 })) {
      pages.push(page);
      if (pages.length === 2) break;
    }
    for (const page of pages) expect(page.changed.length).toBeLessThanOrEqual(2);
    // With two pages or fewer rows than a page holds, the last page seen carries the delta link.
    if (pages.length === 1) expect(pages[0]?.deltaLink).toBeDefined();
  });
});
