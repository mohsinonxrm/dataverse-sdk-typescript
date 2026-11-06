/**
 * `$batch` scenarios with `BatchRequestBuilder`. Each `#region` is shown on the page as the code
 * that runs.
 */
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import type { Sdk } from "../sdk/createSdk";

// #region changeset
export async function createInOneTransaction({ client }: Sdk, input: { accountName: string }) {
  const batch = new BatchRequestBuilder(client);

  // A change set is one transaction: both records are created, or neither.
  batch.beginChangeset();
  batch.addRequest("account", "POST", "accounts", undefined, { name: input.accountName });
  // "$account" refers to the record the first request creates (its Content-ID).
  batch.addRequest(
    "contact",
    "POST",
    "contacts",
    undefined,
    { firstname: "Batch", lastname: "Contact", "parentcustomerid_account@odata.bind": "$account" },
    ["account"]
  );
  batch.endChangeset();
  // Outside the change set: runs after it, on its own.
  batch.addRequest("count", "GET", "accounts?$select=accountid&$count=true&$top=1");

  const result = await batch.execute();
  const accountId = entityIdFromHeaders(result.responses.get("account")?.headers);
  const contactId = entityIdFromHeaders(result.responses.get("contact")?.headers);

  // Clean up in a second batch.
  const cleanup = new BatchRequestBuilder(client);
  cleanup.addRequest("delete-contact", "DELETE", `contacts(${contactId})`);
  cleanup.addRequest("delete-account", "DELETE", `accounts(${accountId})`);
  await cleanup.execute();

  return {
    success: result.success,
    statuses: result.results.map((r) => `${r.id}: ${r.status}`),
    accountId,
    contactId,
  };
}

/** The id in a part's OData-EntityId header: `…/accounts(<id>)`. */
function entityIdFromHeaders(headers: Record<string, string> | undefined): string {
  return /\(([^)]+)\)$/.exec(headers?.["odata-entityid"] ?? "")?.[1] ?? "";
}
// #endregion

// #region continue-on-error
export async function continueOnError({ client }: Sdk) {
  const batch = new BatchRequestBuilder(client);
  batch.addRequest("whoami", "GET", "WhoAmI");
  batch.addRequest("missing", "GET", `accounts(${crypto.randomUUID()})?$select=name`);
  batch.addRequest("first", "GET", "accounts?$select=name&$top=1");

  // continueOnError sends Prefer: odata.continue-on-error, and execute() returns the result
  // instead of throwing: every request runs, and the failures are in result.errors.
  const result = await batch.execute({ continueOnError: true });

  return {
    success: result.success,
    successfulRequests: result.successfulRequests,
    failedRequests: result.failedRequests,
    errors: [...result.errors].map(([id, error]) => `${id}: ${error.message}`),
  };
}
// #endregion

// #region auto-split
export async function autoSplit({ client }: Sdk, input: { requests: number; batchSize: number }) {
  const batch = new BatchRequestBuilder(client);
  for (let i = 0; i < input.requests; i++) {
    batch.addRequest(`read-${i}`, "GET", "accounts?$select=name&$top=1");
  }
  // More requests than batchSize (at most 1000, Dataverse's limit) are sent as several $batch
  // requests, one after another; change sets are never split. The result is merged.
  const result = await batch.execute({ batchSize: input.batchSize });
  return { totalRequests: result.totalRequests, successfulRequests: result.successfulRequests };
}
// #endregion
