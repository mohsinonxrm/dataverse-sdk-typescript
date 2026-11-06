/**
 * Overview scenarios. Each `#region` is shown on the page as the code that runs.
 */
import { WhoAmIFunction, type WhoAmIResponse } from "@mohsinonxrm/dataverse-sdk-functions";
import type { Sdk } from "../sdk/createSdk";

// #region who-am-i
export async function whoAmI({ client }: Sdk, signal: AbortSignal) {
  // Any path is relative to the Web API root: GET /api/data/v9.2/WhoAmI
  const viaBuilder = await client.api("WhoAmI").get<WhoAmIResponse>({ signal });

  // The same call through the typed class from @mohsinonxrm/dataverse-sdk-functions.
  const viaFunction = await client.execute(new WhoAmIFunction(), { signal });

  return { viaBuilder, sameUser: viaBuilder.UserId === viaFunction.UserId };
}
// #endregion
