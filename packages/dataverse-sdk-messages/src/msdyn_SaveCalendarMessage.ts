import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SaveCalendarResponse as msdyn_SaveCalendarResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SaveCalendarResponse> {
    const data = await response.json();
    return msdyn_SaveCalendarResponse.fromResponse(data);
  }
}

/**
 * msdyn_SaveCalendar response message
 */
export class msdyn_SaveCalendarResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveCalendarResponseData) {
    super("msdyn_SaveCalendar");
  }

  static fromResponse(data: unknown): msdyn_SaveCalendarResponse {
    return new msdyn_SaveCalendarResponse(responseObject<msdyn_SaveCalendarResponseData>(data));
  }
}
