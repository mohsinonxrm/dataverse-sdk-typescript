/**
 * Optimistic concurrency, impersonation and Prefer headers. Each `#region` is shown on the page
 * as the code that runs. Scenarios that need a record create one and delete it again.
 */
import { DataverseODataError, odata, type PageResponse } from "@mohsinonxrm/dataverse-sdk-core";
import type { Sdk } from "../sdk/createSdk";
import type { Account, SystemUser } from "./types";

// #region concurrency
export async function staleUpdate({ client }: Sdk, signal: AbortSignal) {
  const id = await client.api("accounts").createAndGetId({ name: "Concurrency demo" }, { signal });
  try {
    // Read the record and keep its ETag (the @odata.etag annotation).
    const read = await client.api(`accounts(${id})`).select("name").get<Account>({ signal });
    const etag = read["@odata.etag"] ?? "";

    // Someone else changes it: its ETag moves on.
    await client.api(`accounts(${id})`).patch({ name: "Changed by someone else" }, { signal });

    // Our update still carries the old ETag, so Dataverse refuses it with 412 Precondition Failed
    // instead of overwriting the other change.
    await client.api(`accounts(${id})`).ifMatch(etag).patch({ name: "Our change" }, { signal });
    return "Not expected: the stale update was accepted.";
  } finally {
    await client.api(`accounts(${id})`).delete({ signal });
  }
}
// #endregion

// #region concurrency-retry
export async function updateWithRetry({ client }: Sdk, signal: AbortSignal) {
  const id = await client
    .api("accounts")
    .createAndGetId({ name: "Concurrency demo", revenue: 100 }, { signal });
  try {
    let current = await client.api(`accounts(${id})`).select("revenue").get<Account>({ signal });
    // Someone else changes the record after we read it.
    await client.api(`accounts(${id})`).patch({ revenue: 150 }, { signal });

    // Read-modify-write: on 412, read the current values and ETag again and reapply the change.
    for (let attempt = 1; attempt <= 3; attempt++) {
      const revenue = (current.revenue ?? 0) + 10;
      try {
        await client
          .api(`accounts(${id})`)
          .ifMatch(current["@odata.etag"] ?? "*")
          .patch({ revenue }, { signal });
        return { attempts: attempt, revenue };
      } catch (error) {
        if (!(error instanceof DataverseODataError && error.status === 412)) throw error;
        current = await client.api(`accounts(${id})`).select("revenue").get<Account>({ signal });
      }
    }
    throw new Error("Gave up after 3 attempts.");
  } finally {
    await client.api(`accounts(${id})`).delete({ signal });
  }
}
// #endregion

// #region list-users
export async function listUsers({ client }: Sdk, signal: AbortSignal) {
  const users = await client
    .api("systemusers")
    .select("fullname", "internalemailaddress", "azureactivedirectoryobjectid")
    .filter(
      odata.and(odata.eq("isdisabled", false), odata.ne("azureactivedirectoryobjectid", null))
    )
    .orderBy("fullname asc")
    .top(20)
    .get<PageResponse<SystemUser>>({ signal });
  return users.value;
}
// #endregion

// #region impersonate
export async function actAs({ client }: Sdk, input: { objectId: string }, signal: AbortSignal) {
  // CallerObjectId: the request runs as that user (you need the prvActOnBehalfOfAnotherUser privilege).
  const whoAmI = await client
    .api("WhoAmI")
    .impersonateByObjectId(input.objectId)
    .get<{ UserId: string }>({ signal });

  const id = await client
    .api("accounts")
    .impersonateByObjectId(input.objectId)
    .createAndGetId({ name: "Created on behalf of another user" }, { signal });
  try {
    // createdby is the impersonated user; createdonbehalfby is you.
    const created = await client
      .api(`accounts(${id})`)
      .select("_createdby_value", "_createdonbehalfby_value")
      .prefer((p) => p.formattedValues())
      .get<Account>({ signal });
    return {
      whoAmI: whoAmI.UserId,
      createdBy: created["_createdby_value@OData.Community.Display.V1.FormattedValue"],
      createdOnBehalfBy:
        created["_createdonbehalfby_value@OData.Community.Display.V1.FormattedValue"],
    };
  } finally {
    await client.api(`accounts(${id})`).delete({ signal });
  }
}
// #endregion

// #region return-representation
export async function createAndReturn(
  { client }: Sdk,
  input: { name: string },
  signal: AbortSignal
) {
  // return=representation: the create answers 201 with the record, so no second GET is needed.
  const created = await client
    .api("accounts")
    .select("name", "createdon", "statecode")
    .prefer((p) => p.returnRepresentation().formattedValues())
    .post<Account>({ name: input.name }, { signal });
  await client.api(`accounts(${created.accountid})`).delete({ signal });
  return created;
}
// #endregion

// #region max-page-size
export async function firstPage({ client }: Sdk, input: { pageSize: number }, signal: AbortSignal) {
  const page = await client
    .api("accounts")
    .select("name")
    .orderBy("name asc")
    .prefer((p) => p.maxPageSize(input.pageSize))
    .getPage<Account>({ signal });
  return {
    count: page.value.length,
    nextLink: page["@odata.nextLink"],
    names: page.value.map((a) => a.name),
  };
}
// #endregion

// #region all-annotations
export async function withAnnotations({ client }: Sdk, signal: AbortSignal) {
  // odata.include-annotations="*": formatted values, lookup names and navigation properties.
  const page = await client
    .api("accounts")
    .select("name", "revenue", "statecode", "_primarycontactid_value")
    .top(3)
    .prefer((p) => p.allAnnotations())
    .get<PageResponse<Account>>({ signal });
  return page.value;
}
// #endregion
