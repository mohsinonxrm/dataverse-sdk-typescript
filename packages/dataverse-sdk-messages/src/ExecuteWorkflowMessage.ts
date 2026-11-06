import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { InputArgumentCollection, asyncoperation } from "./types/index.js";

/**
 * Parameters of the ExecuteWorkflow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteWorkflowRequestParameters {
  EntityId: string;
  InputArguments?: InputArgumentCollection;
}

/**
 * ExecuteWorkflow request message
 *
 * Web API Action: ExecuteWorkflow
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ExecuteWorkflowRequest
  extends OrganizationRequest
  implements Executable<ExecuteWorkflowResponse>
{
  declare readonly Parameters: Readonly<ExecuteWorkflowRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: ExecuteWorkflowRequestParameters
  ) {
    super("ExecuteWorkflow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
      InputArguments: this.Parameters.InputArguments,
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

  async parseResponse(response: Response): Promise<ExecuteWorkflowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ExecuteWorkflowResponse.fromResponse({});
    return ExecuteWorkflowResponse.fromResponse(await response.json());
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
