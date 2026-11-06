import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DeleteCalendar action
 */
export interface msdyn_DeleteCalendarResponse {
  InnerCalendarIds: string;
}

/**
 * msdyn_DeleteCalendar action
 *
 * Unbound action
 */
export class msdyn_DeleteCalendarAction implements Executable<msdyn_DeleteCalendarResponse> {
  constructor(public readonly calendarEventInfo?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteCalendar`;

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

  async parseResponse(response: Response): Promise<msdyn_DeleteCalendarResponse> {
    const data = await response.json();
    return data as msdyn_DeleteCalendarResponse;
  }
}
