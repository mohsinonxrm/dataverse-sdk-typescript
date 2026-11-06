import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AcquireToken action
 */
export interface msdyn_AcquireTokenResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_AcquireToken action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AcquireTokenActionParameters {
  InputParameter: string;
}

/**
 * msdyn_AcquireToken action
 *
 * Unbound action
 */
export class msdyn_AcquireTokenAction implements Executable<msdyn_AcquireTokenResponse> {
  constructor(public readonly parameters: msdyn_AcquireTokenActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcquireToken`;

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

  async parseResponse(response: Response): Promise<msdyn_AcquireTokenResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AcquireTokenResponse;
    return (await response.json()) as msdyn_AcquireTokenResponse;
  }
}
