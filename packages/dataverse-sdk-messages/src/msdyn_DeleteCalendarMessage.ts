import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DeleteCalendarResponse as msdyn_DeleteCalendarResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DeleteCalendar message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeleteCalendarRequestParameters {
  CalendarEventInfo?: string;
}

/**
 * msdyn_DeleteCalendar request message
 *
 * Web API Action: msdyn_DeleteCalendar
 */
export class msdyn_DeleteCalendarRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeleteCalendarResponse>
{
  declare readonly Parameters: Readonly<msdyn_DeleteCalendarRequestParameters>;

  constructor(parameters: msdyn_DeleteCalendarRequestParameters = {}) {
    super("msdyn_DeleteCalendar", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeleteCalendar`;

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

  async parseResponse(response: Response): Promise<msdyn_DeleteCalendarResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_DeleteCalendarResponse.fromResponse({});
    return msdyn_DeleteCalendarResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_DeleteCalendar response message
 */
export class msdyn_DeleteCalendarResponse extends OrganizationResponse {
  constructor(public result: msdyn_DeleteCalendarResponseData) {
    super("msdyn_DeleteCalendar");
  }

  static fromResponse(data: unknown): msdyn_DeleteCalendarResponse {
    return new msdyn_DeleteCalendarResponse(responseObject<msdyn_DeleteCalendarResponseData>(data));
  }
}
