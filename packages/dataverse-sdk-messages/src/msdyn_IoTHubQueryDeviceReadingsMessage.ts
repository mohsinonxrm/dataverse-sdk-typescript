import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTHubQueryDeviceReadings request message
 *
 * Web API Action: msdyn_IoTHubQueryDeviceReadings
 */
export class msdyn_IoTHubQueryDeviceReadingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubQueryDeviceReadingsResponse>
{
  constructor(
    public from: string,
    public to: string,
    public interval: string,
    public iotDeviceId: string
  ) {
    super("msdyn_IoTHubQueryDeviceReadings");
  }

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
    return msdyn_IoTHubQueryDeviceReadingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      From: this.from,
      To: this.to,
      Interval: this.interval,
      IotDeviceId: this.iotDeviceId,
    };
  }
}

/**
 * msdyn_IoTHubQueryDeviceReadings response message
 */
export class msdyn_IoTHubQueryDeviceReadingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTHubQueryDeviceReadingsResponse) {
    super("msdyn_IoTHubQueryDeviceReadings");
  }

  static fromResponse(data: unknown): msdyn_IoTHubQueryDeviceReadingsResponse {
    return new msdyn_IoTHubQueryDeviceReadingsResponse((data as any).value);
  }
}
