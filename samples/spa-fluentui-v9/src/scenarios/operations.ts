/**
 * Functions, actions and messages from the generated packages. Each `#region` is shown on the
 * page as the code that runs.
 */
import { CanManyToManyAction } from "@mohsinonxrm/dataverse-sdk-actions";
import type { PageResponse } from "@mohsinonxrm/dataverse-sdk-core";
import {
  createEntityReference,
  InitializeFromFunction,
  RetrieveTotalRecordCountFunction,
  RetrieveVersionFunction,
} from "@mohsinonxrm/dataverse-sdk-functions";
import { CanBeReferencedRequest, OrganizationRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import type { Sdk } from "../sdk/createSdk";
import type { Account } from "./types";

// #region functions
export async function counts({ client }: Sdk, input: { tables: string[] }, signal: AbortSignal) {
  // Functions are GETs; typed parameters become OData parameter aliases in the URL.
  const version = await client.execute(new RetrieveVersionFunction(), { signal });
  const totals = await client.execute(new RetrieveTotalRecordCountFunction(input.tables), {
    signal,
  });

  const { Keys, Values } = totals.EntityRecordCountCollection;
  return {
    version: version.Version,
    counts: Keys.map((table, i) => ({ table, records: Values[i] ?? 0 })),
  };
}
// #endregion

// #region initialize-from
export async function newContactFromAccount({ client }: Sdk, signal: AbortSignal) {
  const page = await client
    .api("accounts")
    .select("name")
    .top(1)
    .get<PageResponse<Account>>({ signal });
  const account = page.value[0];
  if (!account) throw new Error("There are no accounts.");

  // InitializeFrom: a new contact with the values the account -> contact mapping fills in.
  const template = await client.execute(
    new InitializeFromFunction(
      createEntityReference("account", account.accountid),
      undefined,
      "contact",
      "ValidForCreate"
    ),
    { signal }
  );

  // Keep the column values and @odata.bind lookups, not the response's @odata.context.
  const values = Object.fromEntries(
    Object.entries(template).filter(([key]) => key !== "@odata.context")
  );
  const contactId = await client
    .api("contacts")
    .createAndGetId({ ...values, firstname: "Initialized", lastname: "From Account" }, { signal });
  await client.api(`contacts(${contactId})`).delete({ signal });
  return { from: account.name, template: values, createdAndDeleted: contactId };
}
// #endregion

// #region actions-messages
export async function relationshipChecks({ client }: Sdk, input: { table: string }) {
  // An action class from @mohsinonxrm/dataverse-sdk-actions, run by the client.
  const manyToMany = await client.execute(new CanManyToManyAction(input.table));

  // A message from @mohsinonxrm/dataverse-sdk-messages, run by OrganizationService (C# style).
  // The response type comes from the request: CanBeReferencedResponse.
  const service = new OrganizationService(client);
  const referenced = await service.execute(new CanBeReferencedRequest(input.table));

  // Any action, including custom APIs, without a generated class: an OrganizationResponse.
  const referencing = await service.execute(
    new OrganizationRequest("CanBeReferencing", { EntityName: input.table })
  );

  return {
    canManyToMany: manyToMany.CanManyToMany,
    canBeReferenced: referenced.result.CanBeReferenced,
    canBeReferencing: referencing.Results.CanBeReferencing,
  };
}
// #endregion
