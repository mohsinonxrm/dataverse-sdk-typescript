import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * Response from DeliverPromoteEmail action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DeliverPromoteEmailResponse extends email {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the DeliverPromoteEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeliverPromoteEmailActionParameters {
  MessageId: string;
  Subject?: string;
  From: string;
  To: string;
  Cc: string;
  Bcc: string;
  ReceivedOn: string;
  SubmittedBy: string;
  Importance: string;
  Body: string;
  Attachments: (EntityReference | EntityPayload<activitymimeattachment>)[];
  ExtraProperties?: EntityReference | AnyEntityPayload;
}

/**
 * DeliverPromoteEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 *
 * The first argument is the id of the email record to call it on.
 */
export class DeliverPromoteEmailAction implements Executable<DeliverPromoteEmailResponse> {
  constructor(
    public readonly emailId: string,
    public readonly parameters: DeliverPromoteEmailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.DeliverPromoteEmail`;

    const body = requestBody({
      MessageId: this.parameters.MessageId,
      Subject: this.parameters.Subject,
      From: this.parameters.From,
      To: this.parameters.To,
      Cc: this.parameters.Cc,
      Bcc: this.parameters.Bcc,
      ReceivedOn: this.parameters.ReceivedOn,
      SubmittedBy: this.parameters.SubmittedBy,
      Importance: this.parameters.Importance,
      Body: this.parameters.Body,
      Attachments: this.parameters.Attachments,
      ExtraProperties: this.parameters.ExtraProperties,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DeliverPromoteEmailResponse;
    return (await response.json()) as DeliverPromoteEmailResponse;
  }
}
