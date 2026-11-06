import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_Top?: number;
  msdyn_SalesAgentType: number;
  msdyn_AgentProfileIds?: string;
}

/**
 * msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequestParameters) {
    super("msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_Top: this.Parameters.msdyn_Top,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_AgentProfileIds: this.Parameters.msdyn_AgentProfileIds,
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
  ): Promise<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse.fromResponse({});
    return msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing response message
 */
export class msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
