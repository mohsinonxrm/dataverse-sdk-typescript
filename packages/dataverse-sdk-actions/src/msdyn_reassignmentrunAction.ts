import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_reassignmentrun action
 */
export interface msdyn_reassignmentrunResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_reassignmentrun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_reassignmentrunActionParameters {
  InputData: string;
}

/**
 * msdyn_reassignmentrun action
 *
 * Unbound action
 */
export class msdyn_reassignmentrunAction implements Executable<msdyn_reassignmentrunResponse> {
  constructor(public readonly parameters: msdyn_reassignmentrunActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentrun`;

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

  async parseResponse(response: Response): Promise<msdyn_reassignmentrunResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_reassignmentrunResponse;
    return (await response.json()) as msdyn_reassignmentrunResponse;
  }
}
