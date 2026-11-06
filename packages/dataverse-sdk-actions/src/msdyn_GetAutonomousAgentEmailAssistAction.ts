import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAutonomousAgentEmailAssist action
 */
export interface msdyn_GetAutonomousAgentEmailAssistResponse {
  emailSubject: string;
  emailContent: string;
}

/**
 * Parameters of the msdyn_GetAutonomousAgentEmailAssist action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutonomousAgentEmailAssistActionParameters {
  emailAssistAdditionalInformation: string;
  emailAssistRequestPayload: string;
  emailAssistRequestHeader: string;
}

/**
 * msdyn_GetAutonomousAgentEmailAssist action
 *
 * Unbound action
 */
export class msdyn_GetAutonomousAgentEmailAssistAction implements Executable<msdyn_GetAutonomousAgentEmailAssistResponse> {
  constructor(public readonly parameters: msdyn_GetAutonomousAgentEmailAssistActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousAgentEmailAssist`;

    const body = requestBody({
      emailAssistAdditionalInformation: this.parameters.emailAssistAdditionalInformation,
      emailAssistRequestPayload: this.parameters.emailAssistRequestPayload,
      emailAssistRequestHeader: this.parameters.emailAssistRequestHeader,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutonomousAgentEmailAssistResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetAutonomousAgentEmailAssistResponse;
  }
}
