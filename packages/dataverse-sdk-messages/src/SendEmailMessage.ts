import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SendEmail request message
 *
 * Web API Action: SendEmail
 */
export class SendEmailRequest extends OrganizationRequest implements Executable<SendEmailResponse> {
  constructor(
    public emailId: string,
    public issueSend: boolean,
    public trackingToken: string
  ) {
    super("SendEmail");
  }

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
    return SendEmailResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.emailId,
      IssueSend: this.issueSend,
      TrackingToken: this.trackingToken,
    };
  }
}

/**
 * SendEmail response message
 */
export class SendEmailResponse extends OrganizationResponse {
  constructor(public result: SendEmailResponse) {
    super("SendEmail");
  }

  static fromResponse(data: unknown): SendEmailResponse {
    return new SendEmailResponse((data as any).value);
  }
}
