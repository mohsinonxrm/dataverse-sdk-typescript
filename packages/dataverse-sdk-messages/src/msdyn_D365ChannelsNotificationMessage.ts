import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_D365ChannelsNotificationResponse as msdyn_D365ChannelsNotificationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_D365ChannelsNotification message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_D365ChannelsNotificationRequestParameters {
  notificationPayLoad: string;
}

/**
 * msdyn_D365ChannelsNotification request message
 *
 * Web API Action: msdyn_D365ChannelsNotification
 */
export class msdyn_D365ChannelsNotificationRequest
  extends OrganizationRequest
  implements Executable<msdyn_D365ChannelsNotificationResponse>
{
  declare readonly Parameters: Readonly<msdyn_D365ChannelsNotificationRequestParameters>;

  constructor(parameters: msdyn_D365ChannelsNotificationRequestParameters) {
    super("msdyn_D365ChannelsNotification", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsNotification`;

    const body = requestBody({
      notificationPayLoad: this.Parameters.notificationPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_D365ChannelsNotificationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_D365ChannelsNotificationResponse.fromResponse({});
    return msdyn_D365ChannelsNotificationResponse.fromResponse(await response.json());
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
