import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_RestartAgreementRelatedWorkflowResponse as msdyn_RestartAgreementRelatedWorkflowResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RestartAgreementRelatedWorkflowResponse> {
    const data = await response.json();
    return msdyn_RestartAgreementRelatedWorkflowResponse.fromResponse(data);
  }
}

/**
 * msdyn_RestartAgreementRelatedWorkflow response message
 */
export class msdyn_RestartAgreementRelatedWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_RestartAgreementRelatedWorkflowResponseData) {
    super("msdyn_RestartAgreementRelatedWorkflow");
  }

  static fromResponse(data: unknown): msdyn_RestartAgreementRelatedWorkflowResponse {
    return new msdyn_RestartAgreementRelatedWorkflowResponse(
      responseObject<msdyn_RestartAgreementRelatedWorkflowResponseData>(data)
    );
  }
}
