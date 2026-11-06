import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrievePowerAppsConnectorApis action
 */
export interface RetrievePowerAppsConnectorApisResponse {
  value: EntityReference[];
}

/**
 * RetrievePowerAppsConnectorApis action
 *
 * Unbound action
 */
export class RetrievePowerAppsConnectorApisAction implements Executable<RetrievePowerAppsConnectorApisResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrievePowerAppsConnectorApis`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectorApisResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrievePowerAppsConnectorApisResponse;
    return (await response.json()) as RetrievePowerAppsConnectorApisResponse;
  }
}
