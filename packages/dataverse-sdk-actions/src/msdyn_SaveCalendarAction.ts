import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SaveCalendar action
 */
export interface msdyn_SaveCalendarResponse {
  InnerCalendarIds: string;
}

/**
 * msdyn_SaveCalendar action
 *
 * Unbound action
 */
export class msdyn_SaveCalendarAction implements Executable<msdyn_SaveCalendarResponse> {
  constructor(public readonly calendarEventInfo: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveCalendar`;

    const body: Record<string, unknown> = {
      CalendarEventInfo: this.calendarEventInfo,
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

  async parseResponse(response: Response): Promise<msdyn_SaveCalendarResponse> {
    const data = await response.json();
    return data as msdyn_SaveCalendarResponse;
  }
}
