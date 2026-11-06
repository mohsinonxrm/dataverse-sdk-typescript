import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from adx_SendEmailConfirmationToContact action
 */
export interface adx_SendEmailConfirmationToContactResponse {
  // No content returned
}

/**
 * adx_SendEmailConfirmationToContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 */
export class adx_SendEmailConfirmationToContactAction implements Executable<adx_SendEmailConfirmationToContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly callbackUrl: string,
    public readonly code: string,
    public readonly urlCode: string,
    public readonly userId: string,
    public readonly businessProcessFlowId?: string,
    public readonly businessProcessFlowInstanceId?: string,
    public readonly actionStepId?: string
  ) {}

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
    return {};
  }
}
