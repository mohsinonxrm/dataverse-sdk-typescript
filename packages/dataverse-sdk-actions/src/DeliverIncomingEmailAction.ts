import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * Response from DeliverIncomingEmail action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DeliverIncomingEmailResponse extends email {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the DeliverIncomingEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeliverIncomingEmailActionParameters {
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
  ValidateBeforeCreate?: boolean;
}

/**
 * DeliverIncomingEmail action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.email))
 */
export class DeliverIncomingEmailAction implements Executable<DeliverIncomingEmailResponse> {
  constructor(public readonly parameters: DeliverIncomingEmailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/emails/Microsoft.Dynamics.CRM.DeliverIncomingEmail`;

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
      ValidateBeforeCreate: this.parameters.ValidateBeforeCreate,
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

  async parseResponse(response: Response): Promise<DeliverIncomingEmailResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeliverIncomingEmailResponse;
  }
}
