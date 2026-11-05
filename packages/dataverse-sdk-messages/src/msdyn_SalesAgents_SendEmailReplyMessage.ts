import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_SendEmailReply request message
 *
 * Web API Action: msdyn_SalesAgents_SendEmailReply
 */
export class msdyn_SalesAgents_SendEmailReplyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_SendEmailReplyResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_ParentActivityId: string,
    public msdyn_AgentProfileId: string,
    public msdyn_Emailbody: string,
    public msdyn_IsDelayedSend: boolean
  ) {
    super("msdyn_SalesAgents_SendEmailReply");
  }

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
    return msdyn_SalesAgents_SendEmailReplyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_ParentActivityId: this.msdyn_ParentActivityId,
      msdyn_AgentProfileId: this.msdyn_AgentProfileId,
      msdyn_Emailbody: this.msdyn_Emailbody,
      msdyn_IsDelayedSend: this.msdyn_IsDelayedSend,
    };
  }
}

/**
 * msdyn_SalesAgents_SendEmailReply response message
 */
export class msdyn_SalesAgents_SendEmailReplyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_SendEmailReplyResponse) {
    super("msdyn_SalesAgents_SendEmailReply");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_SendEmailReplyResponse {
    return new msdyn_SalesAgents_SendEmailReplyResponse((data as any).value);
  }
}
