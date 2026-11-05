import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_knowledgeHarvestAgentTrigger action
 */
export interface msdyn_knowledgeHarvestAgentTriggerResponse {
  // No content returned
}

/**
 * msdyn_knowledgeHarvestAgentTrigger action
 *
 * Unbound action
 */
export class msdyn_knowledgeHarvestAgentTriggerAction implements Executable<msdyn_knowledgeHarvestAgentTriggerResponse> {
  constructor(public readonly payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestAgentTrigger`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
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

  async parseResponse(response: Response): Promise<msdyn_knowledgeHarvestAgentTriggerResponse> {
    // No return value (204 No Content)
    return {};
  }
}
