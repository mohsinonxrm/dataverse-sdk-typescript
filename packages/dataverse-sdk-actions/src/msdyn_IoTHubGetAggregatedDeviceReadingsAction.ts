import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTHubGetAggregatedDeviceReadings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTHubGetAggregatedDeviceReadingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTHubGetAggregatedDeviceReadingsResponse;
  }
}
