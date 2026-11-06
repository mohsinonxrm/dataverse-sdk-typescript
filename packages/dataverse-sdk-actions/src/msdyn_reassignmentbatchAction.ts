import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_reassignmentbatch action
 */
export interface msdyn_reassignmentbatchResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_reassignmentbatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_reassignmentbatchActionParameters {
  InputData: string;
}

/**
 * msdyn_reassignmentbatch action
 *
 * Unbound action
 */
export class msdyn_reassignmentbatchAction implements Executable<msdyn_reassignmentbatchResponse> {
  constructor(public readonly parameters: msdyn_reassignmentbatchActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentbatch`;

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

  async parseResponse(response: Response): Promise<msdyn_reassignmentbatchResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_reassignmentbatchResponse;
  }
}
