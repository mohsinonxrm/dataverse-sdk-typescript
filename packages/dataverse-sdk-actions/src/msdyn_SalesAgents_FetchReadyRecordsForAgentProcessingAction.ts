import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingActionParameters {
  msdyn_TrackingId?: string;
  msdyn_Top?: number;
  msdyn_SalesAgentType: number;
  msdyn_AgentProfileIds?: string;
}

/**
 * msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_Top: this.parameters.msdyn_Top,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_AgentProfileIds: this.parameters.msdyn_AgentProfileIds,
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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return (
      (await response.json()) as {
        value: msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse;
      }
    ).value;
  }
}
