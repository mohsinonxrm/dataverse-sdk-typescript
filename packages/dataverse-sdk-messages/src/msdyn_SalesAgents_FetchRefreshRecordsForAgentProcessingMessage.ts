import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequestParameters {
  msdyn_AgentProfileId?: string;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequestParameters>;

  constructor(
    parameters: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequestParameters
  ) {
    super("msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_Top: this.Parameters.msdyn_Top,
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
  ): Promise<msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse.fromResponse({});
    return msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing response message
 */
export class msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
