import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IsAdvancedUnifiedRoutingEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsAdvancedUnifiedRoutingEnabledResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IsAdvancedUnifiedRoutingEnabledResponse;
  }
}
