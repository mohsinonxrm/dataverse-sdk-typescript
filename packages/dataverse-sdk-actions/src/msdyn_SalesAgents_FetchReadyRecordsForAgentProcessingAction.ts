import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action
 */
export interface msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse {
  value: EntityReference[];
}

/**
 * msdyn_SalesAgents_FetchReadyRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse> {
  constructor(
    public readonly msdyn_SalesAgentType: number,
    public readonly msdyn_Top?: number,
    public readonly msdyn_TrackingId?: string
  ) {}

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
    return data as msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse;
  }
}
