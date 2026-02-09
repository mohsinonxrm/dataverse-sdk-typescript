import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DuplicateDetectionClientTriggerAction action
 */
export interface msdyn_DuplicateDetectionClientTriggerActionResponse {
  // No content returned
}

/**
 * msdyn_DuplicateDetectionClientTriggerAction action
 *
 * Unbound action
 */
export class msdyn_DuplicateDetectionClientTriggerActionAction implements Executable<msdyn_DuplicateDetectionClientTriggerActionResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionClientTriggerAction`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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
  ): Promise<msdyn_DuplicateDetectionClientTriggerActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
