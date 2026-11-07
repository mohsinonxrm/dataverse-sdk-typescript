/**
 * #76 live: OrganizationService resolves entity set names from metadata.
 * Creates one account and one contact named with this run's `runId`, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import { OrganizationService, createEntityReference } from "@mohsinonxrm/dataverse-sdk-xrm";
import { live, liveClient, runId } from "./env.js";

const created: Array<{ set: string; id: string }> = [];

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

describe.skipIf(!live)("live: OrganizationService entity set names (#76)", () => {
  it("reads entity set names from metadata, including irregular plurals", async () => {
    const service = new OrganizationService(liveClient().client);
    await expect(service.getEntitySetName("opportunity")).resolves.toBe("opportunities");
    await expect(service.getEntitySetName("systemuser")).resolves.toBe("systemusers");
    await expect(service.getEntitySetName("activityparty")).resolves.toBe("activityparties");
    await expect(service.getEntitySetName("sdk_int_nosuchtable")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("associate, assign and setState work with logical names", async () => {
    const { client } = liveClient();
    const service = new OrganizationService(client);

    const accountId: string = await service.create("accounts", {
      name: `sdk-int xrm sets ${runId}`,
    });
    created.push({ set: "accounts", id: accountId });
    const contactId: string = await service.create("contacts", {
      lastname: `sdk-int xrm sets ${runId}`,
    });
    created.push({ set: "contacts", id: contactId });

    // associate: a reference from createEntityReference carries the "contacts" set
    await service.associate("accounts", accountId, "contact_customer_accounts", [
      createEntityReference("contact", contactId),
    ]);
    const linked = await service.retrieveMultiple<{ contactid: string }>(
      `accounts(${accountId})/contact_customer_accounts`,
      { select: ["contactid"] }
    );
    expect(linked.value.map((c) => c.contactid)).toEqual([contactId]);
    await service.disassociate("accounts", accountId, "contact_customer_accounts", contactId);

    // assign to the caller (a no-op owner change) through "account" and "systemuser"
    const me = await service.whoAmI();
    await service.assign("account", accountId, me.UserId);
    const owned = await service.retrieve<{ _ownerid_value: string }>("accounts", accountId, {
      select: ["_ownerid_value"],
    });
    expect(owned._ownerid_value).toBe(me.UserId);

    // setState: deactivate the account
    await service.setState("account", accountId, 1, 2);
    const state = await service.retrieve<{ statecode: number; statuscode: number }>(
      "accounts",
      accountId,
      { select: ["statecode", "statuscode"] }
    );
    expect(state).toMatchObject({ statecode: 1, statuscode: 2 });
  });
});
