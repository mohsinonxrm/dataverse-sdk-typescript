import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing request message
 *
 * Web API Action: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing
 */
export class msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse>
{
  constructor(
    public msdyn_SalesAgentType: number,
    public msdyn_Top?: number,
    public msdyn_TrackingId?: string
  ) {
    super("msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_Top: this.msdyn_Top,
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
  ): Promise<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse.fromResponse(data);
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
