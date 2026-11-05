/**
 * #20 live: bindMany() associates several contacts with an account without the batch package.
 * Creates one account and two contacts, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

const created: Array<{ set: string; id: string }> = [];

async function create(set: string, body: Record<string, unknown>): Promise<string> {
  const { client } = liveClient();
  const res = await client.send({
    method: "POST",
    url: `${client.getBaseUrl()}/${set}`,
    headers: {},
    body,
  });
  expect(res.status).toBe(204);
  const id = idFromEntityId(res.headers.get("odata-entityid"));
  created.push({ set, id });
  return id;
}

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const { set, id } of created.reverse()) {
    await client
      .api(`${set}(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: bindMany, associate and disassociate (#20)", () => {
  it("associates every contact with the account", async () => {
    const { client } = liveClient();
    const account = await create("accounts", { name: `sdk-int bindMany ${runId}` });
    const contacts = [
      await create("contacts", { lastname: `sdk-int bindMany A ${runId}` }),
      await create("contacts", { lastname: `sdk-int bindMany B ${runId}` }),
    ];

    await client
      .api(`accounts(${account})`)
      .bindMany("contact_customer_accounts", "contacts", contacts);

    const linked = await client
      .api(`accounts(${account})/contact_customer_accounts`)
      .select("contactid")
      .get<{ value: Array<{ contactid: string }> }>();
    expect(linked.value.map((c) => c.contactid).sort()).toEqual([...contacts].sort());

    // And back: disassociate one of them.
    await client
      .api(`accounts(${account})`)
      .disassociate("contact_customer_accounts", contacts[0] ?? "");
    const after = await client
      .api(`accounts(${account})/contact_customer_accounts`)
      .select("contactid")
      .get<{ value: Array<{ contactid: string }> }>();
    expect(after.value.map((c) => c.contactid)).toEqual([contacts[1]]);
  });
});
