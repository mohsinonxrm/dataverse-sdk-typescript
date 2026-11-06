import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RouteToOperation action
 */
export interface msdyn_RouteToOperationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_RouteToOperation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RouteToOperationActionParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_RouteToOperation action
 *
 * Unbound action
 */
export class msdyn_RouteToOperationAction implements Executable<msdyn_RouteToOperationResponse> {
  constructor(public readonly parameters: msdyn_RouteToOperationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RouteToOperation`;

    const body = requestBody({
      LiveWorkItemId: this.parameters.LiveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_RouteToOperationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RouteToOperationResponse;
    return (await response.json()) as msdyn_RouteToOperationResponse;
  }
}
