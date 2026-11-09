import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_BulkAITestRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_BulkAITestRunResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the msdyn_BulkAITestRun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BulkAITestRunActionParameters {
  request: string;
}

/**
 * msdyn_BulkAITestRun action
 *
 * Unbound action
 */
export class msdyn_BulkAITestRunAction implements Executable<msdyn_BulkAITestRunResponse> {
  constructor(public readonly parameters: msdyn_BulkAITestRunActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestRun`;

    const body = requestBody({
      request: this.parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestRunResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_BulkAITestRunResponse;
  }
}
