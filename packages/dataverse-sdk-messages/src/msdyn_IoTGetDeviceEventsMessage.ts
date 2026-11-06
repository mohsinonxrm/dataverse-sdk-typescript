import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IoTGetDeviceEventsResponse as msdyn_IoTGetDeviceEventsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_IoTGetDeviceEventsResponse.fromResponse({});
    return msdyn_IoTGetDeviceEventsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IoTGetDeviceEvents response message
 */
export class msdyn_IoTGetDeviceEventsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetDeviceEventsResponseData) {
    super("msdyn_IoTGetDeviceEvents");
  }

  static fromResponse(data: unknown): msdyn_IoTGetDeviceEventsResponse {
    return new msdyn_IoTGetDeviceEventsResponse(
      responseObject<msdyn_IoTGetDeviceEventsResponseData>(data)
    );
  }
}
