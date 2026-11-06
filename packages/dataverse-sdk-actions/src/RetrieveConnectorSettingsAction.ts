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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveConnectorSettingsResponse;
  }
}
