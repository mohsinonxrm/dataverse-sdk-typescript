import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ProcessEngageAgentResponse action
 */
export interface msdyn_SalesAgents_ProcessEngageAgentResponseResponse {
  msdyn_IsUnsubscribe: boolean;
  msdyn_AreAllFollowUpsCompleted: boolean;
  msdyn_Explanation: string;
  msdyn_EmailBody: string;
  msdyn_IsAwaitingResponse: boolean;
  msdyn_IsStuck: boolean;
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseAction implements Executable<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
  constructor(
    public readonly msdyn_Thread: string | undefined,
    public readonly msdyn_TrackingId: string | undefined,
    public readonly msdyn_SalesMacroAgentType: number,
    public readonly msdyn_SalesAgentRun: string | undefined,
    public readonly msdyn_EngageAgentActivities: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessEngageAgentResponse`;

    const body: Record<string, unknown> = {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_EngageAgentActivities: this.msdyn_EngageAgentActivities,
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
  ): Promise<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ProcessEngageAgentResponseResponse;
  }
}
