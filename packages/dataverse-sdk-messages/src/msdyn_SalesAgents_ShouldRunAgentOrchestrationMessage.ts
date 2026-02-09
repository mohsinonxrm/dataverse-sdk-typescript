import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration request message
 *
 * Web API Action: msdyn_SalesAgents_ShouldRunAgentOrchestration
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse>
{
  constructor(
    public msdyn_SalesAgentType: number,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_ShouldRunAgentOrchestration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ShouldRunAgentOrchestration`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_SalesAgents_ShouldRunAgentOrchestration response message
 */
export class msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse) {
    super("msdyn_SalesAgents_ShouldRunAgentOrchestration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse {
    return new msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse((data as any).value);
  }
}
