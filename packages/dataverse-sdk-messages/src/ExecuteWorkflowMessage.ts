import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { InputArgumentCollection, asyncoperation } from "./types/index.js";

/**
 * ExecuteWorkflow request message
 *
 * Web API Action: ExecuteWorkflow
 */
export class ExecuteWorkflowRequest
  extends OrganizationRequest
  implements Executable<ExecuteWorkflowResponse>
{
  constructor(
    public workflowId: string,
    public entityId: string,
    public inputArguments?: InputArgumentCollection
  ) {
    super("ExecuteWorkflow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;

    const body: Record<string, unknown> = {
      EntityId: this.entityId,
      InputArguments: this.inputArguments,
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

  async parseResponse(response: Response): Promise<ExecuteWorkflowResponse> {
    const data = await response.json();
    return ExecuteWorkflowResponse.fromResponse(data);
  }
}

/**
 * ExecuteWorkflow response message
 */
export class ExecuteWorkflowResponse extends OrganizationResponse {
  constructor(public result: asyncoperation) {
    super("ExecuteWorkflow");
  }

  static fromResponse(data: unknown): ExecuteWorkflowResponse {
    return new ExecuteWorkflowResponse(responseObject<asyncoperation>(data));
  }
}
