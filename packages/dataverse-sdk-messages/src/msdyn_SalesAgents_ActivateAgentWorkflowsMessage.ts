import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_ActivateAgentWorkflowsResponse as msdyn_SalesAgents_ActivateAgentWorkflowsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_ActivateAgentWorkflowsResponse.fromResponse({});
    return msdyn_SalesAgents_ActivateAgentWorkflowsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_ActivateAgentWorkflows response message
 */
export class msdyn_SalesAgents_ActivateAgentWorkflowsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ActivateAgentWorkflowsResponseData) {
    super("msdyn_SalesAgents_ActivateAgentWorkflows");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ActivateAgentWorkflowsResponse {
    return new msdyn_SalesAgents_ActivateAgentWorkflowsResponse(
      responseObject<msdyn_SalesAgents_ActivateAgentWorkflowsResponseData>(data)
    );
  }
}
