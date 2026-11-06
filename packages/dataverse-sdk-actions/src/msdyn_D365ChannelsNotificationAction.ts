import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_D365ChannelsNotification action
 */
export interface msdyn_D365ChannelsNotificationResponse {
  responseMessage: string;
}

/**
 * Parameters of the msdyn_D365ChannelsNotification action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_D365ChannelsNotificationActionParameters {
  notificationPayLoad: string;
}

/**
 * msdyn_D365ChannelsNotification action
 *
 * Unbound action
 */
export class msdyn_D365ChannelsNotificationAction implements Executable<msdyn_D365ChannelsNotificationResponse> {
  constructor(public readonly parameters: msdyn_D365ChannelsNotificationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsNotification`;

    const body = requestBody({
      notificationPayLoad: this.parameters.notificationPayLoad,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_D365ChannelsNotificationResponse;
  }
}
