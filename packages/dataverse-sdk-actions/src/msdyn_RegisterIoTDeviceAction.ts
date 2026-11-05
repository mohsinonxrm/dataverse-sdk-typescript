import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RegisterIoTDevice action
 */
export interface msdyn_RegisterIoTDeviceResponse {
  // No content returned
}

/**
 * msdyn_RegisterIoTDevice action
 *
 * Unbound action
 */
export class msdyn_RegisterIoTDeviceAction implements Executable<msdyn_RegisterIoTDeviceResponse> {
  constructor(public readonly ioTDeviceIds: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterIoTDevice`;

    const body: Record<string, unknown> = {
      IoTDeviceIds: this.ioTDeviceIds,
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

  async parseResponse(response: Response): Promise<msdyn_RegisterIoTDeviceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
