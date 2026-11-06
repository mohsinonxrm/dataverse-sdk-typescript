import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * DeliverIncomingEmail request message
 *
 * Web API Action: DeliverIncomingEmail
 */
export class DeliverIncomingEmailRequest
  extends OrganizationRequest
  implements Executable<DeliverIncomingEmailResponse>
{
  constructor(
    public messageId: string,
    public subject: string | undefined,
    public from: string,
    public to: string,
    public cc: string,
    public bcc: string,
    public receivedOn: string,
    public submittedBy: string,
    public importance: string,
    public body: string,
    public attachments: (EntityReference | EntityPayload<activitymimeattachment>)[],
    public extraProperties?: EntityReference | AnyEntityPayload,
    public validateBeforeCreate?: boolean
  ) {
    super("DeliverIncomingEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/emails/Microsoft.Dynamics.CRM.DeliverIncomingEmail`;

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
    return DeliverIncomingEmailResponse.fromResponse(data);
  }
}

/**
 * DeliverIncomingEmail response message
 */
export class DeliverIncomingEmailResponse extends OrganizationResponse {
  constructor(public result: email) {
    super("DeliverIncomingEmail");
  }

  static fromResponse(data: unknown): DeliverIncomingEmailResponse {
    return new DeliverIncomingEmailResponse(responseObject<email>(data));
  }
}
