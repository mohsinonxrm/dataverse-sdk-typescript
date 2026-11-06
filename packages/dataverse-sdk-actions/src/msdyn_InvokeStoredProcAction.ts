import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InvokeStoredProc action
 */
export interface msdyn_InvokeStoredProcResponse {
  output: string;
}

/**
 * Parameters of the msdyn_InvokeStoredProc action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeStoredProcActionParameters {
  ProcId: number;
  BatchSize: number;
  BatchStart: number;
  AdminUserId: string;
  StringParam: string;
}

/**
 * msdyn_InvokeStoredProc action
 *
 * Unbound action
 */
export class msdyn_InvokeStoredProcAction implements Executable<msdyn_InvokeStoredProcResponse> {
  constructor(public readonly parameters: msdyn_InvokeStoredProcActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeStoredProc`;

    const body = requestBody({
      ProcId: this.parameters.ProcId,
      BatchSize: this.parameters.BatchSize,
      BatchStart: this.parameters.BatchStart,
      AdminUserId: this.parameters.AdminUserId,
      StringParam: this.parameters.StringParam,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeStoredProcResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_InvokeStoredProcResponse;
  }
}
