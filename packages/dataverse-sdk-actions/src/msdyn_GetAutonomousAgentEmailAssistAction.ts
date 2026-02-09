import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAutonomousAgentEmailAssist action
 */
export interface msdyn_GetAutonomousAgentEmailAssistResponse {
  emailSubject: string;
  emailContent: string;
}

/**
 * msdyn_GetAutonomousAgentEmailAssist action
 *
 * Unbound action
 */
export class msdyn_GetAutonomousAgentEmailAssistAction implements Executable<msdyn_GetAutonomousAgentEmailAssistResponse> {
  constructor(
    public readonly emailAssistAdditionalInformation: string,
    public readonly emailAssistRequestPayload: string,
    public readonly emailAssistRequestHeader: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousAgentEmailAssist`;

    const body: Record<string, unknown> = {
      emailAssistAdditionalInformation: this.emailAssistAdditionalInformation,
      emailAssistRequestPayload: this.emailAssistRequestPayload,
      emailAssistRequestHeader: this.emailAssistRequestHeader,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAutonomousAgentEmailAssistResponse> {
    const data = await response.json();
    return data as msdyn_GetAutonomousAgentEmailAssistResponse;
  }
}
