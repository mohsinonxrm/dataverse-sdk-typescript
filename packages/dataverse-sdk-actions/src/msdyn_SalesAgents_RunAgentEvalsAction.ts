import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_RunAgentEvals action
 */
export interface msdyn_SalesAgents_RunAgentEvalsResponse {
  msdyn_Success: boolean;
}

/**
 * msdyn_SalesAgents_RunAgentEvals action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_RunAgentEvalsAction implements Executable<msdyn_SalesAgents_RunAgentEvalsResponse> {
  constructor(
    public readonly msdyn_MicroAgent: string,
    public readonly msdyn_AgentOutput: string,
    public readonly msdyn_AgentInput: string,
    public readonly msdyn_SalesAgent: string,
    public readonly msdyn_OrchestrationId: string,
    public readonly msdyn_RecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_RunAgentEvals`;

    const body: Record<string, unknown> = {
      msdyn_MicroAgent: this.msdyn_MicroAgent,
      msdyn_AgentOutput: this.msdyn_AgentOutput,
      msdyn_AgentInput: this.msdyn_AgentInput,
      msdyn_SalesAgent: this.msdyn_SalesAgent,
      msdyn_OrchestrationId: this.msdyn_OrchestrationId,
      msdyn_RecordId: this.msdyn_RecordId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_RunAgentEvalsResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_RunAgentEvalsResponse;
  }
}
