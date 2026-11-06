import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_CreateSARBasedOnPreviousAgent request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARBasedOnPreviousAgent
 */
export class msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse>
{
  constructor(
    public msdyn_SalesAgentType: number,
    public msdyn_PreviousSarRecordId: string,
    public msdyn_TrackingId?: string
  ) {
    super("msdyn_SalesAgents_CreateSARBasedOnPreviousAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARBasedOnPreviousAgent`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_PreviousSarRecordId: this.msdyn_PreviousSarRecordId,
      msdyn_TrackingId: this.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse();
  }
}

/**
 * msdyn_SalesAgents_CreateSARBasedOnPreviousAgent response message
 */
export class msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CreateSARBasedOnPreviousAgent");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse {
    return new msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse();
  }
}
