import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_SendEmailReplyResponse as msdyn_SalesAgents_SendEmailReplyResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAgents_SendEmailReply message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_SendEmailReplyRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_ParentActivityId: string;
  msdyn_AgentProfileId: string;
  msdyn_Emailbody: string;
  msdyn_IsDelayedSend?: boolean;
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
      msdyn_ParentActivityId: this.Parameters.msdyn_ParentActivityId,
      msdyn_AgentProfileId: this.Parameters.msdyn_AgentProfileId,
      msdyn_Emailbody: this.Parameters.msdyn_Emailbody,
      msdyn_IsDelayedSend: this.Parameters.msdyn_IsDelayedSend,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesAgents_SendEmailReplyResponse.fromResponse({});
    return msdyn_SalesAgents_SendEmailReplyResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgents_SendEmailReply response message
 */
export class msdyn_SalesAgents_SendEmailReplyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_SendEmailReplyResponseData) {
    super("msdyn_SalesAgents_SendEmailReply");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_SendEmailReplyResponse {
    return new msdyn_SalesAgents_SendEmailReplyResponse(
      responseObject<msdyn_SalesAgents_SendEmailReplyResponseData>(data)
    );
  }
}
