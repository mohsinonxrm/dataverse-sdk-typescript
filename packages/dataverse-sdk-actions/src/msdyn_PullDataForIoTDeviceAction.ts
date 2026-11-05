import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PullDataForIoTDevice action
 */
export interface msdyn_PullDataForIoTDeviceResponse {
  // No content returned
}

/**
 * msdyn_PullDataForIoTDevice action
 *
 * Unbound action
 */
export class msdyn_PullDataForIoTDeviceAction implements Executable<msdyn_PullDataForIoTDeviceResponse> {
  constructor(
    public readonly isScheduledDataPull: boolean,
    public readonly ioTDeviceIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PullDataForIoTDevice`;

    const body: Record<string, unknown> = {
      IsScheduledDataPull: this.isScheduledDataPull,
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

  async parseResponse(response: Response): Promise<msdyn_PullDataForIoTDeviceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
