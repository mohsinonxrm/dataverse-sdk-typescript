import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AITestRun action
 */
export interface msdyn_AITestRunResponse {
  response: string;
}

/**
 * Parameters of the msdyn_AITestRun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AITestRunActionParameters {
  request: string;
}

/**
 * msdyn_AITestRun action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aitestcase)
 *
 * The first argument is the id of the msdyn_aitestcase record to call it on.
 */
export class msdyn_AITestRunAction implements Executable<msdyn_AITestRunResponse> {
  constructor(
    public readonly msdyn_aitestcaseId: string,
    public readonly parameters: msdyn_AITestRunActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aitestcases(${this.msdyn_aitestcaseId})/Microsoft.Dynamics.CRM.msdyn_AITestRun`;

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

  async parseResponse(response: Response): Promise<msdyn_AITestRunResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AITestRunResponse;
    return (await response.json()) as msdyn_AITestRunResponse;
  }
}
