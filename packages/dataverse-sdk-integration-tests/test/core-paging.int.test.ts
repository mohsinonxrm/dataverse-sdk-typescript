/**
 * #47 live: pages after the first are requested with the first request's `Prefer` header, so the
 * page size and the annotations stay the same. Creates five accounts and deletes them afterwards.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DataverseClient, odata } from "@mohsinonxrm/dataverse-sdk-core";
import { idFromEntityId, live, liveClient, orgUrl, runId } from "./env.js";

const prefix = `sdk-int paging ${runId}`;
const ids: string[] = [];

/** A client like liveClient(), counting the requests it sends. */
function countingClient(): { client: DataverseClient; requests: () => number } {
  let n = 0;
  const noop = (): void => undefined;
  const client = new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider: liveClient().tokenProvider,
    logger: { debug: noop, info: noop, warn: noop, error: noop },
    fetchProvider: {
      fetch: (input, init) => {
        n++;
        return fetch(input, init);
      },
    },
  });
  return { client, requests: () => n };
}

interface Row {
  name: string;
  "statecode@OData.Community.Display.V1.FormattedValue"?: string;
}

beforeAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (let i = 1; i <= 5; i++) {
    const res = await client.api("accounts").response("POST", { name: `${prefix} ${String(i)}` });
    ids.push(idFromEntityId(res.headers.get("odata-entityid")));
  }
});

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of ids) {
    await client
      .api(`accounts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

const query = (client: DataverseClient) =>
  client
    .api("accounts")
    .select("name", "statecode")
    .filter(odata.startsWith("name", prefix))
    .orderBy("name")
    .preferRaw("odata.maxpagesize=2")
    .preferRaw('odata.include-annotations="*"');

describe.skipIf(!live)("live: paging keeps the first request's headers (#47)", () => {
  it("iterate(): every page has two rows and formatted values", async () => {
    const { client, requests } = countingClient();
    const iterable = query(client).iterate<Row>();
    expect(requests()).toBe(0); // lazy

    const rows: Row[] = [];
    for await (const row of iterable) rows.push(row);
    expect(rows.map((r) => r.name)).toEqual([1, 2, 3, 4, 5].map((i) => `${prefix} ${String(i)}`));
    expect(requests()).toBe(3); // 2 + 2 + 1
    for (const row of rows) {
      expect(row["statecode@OData.Community.Display.V1.FormattedValue"]).toBe("Active");
    }
  });

  it("getAll(): the same, and maxPages: 2 stops after two requests", async () => {
    const all = countingClient();
    const rows = await query(all.client).getAll<Row>();
    expect(rows).toHaveLength(5);
    expect(all.requests()).toBe(3);
    expect(rows.every((r) => r["statecode@OData.Community.Display.V1.FormattedValue"])).toBe(true);

    const two = countingClient();
    expect(await query(two.client).getAll({ maxPages: 2 })).toHaveLength(4);
    expect(two.requests()).toBe(2);
  });
});
