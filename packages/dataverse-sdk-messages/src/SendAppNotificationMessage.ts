import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SendAppNotificationResponse as SendAppNotificationResponseData } from "./types/index.js";

/**
 * SendAppNotification request message
 *
 * Web API Action: SendAppNotification
 */
export class SendAppNotificationRequest
  extends OrganizationRequest
  implements Executable<SendAppNotificationResponse>
{
  constructor(
    public recipient: EntityReference | AnyEntityPayload,
    public expiry: number | undefined,
    public priority: number | undefined,
    public overrideContent: EntityReference | AnyEntityPayload | undefined,
    public title: string,
    public iconType?: number,
    public body?: string,
    public actions?: EntityReference | AnyEntityPayload,
    public toastType?: number
  ) {
    super("SendAppNotification");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SendAppNotificationResponse> {
    const data = await response.json();
    return SendAppNotificationResponse.fromResponse(data);
  }
}

/**
 * SendAppNotification response message
 */
export class SendAppNotificationResponse extends OrganizationResponse {
  constructor(public result: SendAppNotificationResponseData) {
    super("SendAppNotification");
  }

  static fromResponse(data: unknown): SendAppNotificationResponse {
    return new SendAppNotificationResponse(responseObject<SendAppNotificationResponseData>(data));
  }
}
