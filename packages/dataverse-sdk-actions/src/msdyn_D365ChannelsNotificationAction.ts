import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_D365ChannelsNotification action
 */
export interface msdyn_D365ChannelsNotificationResponse {
  responseMessage: string;
}

/**
 * msdyn_D365ChannelsNotification action
 *
 * Unbound action
 */
export class msdyn_D365ChannelsNotificationAction implements Executable<msdyn_D365ChannelsNotificationResponse> {
  constructor(public readonly notificationPayLoad: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_D365ChannelsNotification`;

    const body: Record<string, unknown> = {
      notificationPayLoad: this.notificationPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_D365ChannelsNotificationResponse> {
    const data = await response.json();
    return data as msdyn_D365ChannelsNotificationResponse;
  }
}
