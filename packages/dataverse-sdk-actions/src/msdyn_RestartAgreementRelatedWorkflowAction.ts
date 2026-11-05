import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RestartAgreementRelatedWorkflow action
 */
export interface msdyn_RestartAgreementRelatedWorkflowResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * msdyn_RestartAgreementRelatedWorkflow action
 *
 * Unbound action
 */
export class msdyn_RestartAgreementRelatedWorkflowAction implements Executable<msdyn_RestartAgreementRelatedWorkflowResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartAgreementRelatedWorkflow`;

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

  async parseResponse(response: Response): Promise<msdyn_RestartAgreementRelatedWorkflowResponse> {
    const data = await response.json();
    return data as msdyn_RestartAgreementRelatedWorkflowResponse;
  }
}
