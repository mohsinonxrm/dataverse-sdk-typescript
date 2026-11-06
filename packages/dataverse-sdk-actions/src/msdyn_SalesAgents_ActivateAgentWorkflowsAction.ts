import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_ActivateAgentWorkflows action
 */
export interface msdyn_SalesAgents_ActivateAgentWorkflowsResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_ActivateAgentWorkflows action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ActivateAgentWorkflowsActionParameters {
  msdyn_AgentName: string;
}

/**
 * msdyn_SalesAgents_ActivateAgentWorkflows action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ActivateAgentWorkflowsAction implements Executable<msdyn_SalesAgents_ActivateAgentWorkflowsResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ActivateAgentWorkflowsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ActivateAgentWorkflows`;

    const body = requestBody({
      msdyn_AgentName: this.parameters.msdyn_AgentName,
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
    if (response.status === 204) return {} as msdyn_SalesAgents_ActivateAgentWorkflowsResponse;
    return (await response.json()) as msdyn_SalesAgents_ActivateAgentWorkflowsResponse;
  }
}
