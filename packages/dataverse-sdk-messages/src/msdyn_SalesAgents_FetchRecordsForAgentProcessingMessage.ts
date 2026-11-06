import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse as msdyn_SalesAgents_FetchRecordsForAgentProcessingResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchRecordsForAgentProcessing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters {
  msdyn_AgentProfileId?: string;
  msdyn_NextLink?: string;
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters) {
    super("msdyn_SalesAgents_FetchRecordsForAgentProcessing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_NextLink: this.Parameters.msdyn_NextLink,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse.fromResponse({});
    return msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing response message
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchRecordsForAgentProcessingResponseData) {
    super("msdyn_SalesAgents_FetchRecordsForAgentProcessing");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse(
      responseObject<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponseData>(data)
    );
  }
}
