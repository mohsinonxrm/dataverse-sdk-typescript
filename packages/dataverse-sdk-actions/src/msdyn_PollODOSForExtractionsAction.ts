import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PollODOSForExtractions action
 */
export interface msdyn_PollODOSForExtractionsResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_PollODOSForExtractions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollODOSForExtractionsActionParameters {
  InputData: string;
}

/**
 * msdyn_PollODOSForExtractions action
 *
 * Unbound action
 */
export class msdyn_PollODOSForExtractionsAction implements Executable<msdyn_PollODOSForExtractionsResponse> {
  constructor(public readonly parameters: msdyn_PollODOSForExtractionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForExtractions`;

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

  async parseResponse(response: Response): Promise<msdyn_PollODOSForExtractionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PollODOSForExtractionsResponse;
  }
}
