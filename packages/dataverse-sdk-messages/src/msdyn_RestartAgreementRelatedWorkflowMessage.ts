import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RestartAgreementRelatedWorkflowResponse as msdyn_RestartAgreementRelatedWorkflowResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RestartAgreementRelatedWorkflow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RestartAgreementRelatedWorkflowRequestParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_RestartAgreementRelatedWorkflow request message
 *
 * Web API Action: msdyn_RestartAgreementRelatedWorkflow
 */
export class msdyn_RestartAgreementRelatedWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_RestartAgreementRelatedWorkflowResponse>
{
  declare readonly Parameters: Readonly<msdyn_RestartAgreementRelatedWorkflowRequestParameters>;

  constructor(parameters: msdyn_RestartAgreementRelatedWorkflowRequestParameters) {
    super("msdyn_RestartAgreementRelatedWorkflow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartAgreementRelatedWorkflow`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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
    return msdyn_RestartAgreementRelatedWorkflowResponse.fromResponse(text ? JSON.parse(text) : {});
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
