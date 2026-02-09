import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTHubPullDeviceData action
 */
export interface msdyn_IoTHubPullDeviceDataResponse {
  // No content returned
}

/**
 * msdyn_IoTHubPullDeviceData action
 *
 * Unbound action
 */
export class msdyn_IoTHubPullDeviceDataAction implements Executable<msdyn_IoTHubPullDeviceDataResponse> {
  constructor(public readonly entityCollection: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubPullDeviceData`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubPullDeviceDataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
