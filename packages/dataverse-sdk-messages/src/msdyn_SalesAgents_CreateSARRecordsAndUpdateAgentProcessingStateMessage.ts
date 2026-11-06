import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_SARRecordsToCreate: string,
    public msdyn_SalesAgentType: number
  ) {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SARRecordsToCreate: this.msdyn_SARRecordsToCreate,
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
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse();
  }
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState response message
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingState");
  }

  static fromResponse(
    _data: unknown
  ): msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse {
    return new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse();
  }
}
