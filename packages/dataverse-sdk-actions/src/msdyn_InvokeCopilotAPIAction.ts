import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_InvokeCopilotAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeCopilotAPIResponse {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_InvokeCopilotAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeCopilotAPIActionParameters {
  msdyn_APIName: string;
  msdyn_payload: string;
}

/**
 * msdyn_InvokeCopilotAPI action
 *
 * Unbound action
 */
export class msdyn_InvokeCopilotAPIAction implements Executable<msdyn_InvokeCopilotAPIResponse> {
  constructor(public readonly parameters: msdyn_InvokeCopilotAPIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeCopilotAPI`;

    const body = requestBody({
      msdyn_APIName: this.parameters.msdyn_APIName,
      msdyn_payload: this.parameters.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeCopilotAPIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_InvokeCopilotAPIResponse;
  }
}
