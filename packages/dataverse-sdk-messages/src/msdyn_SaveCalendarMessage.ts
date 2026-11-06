import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveCalendarResponse as msdyn_SaveCalendarResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SaveCalendar message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveCalendarRequestParameters {
  CalendarEventInfo: string;
}

/**
 * msdyn_SaveCalendar request message
 *
 * Web API Action: msdyn_SaveCalendar
 */
export class msdyn_SaveCalendarRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveCalendarResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveCalendarRequestParameters>;

  constructor(parameters: msdyn_SaveCalendarRequestParameters) {
    super("msdyn_SaveCalendar", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveCalendar`;

    const body = requestBody({
      CalendarEventInfo: this.Parameters.CalendarEventInfo,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SaveCalendarResponse.fromResponse(text ? JSON.parse(text) : {});
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
