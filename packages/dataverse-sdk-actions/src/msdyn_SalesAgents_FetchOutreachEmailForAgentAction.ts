import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_FetchOutreachEmailForAgent action
 */
export interface msdyn_SalesAgents_FetchOutreachEmailForAgentResponse {
  msdyn_Response: string;
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentAction implements Executable<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
  constructor(
    public readonly msdyn_SalesAgentRunId: string,
    public readonly msdyn_RegardingEntityName: string,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_OutreachConfig: string,
    public readonly msdyn_RegardingEntityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchOutreachEmailForAgent`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRunId: this.msdyn_SalesAgentRunId,
      msdyn_RegardingEntityName: this.msdyn_RegardingEntityName,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_OutreachConfig: this.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.msdyn_RegardingEntityId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_FetchOutreachEmailForAgentResponse;
  }
}
