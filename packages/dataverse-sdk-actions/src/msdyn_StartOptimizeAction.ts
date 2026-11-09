import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_StartOptimize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_StartOptimizeResponse {
  "@odata.context"?: string;
  msdyn_Response: string;
  msdyn_RunId: string;
  msdyn_Status: string;
}

/**
 * Parameters of the msdyn_StartOptimize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartOptimizeActionParameters {
  msdyn_RunId: string;
}

/**
 * msdyn_StartOptimize action
 *
 * Unbound action
 */
export class msdyn_StartOptimizeAction implements Executable<msdyn_StartOptimizeResponse> {
  constructor(public readonly parameters: msdyn_StartOptimizeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartOptimize`;

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

  async parseResponse(response: Response): Promise<msdyn_StartOptimizeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_StartOptimizeResponse;
  }
}
