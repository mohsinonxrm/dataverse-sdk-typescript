import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTHubGetAggregatedDeviceReadingsResponse as msdyn_IoTHubGetAggregatedDeviceReadingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IoTHubGetAggregatedDeviceReadings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubGetAggregatedDeviceReadingsRequestParameters {
  DeviceId: string;
  Measures: string;
}

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings request message
 *
 * Web API Action: msdyn_IoTHubGetAggregatedDeviceReadings
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubGetAggregatedDeviceReadingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTHubGetAggregatedDeviceReadingsRequestParameters>;

  constructor(parameters: msdyn_IoTHubGetAggregatedDeviceReadingsRequestParameters) {
    super("msdyn_IoTHubGetAggregatedDeviceReadings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubGetAggregatedDeviceReadings`;

    const body = requestBody({
      DeviceId: this.Parameters.DeviceId,
      Measures: this.Parameters.Measures,
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
    return msdyn_IoTHubGetAggregatedDeviceReadingsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings response message
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTHubGetAggregatedDeviceReadingsResponseData) {
    super("msdyn_IoTHubGetAggregatedDeviceReadings");
  }

  static fromResponse(data: unknown): msdyn_IoTHubGetAggregatedDeviceReadingsResponse {
    return new msdyn_IoTHubGetAggregatedDeviceReadingsResponse(
      responseObject<msdyn_IoTHubGetAggregatedDeviceReadingsResponseData>(data)
    );
  }
}
