/**
 * Requests that give the logger, telemetry and retry hooks something to report. Each `#region`
 * is shown on the page as the code that runs.
 */
import type { FetchProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type { Sdk } from "../sdk/createSdk";

// #region generate-activity
export async function generateActivity(sdk: Sdk, signal: AbortSignal) {
  // A fetch that answers the first request with 503, so the retry hook fires once.
  let first = true;
  const flaky: FetchProvider = {
    fetch(input, init) {
      if (!first) return sdk.fetchProvider.fetch(input, init);
      first = false;
      return Promise.resolve(new Response(null, { status: 503, headers: { "retry-after": "1" } }));
    },
  };
  const client = sdk.createClient({ fetchProvider: flaky });

  await client.api("WhoAmI").get({ signal }); // 503, a retry, then 200
  await client.api("accounts").select("name").top(3).get({ signal });
  const failed = await client
    .api("accounts")
    .filter("not a filter")
    .get({ signal })
    .catch((error: unknown) => (error instanceof Error ? error.message : String(error)));

  return { failedAsExpected: failed };
}
// #endregion
