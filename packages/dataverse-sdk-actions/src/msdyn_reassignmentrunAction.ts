import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_reassignmentrun action
 */
export interface msdyn_reassignmentrunResponse {
  // No content returned
}

/**
 * msdyn_reassignmentrun action
 *
 * Unbound action
 */
export class msdyn_reassignmentrunAction implements Executable<msdyn_reassignmentrunResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentrun`;

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

  async parseResponse(response: Response): Promise<msdyn_reassignmentrunResponse> {
    // No return value (204 No Content)
    return {};
  }
}
