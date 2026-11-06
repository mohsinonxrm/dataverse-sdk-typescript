import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the adx_SendEmailTwoFactorCodeToContact action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type adx_SendEmailTwoFactorCodeToContactResponse = void;

/**
 * Parameters of the adx_SendEmailTwoFactorCodeToContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_SendEmailTwoFactorCodeToContactActionParameters {
  Code: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * adx_SendEmailTwoFactorCodeToContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 *
 * The first argument is the id of the contact record to call it on.
 */
export class adx_SendEmailTwoFactorCodeToContactAction implements Executable<adx_SendEmailTwoFactorCodeToContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly parameters: adx_SendEmailTwoFactorCodeToContactActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendEmailTwoFactorCodeToContact`;

    const body = requestBody({
      Code: this.parameters.Code,
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

  parseResponse(_response: Response): Promise<adx_SendEmailTwoFactorCodeToContactResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
