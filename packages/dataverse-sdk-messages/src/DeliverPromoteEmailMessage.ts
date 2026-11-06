import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * DeliverPromoteEmail request message
 *
 * Web API Action: DeliverPromoteEmail
 */
export class DeliverPromoteEmailRequest
  extends OrganizationRequest
  implements Executable<DeliverPromoteEmailResponse>
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
    public attachments: activitymimeattachment[],
    public extraProperties: EntityReference
  ) {
    super("DeliverPromoteEmail");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DeliverPromoteEmailResponse> {
    const data = await response.json();
    return DeliverPromoteEmailResponse.fromResponse(data);
  }
}

/**
 * DeliverPromoteEmail response message
 */
export class DeliverPromoteEmailResponse extends OrganizationResponse {
  constructor(public result: email) {
    super("DeliverPromoteEmail");
  }

  static fromResponse(data: unknown): DeliverPromoteEmailResponse {
    return new DeliverPromoteEmailResponse(responseObject<email>(data));
  }
}
