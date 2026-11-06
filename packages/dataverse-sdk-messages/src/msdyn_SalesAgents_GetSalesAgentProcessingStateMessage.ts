import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetSalesAgentProcessingState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters {
  msdyn_SalesAgentType: number;
  msdyn_AgentProfileId?: string;
  msdyn_RecordId: string;
}

/**
 * msdyn_SalesAgents_GetSalesAgentProcessingState request message
 *
 * Web API Action: msdyn_SalesAgents_GetSalesAgentProcessingState
 */
export class msdyn_SalesAgents_GetSalesAgentProcessingStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetSalesAgentProcessingStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters) {
    super("msdyn_SalesAgents_GetSalesAgentProcessingState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesAgentProcessingState`;

    const body = requestBody({
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_RecordId: this.Parameters.msdyn_RecordId,
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
  ): Promise<msdyn_SalesAgents_GetSalesAgentProcessingStateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetSalesAgentProcessingStateResponse.fromResponse({});
    return msdyn_SalesAgents_GetSalesAgentProcessingStateResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_GetSalesAgentProcessingState response message
 */
export class msdyn_SalesAgents_GetSalesAgentProcessingStateResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_SalesAgents_GetSalesAgentProcessingState");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetSalesAgentProcessingStateResponse {
    return new msdyn_SalesAgents_GetSalesAgentProcessingStateResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
