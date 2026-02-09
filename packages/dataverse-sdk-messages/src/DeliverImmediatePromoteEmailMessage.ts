import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { email } from "./types/index.js";

/**
 * DeliverImmediatePromoteEmail request message
 *
 * Web API Action: DeliverImmediatePromoteEmail
 */
export class DeliverImmediatePromoteEmailRequest
  extends OrganizationRequest
  implements Executable<DeliverImmediatePromoteEmailResponse>
{
  constructor(
    public emailId: string,
    public messageId: string,
    public subject: string,
    public from: string,
    public to: string,
    public cc: string,
    public bcc: string,
    public receivedOn: string,
    public submittedBy: string,
    public importance: string,
    public body: string,
    public attachmentIds: string[],
    public eWSUrl: string,
    public attachmentToken: string,
    public extraProperties: EntityReference
  ) {
    super("DeliverImmediatePromoteEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.DeliverImmediatePromoteEmail`;

    const body: Record<string, unknown> = {
      MessageId: this.messageId,
      Subject: this.subject,
      From: this.from,
      To: this.to,
      Cc: this.cc,
      Bcc: this.bcc,
      ReceivedOn: this.receivedOn,
      SubmittedBy: this.submittedBy,
      Importance: this.importance,
      Body: this.body,
      AttachmentIds: this.attachmentIds,
      EWSUrl: this.eWSUrl,
      AttachmentToken: this.attachmentToken,
      ExtraProperties: this.extraProperties,
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

  async parseResponse(response: Response): Promise<DeliverImmediatePromoteEmailResponse> {
    const data = await response.json();
    return DeliverImmediatePromoteEmailResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.emailId,
      MessageId: this.messageId,
      Subject: this.subject,
      From: this.from,
      To: this.to,
      Cc: this.cc,
      Bcc: this.bcc,
      ReceivedOn: this.receivedOn,
      SubmittedBy: this.submittedBy,
      Importance: this.importance,
      Body: this.body,
      AttachmentIds: this.attachmentIds,
      EWSUrl: this.eWSUrl,
      AttachmentToken: this.attachmentToken,
      ExtraProperties: this.extraProperties,
    };
  }
}

/**
 * DeliverImmediatePromoteEmail response message
 */
export class DeliverImmediatePromoteEmailResponse extends OrganizationResponse {
  constructor(public result: email) {
    super("DeliverImmediatePromoteEmail");
  }

  static fromResponse(data: unknown): DeliverImmediatePromoteEmailResponse {
    return new DeliverImmediatePromoteEmailResponse((data as any).value);
  }
}
