import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from pm_CreateProcess action
 */
export interface pm_CreateProcessResponse {
  processId: string;
}

/**
 * Parameters of the pm_CreateProcess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pm_CreateProcessActionParameters {
  reportData?: string;
  inputDataBinding: string;
  name: string;
  description?: string;
}

/**
 * pm_CreateProcess action
 *
 * Unbound action
 */
export class pm_CreateProcessAction implements Executable<pm_CreateProcessResponse> {
  constructor(public readonly parameters: pm_CreateProcessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pm_CreateProcess`;

    const body = requestBody({
      reportData: this.parameters.reportData,
      inputDataBinding: this.parameters.inputDataBinding,
      name: this.parameters.name,
      description: this.parameters.description,
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

  async parseResponse(response: Response): Promise<pm_CreateProcessResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as pm_CreateProcessResponse;
    return (await response.json()) as pm_CreateProcessResponse;
  }
}
