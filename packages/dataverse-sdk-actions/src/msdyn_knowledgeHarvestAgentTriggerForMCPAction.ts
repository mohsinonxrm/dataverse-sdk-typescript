import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_knowledgeHarvestAgentTriggerForMCP action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_knowledgeHarvestAgentTriggerForMCPResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_knowledgeHarvestAgentTriggerForMCPResponse;
  }
}
