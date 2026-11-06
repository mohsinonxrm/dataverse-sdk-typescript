/**
 * #52 live: values with spaces, quotes, & + # % and non-ASCII in `$filter` find the record with
 * the SDK's encodeURIComponent encoding, and a caller-encoded query string is sent as written.
 * Creates one account and deletes it afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { odata } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const name = `sdk-int encoding ${runId} O'Brien & Co + 1#2 100% Ünï`;
let id: string | undefined;

afterAll(async () => {
  if (!live || !id) return;
  await liveClient()
    .client.api(`accounts(${id})`)
    .delete()
    .catch(() => undefined);
});

describe.skipIf(!live)("live: query encoding (#52)", () => {
  it("a $filter with special characters finds the record", async () => {
    const { client } = liveClient();
    id = await client.api("accounts").createAndGetId({ name });
    const found = await client
      .api("accounts")
      .select("name")
      .filter(odata.eq("name", name))
      .get<{ value: Array<{ name: string }> }>();
    expect(found.value.map((a) => a.name)).toEqual([name]);
  });

  it("a caller-encoded query string plus builder options works", async () => {
    const { client } = liveClient();
    const encoded = encodeURIComponent(odata.eq("name", name));
    const found = await client
      .api(`accounts?$filter=${encoded}`)
      .select("name")
      .get<{ value: Array<{ name: string }> }>();
    expect(found.value.map((a) => a.name)).toEqual([name]);
  });
});
