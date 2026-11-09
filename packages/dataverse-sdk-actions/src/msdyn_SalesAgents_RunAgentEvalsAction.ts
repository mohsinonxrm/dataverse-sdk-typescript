import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_RunAgentEvals action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_RunAgentEvalsResponse {
  "@odata.context"?: string;
  msdyn_Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_RunAgentEvals action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_RunAgentEvalsActionParameters {
  msdyn_MicroAgent: string;
  msdyn_OrchestrationId: string;
  msdyn_SalesAgent: string;
  msdyn_RecordId: string;
  msdyn_AgentInput: string;
  msdyn_AgentOutput: string;
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
      msdyn_OrchestrationId: this.parameters.msdyn_OrchestrationId,
      msdyn_SalesAgent: this.parameters.msdyn_SalesAgent,
      msdyn_RecordId: this.parameters.msdyn_RecordId,
      msdyn_AgentInput: this.parameters.msdyn_AgentInput,
      msdyn_AgentOutput: this.parameters.msdyn_AgentOutput,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_RunAgentEvalsResponse;
  }
}
