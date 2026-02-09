import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_RestartAgreementRelatedWorkflow request message
 *
 * Web API Action: msdyn_RestartAgreementRelatedWorkflow
 */
export class msdyn_RestartAgreementRelatedWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_RestartAgreementRelatedWorkflowResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_RestartAgreementRelatedWorkflow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartAgreementRelatedWorkflow`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RestartAgreementRelatedWorkflowResponse> {
    const data = await response.json();
    return msdyn_RestartAgreementRelatedWorkflowResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalysisResult: this.analysisResult,
    };
  }
}

/**
 * msdyn_RestartAgreementRelatedWorkflow response message
 */
export class msdyn_RestartAgreementRelatedWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_RestartAgreementRelatedWorkflowResponse) {
    super("msdyn_RestartAgreementRelatedWorkflow");
  }

  static fromResponse(data: unknown): msdyn_RestartAgreementRelatedWorkflowResponse {
    return new msdyn_RestartAgreementRelatedWorkflowResponse((data as any).value);
  }
}
