import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the pm_CreateProcess action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface pm_CreateProcessResponse {
  "@odata.context"?: string;
  processId: string;
}

/**
 * Parameters of the pm_CreateProcess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pm_CreateProcessActionParameters {
  reportData?: string;
  description?: string;
  name: string;
  inputDataBinding: string;
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
      description: this.parameters.description,
      name: this.parameters.name,
      inputDataBinding: this.parameters.inputDataBinding,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as pm_CreateProcessResponse;
  }
}
