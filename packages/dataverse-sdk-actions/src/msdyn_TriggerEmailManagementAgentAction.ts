import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerEmailManagementAgent action
 */
export interface msdyn_TriggerEmailManagementAgentResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_TriggerEmailManagementAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TriggerEmailManagementAgentResponse;
    return (await response.json()) as msdyn_TriggerEmailManagementAgentResponse;
  }
}
