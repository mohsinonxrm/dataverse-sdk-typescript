import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConvertDateTimeOnCalendarTimeZone action
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneResponse {
  DateTimeConversionResult: string;
}

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone action
 *
 * Unbound action
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneAction implements Executable<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse> {
  constructor(
    public readonly isDateTimeTza: boolean,
    public readonly calendarId: string,
    public readonly dateTime: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertDateTimeOnCalendarTimeZone`;

    const body: Record<string, unknown> = {
      IsDateTimeTza: this.isDateTimeTza,
      CalendarId: this.calendarId,
      DateTime: this.dateTime,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse> {
    const data = await response.json();
    return data as msdyn_ConvertDateTimeOnCalendarTimeZoneResponse;
  }
}
