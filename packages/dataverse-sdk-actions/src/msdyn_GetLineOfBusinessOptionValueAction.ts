import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetLineOfBusinessOptionValue action
 */
export interface msdyn_GetLineOfBusinessOptionValueResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_GetLineOfBusinessOptionValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLineOfBusinessOptionValueActionParameters {
  RequestPayload: string;
}

/**
 * msdyn_GetLineOfBusinessOptionValue action
 *
 * Unbound action
 */
export class msdyn_GetLineOfBusinessOptionValueAction implements Executable<msdyn_GetLineOfBusinessOptionValueResponse> {
  constructor(public readonly parameters: msdyn_GetLineOfBusinessOptionValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLineOfBusinessOptionValue`;

    const body = requestBody({
      RequestPayload: this.parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetLineOfBusinessOptionValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetLineOfBusinessOptionValueResponse;
  }
}
