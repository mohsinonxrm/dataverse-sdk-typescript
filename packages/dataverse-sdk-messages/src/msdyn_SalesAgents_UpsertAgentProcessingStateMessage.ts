import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_UpsertAgentProcessingState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_UpsertAgentProcessingStateRequestParameters {
  msdyn_Records: Record<string, unknown>[];
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_SkipVersionNumberUpdate?: boolean;
}

/**
 * msdyn_SalesAgents_UpsertAgentProcessingState request message
 *
 * Web API Action: msdyn_SalesAgents_UpsertAgentProcessingState
 */
export class msdyn_SalesAgents_UpsertAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_UpsertAgentProcessingStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_UpsertAgentProcessingStateRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_UpsertAgentProcessingStateRequestParameters) {
    super("msdyn_SalesAgents_UpsertAgentProcessingState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_UpsertAgentProcessingState`;

    const body = requestBody({
      msdyn_Records: this.Parameters.msdyn_Records,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SkipVersionNumberUpdate: this.Parameters.msdyn_SkipVersionNumberUpdate,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_UpsertAgentProcessingStateResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_UpsertAgentProcessingStateResponse();
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
