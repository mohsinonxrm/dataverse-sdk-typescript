import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from SendAppNotification action
 */
export interface SendAppNotificationResponse {
  NotificationId: string;
}

/**
 * SendAppNotification action
 *
 * Unbound action
 */
export class SendAppNotificationAction implements Executable<SendAppNotificationResponse> {
  constructor(
    public readonly recipient: EntityReference,
    public readonly expiry: number,
    public readonly priority: number,
    public readonly overrideContent: EntityReference,
    public readonly title: string,
    public readonly iconType: number,
    public readonly body: string,
    public readonly actions: EntityReference,
    public readonly toastType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendAppNotification`;

    const body: Record<string, unknown> = {
      Recipient: this.recipient,
      Expiry: this.expiry,
      Priority: this.priority,
      OverrideContent: this.overrideContent,
      Title: this.title,
      IconType: this.iconType,
      Body: this.body,
      Actions: this.actions,
      ToastType: this.toastType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SendAppNotificationResponse> {
    const data = await response.json();
    return data as SendAppNotificationResponse;
  }
}
