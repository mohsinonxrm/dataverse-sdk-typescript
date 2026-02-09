import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_RestartUniqueNumberWorkflow request message
 *
 * Web API Action: msdyn_RestartUniqueNumberWorkflow
 */
export class msdyn_RestartUniqueNumberWorkflowRequest
  extends OrganizationRequest
  implements Executable<msdyn_RestartUniqueNumberWorkflowResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_RestartUniqueNumberWorkflow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestartUniqueNumberWorkflow`;

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

  async parseResponse(response: Response): Promise<msdyn_RestartUniqueNumberWorkflowResponse> {
    const data = await response.json();
    return msdyn_RestartUniqueNumberWorkflowResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalysisResult: this.analysisResult,
    };
  }
}

/**
 * msdyn_RestartUniqueNumberWorkflow response message
 */
export class msdyn_RestartUniqueNumberWorkflowResponse extends OrganizationResponse {
  constructor(public result: msdyn_RestartUniqueNumberWorkflowResponse) {
    super("msdyn_RestartUniqueNumberWorkflow");
  }

  static fromResponse(data: unknown): msdyn_RestartUniqueNumberWorkflowResponse {
    return new msdyn_RestartUniqueNumberWorkflowResponse((data as any).value);
  }
}
