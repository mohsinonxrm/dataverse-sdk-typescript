/**
 * #319: change tracking. `trackChanges()` sends `Prefer: odata.track-changes`, follows
 * `@odata.nextLink` and returns the rows and the delta link; `changesSince(deltaLink)` returns
 * changed and deleted rows (`$deletedEntity`) and the next delta link.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { DataverseError } from "../src/errors/DataverseError.js";
import { isDeltaLinkExpired } from "../src/changes/changeTracking.js";
import type { DeletedRecord, TrackedChanges } from "../src/index.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;
const DELTA_1 = `${API}/accounts?$select=name&$deltatoken=919042%2108%2f22%2f2017%2008%3a10%3a44`;
const DELTA_2 = `${API}/accounts?$select=name&$deltatoken=919058%2108%2f22%2f2017%2008%3a21%3a20`;

interface Sent {
  url: string;
  prefer: string | null;
  callerId: string | null;
}

interface Account {
  accountid: string;
  name: string;
}

/** A client whose fetch answers from `pages` by full URL, recording each request. */
function setup(pages: Partial<Record<string, { status?: number; body: unknown }>>) {
  const sent: Sent[] = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (input, init) => {
        const url = decodeURIComponent(input instanceof Request ? input.url : input.toString());
        const headers = new Headers(init?.headers);
        sent.push({ url, prefer: headers.get("prefer"), callerId: headers.get("mscrmcallerid") });
        const page = pages[url];
        if (!page) return Promise.resolve(new Response(`no route for ${url}`, { status: 404 }));
        return Promise.resolve(
          new Response(JSON.stringify(page.body), {
            status: page.status ?? 200,
            headers: { "content-type": "application/json; odata.metadata=minimal" },
          })
        );
      },
    },
  });
  return { client, sent };
}

const row = (n: number): Account => ({
  accountid: `0000000${String(n)}-0000-0000-0000-000000000000`,
  name: `A${String(n)}`,
});

describe("trackChanges() (#319)", () => {
  it("sends Prefer: odata.track-changes, follows nextLink and returns rows and the delta link", async () => {
    const { client, sent } = setup({
      [`${API}/accounts?$select=name`]: {
        body: {
          value: [row(1), row(2)],
          "@odata.nextLink": `${API}/accounts?$select=name&$skiptoken=p2`,
        },
      },
      [`${API}/accounts?$select=name&$skiptoken=p2`]: {
        body: { value: [row(3)], "@odata.deltaLink": DELTA_1 },
      },
    });

    const result: TrackedChanges<Account> = await client
      .api("accounts")
      .select("name")
      .impersonate("11111111-1111-1111-1111-111111111111")
      .trackChanges<Account>({ maxPageSize: 2 });

    expect(result.changed.map((r) => r.name)).toEqual(["A1", "A2", "A3"]);
    expect(result.deleted).toEqual([]);
    expect(result.deltaLink).toBe(DELTA_1);
    expect(sent).toHaveLength(2);
    // Every page asks for change tracking and the page size, as the same caller.
    for (const request of sent) {
      expect(request.prefer).toBe("odata.track-changes, odata.maxpagesize=2");
      expect(request.callerId).toBe("11111111-1111-1111-1111-111111111111");
    }
  });

  it("keeps the builder's own Prefer values", async () => {
    const { client, sent } = setup({
      [`${API}/accounts?$select=name`]: { body: { value: [], "@odata.deltaLink": DELTA_1 } },
    });
    await client
      .api("accounts")
      .select("name")
      .prefer((p) => p.allAnnotations())
      .trackChanges();
    expect(sent[0]?.prefer).toBe('odata.include-annotations="*", odata.track-changes');
  });

  it("iterateChanges() yields page by page, lazily; the last page has the delta link", async () => {
    const { client, sent } = setup({
      [`${API}/accounts`]: {
        body: { value: [row(1)], "@odata.nextLink": `${API}/accounts?$skiptoken=p2` },
      },
      [`${API}/accounts?$skiptoken=p2`]: { body: { value: [row(2)], "@odata.deltaLink": DELTA_1 } },
    });
    const pages = client.api("accounts").iterateChanges<Account>();
    expect(sent).toHaveLength(0);

    const seen: Array<{ names: string[]; deltaLink?: string }> = [];
    for await (const page of pages) {
      seen.push({ names: page.changed.map((r) => r.name), deltaLink: page.deltaLink });
    }
    expect(seen).toEqual([
      { names: ["A1"], deltaLink: undefined },
      { names: ["A2"], deltaLink: DELTA_1 },
    ]);
  });

  it.each([
    ["$filter", (b: ReturnType<DataverseClient["api"]>) => b.filter("name eq 'x'")],
    ["$orderby", (b: ReturnType<DataverseClient["api"]>) => b.orderBy("name")],
    ["$expand", (b: ReturnType<DataverseClient["api"]>) => b.expand("primarycontactid")],
    ["$top", (b: ReturnType<DataverseClient["api"]>) => b.top(5)],
  ])("refuses %s before sending anything", async (option, configure) => {
    const { client, sent } = setup({});
    const error = await configure(client.api("accounts"))
      .trackChanges()
      .catch((e: unknown) => e);
    expect(error).toMatchObject({ name: "InvalidParameter" });
    expect((error as Error).message).toContain(option);
    expect(sent).toHaveLength(0);
  });

  it("rejects with NoDeltaLink when Dataverse returns none (change tracking off)", async () => {
    const { client } = setup({ [`${API}/contacts`]: { body: { value: [row(1)] } } });
    await expect(client.api("contacts").trackChanges()).rejects.toMatchObject({
      name: "NoDeltaLink",
    });
  });
});

