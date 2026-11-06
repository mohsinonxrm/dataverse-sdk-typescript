import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAzureToken action
 */
export interface msdyn_GetAzureTokenResponse {
  ExceptionMessage: string;
  Result: string;
}

/**
 * Parameters of the msdyn_GetAzureToken action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAzureTokenActionParameters {
  InputParameter: string;
}

/**
 * msdyn_GetAzureToken action
 *
 * Unbound action
 */
export class msdyn_GetAzureTokenAction implements Executable<msdyn_GetAzureTokenResponse> {
  constructor(public readonly parameters: msdyn_GetAzureTokenActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAzureToken`;

    const body = requestBody({
      InputParameter: this.parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetAzureTokenResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetAzureTokenResponse;
  }
}
