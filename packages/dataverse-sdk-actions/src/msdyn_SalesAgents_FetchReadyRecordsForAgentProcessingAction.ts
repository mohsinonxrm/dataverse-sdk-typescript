import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action
 */
export interface msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse;
    return (await response.json()) as msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse;
  }
}
