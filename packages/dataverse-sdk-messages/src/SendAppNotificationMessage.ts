import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SendAppNotificationResponse as SendAppNotificationResponseData } from "./types/index.js";

/**
 * Parameters of the SendAppNotification message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SendAppNotificationRequestParameters {
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
      Recipient: this.Parameters.Recipient,
      Expiry: this.Parameters.Expiry,
      Priority: this.Parameters.Priority,
      OverrideContent: this.Parameters.OverrideContent,
      Title: this.Parameters.Title,
      IconType: this.Parameters.IconType,
      Body: this.Parameters.Body,
      Actions: this.Parameters.Actions,
      ToastType: this.Parameters.ToastType,
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
    // 204 No Content is an empty result
    if (response.status === 204) return SendAppNotificationResponse.fromResponse({});
    return SendAppNotificationResponse.fromResponse(await response.json());
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
