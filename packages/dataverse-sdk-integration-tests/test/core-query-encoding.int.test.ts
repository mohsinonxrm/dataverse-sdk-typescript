/**
 * #52 live: values with spaces, quotes, & + # % and non-ASCII in `$filter` find the record with
 * the SDK's encodeURIComponent encoding, and a caller-encoded query string is sent as written.
 * Creates one account in beforeAll (once, whatever happens to the tests) and deletes every
 * account it created afterwards.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { odata } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const name = `sdk-int encoding ${runId} O'Brien & Co + 1#2 100% Ünï`;
const ids: string[] = [];

beforeAll(async () => {
  if (!live) return;
  ids.push(await liveClient().client.api("accounts").createAndGetId({ name }));
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

describe.skipIf(!live)("live: query encoding (#52)", () => {
  it("a $filter with special characters finds the record", async () => {
    const { client } = liveClient();
    const found = await client
      .api("accounts")
      .select("accountid", "name")
      .filter(odata.eq("name", name))
      .get<{ value: Array<{ accountid: string; name: string }> }>();
    expect(found.value.map((a) => [a.accountid, a.name])).toEqual([[ids[0], name]]);
  });

  it("a caller-encoded query string plus builder options works", async () => {
    const { client } = liveClient();
    const encoded = encodeURIComponent(odata.eq("name", name));
    const found = await client
      .api(`accounts?$filter=${encoded}`)
      .select("accountid", "name")
      .get<{ value: Array<{ accountid: string; name: string }> }>();
    expect(found.value.map((a) => [a.accountid, a.name])).toEqual([[ids[0], name]]);
  });
});
