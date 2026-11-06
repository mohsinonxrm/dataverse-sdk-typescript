import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from adx_SendPasswordResetToContact action
 */
export interface adx_SendPasswordResetToContactResponse {
  // No content returned
}

/**
 * Parameters of the adx_SendPasswordResetToContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_SendPasswordResetToContactActionParameters {
  CallbackUrl: string;
  Code: string;
  UrlCode: string;
  Email: string;
  UserId: string;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * adx_SendPasswordResetToContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 *
 * The first argument is the id of the contact record to call it on.
 */
export class adx_SendPasswordResetToContactAction implements Executable<adx_SendPasswordResetToContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly parameters: adx_SendPasswordResetToContactActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendPasswordResetToContact`;

    const body = requestBody({
      CallbackUrl: this.parameters.CallbackUrl,
      Code: this.parameters.Code,
      UrlCode: this.parameters.UrlCode,
      Email: this.parameters.Email,
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

  async parseResponse(response: Response): Promise<adx_SendPasswordResetToContactResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as adx_SendPasswordResetToContactResponse;
    return (await response.json()) as adx_SendPasswordResetToContactResponse;
  }
}
