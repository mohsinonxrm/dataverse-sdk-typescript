import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_knowledgeHarvestAgentTrigger action
 */
export interface msdyn_knowledgeHarvestAgentTriggerResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_knowledgeHarvestAgentTrigger action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestAgentTriggerActionParameters {
  Payload: string;
}

/**
 * msdyn_knowledgeHarvestAgentTrigger action
 *
 * Unbound action
 */
export class msdyn_knowledgeHarvestAgentTriggerAction implements Executable<msdyn_knowledgeHarvestAgentTriggerResponse> {
  constructor(public readonly parameters: msdyn_knowledgeHarvestAgentTriggerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestAgentTrigger`;

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

  async parseResponse(response: Response): Promise<msdyn_knowledgeHarvestAgentTriggerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_knowledgeHarvestAgentTriggerResponse;
  }
}
