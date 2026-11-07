import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RetrieveAppsWithDelegatedAccessPermissions action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAppsWithDelegatedAccessPermissionsResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the RetrieveAppsWithDelegatedAccessPermissions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAppsWithDelegatedAccessPermissionsActionParameters {
  cloud: number;
}

/**
 * RetrieveAppsWithDelegatedAccessPermissions action
 *
 * Unbound action
 */
export class RetrieveAppsWithDelegatedAccessPermissionsAction implements Executable<RetrieveAppsWithDelegatedAccessPermissionsResponse> {
  constructor(
    public readonly parameters: RetrieveAppsWithDelegatedAccessPermissionsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveAppsWithDelegatedAccessPermissions`;

    const body = requestBody({
      cloud: this.parameters.cloud,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveAppsWithDelegatedAccessPermissionsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return (
      (await response.json()) as { value: RetrieveAppsWithDelegatedAccessPermissionsResponse }
    ).value;
  }
}
