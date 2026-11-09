import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the SendAppNotification action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SendAppNotificationResponse {
  "@odata.context"?: string;
  NotificationId: string;
}

/**
 * Parameters of the SendAppNotification action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendAppNotificationActionParameters {
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
 * SendAppNotification action
 *
 * Unbound action
 */
export class SendAppNotificationAction implements Executable<SendAppNotificationResponse> {
  constructor(public readonly parameters: SendAppNotificationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendAppNotification`;

    const body = requestBody({
      Body: this.parameters.Body,
      OverrideContent: this.parameters.OverrideContent,
      Actions: this.parameters.Actions,
      Recipient: this.parameters.Recipient,
      IconType: this.parameters.IconType,
      Expiry: this.parameters.Expiry,
      Priority: this.parameters.Priority,
      ToastType: this.parameters.ToastType,
      Title: this.parameters.Title,
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
    return (await response.json()) as SendAppNotificationResponse;
  }
}
