/**
 * #50 live: with detectDuplicates(), a duplicate is a DataverseDuplicateError and an If-Match
 * mismatch is not. Relies on the org's published "Accounts with the same Account Name" rule.
 * Creates one account and deletes it afterwards (the duplicate is never created).
 */
import { afterAll, describe, expect, it } from "vitest";
import { DataverseDuplicateError, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient, runId } from "./env.js";

const name = `sdk-int duplicates ${runId}`;
let id: string | undefined;

afterAll(async () => {
  if (!live || !id) return;
  await liveClient()
    .client.api(`accounts(${id})`)
    .delete()
    .catch(() => undefined);
});

describe.skipIf(!live)("live: duplicate detection vs other 412s (#50)", () => {
  it("a second account with the same name is a DataverseDuplicateError", async () => {
    const { client } = liveClient();
    id = await client.api("accounts").createAndGetId({ name });
    const err = await client
      .api("accounts")
      .detectDuplicates()
      .createAndGetId({ name })
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseDuplicateError);
    expect(err).toMatchObject({ status: 412 });
  });

  it("an etag mismatch with detectDuplicates() is the OData error 0x80060882", async () => {
    const { client } = liveClient();
    const err = await client
      .api(`accounts(${id ?? ""})`)
      .detectDuplicates()
      .ifMatch('W/"1"')
      .patch({ description: "x" })
      .catch((e: unknown) => e);
    expect(err).not.toBeInstanceOf(DataverseDuplicateError);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 412, code: "0x80060882" });
  });
});
