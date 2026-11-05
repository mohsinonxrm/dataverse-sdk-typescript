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
    const data = await response.json();
    return data as RetrievePowerAppsConnectorApisResponse;
  }
}
