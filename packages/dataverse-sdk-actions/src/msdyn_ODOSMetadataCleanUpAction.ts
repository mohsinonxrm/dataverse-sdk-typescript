import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ODOSMetadataCleanUp action
 */
export interface msdyn_ODOSMetadataCleanUpResponse {
  // No content returned
}

/**
 * msdyn_ODOSMetadataCleanUp action
 *
 * Unbound action
 */
export class msdyn_ODOSMetadataCleanUpAction implements Executable<msdyn_ODOSMetadataCleanUpResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ODOSMetadataCleanUp`;

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

  async parseResponse(response: Response): Promise<msdyn_ODOSMetadataCleanUpResponse> {
    // No return value (204 No Content)
    return {};
  }
}
