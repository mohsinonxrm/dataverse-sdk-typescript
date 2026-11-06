import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFCSWithUserContext action
 */
export interface msdyn_GetFCSWithUserContextResponse {
  msdyn_GetFCSWithUserContextOutput: string;
}

/**
 * Parameters of the msdyn_GetFCSWithUserContext action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSWithUserContextActionParameters {
  msdyn_GetFCSWithUserContextInput: string;
}

/**
 * msdyn_GetFCSWithUserContext action
 *
 * Unbound action
 */
export class msdyn_GetFCSWithUserContextAction implements Executable<msdyn_GetFCSWithUserContextResponse> {
  constructor(public readonly parameters: msdyn_GetFCSWithUserContextActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSWithUserContext`;

    const body = requestBody({
      msdyn_GetFCSWithUserContextInput: this.parameters.msdyn_GetFCSWithUserContextInput,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSWithUserContextResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetFCSWithUserContextResponse;
  }
}
