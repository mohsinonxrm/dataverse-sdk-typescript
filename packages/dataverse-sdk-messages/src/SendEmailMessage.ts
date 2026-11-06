import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SendEmailResponse as SendEmailResponseData } from "./types/index.js";

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
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.SendEmail`;

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
    // 204 No Content is an empty result
    if (response.status === 204) return SendEmailResponse.fromResponse({});
    return SendEmailResponse.fromResponse(await response.json());
  }
}

/**
 * SendEmail response message
 */
export class SendEmailResponse extends OrganizationResponse {
  constructor(public result: SendEmailResponseData) {
    super("SendEmail");
  }

  static fromResponse(data: unknown): SendEmailResponse {
    return new SendEmailResponse(responseObject<SendEmailResponseData>(data));
  }
}
