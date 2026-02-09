import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_CompleteOrchestration request message
 *
 * Web API Action: msdyn_SalesAgents_CompleteOrchestration
 */
export class msdyn_SalesAgents_CompleteOrchestrationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CompleteOrchestrationResponse>
{
  constructor(
    public msdyn_SarRecordId: string,
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentType: number
  ) {
    super("msdyn_SalesAgents_CompleteOrchestration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CompleteOrchestration`;

    const body: Record<string, unknown> = {
      msdyn_SarRecordId: this.msdyn_SarRecordId,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_CompleteOrchestrationResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CompleteOrchestrationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SarRecordId: this.msdyn_SarRecordId,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
    };
  }
}

/**
 * msdyn_SalesAgents_CompleteOrchestration response message
 */
export class msdyn_SalesAgents_CompleteOrchestrationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CompleteOrchestration");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_CompleteOrchestrationResponse {
    return new msdyn_SalesAgents_CompleteOrchestrationResponse();
  }
}
