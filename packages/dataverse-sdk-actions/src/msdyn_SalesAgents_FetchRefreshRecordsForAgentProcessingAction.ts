import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action
 */
export interface msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingActionParameters {
  msdyn_Top?: number;
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
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
      msdyn_Top: this.parameters.msdyn_Top,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse;
  }
}
