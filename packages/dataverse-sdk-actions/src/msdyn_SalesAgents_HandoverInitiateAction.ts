import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_HandoverInitiate action
 */
export interface msdyn_SalesAgents_HandoverInitiateResponse {
  HandoverInitiateResponse: string;
}

/**
 * msdyn_SalesAgents_HandoverInitiate action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_HandoverInitiateAction implements Executable<msdyn_SalesAgents_HandoverInitiateResponse> {
  constructor(
    public readonly msdyn_AssignTo: number,
    public readonly msdyn_HandoverIntent: number,
    public readonly msdyn_GetHandoverDetailsInfo: string,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_HandoverTarget: number,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverInitiate`;

    const body: Record<string, unknown> = {
      msdyn_AssignTo: this.msdyn_AssignTo,
      msdyn_HandoverIntent: this.msdyn_HandoverIntent,
      msdyn_GetHandoverDetailsInfo: this.msdyn_GetHandoverDetailsInfo,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_HandoverTarget: this.msdyn_HandoverTarget,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverInitiateResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_HandoverInitiateResponse;
  }
}
