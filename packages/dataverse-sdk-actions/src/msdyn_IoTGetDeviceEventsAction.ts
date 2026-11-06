import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTGetDeviceEvents action
 */
export interface msdyn_IoTGetDeviceEventsResponse {
  EventsData: string;
}

/**
 * Parameters of the msdyn_IoTGetDeviceEvents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetDeviceEventsActionParameters {
  IotDeviceId: string;
  From: string;
  To: string;
}

/**
 * msdyn_IoTGetDeviceEvents action
 *
 * Unbound action
 */
export class msdyn_IoTGetDeviceEventsAction implements Executable<msdyn_IoTGetDeviceEventsResponse> {
  constructor(public readonly parameters: msdyn_IoTGetDeviceEventsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetDeviceEvents`;

    const body = requestBody({
      IotDeviceId: this.parameters.IotDeviceId,
      From: this.parameters.From,
      To: this.parameters.To,
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
    if (response.status === 204) return {} as msdyn_IoTGetDeviceEventsResponse;
    return (await response.json()) as msdyn_IoTGetDeviceEventsResponse;
  }
}
