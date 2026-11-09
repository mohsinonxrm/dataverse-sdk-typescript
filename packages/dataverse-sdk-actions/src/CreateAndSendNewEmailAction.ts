import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CreateAndSendNewEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateAndSendNewEmailResponse {
  "@odata.context"?: string;
  EmailId: string;
}

/**
 * Parameters of the CreateAndSendNewEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateAndSendNewEmailActionParameters {
  Subject?: string;
  Body?: string;
  From?: string;
  To?: string;
  Cc?: string;
  Bcc?: string;
  Regarding?: EntityReference | AnyEntityPayload;
  Importance?: number;
}

/**
 * CreateAndSendNewEmail action
 *
 * Unbound action
 */
export class CreateAndSendNewEmailAction implements Executable<CreateAndSendNewEmailResponse> {
  constructor(public readonly parameters: CreateAndSendNewEmailActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAndSendNewEmail`;

    const body = requestBody({
      Subject: this.parameters.Subject,
      Body: this.parameters.Body,
      From: this.parameters.From,
      To: this.parameters.To,
      Cc: this.parameters.Cc,
      Bcc: this.parameters.Bcc,
      Regarding: this.parameters.Regarding,
      Importance: this.parameters.Importance,
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

  async parseResponse(response: Response): Promise<CreateAndSendNewEmailResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CreateAndSendNewEmailResponse;
  }
}
