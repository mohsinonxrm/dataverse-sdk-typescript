import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SendEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SendEmailResponse {
  "@odata.context"?: string;
  Subject: string;
}

/**
 * Parameters of the SendEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendEmailActionParameters {
  IssueSend: boolean;
  TrackingToken?: string;
}

/**
 * SendEmail action
 *
 * Bound action
 * Binding parameter: entity (mscrm.email)
 *
 * The first argument is the id of the email record to call it on.
 */
export class SendEmailAction implements Executable<SendEmailResponse> {
  constructor(
    public readonly emailId: string,
    public readonly parameters: SendEmailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/emails(${this.emailId})/Microsoft.Dynamics.CRM.SendEmail`;

    const body = requestBody({
      IssueSend: this.parameters.IssueSend,
      TrackingToken: this.parameters.TrackingToken,
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
    return (await response.json()) as SendEmailResponse;
  }
}
