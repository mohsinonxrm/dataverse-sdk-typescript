import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return DeliverPromoteEmailResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return DeliverPromoteEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeliverPromoteEmail action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type DeliverPromoteEmailResult =
  (email & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * DeliverPromoteEmail response message
 *
 * `result` is the value the DeliverPromoteEmail action returns (see {@link DeliverPromoteEmailResult}).
 */
export class DeliverPromoteEmailResponse extends OrganizationResponse {
  constructor(public result: DeliverPromoteEmailResult) {
    super("DeliverPromoteEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeliverPromoteEmailResponse {
    return new DeliverPromoteEmailResponse((data ?? null) as DeliverPromoteEmailResult);
  }
}
