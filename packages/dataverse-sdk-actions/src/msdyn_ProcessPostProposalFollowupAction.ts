import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProcessPostProposalFollowup action
 */
export interface msdyn_ProcessPostProposalFollowupResponse {
  msdyn_IsPostProposalFollowupHandled: boolean;
  msdyn_IsPostProposalTimedOut: boolean;
}

/**
 * msdyn_ProcessPostProposalFollowup action
 *
 * Unbound action
 */
export class msdyn_ProcessPostProposalFollowupAction implements Executable<msdyn_ProcessPostProposalFollowupResponse> {
  constructor(
    public readonly msdyn_Thread: string,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessPostProposalFollowup`;

    const body: Record<string, unknown> = {
      msdyn_Thread: this.msdyn_Thread,
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

  async parseResponse(response: Response): Promise<msdyn_ProcessPostProposalFollowupResponse> {
    const data = await response.json();
    return data as msdyn_ProcessPostProposalFollowupResponse;
  }
}
