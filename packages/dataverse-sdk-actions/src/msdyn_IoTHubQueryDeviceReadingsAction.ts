import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTHubQueryDeviceReadings action
 */
export interface msdyn_IoTHubQueryDeviceReadingsResponse {
  AggregatedDeviceReadings: string;
}

/**
 * msdyn_IoTHubQueryDeviceReadings action
 *
 * Unbound action
 */
export class msdyn_IoTHubQueryDeviceReadingsAction implements Executable<msdyn_IoTHubQueryDeviceReadingsResponse> {
  constructor(
    public readonly from: string,
    public readonly to: string,
    public readonly interval: string,
    public readonly iotDeviceId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubQueryDeviceReadings`;

    const body: Record<string, unknown> = {
      From: this.from,
      To: this.to,
      Interval: this.interval,
      IotDeviceId: this.iotDeviceId,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubQueryDeviceReadingsResponse> {
    const data = await response.json();
    return data as msdyn_IoTHubQueryDeviceReadingsResponse;
  }
}
