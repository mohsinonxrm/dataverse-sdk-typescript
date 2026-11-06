import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * adx_SendEmailTwoFactorCodeToContact request message
 *
 * Web API Action: adx_SendEmailTwoFactorCodeToContact
 */
export class adx_SendEmailTwoFactorCodeToContactRequest
  extends OrganizationRequest
  implements Executable<adx_SendEmailTwoFactorCodeToContactResponse>
{
  constructor(
    public contactId: string,
    public code: string,
    public businessProcessFlowId?: string,
    public businessProcessFlowInstanceId?: string,
    public actionStepId?: string
  ) {
    super("adx_SendEmailTwoFactorCodeToContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.adx_SendEmailTwoFactorCodeToContact`;

    const body: Record<string, unknown> = {
      Code: this.code,
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

  async parseResponse(response: Response): Promise<adx_SendEmailTwoFactorCodeToContactResponse> {
    // No return value (204 No Content)
    return new adx_SendEmailTwoFactorCodeToContactResponse();
  }
}

/**
 * adx_SendEmailTwoFactorCodeToContact response message
 */
export class adx_SendEmailTwoFactorCodeToContactResponse extends OrganizationResponse {
  constructor() {
    super("adx_SendEmailTwoFactorCodeToContact");
  }

  static fromResponse(_data: unknown): adx_SendEmailTwoFactorCodeToContactResponse {
    return new adx_SendEmailTwoFactorCodeToContactResponse();
  }
}
