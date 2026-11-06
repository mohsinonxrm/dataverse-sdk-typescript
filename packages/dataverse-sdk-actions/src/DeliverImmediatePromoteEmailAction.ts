import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { email } from "./types/index.js";

/**
 * Response from DeliverImmediatePromoteEmail action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface DeliverImmediatePromoteEmailResponse extends email {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

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
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.DeliverImmediatePromoteEmail`;

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DeliverImmediatePromoteEmailResponse;
    return (await response.json()) as DeliverImmediatePromoteEmailResponse;
  }
}
