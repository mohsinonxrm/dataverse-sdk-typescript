import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse.fromResponse(
        undefined
      );
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing response message
 *
 * `result` is the value the msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action returns (see {@link msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResult}).
 */
export class msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResult) {
    super("msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse(
      data === undefined
        ? []
        : (data as { value: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResult }).value
    );
  }
}
