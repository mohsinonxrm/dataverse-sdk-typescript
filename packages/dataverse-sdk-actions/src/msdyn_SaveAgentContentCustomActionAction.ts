import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SaveAgentContentCustomAction action
 */
export interface msdyn_SaveAgentContentCustomActionResponse {
  Response: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdyn_SaveAgentContentCustomAction action
 *
 * Unbound action
 */
export class msdyn_SaveAgentContentCustomActionAction implements Executable<msdyn_SaveAgentContentCustomActionResponse> {
  constructor(public readonly agentContent: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveAgentContentCustomAction`;

    const body: Record<string, unknown> = {
      AgentContent: this.agentContent,
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

  async parseResponse(response: Response): Promise<msdyn_SaveAgentContentCustomActionResponse> {
    const data = await response.json();
    return data as msdyn_SaveAgentContentCustomActionResponse;
  }
}
