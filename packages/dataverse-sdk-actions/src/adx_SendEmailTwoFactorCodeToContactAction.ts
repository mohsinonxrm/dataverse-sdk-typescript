import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from adx_SendEmailTwoFactorCodeToContact action
 */
export interface adx_SendEmailTwoFactorCodeToContactResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<adx_SendEmailTwoFactorCodeToContactResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as adx_SendEmailTwoFactorCodeToContactResponse;
    return (await response.json()) as adx_SendEmailTwoFactorCodeToContactResponse;
  }
}
