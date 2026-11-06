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
