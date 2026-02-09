import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SaveCalendar request message
 *
 * Web API Action: msdyn_SaveCalendar
 */
export class msdyn_SaveCalendarRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveCalendarResponse>
{
  constructor(public calendarEventInfo: string) {
    super("msdyn_SaveCalendar");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveCalendar`;

    const body: Record<string, unknown> = {
      CalendarEventInfo: this.calendarEventInfo,
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

  async parseResponse(response: Response): Promise<msdyn_SaveCalendarResponse> {
    const data = await response.json();
    return msdyn_SaveCalendarResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CalendarEventInfo: this.calendarEventInfo,
    };
  }
}

/**
 * msdyn_SaveCalendar response message
 */
export class msdyn_SaveCalendarResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveCalendarResponse) {
    super("msdyn_SaveCalendar");
  }

  static fromResponse(data: unknown): msdyn_SaveCalendarResponse {
    return new msdyn_SaveCalendarResponse((data as any).value);
  }
}
