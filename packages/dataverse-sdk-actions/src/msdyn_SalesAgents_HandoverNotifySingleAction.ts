import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_HandoverNotifySingle action
 */
export interface msdyn_SalesAgents_HandoverNotifySingleResponse {
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_HandoverNotifySingle action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_HandoverNotifySingleAction implements Executable<msdyn_SalesAgents_HandoverNotifySingleResponse> {
  constructor(
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_HandoverContext: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverNotifySingle`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_HandoverContext: this.msdyn_HandoverContext,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverNotifySingleResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_HandoverNotifySingleResponse;
  }
}
