import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateSdkMessageProcessingStepState action
 */
export interface msdyn_UpdateSdkMessageProcessingStepStateResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateSdkMessageProcessingStepState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSdkMessageProcessingStepStateActionParameters {
  msdyn_IsEnabled: boolean;
}

/**
 * msdyn_UpdateSdkMessageProcessingStepState action
 *
 * Unbound action
 */
export class msdyn_UpdateSdkMessageProcessingStepStateAction implements Executable<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateSdkMessageProcessingStepStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSdkMessageProcessingStepState`;

    const body = requestBody({
      msdyn_IsEnabled: this.parameters.msdyn_IsEnabled,
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
  ): Promise<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateSdkMessageProcessingStepStateResponse;
    return (await response.json()) as msdyn_UpdateSdkMessageProcessingStepStateResponse;
  }
}
