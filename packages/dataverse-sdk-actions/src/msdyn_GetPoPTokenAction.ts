import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetPoPToken action
 */
export interface msdyn_GetPoPTokenResponse {
  popToken: string;
}

/**
 * Parameters of the msdyn_GetPoPToken action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPoPTokenActionParameters {
  scope: string;
  audience: string;
  aadObjectId: string;
  httpMethod: string;
  secureString: string;
}

/**
 * msdyn_GetPoPToken action
 *
 * Unbound action
 */
export class msdyn_GetPoPTokenAction implements Executable<msdyn_GetPoPTokenResponse> {
  constructor(public readonly parameters: msdyn_GetPoPTokenActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPoPToken`;

    const body = requestBody({
      scope: this.parameters.scope,
      audience: this.parameters.audience,
      aadObjectId: this.parameters.aadObjectId,
      httpMethod: this.parameters.httpMethod,
      secureString: this.parameters.secureString,
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

  async parseResponse(response: Response): Promise<msdyn_GetPoPTokenResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetPoPTokenResponse;
    return (await response.json()) as msdyn_GetPoPTokenResponse;
  }
}
