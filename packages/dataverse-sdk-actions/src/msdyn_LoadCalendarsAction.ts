import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_LoadCalendars action
 */
export interface msdyn_LoadCalendarsResponse {
  CalendarEvents: string;
}

/**
 * Parameters of the msdyn_LoadCalendars action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LoadCalendarsActionParameters {
  LoadCalendarsInput: string;
}

/**
 * msdyn_LoadCalendars action
 *
 * Unbound action
 */
export class msdyn_LoadCalendarsAction implements Executable<msdyn_LoadCalendarsResponse> {
  constructor(public readonly parameters: msdyn_LoadCalendarsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LoadCalendars`;

    const body = requestBody({
      LoadCalendarsInput: this.parameters.LoadCalendarsInput,
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

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_LoadCalendarsResponse;
    return (await response.json()) as msdyn_LoadCalendarsResponse;
  }
}
