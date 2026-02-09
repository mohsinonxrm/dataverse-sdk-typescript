import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_UpsertAgentProcessingState request message
 *
 * Web API Action: msdyn_SalesAgents_UpsertAgentProcessingState
 */
export class msdyn_SalesAgents_UpsertAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_UpsertAgentProcessingStateResponse>
{
  constructor(
    public msdyn_Records: Record<string, unknown>[],
    public msdyn_SalesAgentType: number,
    public msdyn_TrackingId: string,
    public msdyn_SkipVersionNumberUpdate: boolean
  ) {
    super("msdyn_SalesAgents_UpsertAgentProcessingState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_UpsertAgentProcessingState`;

    const body: Record<string, unknown> = {
      msdyn_Records: this.msdyn_Records,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SkipVersionNumberUpdate: this.msdyn_SkipVersionNumberUpdate,
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
  ): Promise<msdyn_SalesAgents_UpsertAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_UpsertAgentProcessingStateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Records: this.msdyn_Records,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SkipVersionNumberUpdate: this.msdyn_SkipVersionNumberUpdate,
    };
  }
}

/**
 * msdyn_SalesAgents_UpsertAgentProcessingState response message
 */
export class msdyn_SalesAgents_UpsertAgentProcessingStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_UpsertAgentProcessingState");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_UpsertAgentProcessingStateResponse {
    return new msdyn_SalesAgents_UpsertAgentProcessingStateResponse();
  }
}
