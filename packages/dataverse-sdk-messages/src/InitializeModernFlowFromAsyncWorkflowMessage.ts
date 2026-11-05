import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { workflow } from "./types/index.js";

/**
 * InitializeModernFlowFromAsyncWorkflow request message
 *
 * Web API Action: InitializeModernFlowFromAsyncWorkflow
 */
export class InitializeModernFlowFromAsyncWorkflowRequest
  extends OrganizationRequest
  implements Executable<InitializeModernFlowFromAsyncWorkflowResponse>
{
  constructor(public workflowId: string) {
    super("InitializeModernFlowFromAsyncWorkflow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.InitializeModernFlowFromAsyncWorkflow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<InitializeModernFlowFromAsyncWorkflowResponse> {
    const data = await response.json();
    return InitializeModernFlowFromAsyncWorkflowResponse.fromResponse(data);
  }
}

/**
 * InitializeModernFlowFromAsyncWorkflow response message
 */
export class InitializeModernFlowFromAsyncWorkflowResponse extends OrganizationResponse {
  constructor(public result: workflow) {
    super("InitializeModernFlowFromAsyncWorkflow");
  }

  static fromResponse(data: unknown): InitializeModernFlowFromAsyncWorkflowResponse {
    return new InitializeModernFlowFromAsyncWorkflowResponse(responseObject<workflow>(data));
  }
}
