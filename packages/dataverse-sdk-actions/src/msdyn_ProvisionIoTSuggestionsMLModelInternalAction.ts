import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProvisionIoTSuggestionsMLModelInternal action
 */
export interface msdyn_ProvisionIoTSuggestionsMLModelInternalResponse {
  // No content returned
}

/**
 * msdyn_ProvisionIoTSuggestionsMLModelInternal action
 *
 * Unbound action
 */
export class msdyn_ProvisionIoTSuggestionsMLModelInternalAction implements Executable<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse> {
  constructor(public readonly tenantId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionIoTSuggestionsMLModelInternal`;

    const body: Record<string, unknown> = {
      TenantId: this.tenantId,
    };

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
  ): Promise<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse> {
    // No return value (204 No Content)
    return {};
  }
}
