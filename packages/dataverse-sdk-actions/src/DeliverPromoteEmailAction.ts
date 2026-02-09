import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * Response from DeliverPromoteEmail action
 */
export interface DeliverPromoteEmailResponse {
  value: email;
}

/**
 * DeliverPromoteEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 */
export class DeliverPromoteEmailAction implements Executable<DeliverPromoteEmailResponse> {
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
    public readonly attachments: activitymimeattachment[],
    public readonly extraProperties: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.DeliverPromoteEmail`;

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
      Attachments: this.attachments,
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

  async parseResponse(response: Response): Promise<DeliverPromoteEmailResponse> {
    const data = await response.json();
    return data as DeliverPromoteEmailResponse;
  }
}
