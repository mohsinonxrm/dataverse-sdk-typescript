import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetIntentNextAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIntentNextActionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetIntentNextActionResponse;
  }
}
