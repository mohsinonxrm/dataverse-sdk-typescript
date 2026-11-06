import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAutonomousAgentEmailAssist action
 */
export interface msdyn_GetAutonomousAgentEmailAssistResponse {
  emailContent: string;
  emailSubject: string;
  isGovernanceAgentGuardrailViolated: boolean;
}

/**
 * Parameters of the msdyn_GetAutonomousAgentEmailAssist action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutonomousAgentEmailAssistActionParameters {
  emailAssistRequestPayload: string;
  emailAssistAdditionalInformation: string;
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
      emailAssistRequestPayload: this.parameters.emailAssistRequestPayload,
      emailAssistAdditionalInformation: this.parameters.emailAssistAdditionalInformation,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAutonomousAgentEmailAssistResponse;
    return (await response.json()) as msdyn_GetAutonomousAgentEmailAssistResponse;
  }
}
