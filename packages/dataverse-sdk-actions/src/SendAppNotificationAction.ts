import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from SendAppNotification action
 */
export interface SendAppNotificationResponse {
  NotificationId: string;
}

/**
 * Parameters of the SendAppNotification action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendAppNotificationActionParameters {
  Recipient: EntityReference | AnyEntityPayload;
  Expiry?: number;
  Priority?: number;
  OverrideContent?: EntityReference | AnyEntityPayload;
  Title: string;
  IconType?: number;
  Body?: string;
  Actions?: EntityReference | AnyEntityPayload;
  ToastType?: number;
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
      Recipient: this.parameters.Recipient,
      Expiry: this.parameters.Expiry,
      Priority: this.parameters.Priority,
      OverrideContent: this.parameters.OverrideContent,
      Title: this.parameters.Title,
      IconType: this.parameters.IconType,
      Body: this.parameters.Body,
      Actions: this.parameters.Actions,
      ToastType: this.parameters.ToastType,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SendAppNotificationResponse;
  }
}
