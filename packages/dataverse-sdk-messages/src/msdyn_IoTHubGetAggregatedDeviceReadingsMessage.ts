import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings request message
 *
 * Web API Action: msdyn_IoTHubGetAggregatedDeviceReadings
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubGetAggregatedDeviceReadingsResponse>
{
  constructor(
    public deviceId: string,
    public measures: string
  ) {
    super("msdyn_IoTHubGetAggregatedDeviceReadings");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_IoTHubGetAggregatedDeviceReadingsResponse> {
    const data = await response.json();
    return msdyn_IoTHubGetAggregatedDeviceReadingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      DeviceId: this.deviceId,
      Measures: this.measures,
    };
  }
}

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings response message
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTHubGetAggregatedDeviceReadingsResponse) {
    super("msdyn_IoTHubGetAggregatedDeviceReadings");
  }

  static fromResponse(data: unknown): msdyn_IoTHubGetAggregatedDeviceReadingsResponse {
    return new msdyn_IoTHubGetAggregatedDeviceReadingsResponse((data as any).value);
  }
}
