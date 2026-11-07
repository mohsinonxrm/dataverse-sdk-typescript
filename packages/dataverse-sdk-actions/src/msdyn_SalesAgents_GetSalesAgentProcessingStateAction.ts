import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_GetSalesAgentProcessingState action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_SalesAgents_GetSalesAgentProcessingStateResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the msdyn_SalesAgents_GetSalesAgentProcessingState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetSalesAgentProcessingStateActionParameters {
  msdyn_SalesAgentType: number;
  msdyn_AgentProfileId?: string;
  msdyn_RecordId: string;
}

/**
 * msdyn_SalesAgents_GetSalesAgentProcessingState action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetSalesAgentProcessingStateAction implements Executable<msdyn_SalesAgents_GetSalesAgentProcessingStateResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetSalesAgentProcessingStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetSalesAgentProcessingState`;

    const body = requestBody({
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
      msdyn_RecordId: this.parameters.msdyn_RecordId,
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
  ): Promise<msdyn_SalesAgents_GetSalesAgentProcessingStateResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_SalesAgents_GetSalesAgentProcessingStateResponse;
  }
}
