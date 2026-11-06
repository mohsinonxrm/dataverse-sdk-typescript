import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse>
{
  constructor(
    public msdyn_Top: number,
    public msdyn_SalesAgentType: number,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing`;

    const body: Record<string, unknown> = {
      msdyn_Top: this.msdyn_Top,
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
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
  ): Promise<msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse.fromResponse(data);
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
