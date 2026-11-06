import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CleanUpActivityMappings action
 */
export interface msdyn_CleanUpActivityMappingsResponse {
  // No content returned
}

/**
 * msdyn_CleanUpActivityMappings action
 *
 * Unbound action
 */
export class msdyn_CleanUpActivityMappingsAction implements Executable<msdyn_CleanUpActivityMappingsResponse> {
  constructor(public readonly inputData?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpActivityMappings`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_CleanUpActivityMappingsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
