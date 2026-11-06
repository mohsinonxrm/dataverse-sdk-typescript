import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msft_GetSecHubFeatureData action
 */
export interface msft_GetSecHubFeatureDataResponse {
  value: EntityReference[];
}

/**
 * msft_GetSecHubFeatureData action
 *
 * Unbound action
 */
export class msft_GetSecHubFeatureDataAction implements Executable<msft_GetSecHubFeatureDataResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_GetSecHubFeatureData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msft_GetSecHubFeatureDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msft_GetSecHubFeatureDataResponse;
  }
}
