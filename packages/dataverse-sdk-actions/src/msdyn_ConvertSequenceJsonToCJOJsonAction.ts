import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ConvertSequenceJsonToCJOJson action
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonResponse {
  Result: boolean;
}

/**
 * Parameters of the msdyn_ConvertSequenceJsonToCJOJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonActionParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson action
 *
 * Unbound action
 */
export class msdyn_ConvertSequenceJsonToCJOJsonAction implements Executable<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
  constructor(public readonly parameters: msdyn_ConvertSequenceJsonToCJOJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertSequenceJsonToCJOJson`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ConvertSequenceJsonToCJOJsonResponse;
    return (await response.json()) as msdyn_ConvertSequenceJsonToCJOJsonResponse;
  }
}
