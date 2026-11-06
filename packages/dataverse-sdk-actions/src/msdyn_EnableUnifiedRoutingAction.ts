import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EnableUnifiedRouting action
 */
export interface msdyn_EnableUnifiedRoutingResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_EnableUnifiedRouting action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EnableUnifiedRoutingActionParameters {
  Enable: boolean;
}

/**
 * msdyn_EnableUnifiedRouting action
 *
 * Unbound action
 */
export class msdyn_EnableUnifiedRoutingAction implements Executable<msdyn_EnableUnifiedRoutingResponse> {
  constructor(public readonly parameters: msdyn_EnableUnifiedRoutingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableUnifiedRouting`;

    const body = requestBody({
      Enable: this.parameters.Enable,
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

  async parseResponse(response: Response): Promise<msdyn_EnableUnifiedRoutingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_EnableUnifiedRoutingResponse;
  }
}
