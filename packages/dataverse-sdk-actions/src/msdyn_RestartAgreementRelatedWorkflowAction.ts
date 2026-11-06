import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RestartAgreementRelatedWorkflow action
 */
export interface msdyn_RestartAgreementRelatedWorkflowResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * Parameters of the msdyn_RestartAgreementRelatedWorkflow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RestartAgreementRelatedWorkflowActionParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_RestartAgreementRelatedWorkflow action
 *
 * Unbound action
 */
export class msdyn_RestartAgreementRelatedWorkflowAction implements Executable<msdyn_RestartAgreementRelatedWorkflowResponse> {
  constructor(public readonly parameters: msdyn_RestartAgreementRelatedWorkflowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartAgreementRelatedWorkflow`;

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

  async parseResponse(response: Response): Promise<msdyn_RestartAgreementRelatedWorkflowResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RestartAgreementRelatedWorkflowResponse;
  }
}
