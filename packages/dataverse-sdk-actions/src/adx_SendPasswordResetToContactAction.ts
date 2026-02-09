import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from adx_SendPasswordResetToContact action
 */
export interface adx_SendPasswordResetToContactResponse {
  // No content returned
}

/**
 * adx_SendPasswordResetToContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 */
export class adx_SendPasswordResetToContactAction implements Executable<adx_SendPasswordResetToContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly callbackUrl: string,
    public readonly code: string,
    public readonly urlCode: string,
    public readonly email: string,
    public readonly userId: string,
    public readonly businessProcessFlowId: string,
    public readonly businessProcessFlowInstanceId: string,
    public readonly actionStepId: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<adx_SendPasswordResetToContactResponse> {
    // No return value (204 No Content)
    return {};
  }
}
