import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RestartUniqueNumberWorkflow action
 */
export interface msdyn_RestartUniqueNumberWorkflowResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * msdyn_RestartUniqueNumberWorkflow action
 *
 * Unbound action
 */
export class msdyn_RestartUniqueNumberWorkflowAction implements Executable<msdyn_RestartUniqueNumberWorkflowResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartUniqueNumberWorkflow`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

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
    const data = await response.json();
    return data as msdyn_RestartUniqueNumberWorkflowResponse;
  }
}
