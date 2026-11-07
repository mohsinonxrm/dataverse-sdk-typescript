import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the SendAppNotification message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendAppNotificationRequestParameters {
  Body?: string;
  OverrideContent?: EntityReference | AnyEntityPayload;
  Actions?: EntityReference | AnyEntityPayload;
  Recipient: EntityReference | AnyEntityPayload;
  IconType?: number;
  Expiry?: number;
  Priority?: number;
  ToastType?: number;
  Title: string;
}

/**
 * SendAppNotification request message
 *
 * Web API Action: SendAppNotification
 */
export class SendAppNotificationRequest
  extends OrganizationRequest
  implements Executable<SendAppNotificationResponse>
{
  declare readonly Parameters: Readonly<SendAppNotificationRequestParameters>;

  constructor(parameters: SendAppNotificationRequestParameters) {
    super("SendAppNotification", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendAppNotification`;

    const body = requestBody({
      Body: this.Parameters.Body,
      OverrideContent: this.Parameters.OverrideContent,
      Actions: this.Parameters.Actions,
      Recipient: this.Parameters.Recipient,
      IconType: this.Parameters.IconType,
      Expiry: this.Parameters.Expiry,
      Priority: this.Parameters.Priority,
      ToastType: this.Parameters.ToastType,
      Title: this.Parameters.Title,
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

  async parseResponse(response: Response): Promise<SendAppNotificationResponse> {
    // The body is the complex value, with its @odata.context
    return SendAppNotificationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SendAppNotification action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SendAppNotificationResult {
  "@odata.context"?: string;
  NotificationId: string;
}

/**
 * SendAppNotification response message
 *
 * `result` is the value the SendAppNotification action returns (see {@link SendAppNotificationResult}).
 */
export class SendAppNotificationResponse extends OrganizationResponse {
  constructor(public result: SendAppNotificationResult) {
    super("SendAppNotification");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SendAppNotificationResponse {
    return new SendAppNotificationResponse(data as SendAppNotificationResult);
  }
}
