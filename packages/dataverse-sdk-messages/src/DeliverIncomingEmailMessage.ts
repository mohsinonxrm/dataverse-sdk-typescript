import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * Parameters of the DeliverIncomingEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeliverIncomingEmailRequestParameters {
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
 * DeliverIncomingEmail request message
 *
 * Web API Action: DeliverIncomingEmail
 */
export class DeliverIncomingEmailRequest
  extends OrganizationRequest
  implements Executable<DeliverIncomingEmailResponse>
{
  declare readonly Parameters: Readonly<DeliverIncomingEmailRequestParameters>;

  constructor(parameters: DeliverIncomingEmailRequestParameters) {
    super("DeliverIncomingEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/emails/Microsoft.Dynamics.CRM.DeliverIncomingEmail`;

    const body = requestBody({
      MessageId: this.Parameters.MessageId,
      Subject: this.Parameters.Subject,
      From: this.Parameters.From,
      To: this.Parameters.To,
      Cc: this.Parameters.Cc,
      Bcc: this.Parameters.Bcc,
      ReceivedOn: this.Parameters.ReceivedOn,
      SubmittedBy: this.Parameters.SubmittedBy,
      Importance: this.Parameters.Importance,
      Body: this.Parameters.Body,
      Attachments: this.Parameters.Attachments,
      ExtraProperties: this.Parameters.ExtraProperties,
      ValidateBeforeCreate: this.Parameters.ValidateBeforeCreate,
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
    return DeliverIncomingEmailResponse.fromResponse(text ? JSON.parse(text) : {});
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
