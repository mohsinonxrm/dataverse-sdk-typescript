import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutoCaseClosureAgentCompleteSna action
 */
export interface msdyn_AutoCaseClosureAgentCompleteSnaResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AutoCaseClosureAgentCompleteSna action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoCaseClosureAgentCompleteSnaActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_AutoCaseClosureAgentCompleteSna action
 *
 * Unbound action
 */
export class msdyn_AutoCaseClosureAgentCompleteSnaAction implements Executable<msdyn_AutoCaseClosureAgentCompleteSnaResponse> {
  constructor(public readonly parameters: msdyn_AutoCaseClosureAgentCompleteSnaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentCompleteSna`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_AutoCaseClosureAgentCompleteSnaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AutoCaseClosureAgentCompleteSnaResponse;
    return (await response.json()) as msdyn_AutoCaseClosureAgentCompleteSnaResponse;
  }
}
