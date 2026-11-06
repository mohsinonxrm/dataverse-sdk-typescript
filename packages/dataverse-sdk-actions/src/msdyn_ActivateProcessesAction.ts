import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ActivateProcesses action
 */
export interface msdyn_ActivateProcessesResponse {
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * Parameters of the msdyn_ActivateProcesses action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateProcessesActionParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ActivateProcesses action
 *
 * Unbound action
 */
export class msdyn_ActivateProcessesAction implements Executable<msdyn_ActivateProcessesResponse> {
  constructor(public readonly parameters: msdyn_ActivateProcessesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateProcesses`;

    const body = requestBody({
      AnalysisResult: this.parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateProcessesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ActivateProcessesResponse;
    return (await response.json()) as msdyn_ActivateProcessesResponse;
  }
}
