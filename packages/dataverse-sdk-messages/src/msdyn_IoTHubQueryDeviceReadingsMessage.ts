import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTHubQueryDeviceReadingsResponse as msdyn_IoTHubQueryDeviceReadingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IoTHubQueryDeviceReadings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubQueryDeviceReadingsRequestParameters {
  From: string;
  To: string;
  Interval: string;
  IotDeviceId: string;
}

/**
 * msdyn_IoTHubQueryDeviceReadings request message
 *
 * Web API Action: msdyn_IoTHubQueryDeviceReadings
 */
export class msdyn_IoTHubQueryDeviceReadingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubQueryDeviceReadingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTHubQueryDeviceReadingsRequestParameters>;

  constructor(parameters: msdyn_IoTHubQueryDeviceReadingsRequestParameters) {
    super("msdyn_IoTHubQueryDeviceReadings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubQueryDeviceReadings`;

    const body = requestBody({
      From: this.Parameters.From,
      To: this.Parameters.To,
      Interval: this.Parameters.Interval,
      IotDeviceId: this.Parameters.IotDeviceId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_IoTHubQueryDeviceReadingsResponse.fromResponse(text ? JSON.parse(text) : {});
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
