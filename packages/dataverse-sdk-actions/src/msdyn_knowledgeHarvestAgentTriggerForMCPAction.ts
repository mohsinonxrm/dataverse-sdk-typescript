import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_knowledgeHarvestAgentTriggerForMCP action
 */
export interface msdyn_knowledgeHarvestAgentTriggerForMCPResponse {
  KnowledgeHarvestJobRecordId: string;
}

/**
 * Parameters of the msdyn_knowledgeHarvestAgentTriggerForMCP action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestAgentTriggerForMCPActionParameters {
  Payload: string;
}

/**
 * msdyn_knowledgeHarvestAgentTriggerForMCP action
 *
 * Unbound action
 */
export class msdyn_knowledgeHarvestAgentTriggerForMCPAction implements Executable<msdyn_knowledgeHarvestAgentTriggerForMCPResponse> {
  constructor(
    public readonly parameters: msdyn_knowledgeHarvestAgentTriggerForMCPActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestAgentTriggerForMCP`;

    const body = requestBody({
      Payload: this.parameters.Payload,
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
  ): Promise<msdyn_knowledgeHarvestAgentTriggerForMCPResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_knowledgeHarvestAgentTriggerForMCPResponse;
    return (await response.json()) as msdyn_knowledgeHarvestAgentTriggerForMCPResponse;
  }
}
