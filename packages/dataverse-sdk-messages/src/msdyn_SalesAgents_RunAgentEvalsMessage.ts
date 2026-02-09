import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_RunAgentEvals request message
 *
 * Web API Action: msdyn_SalesAgents_RunAgentEvals
 */
export class msdyn_SalesAgents_RunAgentEvalsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_RunAgentEvalsResponse>
{
  constructor(
    public msdyn_MicroAgent: string,
    public msdyn_AgentOutput: string,
    public msdyn_AgentInput: string,
    public msdyn_SalesAgent: string,
    public msdyn_OrchestrationId: string,
    public msdyn_RecordId: string
  ) {
    super("msdyn_SalesAgents_RunAgentEvals");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_RunAgentEvalsResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_RunAgentEvalsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_MicroAgent: this.msdyn_MicroAgent,
      msdyn_AgentOutput: this.msdyn_AgentOutput,
      msdyn_AgentInput: this.msdyn_AgentInput,
      msdyn_SalesAgent: this.msdyn_SalesAgent,
      msdyn_OrchestrationId: this.msdyn_OrchestrationId,
      msdyn_RecordId: this.msdyn_RecordId,
    };
  }
}

/**
 * msdyn_SalesAgents_RunAgentEvals response message
 */
export class msdyn_SalesAgents_RunAgentEvalsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_RunAgentEvalsResponse) {
    super("msdyn_SalesAgents_RunAgentEvals");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_RunAgentEvalsResponse {
    return new msdyn_SalesAgents_RunAgentEvalsResponse((data as any).value);
  }
}
