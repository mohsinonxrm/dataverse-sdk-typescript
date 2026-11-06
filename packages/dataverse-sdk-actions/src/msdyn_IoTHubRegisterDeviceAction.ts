import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTHubRegisterDevice action
 */
export interface msdyn_IoTHubRegisterDeviceResponse {
  // No content returned
}

/**
 * msdyn_IoTHubRegisterDevice action
 *
 * Unbound action
 */
export class msdyn_IoTHubRegisterDeviceAction implements Executable<msdyn_IoTHubRegisterDeviceResponse> {
  constructor(public readonly entityCollection?: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubRegisterDevice`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubRegisterDeviceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
