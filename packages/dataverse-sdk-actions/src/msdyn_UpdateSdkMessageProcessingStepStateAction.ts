import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateSdkMessageProcessingStepState action
 */
export interface msdyn_UpdateSdkMessageProcessingStepStateResponse {
  // No content returned
}

/**
 * msdyn_UpdateSdkMessageProcessingStepState action
 *
 * Unbound action
 */
export class msdyn_UpdateSdkMessageProcessingStepStateAction implements Executable<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
  constructor(public readonly msdyn_IsEnabled: boolean) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSdkMessageProcessingStepState`;

    const body: Record<string, unknown> = {
      msdyn_IsEnabled: this.msdyn_IsEnabled,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
