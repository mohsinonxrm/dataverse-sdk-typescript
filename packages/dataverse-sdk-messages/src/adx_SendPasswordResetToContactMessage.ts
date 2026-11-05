import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * adx_SendPasswordResetToContact request message
 *
 * Web API Action: adx_SendPasswordResetToContact
 */
export class adx_SendPasswordResetToContactRequest
  extends OrganizationRequest
  implements Executable<adx_SendPasswordResetToContactResponse>
{
  constructor(
    public contactId: string,
    public callbackUrl: string,
    public code: string,
    public urlCode: string,
    public email: string,
    public userId: string,
    public businessProcessFlowId: string,
    public businessProcessFlowInstanceId: string,
    public actionStepId: string
  ) {
    super("adx_SendPasswordResetToContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendPasswordResetToContact`;

    const body: Record<string, unknown> = {
      CallbackUrl: this.callbackUrl,
      Code: this.code,
      UrlCode: this.urlCode,
      Email: this.email,
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

  async parseResponse(response: Response): Promise<adx_SendPasswordResetToContactResponse> {
    // No return value (204 No Content)
    return new adx_SendPasswordResetToContactResponse();
  }
}

/**
 * adx_SendPasswordResetToContact response message
 */
export class adx_SendPasswordResetToContactResponse extends OrganizationResponse {
  constructor() {
    super("adx_SendPasswordResetToContact");
  }

  static fromResponse(_data: unknown): adx_SendPasswordResetToContactResponse {
    return new adx_SendPasswordResetToContactResponse();
  }
}
