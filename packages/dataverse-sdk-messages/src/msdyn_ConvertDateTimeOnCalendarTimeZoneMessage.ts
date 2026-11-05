import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone request message
 *
 * Web API Action: msdyn_ConvertDateTimeOnCalendarTimeZone
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse>
{
  constructor(
    public isDateTimeTza: boolean,
    public calendarId: string,
    public dateTime: string
  ) {
    super("msdyn_ConvertDateTimeOnCalendarTimeZone");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse> {
    const data = await response.json();
    return msdyn_ConvertDateTimeOnCalendarTimeZoneResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IsDateTimeTza: this.isDateTimeTza,
      CalendarId: this.calendarId,
      DateTime: this.dateTime,
    };
  }
}

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone response message
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertDateTimeOnCalendarTimeZoneResponse) {
    super("msdyn_ConvertDateTimeOnCalendarTimeZone");
  }

  static fromResponse(data: unknown): msdyn_ConvertDateTimeOnCalendarTimeZoneResponse {
    return new msdyn_ConvertDateTimeOnCalendarTimeZoneResponse((data as any).value);
  }
}
