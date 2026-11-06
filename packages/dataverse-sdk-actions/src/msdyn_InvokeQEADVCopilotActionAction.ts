import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_InvokeQEADVCopilotAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeQEADVCopilotActionResponse {
  "@odata.context"?: string;
  msdyn_invokeqeadvcopilotactionresponse: string;
}

/**
 * Parameters of the msdyn_InvokeQEADVCopilotAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeQEADVCopilotActionActionParameters {
  action: string;
}

/**
 * msdyn_InvokeQEADVCopilotAction action
 *
 * Unbound action
 */
export class msdyn_InvokeQEADVCopilotActionAction implements Executable<msdyn_InvokeQEADVCopilotActionResponse> {
  constructor(public readonly parameters: msdyn_InvokeQEADVCopilotActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeQEADVCopilotAction`;

    const body = requestBody({
      action: this.parameters.action,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeQEADVCopilotActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_InvokeQEADVCopilotActionResponse;
  }
}
