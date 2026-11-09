import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExecuteSandboxRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteSandboxRequestResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_ExecuteSandboxRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSandboxRequestActionParameters {
  MethodName: string;
  MethodParams?: string;
}

/**
 * msdyn_ExecuteSandboxRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteSandboxRequestAction implements Executable<msdyn_ExecuteSandboxRequestResponse> {
  constructor(public readonly parameters: msdyn_ExecuteSandboxRequestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSandboxRequest`;

    const body = requestBody({
      MethodName: this.parameters.MethodName,
      MethodParams: this.parameters.MethodParams,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSandboxRequestResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ExecuteSandboxRequestResponse;
  }
}
