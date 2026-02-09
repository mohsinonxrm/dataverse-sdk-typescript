import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_startSequenceStatsCopyJob action
 */
export interface msdyn_startSequenceStatsCopyJobResponse {
  // No content returned
}

/**
 * msdyn_startSequenceStatsCopyJob action
 *
 * Unbound action
 */
export class msdyn_startSequenceStatsCopyJobAction implements Executable<msdyn_startSequenceStatsCopyJobResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_startSequenceStatsCopyJob`;

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

  async parseResponse(response: Response): Promise<msdyn_startSequenceStatsCopyJobResponse> {
    // No return value (204 No Content)
    return {};
  }
}
