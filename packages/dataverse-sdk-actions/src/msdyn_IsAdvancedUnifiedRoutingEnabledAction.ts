import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsAdvancedUnifiedRoutingEnabled action
 */
export interface msdyn_IsAdvancedUnifiedRoutingEnabledResponse {
  IsAdvancedUnifiedRoutingEnabled: boolean;
}

/**
 * msdyn_IsAdvancedUnifiedRoutingEnabled action
 *
 * Unbound action
 */
export class msdyn_IsAdvancedUnifiedRoutingEnabledAction implements Executable<msdyn_IsAdvancedUnifiedRoutingEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsAdvancedUnifiedRoutingEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsAdvancedUnifiedRoutingEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IsAdvancedUnifiedRoutingEnabledResponse;
  }
}
