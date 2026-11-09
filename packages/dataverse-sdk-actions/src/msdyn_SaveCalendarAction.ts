import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveCalendar action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveCalendarResponse {
  "@odata.context"?: string;
  InnerCalendarIds: string;
}

/**
 * Parameters of the msdyn_SaveCalendar action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveCalendarActionParameters {
  CalendarEventInfo: string;
}

/**
 * msdyn_SaveCalendar action
 *
 * Unbound action
 */
export class msdyn_SaveCalendarAction implements Executable<msdyn_SaveCalendarResponse> {
  constructor(public readonly parameters: msdyn_SaveCalendarActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveCalendar`;

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

  async parseResponse(response: Response): Promise<msdyn_SaveCalendarResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveCalendarResponse;
  }
}
