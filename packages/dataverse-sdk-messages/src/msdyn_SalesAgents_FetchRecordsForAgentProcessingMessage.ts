import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse as msdyn_SalesAgents_FetchRecordsForAgentProcessingResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse>
{
  constructor(
    public msdyn_Top: number,
    public msdyn_SalesAgentType: number,
    public msdyn_NextLink: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_FetchRecordsForAgentProcessing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRecordsForAgentProcessing`;

    const body: Record<string, unknown> = {
      msdyn_Top: this.msdyn_Top,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_NextLink: this.msdyn_NextLink,
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
  ): Promise<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse.fromResponse(data);
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
