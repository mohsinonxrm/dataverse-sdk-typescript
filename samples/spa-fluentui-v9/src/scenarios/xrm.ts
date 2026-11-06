/**
 * `OrganizationService` from `@mohsinonxrm/dataverse-sdk-xrm`: the C# SDK's shape over the Web
 * API. Each `#region` is shown on the page as the code that runs.
 */
import { odataLiteral } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { OrganizationService, createEntityReference } from "@mohsinonxrm/dataverse-sdk-xrm";
import type { Sdk } from "../sdk/createSdk";
import type { Account, Contact } from "./types";

// #region xrm-crud
export async function organizationServiceCrud({ client }: Sdk) {
  const service = new OrganizationService(client);

  // create() returns the new id (or the record, with returnRepresentation).
  const accountId = await service.create("accounts", { name: "OrganizationService demo" });
  const contactId = await service.create("contacts", { firstname: "Xrm", lastname: "Demo" });
  try {
    // update() never creates: it sends If-Match: *, so a missing record is a 404.
    await service.update("accounts", accountId, { telephone1: "+1 425 555 0100" });

    // associate() takes the SDK's one EntityReference, from any package's createEntityReference.
    await service.associate("accounts", accountId, "contact_customer_accounts", [
      createEntityReference("contact", contactId),
    ]);

    const account = await service.retrieve<Account>("accounts", accountId, {
      select: ["name", "telephone1"],
      expand: [{ navigationProperty: "contact_customer_accounts", select: ["fullname"] }],
    });

    const contacts = await service.retrieveMultiple<Contact>("contacts", {
      select: ["fullname"],
      filter: `_parentcustomerid_value eq ${odataLiteral.guid(accountId)}`,
      top: 10,
    });

    // setState() deactivates the account: statecode 1, statuscode 2.
    await service.setState("account", accountId, 1, 2);
    const deactivated = await service.retrieve<Account>("accounts", accountId, {
      select: ["statecode"],
    });

    return {
      account: { name: account.name, telephone1: account.telephone1 },
      contactsOfAccount: contacts.value.map((c) => c.fullname),
      expandedContacts: (account.contact_customer_accounts ?? []).map((c) => c.fullname),
      statecodeAfterSetState: deactivated.statecode,
    };
  } finally {
    await service.delete("contacts", contactId);
    await service.delete("accounts", accountId);
  }
}
// #endregion

// #region xrm-execute
export async function organizationServiceExecute({ client }: Sdk) {
  const service = new OrganizationService(client);
  const viaHelper = await service.whoAmI();
  // execute() runs any typed request from the actions, functions or messages packages, and
  // its result has the request's response type (here WhoAmIResponse).
  const viaExecute = await service.execute(new WhoAmIFunction());
  return { viaHelper, sameUser: viaHelper.UserId === viaExecute.UserId };
}
// #endregion
