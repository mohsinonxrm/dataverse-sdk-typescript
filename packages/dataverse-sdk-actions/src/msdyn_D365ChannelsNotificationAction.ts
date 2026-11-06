import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_D365ChannelsNotification action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_D365ChannelsNotificationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_D365ChannelsNotificationResponse;
  }
}
