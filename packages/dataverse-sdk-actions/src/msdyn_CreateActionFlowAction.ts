import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateActionFlow action
 */
export interface msdyn_CreateActionFlowResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CreateActionFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateActionFlowActionParameters {
  SLAId: string;
}

/**
 * msdyn_CreateActionFlow action
 *
 * Unbound action
 */
export class msdyn_CreateActionFlowAction implements Executable<msdyn_CreateActionFlowResponse> {
  constructor(public readonly parameters: msdyn_CreateActionFlowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateActionFlow`;

    const body = requestBody({
      SLAId: this.parameters.SLAId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateActionFlowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateActionFlowResponse;
    return (await response.json()) as msdyn_CreateActionFlowResponse;
  }
}
