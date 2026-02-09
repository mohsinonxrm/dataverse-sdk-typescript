import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ProcessOutreachAgentResponse action
 */
export interface msdyn_SalesAgents_ProcessOutreachAgentResponseResponse {
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_ProcessOutreachAgentResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProcessOutreachAgentResponseAction implements Executable<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse> {
  constructor(
    public readonly msdyn_SalesAgentRunId: string,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_Email: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessOutreachAgentResponse`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRunId: this.msdyn_SalesAgentRunId,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_Email: this.msdyn_Email,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ProcessOutreachAgentResponseResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ProcessOutreachAgentResponseResponse;
  }
}
