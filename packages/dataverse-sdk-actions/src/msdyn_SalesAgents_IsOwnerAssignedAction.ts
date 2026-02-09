import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_IsOwnerAssigned action
 */
export interface msdyn_SalesAgents_IsOwnerAssignedResponse {
  IsOwnerAssignedResponse: boolean;
}

/**
 * msdyn_SalesAgents_IsOwnerAssigned action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_IsOwnerAssignedAction implements Executable<msdyn_SalesAgents_IsOwnerAssignedResponse> {
  constructor(
    public readonly msdyn_HandoverContext: string,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_IsOwnerAssigned`;

    const body: Record<string, unknown> = {
      msdyn_HandoverContext: this.msdyn_HandoverContext,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_IsOwnerAssignedResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_IsOwnerAssignedResponse;
  }
}
