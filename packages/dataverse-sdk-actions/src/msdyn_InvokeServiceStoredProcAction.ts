import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeServiceStoredProc action
 */
export interface msdyn_InvokeServiceStoredProcResponse {
  output: string;
}

/**
 * Parameters of the msdyn_InvokeServiceStoredProc action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeServiceStoredProcActionParameters {
  ProcId: number;
  BatchSize: number;
  BatchStart: number;
}

/**
 * msdyn_InvokeServiceStoredProc action
 *
 * Unbound action
 */
export class msdyn_InvokeServiceStoredProcAction implements Executable<msdyn_InvokeServiceStoredProcResponse> {
  constructor(public readonly parameters: msdyn_InvokeServiceStoredProcActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeServiceStoredProc`;

    const body = requestBody({
      ProcId: this.parameters.ProcId,
      BatchSize: this.parameters.BatchSize,
      BatchStart: this.parameters.BatchStart,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeServiceStoredProcResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_InvokeServiceStoredProcResponse;
  }
}
