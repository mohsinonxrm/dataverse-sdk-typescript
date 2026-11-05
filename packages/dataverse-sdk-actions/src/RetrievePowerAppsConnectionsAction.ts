import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrievePowerAppsConnections action
 */
export interface RetrievePowerAppsConnectionsResponse {
  value: EntityReference[];
}

/**
 * RetrievePowerAppsConnections action
 *
 * Unbound action
 */
export class RetrievePowerAppsConnectionsAction implements Executable<RetrievePowerAppsConnectionsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrievePowerAppsConnections`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePowerAppsConnectionsResponse> {
    const data = await response.json();
    return data as RetrievePowerAppsConnectionsResponse;
  }
}
