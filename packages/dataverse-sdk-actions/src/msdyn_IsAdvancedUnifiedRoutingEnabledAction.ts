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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsAdvancedUnifiedRoutingEnabledResponse> {
    const data = await response.json();
    return data as msdyn_IsAdvancedUnifiedRoutingEnabledResponse;
  }
}
