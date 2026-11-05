import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTHubGetAggregatedDeviceReadings action
 */
export interface msdyn_IoTHubGetAggregatedDeviceReadingsResponse {
  MeasuresOutput: string;
}

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings action
 *
 * Unbound action
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsAction implements Executable<msdyn_IoTHubGetAggregatedDeviceReadingsResponse> {
  constructor(
    public readonly deviceId: string,
    public readonly measures: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubGetAggregatedDeviceReadings`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      Measures: this.measures,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_IoTHubGetAggregatedDeviceReadingsResponse> {
    const data = await response.json();
    return data as msdyn_IoTHubGetAggregatedDeviceReadingsResponse;
  }
}
