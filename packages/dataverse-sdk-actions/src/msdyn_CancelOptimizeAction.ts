import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CancelOptimize action
 */
export interface msdyn_CancelOptimizeResponse {
  msdyn_Response: string;
  msdyn_Restored: string;
  msdyn_Status: string;
}

/**
 * Parameters of the msdyn_CancelOptimize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelOptimizeActionParameters {
  msdyn_RunId: string;
}

/**
 * msdyn_CancelOptimize action
 *
 * Unbound action
 */
export class msdyn_CancelOptimizeAction implements Executable<msdyn_CancelOptimizeResponse> {
  constructor(public readonly parameters: msdyn_CancelOptimizeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelOptimize`;

    const body = requestBody({
      msdyn_RunId: this.parameters.msdyn_RunId,
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

  async parseResponse(response: Response): Promise<msdyn_CancelOptimizeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CancelOptimizeResponse;
    return (await response.json()) as msdyn_CancelOptimizeResponse;
  }
}
