import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_D365ChannelsNotificationResponse as msdyn_D365ChannelsNotificationResponseData } from "./types/index.js";

/**
 * msdyn_D365ChannelsNotification request message
 *
 * Web API Action: msdyn_D365ChannelsNotification
 */
export class msdyn_D365ChannelsNotificationRequest
  extends OrganizationRequest
  implements Executable<msdyn_D365ChannelsNotificationResponse>
{
  constructor(public notificationPayLoad: string) {
    super("msdyn_D365ChannelsNotification");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsNotification`;

    const body: Record<string, unknown> = {
      notificationPayLoad: this.notificationPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_D365ChannelsNotificationResponse> {
    const data = await response.json();
    return msdyn_D365ChannelsNotificationResponse.fromResponse(data);
  }
}

/**
 * msdyn_D365ChannelsNotification response message
 */
export class msdyn_D365ChannelsNotificationResponse extends OrganizationResponse {
  constructor(public result: msdyn_D365ChannelsNotificationResponseData) {
    super("msdyn_D365ChannelsNotification");
  }

  static fromResponse(data: unknown): msdyn_D365ChannelsNotificationResponse {
    return new msdyn_D365ChannelsNotificationResponse(
      responseObject<msdyn_D365ChannelsNotificationResponseData>(data)
    );
  }
}
