import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the adx_SendEmailConfirmationToContact action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type adx_SendEmailConfirmationToContactResponse = void;

/**
 * Parameters of the adx_SendEmailConfirmationToContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_SendEmailConfirmationToContactActionParameters {
  CallbackUrl: string;
  Code: string;
  UrlCode: string;
  UserId: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * adx_SendEmailConfirmationToContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 *
 * The first argument is the id of the contact record to call it on.
 */
export class adx_SendEmailConfirmationToContactAction implements Executable<adx_SendEmailConfirmationToContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly parameters: adx_SendEmailConfirmationToContactActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendEmailConfirmationToContact`;

    const body = requestBody({
      CallbackUrl: this.parameters.CallbackUrl,
      Code: this.parameters.Code,
      UrlCode: this.parameters.UrlCode,
      UserId: this.parameters.UserId,
      BusinessProcessFlowId: this.parameters.BusinessProcessFlowId,
      BusinessProcessFlowInstanceId: this.parameters.BusinessProcessFlowInstanceId,
      ActionStepId: this.parameters.ActionStepId,
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

  parseResponse(_response: Response): Promise<adx_SendEmailConfirmationToContactResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
