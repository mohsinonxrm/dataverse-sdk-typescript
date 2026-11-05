import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { email } from "./types/index.js";

/**
 * Response from DeliverImmediatePromoteEmail action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DeliverImmediatePromoteEmailResponse extends email {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * DeliverImmediatePromoteEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 */
export class DeliverImmediatePromoteEmailAction implements Executable<DeliverImmediatePromoteEmailResponse> {
  constructor(
    public readonly emailId: string,
    public readonly messageId: string,
    public readonly subject: string,
    public readonly from: string,
    public readonly to: string,
    public readonly cc: string,
    public readonly bcc: string,
    public readonly receivedOn: string,
    public readonly submittedBy: string,
    public readonly importance: string,
    public readonly body: string,
    public readonly attachmentIds: string[],
    public readonly eWSUrl: string,
    public readonly attachmentToken: string,
    public readonly extraProperties: EntityReference
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DeliverImmediatePromoteEmailResponse> {
    const data = await response.json();
    return data as DeliverImmediatePromoteEmailResponse;
  }
}
