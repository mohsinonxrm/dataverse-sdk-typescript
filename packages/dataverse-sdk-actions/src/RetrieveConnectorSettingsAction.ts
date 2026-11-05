import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveConnectorSettings action
 */
export interface RetrieveConnectorSettingsResponse {
  value: EntityReference[];
}

/**
 * RetrieveConnectorSettings action
 *
 * Unbound action
 */
export class RetrieveConnectorSettingsAction implements Executable<RetrieveConnectorSettingsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveConnectorSettingsResponse> {
    const data = await response.json();
    return data as RetrieveConnectorSettingsResponse;
  }
}
