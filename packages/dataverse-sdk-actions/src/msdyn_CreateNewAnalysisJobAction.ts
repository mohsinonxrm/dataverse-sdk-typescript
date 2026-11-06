import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_analysisjob } from "./types/index.js";

/**
 * Response from msdyn_CreateNewAnalysisJob action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_CreateNewAnalysisJobResponse extends msdyn_analysisjob {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the msdyn_CreateNewAnalysisJob action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateNewAnalysisJobActionParameters {
  ComponentInstances?: Record<string, unknown>[];
}

/**
 * msdyn_CreateNewAnalysisJob action
 *
 * Unbound action
 */
export class msdyn_CreateNewAnalysisJobAction implements Executable<msdyn_CreateNewAnalysisJobResponse> {
  constructor(public readonly parameters: msdyn_CreateNewAnalysisJobActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJob`;

    const body = requestBody({
      ComponentInstances: this.parameters.ComponentInstances,
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

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateNewAnalysisJobResponse;
  }
}
