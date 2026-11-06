import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RestartUniqueNumberWorkflow action
 */
export interface msdyn_RestartUniqueNumberWorkflowResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * Parameters of the msdyn_RestartUniqueNumberWorkflow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RestartUniqueNumberWorkflowActionParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_RestartUniqueNumberWorkflow action
 *
 * Unbound action
 */
export class msdyn_RestartUniqueNumberWorkflowAction implements Executable<msdyn_RestartUniqueNumberWorkflowResponse> {
  constructor(public readonly parameters: msdyn_RestartUniqueNumberWorkflowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartUniqueNumberWorkflow`;

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

  async parseResponse(response: Response): Promise<msdyn_RestartUniqueNumberWorkflowResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RestartUniqueNumberWorkflowResponse;
  }
}
