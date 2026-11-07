import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing response message
 *
 * `result` is the value the msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action returns (see {@link msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResult}).
 */
export class msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResult) {
    super("msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse {
    return new msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse(
      data === undefined
        ? []
        : (data as { value: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResult }).value
    );
  }
}
