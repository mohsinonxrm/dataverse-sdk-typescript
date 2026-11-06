import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_FetchRecordsForAgentProcessing action
 */
export interface msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse {
  msdyn_ODataNextLink: string;
  msdyn_Records: string;
}

/**
 * Parameters of the msdyn_SalesAgents_FetchRecordsForAgentProcessing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_FetchRecordsForAgentProcessingActionParameters {
  msdyn_AgentProfileId?: string;
  msdyn_NextLink?: string;
  msdyn_SalesAgentType: number;
  msdyn_TrackingId?: string;
  msdyn_Top?: number;
}

/**
 * msdyn_SalesAgents_FetchRecordsForAgentProcessing action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchRecordsForAgentProcessingAction implements Executable<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_FetchRecordsForAgentProcessingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchRecordsForAgentProcessing`;

    const body = requestBody({
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
      msdyn_NextLink: this.parameters.msdyn_NextLink,
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse;
    return (await response.json()) as msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse;
  }
}
