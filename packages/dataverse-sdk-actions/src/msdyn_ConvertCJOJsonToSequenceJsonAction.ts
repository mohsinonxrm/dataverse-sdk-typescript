import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ConvertCJOJsonToSequenceJson action
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonResponse {
  Result: boolean;
}

/**
 * Parameters of the msdyn_ConvertCJOJsonToSequenceJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonActionParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson action
 *
 * Unbound action
 */
export class msdyn_ConvertCJOJsonToSequenceJsonAction implements Executable<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
  constructor(public readonly parameters: msdyn_ConvertCJOJsonToSequenceJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertCJOJsonToSequenceJson`;

    const body = requestBody({
      SequenceId: this.parameters.SequenceId,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ConvertCJOJsonToSequenceJsonResponse;
    return (await response.json()) as msdyn_ConvertCJOJsonToSequenceJsonResponse;
  }
}
