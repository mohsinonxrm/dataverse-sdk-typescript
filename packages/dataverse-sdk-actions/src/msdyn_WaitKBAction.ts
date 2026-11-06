import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_WaitKB action
 */
export interface msdyn_WaitKBResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_WaitKBResponse;
    return (await response.json()) as msdyn_WaitKBResponse;
  }
}
