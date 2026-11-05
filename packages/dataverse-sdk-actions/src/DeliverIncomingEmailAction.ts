import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * Response from DeliverIncomingEmail action
 */
export interface DeliverIncomingEmailResponse {
  value: email;
}

/**
 * DeliverIncomingEmail action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.email))
 */
export class DeliverIncomingEmailAction implements Executable<DeliverIncomingEmailResponse> {
  constructor(
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
    public readonly extraProperties: EntityReference,
    public readonly validateBeforeCreate: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeliverIncomingEmail`;

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
      ValidateBeforeCreate: this.validateBeforeCreate,
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

  async parseResponse(response: Response): Promise<DeliverIncomingEmailResponse> {
    const data = await response.json();
    return data as DeliverIncomingEmailResponse;
  }
}
