import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTHubGetAggregatedDeviceReadings action
 */
export interface msdyn_IoTHubGetAggregatedDeviceReadingsResponse {
  MeasuresOutput: string;
}

/**
 * Parameters of the msdyn_IoTHubGetAggregatedDeviceReadings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubGetAggregatedDeviceReadingsActionParameters {
  DeviceId: string;
  Measures: string;
}

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings action
 *
 * Unbound action
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsAction implements Executable<msdyn_IoTHubGetAggregatedDeviceReadingsResponse> {
  constructor(
    public readonly parameters: msdyn_IoTHubGetAggregatedDeviceReadingsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubGetAggregatedDeviceReadings`;

    const body = requestBody({
      DeviceId: this.parameters.DeviceId,
      Measures: this.parameters.Measures,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_IoTHubGetAggregatedDeviceReadingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IoTHubGetAggregatedDeviceReadingsResponse;
  }
}
