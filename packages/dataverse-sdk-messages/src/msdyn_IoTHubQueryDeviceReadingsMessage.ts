import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_IoTHubQueryDeviceReadingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTHubQueryDeviceReadings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTHubQueryDeviceReadingsResult {
  "@odata.context"?: string;
  AggregatedDeviceReadings: string;
}

/**
 * msdyn_IoTHubQueryDeviceReadings response message
 *
 * `result` is the value the msdyn_IoTHubQueryDeviceReadings action returns (see {@link msdyn_IoTHubQueryDeviceReadingsResult}).
 */
export class msdyn_IoTHubQueryDeviceReadingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTHubQueryDeviceReadingsResult) {
    super("msdyn_IoTHubQueryDeviceReadings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTHubQueryDeviceReadingsResponse {
    return new msdyn_IoTHubQueryDeviceReadingsResponse(
      data as msdyn_IoTHubQueryDeviceReadingsResult
    );
  }
}
