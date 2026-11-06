import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse as msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_FetchSARRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchSARRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse>
{
  constructor(
    public msdyn_SalesAgentType: number,
    public msdyn_AgentType: number,
    public msdyn_TrackingId?: string,
    public msdyn_Top?: number
  ) {
    super("msdyn_SalesAgents_FetchSARRecordsForAgentProcessing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchSARRecordsForAgentProcessing`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_AgentType: this.msdyn_AgentType,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_Top: this.msdyn_Top,
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
  ): Promise<msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse.fromResponse(data);
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
