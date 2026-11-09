import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CancelOptimize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelOptimizeResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CancelOptimizeResponse;
  }
}
