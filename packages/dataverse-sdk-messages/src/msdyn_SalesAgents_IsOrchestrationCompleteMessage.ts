import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_IsOrchestrationComplete request message
 *
 * Web API Action: msdyn_SalesAgents_IsOrchestrationComplete
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_IsOrchestrationCompleteResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_AgentType: number,
    public msdyn_SalesAgentType: number
  ) {
    super("msdyn_SalesAgents_IsOrchestrationComplete");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOrchestrationComplete`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_AgentType: this.msdyn_AgentType,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_IsOrchestrationCompleteResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_IsOrchestrationCompleteResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_AgentType: this.msdyn_AgentType,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
    };
  }
}

/**
 * msdyn_SalesAgents_IsOrchestrationComplete response message
 */
export class msdyn_SalesAgents_IsOrchestrationCompleteResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_IsOrchestrationCompleteResponse) {
    super("msdyn_SalesAgents_IsOrchestrationComplete");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_IsOrchestrationCompleteResponse {
    return new msdyn_SalesAgents_IsOrchestrationCompleteResponse((data as any).value);
  }
}
