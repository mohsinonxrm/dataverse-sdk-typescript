import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_RunAgentEvals action
 */
export interface msdyn_SalesAgents_RunAgentEvalsResponse {
  msdyn_Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_RunAgentEvals action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_RunAgentEvalsActionParameters {
  msdyn_MicroAgent: string;
  msdyn_AgentOutput: string;
  msdyn_AgentInput: string;
  msdyn_SalesAgent: string;
  msdyn_OrchestrationId: string;
  msdyn_RecordId: string;
}

/**
 * msdyn_SalesAgents_RunAgentEvals action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_RunAgentEvalsAction implements Executable<msdyn_SalesAgents_RunAgentEvalsResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_RunAgentEvalsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_RunAgentEvals`;

    const body = requestBody({
      msdyn_MicroAgent: this.parameters.msdyn_MicroAgent,
      msdyn_AgentOutput: this.parameters.msdyn_AgentOutput,
      msdyn_AgentInput: this.parameters.msdyn_AgentInput,
      msdyn_SalesAgent: this.parameters.msdyn_SalesAgent,
      msdyn_OrchestrationId: this.parameters.msdyn_OrchestrationId,
      msdyn_RecordId: this.parameters.msdyn_RecordId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_RunAgentEvalsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesAgents_RunAgentEvalsResponse;
  }
}
