import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_SendEmailReply message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_SendEmailReplyRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_Emailbody: string;
  msdyn_IsDelayedSend?: boolean;
  msdyn_AgentProfileId: string;
  msdyn_ParentActivityId: string;
  msdyn_IsEmailFollowed?: boolean;
}

/**
 * msdyn_SalesAgents_SendEmailReply request message
 *
 * Web API Action: msdyn_SalesAgents_SendEmailReply
 */
export class msdyn_SalesAgents_SendEmailReplyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_SendEmailReplyResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_SendEmailReplyRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_SendEmailReplyRequestParameters) {
    super("msdyn_SalesAgents_SendEmailReply", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SendEmailReply`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_Emailbody: this.Parameters.msdyn_Emailbody,
      msdyn_IsDelayedSend: this.Parameters.msdyn_IsDelayedSend,
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_ParentActivityId: this.Parameters.msdyn_ParentActivityId,
      msdyn_IsEmailFollowed: this.Parameters.msdyn_IsEmailFollowed,
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
    return msdyn_SalesAgents_SendEmailReplyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_SendEmailReply action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_SendEmailReplyResult {
  "@odata.context"?: string;
  msdyn_IsCustomerUnsubscribed: boolean;
}

/**
 * msdyn_SalesAgents_SendEmailReply response message
 *
 * `result` is the value the msdyn_SalesAgents_SendEmailReply action returns (see {@link msdyn_SalesAgents_SendEmailReplyResult}).
 */
export class msdyn_SalesAgents_SendEmailReplyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_SendEmailReplyResult) {
    super("msdyn_SalesAgents_SendEmailReply");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_SendEmailReplyResponse {
    return new msdyn_SalesAgents_SendEmailReplyResponse(
      data as msdyn_SalesAgents_SendEmailReplyResult
    );
  }
}
