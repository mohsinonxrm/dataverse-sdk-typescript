import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DeleteCalendar action
 */
export interface msdyn_DeleteCalendarResponse {
  InnerCalendarIds: string;
}

/**
 * Parameters of the msdyn_DeleteCalendar action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeleteCalendarActionParameters {
  CalendarEventInfo?: string;
}

/**
 * msdyn_DeleteCalendar action
 *
 * Unbound action
 */
export class msdyn_DeleteCalendarAction implements Executable<msdyn_DeleteCalendarResponse> {
  constructor(public readonly parameters: msdyn_DeleteCalendarActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteCalendar`;

    const body = requestBody({
      CalendarEventInfo: this.parameters.CalendarEventInfo,
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

  async parseResponse(response: Response): Promise<msdyn_DeleteCalendarResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DeleteCalendarResponse;
    return (await response.json()) as msdyn_DeleteCalendarResponse;
  }
}
