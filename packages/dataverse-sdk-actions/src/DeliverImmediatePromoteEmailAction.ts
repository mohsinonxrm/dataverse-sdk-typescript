import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Response from the DeliverImmediatePromoteEmail action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type DeliverImmediatePromoteEmailResponse =
  (email & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * Parameters of the DeliverImmediatePromoteEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeliverImmediatePromoteEmailActionParameters {
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
 * DeliverImmediatePromoteEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 *
 * The first argument is the id of the email record to call it on.
 */
export class DeliverImmediatePromoteEmailAction implements Executable<DeliverImmediatePromoteEmailResponse> {
  constructor(
    public readonly emailId: string,
    public readonly parameters: DeliverImmediatePromoteEmailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${odataLiteral.guid(this.emailId)})/Microsoft.Dynamics.CRM.DeliverImmediatePromoteEmail`;

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
      AttachmentIds: this.parameters.AttachmentIds,
      EWSUrl: this.parameters.EWSUrl,
      AttachmentToken: this.parameters.AttachmentToken,
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

  async parseResponse(response: Response): Promise<DeliverImmediatePromoteEmailResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as DeliverImmediatePromoteEmailResponse;
  }
}