describe("changesSince() (#319)", () => {
  it("returns changed and deleted rows across pages, and the next delta link", async () => {
    const { client, sent } = setup({
      [decodeURIComponent(DELTA_1)]: {
        body: {
          "@odata.context": `${API}/$metadata#accounts(name)/$delta`,
          value: [row(1)],
          "@odata.nextLink": `${API}/accounts?$select=name&$skiptoken=d2`,
        },
      },
      [`${API}/accounts?$select=name&$skiptoken=d2`]: {
        body: {
          "@odata.context": `${API}/$metadata#accounts(name)/$delta`,
          "@odata.deltaLink": DELTA_2,
          value: [
            row(4),
            {
              "@odata.context": `${API}/$metadata#accounts/$deletedEntity`,
              id: "2e451703-c686-e711-80e5-00155db19e6d",
              reason: "deleted",
            },
          ],
        },
      },
    });

    const result = await client.changesSince<Account>(DELTA_1, { maxPageSize: 1 });

    expect(result.changed.map((r) => r.name)).toEqual(["A1", "A4"]);
    const deleted: DeletedRecord[] = result.deleted;
    expect(deleted).toEqual([{ id: "2e451703-c686-e711-80e5-00155db19e6d", reason: "deleted" }]);
    expect(result.deltaLink).toBe(DELTA_2);
    // A delta link already tracks changes: no odata.track-changes, only the page size.
    expect(sent.map((s) => s.prefer)).toEqual(["odata.maxpagesize=1", "odata.maxpagesize=1"]);
  });

  it("keeps the delta link it was given when the response has none (nothing changed)", async () => {
    const decoded = decodeURIComponent(DELTA_1);
    const { client } = setup({ [decoded]: { body: {} } });
    const result = await client.changesSince(DELTA_1);
    expect(result).toEqual({ changed: [], deleted: [], deltaLink: DELTA_1 });
  });

  it("iterateChangesSince() yields pages lazily", async () => {
    const decoded = decodeURIComponent(DELTA_1);
    const { client, sent } = setup({
      [decoded]: { body: { value: [], "@odata.deltaLink": DELTA_2 } },
    });
    const pages = client.iterateChangesSince(DELTA_1);
    expect(sent).toHaveLength(0);
    const all = [];
    for await (const page of pages) all.push(page);
    expect(all).toEqual([{ changed: [], deleted: [], deltaLink: DELTA_2 }]);
  });

  it.each([
    ["", "MissingParameter"],
    [`${API}/accounts?$select=name&$skiptoken=x`, "InvalidParameter"],
  ])("refuses %j as a delta link", async (link, name) => {
    const { client, sent } = setup({});
    await expect(client.changesSince(link)).rejects.toMatchObject({ name });
    expect(sent).toHaveLength(0);
  });

  it("an expired delta link rejects with an error isDeltaLinkExpired() recognises", async () => {
    const decoded = decodeURIComponent(DELTA_1);
    const { client } = setup({
      [decoded]: {
        status: 400,
        body: {
          error: {
            code: "0x80044352",
            message:
              "Version stamp associated with the client has expired. Please perform a full sync.",
          },
        },
      },
    });
    const error = await client.changesSince(DELTA_1).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DataverseError);
    expect(isDeltaLinkExpired(error)).toBe(true);
    expect(isDeltaLinkExpired(new Error("other"))).toBe(false);
    expect(isDeltaLinkExpired(new DataverseError("x", { code: "0x80040217" }))).toBe(false);
    expect(isDeltaLinkExpired(new DataverseError("x", { code: "0X80044352" }))).toBe(true);
  });
});
