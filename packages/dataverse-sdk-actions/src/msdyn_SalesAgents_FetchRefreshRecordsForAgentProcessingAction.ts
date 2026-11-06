import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingActionParameters {
  msdyn_AgentProfileId?: string;
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_Top: this.parameters.msdyn_Top,
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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return (
      (await response.json()) as {
        value: msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse;
      }
    ).value;
  }
}
