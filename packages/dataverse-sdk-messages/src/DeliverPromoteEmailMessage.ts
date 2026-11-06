import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { activitymimeattachment, email } from "./types/index.js";

/**
 * Parameters of the DeliverPromoteEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeliverPromoteEmailRequestParameters {
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
 * DeliverPromoteEmail request message
 *
 * Web API Action: DeliverPromoteEmail
 *
 * The first argument is the id of the email record to call it on.
 */
export class DeliverPromoteEmailRequest
  extends OrganizationRequest
  implements Executable<DeliverPromoteEmailResponse>
{
  declare readonly Parameters: Readonly<DeliverPromoteEmailRequestParameters>;

  constructor(
    public emailId: string,
    parameters: DeliverPromoteEmailRequestParameters
  ) {
    super("DeliverPromoteEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.DeliverPromoteEmail`;

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return DeliverPromoteEmailResponse.fromResponse(text ? JSON.parse(text) : {});
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
