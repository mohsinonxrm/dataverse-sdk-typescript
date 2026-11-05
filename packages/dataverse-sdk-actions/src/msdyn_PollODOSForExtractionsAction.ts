import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PollODOSForExtractions action
 */
export interface msdyn_PollODOSForExtractionsResponse {
  // No content returned
}

/**
 * msdyn_PollODOSForExtractions action
 *
 * Unbound action
 */
export class msdyn_PollODOSForExtractionsAction implements Executable<msdyn_PollODOSForExtractionsResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForExtractions`;

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

  async parseResponse(response: Response): Promise<msdyn_PollODOSForExtractionsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
