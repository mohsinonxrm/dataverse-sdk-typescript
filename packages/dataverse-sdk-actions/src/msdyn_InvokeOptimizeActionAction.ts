import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeOptimizeAction action
 */
export interface msdyn_InvokeOptimizeActionResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InvokeOptimizeActionResponse;
    return (await response.json()) as msdyn_InvokeOptimizeActionResponse;
  }
}
