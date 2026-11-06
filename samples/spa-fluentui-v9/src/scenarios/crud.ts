/**
 * Create, read, update and delete with the request builder. Each `#region` is shown on the page
 * as the code that runs.
 */
import type { Sdk } from "../sdk/createSdk";
import type { Account } from "./types";

export interface AccountInput {
  name: string;
  city: string;
  revenue: number;
}

// #region create
export async function createAccount({ client }: Sdk, input: AccountInput, signal: AbortSignal) {
  // POST accounts; the new id comes from the OData-EntityId response header.
  return client
    .api("accounts")
    .createAndGetId(
      { name: input.name, address1_city: input.city, revenue: input.revenue },
      { signal }
    );
}
// #endregion

// #region read
export async function readAccount({ client }: Sdk, input: { id: string }, signal: AbortSignal) {
  return (
    client
      .api(`accounts(${input.id})`)
      .select("name", "address1_city", "revenue", "statecode", "modifiedon")
      // Formatted values: revenue as currency, statecode as its label, dates in the user's format.
      .prefer((p) => p.formattedValues())
      .get<Account>({ signal })
  );
}
// #endregion

// #region update
export async function updateAccount(
  sdk: Sdk,
  input: { id: string } & AccountInput,
  signal: AbortSignal
) {
  // PATCH with If-Match: * updates only an existing record (no upsert).
  await sdk.client
    .api(`accounts(${input.id})`)
    .ifMatch("*")
    .patch({ name: input.name, address1_city: input.city, revenue: input.revenue }, { signal });
  return readAccount(sdk, input, signal); // Read it back.
}
// #endregion

// #region delete
export async function deleteAccount({ client }: Sdk, input: { id: string }, signal: AbortSignal) {
  await client.api(`accounts(${input.id})`).delete({ signal });
  return { deleted: input.id };
}
// #endregion
