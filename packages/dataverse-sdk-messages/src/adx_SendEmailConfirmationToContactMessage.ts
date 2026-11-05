import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * adx_SendEmailConfirmationToContact request message
 *
 * Web API Action: adx_SendEmailConfirmationToContact
 */
export class adx_SendEmailConfirmationToContactRequest
  extends OrganizationRequest
  implements Executable<adx_SendEmailConfirmationToContactResponse>
{
  constructor(
    public contactId: string,
    public callbackUrl: string,
    public code: string,
    public urlCode: string,
    public userId: string,
    public businessProcessFlowId: string,
    public businessProcessFlowInstanceId: string,
    public actionStepId: string
  ) {
    super("adx_SendEmailConfirmationToContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendEmailConfirmationToContact`;

    const body: Record<string, unknown> = {
      CallbackUrl: this.callbackUrl,
      Code: this.code,
      UrlCode: this.urlCode,
      UserId: this.userId,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
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

  async parseResponse(response: Response): Promise<adx_SendEmailConfirmationToContactResponse> {
    // No return value (204 No Content)
    return new adx_SendEmailConfirmationToContactResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.contactId,
      CallbackUrl: this.callbackUrl,
      Code: this.code,
      UrlCode: this.urlCode,
      UserId: this.userId,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
    };
  }
}

/**
 * adx_SendEmailConfirmationToContact response message
 */
export class adx_SendEmailConfirmationToContactResponse extends OrganizationResponse {
  constructor() {
    super("adx_SendEmailConfirmationToContact");
  }

  static fromResponse(_data: unknown): adx_SendEmailConfirmationToContactResponse {
    return new adx_SendEmailConfirmationToContactResponse();
  }
}
