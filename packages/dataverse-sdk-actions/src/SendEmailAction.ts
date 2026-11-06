import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SendEmail action
 */
export interface SendEmailResponse {
  Subject: string;
}

/**
 * SendEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 */
export class SendEmailAction implements Executable<SendEmailResponse> {
  constructor(
    public readonly emailId: string,
    public readonly issueSend: boolean,
    public readonly trackingToken?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.SendEmail`;

    const body: Record<string, unknown> = {
      IssueSend: this.issueSend,
      TrackingToken: this.trackingToken,
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

  async parseResponse(response: Response): Promise<SendEmailResponse> {
    const data = await response.json();
    return data as SendEmailResponse;
  }
}
