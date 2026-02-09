import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DeleteCalendar request message
 *
 * Web API Action: msdyn_DeleteCalendar
 */
export class msdyn_DeleteCalendarRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeleteCalendarResponse>
{
  constructor(public calendarEventInfo: string) {
    super("msdyn_DeleteCalendar");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteCalendar`;

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

  async parseResponse(response: Response): Promise<msdyn_DeleteCalendarResponse> {
    const data = await response.json();
    return msdyn_DeleteCalendarResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CalendarEventInfo: this.calendarEventInfo,
    };
  }
}

/**
 * msdyn_DeleteCalendar response message
 */
export class msdyn_DeleteCalendarResponse extends OrganizationResponse {
  constructor(public result: msdyn_DeleteCalendarResponse) {
    super("msdyn_DeleteCalendar");
  }

  static fromResponse(data: unknown): msdyn_DeleteCalendarResponse {
    return new msdyn_DeleteCalendarResponse((data as any).value);
  }
}
