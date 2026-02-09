import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_reassignmentbatch action
 */
export interface msdyn_reassignmentbatchResponse {
  // No content returned
}

/**
 * msdyn_reassignmentbatch action
 *
 * Unbound action
 */
export class msdyn_reassignmentbatchAction implements Executable<msdyn_reassignmentbatchResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentbatch`;

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

  async parseResponse(response: Response): Promise<msdyn_reassignmentbatchResponse> {
    // No return value (204 No Content)
    return {};
  }
}
