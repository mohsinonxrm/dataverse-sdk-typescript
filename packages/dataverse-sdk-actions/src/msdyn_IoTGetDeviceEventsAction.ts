import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTGetDeviceEvents action
 */
export interface msdyn_IoTGetDeviceEventsResponse {
  EventsData: string;
}

/**
 * msdyn_IoTGetDeviceEvents action
 *
 * Unbound action
 */
export class msdyn_IoTGetDeviceEventsAction implements Executable<msdyn_IoTGetDeviceEventsResponse> {
  constructor(
    public readonly iotDeviceId: string,
    public readonly from: string,
    public readonly to: string
  ) {}

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
    return data as msdyn_IoTGetDeviceEventsResponse;
  }
}
