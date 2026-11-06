import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Parameters of the DeliverImmediatePromoteEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeliverImmediatePromoteEmailRequestParameters {
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
  AttachmentIds?: string[];
  EWSUrl?: string;
  AttachmentToken?: string;
  ExtraProperties?: EntityReference | AnyEntityPayload;
}

/**
 * DeliverImmediatePromoteEmail request message
 *
 * Web API Action: DeliverImmediatePromoteEmail
 *
 * The first argument is the id of the email record to call it on.
 */
export class DeliverImmediatePromoteEmailRequest
  extends OrganizationRequest
  implements Executable<DeliverImmediatePromoteEmailResponse>
{
  declare readonly Parameters: Readonly<DeliverImmediatePromoteEmailRequestParameters>;

  constructor(
    public emailId: string,
    parameters: DeliverImmediatePromoteEmailRequestParameters
  ) {
    super("DeliverImmediatePromoteEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.DeliverImmediatePromoteEmail`;

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
      AttachmentIds: this.Parameters.AttachmentIds,
      EWSUrl: this.Parameters.EWSUrl,
      AttachmentToken: this.Parameters.AttachmentToken,
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

  async parseResponse(response: Response): Promise<DeliverImmediatePromoteEmailResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return DeliverImmediatePromoteEmailResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return DeliverImmediatePromoteEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeliverImmediatePromoteEmail action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type DeliverImmediatePromoteEmailResult =
  (email & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * DeliverImmediatePromoteEmail response message
 *
 * `result` is the value the DeliverImmediatePromoteEmail action returns (see {@link DeliverImmediatePromoteEmailResult}).
 */
export class DeliverImmediatePromoteEmailResponse extends OrganizationResponse {
  constructor(public result: DeliverImmediatePromoteEmailResult) {
    super("DeliverImmediatePromoteEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeliverImmediatePromoteEmailResponse {
    return new DeliverImmediatePromoteEmailResponse(
      (data ?? null) as DeliverImmediatePromoteEmailResult
    );
  }
}
