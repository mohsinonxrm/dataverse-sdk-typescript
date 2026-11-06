import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CreateAndSendNewEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateAndSendNewEmailRequestParameters {
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
 * CreateAndSendNewEmail request message
 *
 * Web API Action: CreateAndSendNewEmail
 */
export class CreateAndSendNewEmailRequest
  extends OrganizationRequest
  implements Executable<CreateAndSendNewEmailResponse>
{
  declare readonly Parameters: Readonly<CreateAndSendNewEmailRequestParameters>;

  constructor(parameters: CreateAndSendNewEmailRequestParameters = {}) {
    super("CreateAndSendNewEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAndSendNewEmail`;

    const body = requestBody({
      Subject: this.Parameters.Subject,
      Body: this.Parameters.Body,
      From: this.Parameters.From,
      To: this.Parameters.To,
      Cc: this.Parameters.Cc,
      Bcc: this.Parameters.Bcc,
      Regarding: this.Parameters.Regarding,
      Importance: this.Parameters.Importance,
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
    return CreateAndSendNewEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateAndSendNewEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateAndSendNewEmailResult {
  "@odata.context"?: string;
  EmailId: string;
}

/**
 * CreateAndSendNewEmail response message
 *
 * `result` is the value the CreateAndSendNewEmail action returns (see {@link CreateAndSendNewEmailResult}).
 */
export class CreateAndSendNewEmailResponse extends OrganizationResponse {
  constructor(public result: CreateAndSendNewEmailResult) {
    super("CreateAndSendNewEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateAndSendNewEmailResponse {
    return new CreateAndSendNewEmailResponse(data as CreateAndSendNewEmailResult);
  }
}
