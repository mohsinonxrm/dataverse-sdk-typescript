import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_SendEmailReply action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_SendEmailReplyResponse {
  "@odata.context"?: string;
  msdyn_IsCustomerUnsubscribed: boolean;
}

/**
 * Parameters of the msdyn_SalesAgents_SendEmailReply action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_SendEmailReplyActionParameters {
  msdyn_TrackingId?: string;
  msdyn_Emailbody: string;
  msdyn_IsDelayedSend?: boolean;
  msdyn_AgentProfileId: string;
  msdyn_ParentActivityId: string;
  msdyn_IsEmailFollowed?: boolean;
}

/**
 * msdyn_SalesAgents_SendEmailReply action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_SendEmailReplyAction implements Executable<msdyn_SalesAgents_SendEmailReplyResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_SendEmailReplyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SendEmailReply`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_Emailbody: this.parameters.msdyn_Emailbody,
      msdyn_IsDelayedSend: this.parameters.msdyn_IsDelayedSend,
      msdyn_AgentProfileId: this.parameters.msdyn_AgentProfileId,
      msdyn_ParentActivityId: this.parameters.msdyn_ParentActivityId,
      msdyn_IsEmailFollowed: this.parameters.msdyn_IsEmailFollowed,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_SendEmailReplyResponse;
  }
}
