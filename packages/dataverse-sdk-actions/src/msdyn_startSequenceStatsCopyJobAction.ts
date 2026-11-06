import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_startSequenceStatsCopyJob action
 */
export interface msdyn_startSequenceStatsCopyJobResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_startSequenceStatsCopyJob action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_startSequenceStatsCopyJobActionParameters {
  InputData?: string;
}

/**
 * msdyn_startSequenceStatsCopyJob action
 *
 * Unbound action
 */
export class msdyn_startSequenceStatsCopyJobAction implements Executable<msdyn_startSequenceStatsCopyJobResponse> {
  constructor(public readonly parameters: msdyn_startSequenceStatsCopyJobActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_startSequenceStatsCopyJob`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_startSequenceStatsCopyJobResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_startSequenceStatsCopyJobResponse;
    return (await response.json()) as msdyn_startSequenceStatsCopyJobResponse;
  }
}
