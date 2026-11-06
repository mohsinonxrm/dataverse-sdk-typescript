import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from adx_SendEmailTwoFactorCodeToContact action
 */
export interface adx_SendEmailTwoFactorCodeToContactResponse {
  // No content returned
}

/**
 * adx_SendEmailTwoFactorCodeToContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 */
export class adx_SendEmailTwoFactorCodeToContactAction implements Executable<adx_SendEmailTwoFactorCodeToContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly code: string,
    public readonly businessProcessFlowId?: string,
    public readonly businessProcessFlowInstanceId?: string,
    public readonly actionStepId?: string
  ) {}

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
    return {};
  }
}
