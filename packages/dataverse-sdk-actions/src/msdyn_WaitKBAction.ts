import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_WaitKB action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WaitKBResponse {
  "@odata.context"?: string;
  Response5: string;
}

/**
 * Parameters of the msdyn_WaitKB action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WaitKBActionParameters {
  Context?: string;
  JitterPercentage?: number;
  Delay: number;
}

/**
 * msdyn_WaitKB action
 *
 * Unbound action
 */
export class msdyn_WaitKBAction implements Executable<msdyn_WaitKBResponse> {
  constructor(public readonly parameters: msdyn_WaitKBActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WaitKB`;

    const body = requestBody({
      Context: this.parameters.Context,
      JitterPercentage: this.parameters.JitterPercentage,
      Delay: this.parameters.Delay,
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

  async parseResponse(response: Response): Promise<msdyn_WaitKBResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WaitKBResponse;
  }
}
