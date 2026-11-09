import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SendEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendEmailRequestParameters {
  IssueSend: boolean;
  TrackingToken?: string;
}

/**
 * SendEmail request message
 *
 * Web API Action: SendEmail
 *
 * The first argument is the id of the email record to call it on.
 */
export class SendEmailRequest extends OrganizationRequest implements Executable<SendEmailResponse> {
  declare readonly Parameters: Readonly<SendEmailRequestParameters>;

  constructor(
    public emailId: string,
    parameters: SendEmailRequestParameters
  ) {
    super("SendEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${odataLiteral.guid(this.emailId)})/Microsoft.Dynamics.CRM.SendEmail`;

    const body = requestBody({
      IssueSend: this.Parameters.IssueSend,
      TrackingToken: this.Parameters.TrackingToken,
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

  async parseResponse(response: Response): Promise<SendEmailResponse> {
    // The body is the complex value, with its @odata.context
    return SendEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SendEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SendEmailResult {
  "@odata.context"?: string;
  Subject: string;
}

/**
 * SendEmail response message
 *
 * `result` is the value the SendEmail action returns (see {@link SendEmailResult}).
 */
export class SendEmailResponse extends OrganizationResponse {
  constructor(public result: SendEmailResult) {
    super("SendEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SendEmailResponse {
    return new SendEmailResponse(data as SendEmailResult);
  }
}
