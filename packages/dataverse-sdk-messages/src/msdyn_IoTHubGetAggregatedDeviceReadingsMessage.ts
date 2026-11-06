import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_IoTHubGetAggregatedDeviceReadingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTHubGetAggregatedDeviceReadings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTHubGetAggregatedDeviceReadingsResult {
  "@odata.context"?: string;
  MeasuresOutput: string;
}

/**
 * msdyn_IoTHubGetAggregatedDeviceReadings response message
 *
 * `result` is the value the msdyn_IoTHubGetAggregatedDeviceReadings action returns (see {@link msdyn_IoTHubGetAggregatedDeviceReadingsResult}).
 */
export class msdyn_IoTHubGetAggregatedDeviceReadingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTHubGetAggregatedDeviceReadingsResult) {
    super("msdyn_IoTHubGetAggregatedDeviceReadings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTHubGetAggregatedDeviceReadingsResponse {
    return new msdyn_IoTHubGetAggregatedDeviceReadingsResponse(
      data as msdyn_IoTHubGetAggregatedDeviceReadingsResult
    );
  }
}
