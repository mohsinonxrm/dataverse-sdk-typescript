import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_InvokeOptimizeAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeOptimizeActionResponse {
  "@odata.context"?: string;
  Metadata: string;
  Result: string;
}

/**
 * Parameters of the msdyn_InvokeOptimizeAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeOptimizeActionActionParameters {
  Context?: string;
  RequestPayload: string;
  ActionType: string;
}

/**
 * msdyn_InvokeOptimizeAction action
 *
 * Unbound action
 */
export class msdyn_InvokeOptimizeActionAction implements Executable<msdyn_InvokeOptimizeActionResponse> {
  constructor(public readonly parameters: msdyn_InvokeOptimizeActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeOptimizeAction`;

    const body = requestBody({
      Context: this.parameters.Context,
      RequestPayload: this.parameters.RequestPayload,
      ActionType: this.parameters.ActionType,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeOptimizeActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_InvokeOptimizeActionResponse;
  }
}
