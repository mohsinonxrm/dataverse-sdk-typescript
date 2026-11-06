import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SetCaseSentimentCustomAPI action
 */
export interface msdyn_SetCaseSentimentCustomAPIResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SetCaseSentimentCustomAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetCaseSentimentCustomAPIActionParameters {
  emailId: string;
}

/**
 * msdyn_SetCaseSentimentCustomAPI action
 *
 * Unbound action
 */
export class msdyn_SetCaseSentimentCustomAPIAction implements Executable<msdyn_SetCaseSentimentCustomAPIResponse> {
  constructor(public readonly parameters: msdyn_SetCaseSentimentCustomAPIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetCaseSentimentCustomAPI`;

    const body = requestBody({
      emailId: this.parameters.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_SetCaseSentimentCustomAPIResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SetCaseSentimentCustomAPIResponse;
  }
}
