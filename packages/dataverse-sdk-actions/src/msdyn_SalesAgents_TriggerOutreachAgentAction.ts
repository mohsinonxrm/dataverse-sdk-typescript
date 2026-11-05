import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_TriggerOutreachAgent action
 */
export interface msdyn_SalesAgents_TriggerOutreachAgentResponse {
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_TriggerOutreachAgent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_TriggerOutreachAgentAction implements Executable<msdyn_SalesAgents_TriggerOutreachAgentResponse> {
  constructor(
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_OutreachConfig: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_TriggerOutreachAgent`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_OutreachConfig: this.msdyn_OutreachConfig,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_TriggerOutreachAgentResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_TriggerOutreachAgentResponse;
  }
}
