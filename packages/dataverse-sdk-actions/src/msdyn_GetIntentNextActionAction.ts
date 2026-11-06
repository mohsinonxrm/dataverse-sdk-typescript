import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetIntentNextAction action
 */
export interface msdyn_GetIntentNextActionResponse {
  IntentNextActionResponse: string;
}

/**
 * Parameters of the msdyn_GetIntentNextAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIntentNextActionActionParameters {
  IntentNextActionRequest: string;
}

/**
 * msdyn_GetIntentNextAction action
 *
 * Unbound action
 */
export class msdyn_GetIntentNextActionAction implements Executable<msdyn_GetIntentNextActionResponse> {
  constructor(public readonly parameters: msdyn_GetIntentNextActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIntentNextAction`;

    const body = requestBody({
      IntentNextActionRequest: this.parameters.IntentNextActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetIntentNextActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetIntentNextActionResponse;
    return (await response.json()) as msdyn_GetIntentNextActionResponse;
  }
}
