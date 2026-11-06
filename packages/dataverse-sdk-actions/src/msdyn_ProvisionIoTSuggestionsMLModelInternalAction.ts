import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ProvisionIoTSuggestionsMLModelInternal action
 */
export interface msdyn_ProvisionIoTSuggestionsMLModelInternalResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ProvisionIoTSuggestionsMLModelInternal action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProvisionIoTSuggestionsMLModelInternalActionParameters {
  TenantId: string;
}

/**
 * msdyn_ProvisionIoTSuggestionsMLModelInternal action
 *
 * Unbound action
 */
export class msdyn_ProvisionIoTSuggestionsMLModelInternalAction implements Executable<msdyn_ProvisionIoTSuggestionsMLModelInternalResponse> {
  constructor(
    public readonly parameters: msdyn_ProvisionIoTSuggestionsMLModelInternalActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionIoTSuggestionsMLModelInternal`;

    const body = requestBody({
      TenantId: this.parameters.TenantId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ProvisionIoTSuggestionsMLModelInternalResponse;
    return (await response.json()) as msdyn_ProvisionIoTSuggestionsMLModelInternalResponse;
  }
}
