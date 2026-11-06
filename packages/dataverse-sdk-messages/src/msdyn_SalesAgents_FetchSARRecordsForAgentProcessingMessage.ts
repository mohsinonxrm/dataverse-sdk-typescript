import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse as msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_FetchSARRecordsForAgentProcessing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters {
  msdyn_SalesAgentType: number;
  msdyn_AgentType: number;
  msdyn_TrackingId?: string;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchSARRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters) {
    super("msdyn_SalesAgents_FetchSARRecordsForAgentProcessing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchSARRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_AgentType: this.Parameters.msdyn_AgentType,
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
  ): Promise<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse.fromResponse({});
    return msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing response message
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponseData) {
    super("msdyn_SalesAgents_FetchSARRecordsForAgentProcessing");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse(
      responseObject<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponseData>(data)
    );
  }
}
