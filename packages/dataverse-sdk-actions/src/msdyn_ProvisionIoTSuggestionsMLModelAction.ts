import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProvisionIoTSuggestionsMLModel action
 */
export interface msdyn_ProvisionIoTSuggestionsMLModelResponse {
  // No content returned
}

/**
 * msdyn_ProvisionIoTSuggestionsMLModel action
 *
 * Unbound action
 */
export class msdyn_ProvisionIoTSuggestionsMLModelAction implements Executable<msdyn_ProvisionIoTSuggestionsMLModelResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionIoTSuggestionsMLModel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionIoTSuggestionsMLModelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
