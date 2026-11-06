/**
 * Environment discovery with `DiscoveryClient`, and a connection test against the environment
 * you pick. Each `#region` is shown on the page as the code that runs.
 */
import { odata } from "@mohsinonxrm/dataverse-sdk-core";
import { DiscoveryClient, toEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { RetrieveVersionFunction, WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import type { Sdk } from "../sdk/createSdk";

// #region discover
export async function listEnvironments(sdk: Sdk, input: { region: string }, signal: AbortSignal) {
  // The Global Discovery Service lists the environments the signed-in user can open.
  const discovery = new DiscoveryClient(sdk.tokenProvider, sdk.discoveryOptions);
  const organizations = await discovery.listOrganizations({
    filter: input.region ? odata.eq("Region", input.region) : undefined,
    signal,
  });
  // toEnvironment(): a camel-cased summary with the Web API URL worked out.
  return organizations.map(toEnvironment);
}
// #endregion

// #region test-connection
export async function testConnection(sdk: Sdk, input: { url: string }, signal: AbortSignal) {
  // A client for the chosen environment, with a token for that environment.
  const client = sdk.createClient({ baseUrl: input.url, scopes: sdk.scopesFor(input.url) });
  const started = performance.now();
  const whoAmI = await client.execute(new WhoAmIFunction(), { signal });
  const version = await client.execute(new RetrieveVersionFunction(), { signal });
  return {
    url: input.url,
    userId: whoAmI.UserId,
    version: version.Version,
    roundTripsMs: Math.round(performance.now() - started),
  };
}
// #endregion
