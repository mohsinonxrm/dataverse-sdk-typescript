import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeQEADVCopilotAction action
 */
export interface msdyn_InvokeQEADVCopilotActionResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InvokeQEADVCopilotActionResponse;
    return (await response.json()) as msdyn_InvokeQEADVCopilotActionResponse;
  }
}
