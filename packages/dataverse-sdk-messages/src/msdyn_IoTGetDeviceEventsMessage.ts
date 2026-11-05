import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTGetDeviceEvents request message
 *
 * Web API Action: msdyn_IoTGetDeviceEvents
 */
export class msdyn_IoTGetDeviceEventsRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetDeviceEventsResponse>
{
  constructor(
    public iotDeviceId: string,
    public from: string,
    public to: string
  ) {
    super("msdyn_IoTGetDeviceEvents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetDeviceEvents`;

    const body: Record<string, unknown> = {
      IotDeviceId: this.iotDeviceId,
      From: this.from,
      To: this.to,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetDeviceEventsResponse> {
    const data = await response.json();
    return msdyn_IoTGetDeviceEventsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IotDeviceId: this.iotDeviceId,
      From: this.from,
      To: this.to,
    };
  }
}

/**
 * msdyn_IoTGetDeviceEvents response message
 */
export class msdyn_IoTGetDeviceEventsResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetDeviceEventsResponse) {
    super("msdyn_IoTGetDeviceEvents");
  }

  static fromResponse(data: unknown): msdyn_IoTGetDeviceEventsResponse {
    return new msdyn_IoTGetDeviceEventsResponse((data as any).value);
  }
}
