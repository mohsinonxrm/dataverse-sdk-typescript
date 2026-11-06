import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTHubQueryDeviceReadings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTHubQueryDeviceReadingsResponse {
  "@odata.context"?: string;
  AggregatedDeviceReadings: string;
}

/**
 * Parameters of the msdyn_IoTHubQueryDeviceReadings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubQueryDeviceReadingsActionParameters {
  From: string;
  To: string;
  Interval: string;
  IotDeviceId: string;
}

/**
 * msdyn_IoTHubQueryDeviceReadings action
 *
 * Unbound action
 */
export class msdyn_IoTHubQueryDeviceReadingsAction implements Executable<msdyn_IoTHubQueryDeviceReadingsResponse> {
  constructor(public readonly parameters: msdyn_IoTHubQueryDeviceReadingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubQueryDeviceReadings`;

    const body = requestBody({
      From: this.parameters.From,
      To: this.parameters.To,
      Interval: this.parameters.Interval,
      IotDeviceId: this.parameters.IotDeviceId,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubQueryDeviceReadingsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTHubQueryDeviceReadingsResponse;
  }
}
