import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_analysisjob } from "./types/index.js";

/**
 * Response from the msdyn_CreateNewAnalysisJob action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateNewAnalysisJobResponse =
  | (msdyn_analysisjob & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_CreateNewAnalysisJobResponse;
  }
}
