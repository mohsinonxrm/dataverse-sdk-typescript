import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return DeliverIncomingEmailResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return DeliverIncomingEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeliverIncomingEmail action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type DeliverIncomingEmailResult =
  (email & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * DeliverIncomingEmail response message
 *
 * `result` is the value the DeliverIncomingEmail action returns (see {@link DeliverIncomingEmailResult}).
 */
export class DeliverIncomingEmailResponse extends OrganizationResponse {
  constructor(public result: DeliverIncomingEmailResult) {
    super("DeliverIncomingEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeliverIncomingEmailResponse {
    return new DeliverIncomingEmailResponse((data ?? null) as DeliverIncomingEmailResult);
  }
}
