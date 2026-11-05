import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateQueueConsult action
 */
export interface CCaaS_InitiateQueueConsultResponse {
  // No content returned
}

/**
 * CCaaS_InitiateQueueConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateQueueConsultAction implements Executable<CCaaS_InitiateQueueConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly conversationAccess: string,
    public readonly queueId: string,
    public readonly consultType: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueConsultResponse> {
    // No return value (204 No Content)
    return {};
  }
}
