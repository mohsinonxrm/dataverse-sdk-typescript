import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_knowledgeHarvestAgentTrigger action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_knowledgeHarvestAgentTriggerResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_knowledgeHarvestAgentTriggerResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
