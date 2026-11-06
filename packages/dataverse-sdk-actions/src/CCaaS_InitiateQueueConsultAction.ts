import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateQueueConsult action
 */
export interface CCaaS_InitiateQueueConsultResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateQueueConsult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueConsultActionParameters {
  ApiVersion: string;
  ConversationAccess: string;
  QueueId: string;
  ConsultType: string;
}

/**
 * CCaaS_InitiateQueueConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateQueueConsultAction implements Executable<CCaaS_InitiateQueueConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateQueueConsultActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueConsult`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      ConversationAccess: this.parameters.ConversationAccess,
      QueueId: this.parameters.QueueId,
      ConsultType: this.parameters.ConsultType,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueConsultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_InitiateQueueConsultResponse;
    return (await response.json()) as CCaaS_InitiateQueueConsultResponse;
  }
}
