import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RetrieveAppsWithDelegatedAccessPermissions action
 */
export interface RetrieveAppsWithDelegatedAccessPermissionsResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAppsWithDelegatedAccessPermissionsResponse;
    return (await response.json()) as RetrieveAppsWithDelegatedAccessPermissionsResponse;
  }
}
