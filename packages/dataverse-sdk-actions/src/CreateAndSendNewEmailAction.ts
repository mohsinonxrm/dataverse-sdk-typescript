import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateAndSendNewEmail action
 */
export interface CreateAndSendNewEmailResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CreateAndSendNewEmailResponse;
  }
}
