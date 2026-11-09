import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_TriggerEmailManagementAgent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_TriggerEmailManagementAgentResponse = void;

/**
 * Parameters of the msdyn_TriggerEmailManagementAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerEmailManagementAgentActionParameters {
  emailId: string;
  additionalParams?: string;
}

/**
 * msdyn_TriggerEmailManagementAgent action
 *
 * Unbound action
 */
export class msdyn_TriggerEmailManagementAgentAction implements Executable<msdyn_TriggerEmailManagementAgentResponse> {
  constructor(public readonly parameters: msdyn_TriggerEmailManagementAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerEmailManagementAgent`;

    const body = requestBody({
      emailId: this.parameters.emailId,
      additionalParams: this.parameters.additionalParams,
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

  parseResponse(_response: Response): Promise<msdyn_TriggerEmailManagementAgentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
