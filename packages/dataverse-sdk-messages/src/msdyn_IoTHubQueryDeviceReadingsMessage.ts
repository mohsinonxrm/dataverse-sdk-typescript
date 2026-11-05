import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IoTHubQueryDeviceReadingsResponse as msdyn_IoTHubQueryDeviceReadingsResponseData } from "./types/index.js";

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
}

/**
 * msdyn_IoTHubQueryDeviceReadings response message
 */
export class msdyn_IoTHubQueryDeviceReadingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTHubQueryDeviceReadingsResponseData) {
    super("msdyn_IoTHubQueryDeviceReadings");
  }

  static fromResponse(data: unknown): msdyn_IoTHubQueryDeviceReadingsResponse {
    return new msdyn_IoTHubQueryDeviceReadingsResponse(
      responseObject<msdyn_IoTHubQueryDeviceReadingsResponseData>(data)
    );
  }
}
