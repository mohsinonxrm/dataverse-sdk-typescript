import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateQueueConsult action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateQueueConsultResponse = void;

/**
 * Parameters of the CCaaS_InitiateQueueConsult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueConsultActionParameters {
  ApiVersion: string;
  ConsultType: string;
  RequestSource?: string;
  QueueId: string;
  ConversationAccess: string;
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
      ConsultType: this.parameters.ConsultType,
      RequestSource: this.parameters.RequestSource,
      QueueId: this.parameters.QueueId,
      ConversationAccess: this.parameters.ConversationAccess,
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateQueueConsultResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
