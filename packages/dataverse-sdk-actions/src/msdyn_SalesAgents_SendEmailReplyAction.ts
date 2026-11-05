import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_SendEmailReply action
 */
export interface msdyn_SalesAgents_SendEmailReplyResponse {
  msdyn_IsCustomerUnsubscribed: boolean;
}

/**
 * msdyn_SalesAgents_SendEmailReply action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_SendEmailReplyAction implements Executable<msdyn_SalesAgents_SendEmailReplyResponse> {
  constructor(
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_ParentActivityId: string,
    public readonly msdyn_AgentProfileId: string,
    public readonly msdyn_Emailbody: string,
    public readonly msdyn_IsDelayedSend: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SendEmailReply`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_ParentActivityId: this.msdyn_ParentActivityId,
      msdyn_AgentProfileId: this.msdyn_AgentProfileId,
      msdyn_Emailbody: this.msdyn_Emailbody,
      msdyn_IsDelayedSend: this.msdyn_IsDelayedSend,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_SendEmailReplyResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_SendEmailReplyResponse;
  }
}
