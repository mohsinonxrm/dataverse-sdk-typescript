import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTGetDeviceEvents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetDeviceEventsRequestParameters {
  IotDeviceId: string;
  From: string;
  To: string;
}

/**
 * msdyn_IoTGetDeviceEvents request message
 *
 * Web API Action: msdyn_IoTGetDeviceEvents
 */
export class msdyn_IoTGetDeviceEventsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetDeviceEventsResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTGetDeviceEventsRequestParameters>;

  constructor(parameters: msdyn_IoTGetDeviceEventsRequestParameters) {
    super("msdyn_IoTGetDeviceEvents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetDeviceEvents`;

    const body = requestBody({
      IotDeviceId: this.Parameters.IotDeviceId,
      From: this.Parameters.From,
      To: this.Parameters.To,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetDeviceEventsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IoTGetDeviceEventsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTGetDeviceEvents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetDeviceEventsResult {
  "@odata.context"?: string;
  EventsData: string;
}

/**
 * msdyn_IoTGetDeviceEvents response message
 *
 * `result` is the value the msdyn_IoTGetDeviceEvents action returns (see {@link msdyn_IoTGetDeviceEventsResult}).
 */
export class msdyn_IoTGetDeviceEventsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetDeviceEventsResult) {
    super("msdyn_IoTGetDeviceEvents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTGetDeviceEventsResponse {
    return new msdyn_IoTGetDeviceEventsResponse(data as msdyn_IoTGetDeviceEventsResult);
  }
}
