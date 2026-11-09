import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_ActivateAgentWorkflows message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateAgentWorkflowsRequestParameters {
  msdyn_AgentName: string;
}

/**
 * msdyn_SalesAgents_ActivateAgentWorkflows request message
 *
 * Web API Action: msdyn_SalesAgents_ActivateAgentWorkflows
 */
export class msdyn_SalesAgents_ActivateAgentWorkflowsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ActivateAgentWorkflowsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_ActivateAgentWorkflowsRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_ActivateAgentWorkflowsRequestParameters) {
    super("msdyn_SalesAgents_ActivateAgentWorkflows", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateAgentWorkflows`;

    const body = requestBody({
      msdyn_AgentName: this.Parameters.msdyn_AgentName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ActivateAgentWorkflowsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_ActivateAgentWorkflowsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_ActivateAgentWorkflows action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ActivateAgentWorkflowsResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesAgents_ActivateAgentWorkflows response message
 *
 * `result` is the value the msdyn_SalesAgents_ActivateAgentWorkflows action returns (see {@link msdyn_SalesAgents_ActivateAgentWorkflowsResult}).
 */
export class msdyn_SalesAgents_ActivateAgentWorkflowsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateAgentWorkflowsResult) {
    super("msdyn_SalesAgents_ActivateAgentWorkflows");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateAgentWorkflowsResponse {
    return new msdyn_SalesAgents_ActivateAgentWorkflowsResponse(
      data as msdyn_SalesAgents_ActivateAgentWorkflowsResult
    );
  }
}
