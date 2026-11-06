import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_WKWGDPRDeleteStatus action
 */
export interface msdyn_WKWGDPRDeleteStatusResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_WKWGDPRDeleteStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WKWGDPRDeleteStatusActionParameters {
  UserIds: string[];
}

/**
 * msdyn_WKWGDPRDeleteStatus action
 *
 * Unbound action
 */
export class msdyn_WKWGDPRDeleteStatusAction implements Executable<msdyn_WKWGDPRDeleteStatusResponse> {
  constructor(public readonly parameters: msdyn_WKWGDPRDeleteStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWGDPRDeleteStatus`;

    const body = requestBody({
      UserIds: this.parameters.UserIds,
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

  async parseResponse(response: Response): Promise<msdyn_WKWGDPRDeleteStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_WKWGDPRDeleteStatusResponse;
  }
}
