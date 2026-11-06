/**
 * #54 live: BatchRequestBuilder.execute() end to end, and createBindManyExecutor() through it.
 * Creates accounts and contacts, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  BatchRequestBuilder,
  DataverseBatchError,
  createBindManyExecutor,
} from "@mohsinonxrm/dataverse-sdk-batch";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

const MISSING = "00000000-0000-0000-0000-000000000001";
const accounts: string[] = [];
const contacts: string[] = [];

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  // Contacts first: deleting an account can cascade to its contacts.
  for (const [set, ids] of [
    ["contacts", contacts],
    ["accounts", accounts],
  ] as const) {
    for (const id of ids) {
      await client
        .api(`${set}(${id})`)
        .delete()
        .catch(() => undefined);
    }
  }
});

describe.skipIf(!live)("live: BatchRequestBuilder.execute() (#54)", () => {
  it("GETs outside a change set, and a change set with creates and a $<id> reference", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("who", "GET", "WhoAmI");
    batch.addRequest("none", "GET", `accounts?$select=name&$filter=name eq '${runId} none'`);
    batch.beginChangeset();
    batch.addRequest("acct", "POST", "accounts", undefined, { name: `${runId} batch-int` });
    batch.addRequest(
      "contact",
      "POST",
      "contacts",
      undefined,
      { lastname: `${runId} batch-int`, "parentcustomerid_account@odata.bind": "$acct" },
      ["acct"]
    );
    batch.endChangeset();
    batch.addRequest("who-again", "GET", "/WhoAmI");

    const result = await batch.execute();
    const acct = result.responses.get("acct");
    const contact = result.responses.get("contact");
    if (acct) accounts.push(idFromEntityId(acct.headers["odata-entityid"] ?? null));
    if (contact) contacts.push(idFromEntityId(contact.headers["odata-entityid"] ?? null));

    expect(result.success).toBe(true);
    expect(result.results.map((r) => [r.id, r.status])).toEqual([
      ["who", 200],
      ["none", 200],
      ["acct", 204],
      ["contact", 204],
      ["who-again", 200],
    ]);
    expect(result.responses.get("who")?.body).toHaveProperty("UserId");
    expect(result.responses.get("none")?.body).toMatchObject({ value: [] });
    expect(result.stoppedEarly).toBe(false);

    // The contact is bound to the account created in the same change set.
    const read = await client
      .api(`contacts(${contacts[0] ?? ""})`)
      .select("_parentcustomerid_value")
      .get<{ _parentcustomerid_value: string }>();
    expect(read._parentcustomerid_value).toBe(accounts[0]);
  });

  it("without continueOnError, Dataverse stops at the first failure and execute() throws", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("who", "GET", "WhoAmI");
    batch.addRequest("missing", "DELETE", `accounts(${MISSING})`);
    batch.addRequest("never", "GET", "WhoAmI");
    const err = await batch.execute().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseBatchError);
    const batchError = err as DataverseBatchError;
    expect(batchError.getFailedRequestIds()).toEqual(["missing"]);
    expect(batchError.getErrorForRequest("missing")?.body).toMatchObject({
      error: { code: "0x80040217" },
    });
    expect(batchError.successfulRequests).toBe(1);
    expect(batchError.totalRequests).toBe(3);
  });

  it("createBindManyExecutor() associates contacts through one $batch", async () => {
    const { client } = liveClient();
    const create = async (set: "accounts" | "contacts", body: Record<string, unknown>) => {
      const res = await client.send({ method: "POST", url: set, headers: {}, body });
      const id = idFromEntityId(res.headers.get("odata-entityid"));
      (set === "accounts" ? accounts : contacts).push(id);
      return id;
    };
    const account = await create("accounts", { name: `${runId} batch-int bindMany` });
    const ids = [
      await create("contacts", { lastname: `${runId} batch-int A` }),
      await create("contacts", { lastname: `${runId} batch-int B` }),
    ];

    await client
      .api(`accounts(${account})`)
      .bindMany("contact_customer_accounts", "contacts", ids, createBindManyExecutor());

    const linked = await client
      .api(`accounts(${account})/contact_customer_accounts`)
      .select("contactid")
      .get<{ value: Array<{ contactid: string }> }>();
    expect(linked.value.map((c) => c.contactid).sort()).toEqual([...ids].sort());
  });
});
