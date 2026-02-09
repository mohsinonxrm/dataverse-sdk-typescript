import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateQueueConsult request message
 *
 * Web API Action: CCaaS_InitiateQueueConsult
 */
export class CCaaS_InitiateQueueConsultRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateQueueConsultResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public conversationAccess: string,
    public queueId: string,
    public consultType: string
  ) {
    super("CCaaS_InitiateQueueConsult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueConsult`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      ConversationAccess: this.conversationAccess,
      QueueId: this.queueId,
      ConsultType: this.consultType,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueConsultResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateQueueConsultResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      ApiVersion: this.apiVersion,
      ConversationAccess: this.conversationAccess,
      QueueId: this.queueId,
      ConsultType: this.consultType,
    };
  }
}

/**
 * CCaaS_InitiateQueueConsult response message
 */
export class CCaaS_InitiateQueueConsultResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateQueueConsult");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateQueueConsultResponse {
    return new CCaaS_InitiateQueueConsultResponse();
  }
}
