/**
 * #83, #84 live: the OrganizationService CRUD round trip against a real org.
 * Creates one account and one contact named with this run's `runId`, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { live, liveClient, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const created: Array<{ set: string; id: string }> = [];

interface Account {
  accountid: string;
  name: string;
  telephone1?: string | null;
  "@odata.etag": string;
}

function service(): OrganizationService {
  return new OrganizationService(liveClient().client);
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

describe.skipIf(!live)("live: OrganizationService (#83, #84)", () => {
  it("create, retrieve, retrieveMultiple, update and delete round-trip", async () => {
    const org = service();
    const name = `sdk-int xrm ${runId}`;

    // create → id from OData-EntityId
    const id: string = await org.create("accounts", { name, telephone1: "555-0100" });
    expect(id).toMatch(GUID);
    created.push({ set: "accounts", id });

    // retrieve with $select
    const account = await org.retrieve<Account>("accounts", id, {
      select: ["name", "telephone1"],
    });
    expect(account.name).toBe(name);
    expect(account.telephone1).toBe("555-0100");
    expect(account["@odata.etag"]).toBeTruthy();

    // retrieveMultiple with filter, select, count
    const page = await org.retrieveMultiple<Account>("accounts", {
      select: ["name"],
      filter: `name eq '${name}'`,
      count: true,
    });
    expect(page.value.map((a) => a.accountid)).toEqual([id]);
    expect(page["@odata.count"]).toBe(1);

    // update with the current etag (If-Match), then with a stale one (412)
    await org.update("accounts", id, { telephone1: "555-0200" }, { etag: account["@odata.etag"] });
    await expect(
      org.update("accounts", id, { telephone1: "555-0300" }, { etag: account["@odata.etag"] })
    ).rejects.toMatchObject({ status: 412 });

    // update with returnRepresentation
    const updated = await org.update<Account>(
      "accounts",
      id,
      { telephone1: "555-0400" },
      { returnRepresentation: true, select: ["telephone1"] }
    );
    expect(updated.telephone1).toBe("555-0400");

    // delete, then the record is gone
    await org.delete("accounts", id);
    created.pop();
    await expect(org.retrieve("accounts", id)).rejects.toMatchObject({ status: 404 });
  });

  it("create with returnRepresentation returns the record", async () => {
    const org = service();
    const name = `sdk-int xrm rep ${runId}`;
    const account = await org.create<Account>(
      "accounts",
      { name },
      { returnRepresentation: true, select: ["accountid", "name"] }
    );
    expect(account.accountid).toMatch(GUID);
    expect(account.name).toBe(name);
    created.push({ set: "accounts", id: account.accountid });
  });

  it("update() of a missing record rejects with 404 and creates nothing (#84)", async () => {
    const org = service();
    const missing = crypto.randomUUID();
    await expect(
      org.update("accounts", missing, { name: `sdk-int xrm upsert ${runId}` })
    ).rejects.toMatchObject({ status: 404 });
    await expect(org.retrieve("accounts", missing)).rejects.toMatchObject({ status: 404 });
  });

  it("several expand options are all applied (#84)", async () => {
    const org = service();
    const accountId: string = await org.create("accounts", { name: `sdk-int xrm expand ${runId}` });
    created.push({ set: "accounts", id: accountId });
    const contactId: string = await org.create("contacts", {
      lastname: `sdk-int xrm expand ${runId}`,
      "parentcustomerid_account@odata.bind": `/accounts(${accountId})`,
    });
    created.push({ set: "contacts", id: contactId });

    const account = await org.retrieve<{
      createdby?: { systemuserid: string };
      contact_customer_accounts?: Array<{ contactid: string }>;
    }>("accounts", accountId, {
      select: ["name"],
      expand: [
        { navigationProperty: "createdby", select: ["systemuserid"] },
        { navigationProperty: "contact_customer_accounts", select: ["contactid"], top: 5 },
      ],
    });
    expect(account.createdby?.systemuserid).toMatch(GUID);
    expect(account.contact_customer_accounts?.map((c) => c.contactid)).toEqual([contactId]);
  });
});
