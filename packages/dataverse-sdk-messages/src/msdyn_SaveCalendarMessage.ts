import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SaveCalendarResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SaveCalendar action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveCalendarResult {
  "@odata.context"?: string;
  InnerCalendarIds: string;
}

/**
 * msdyn_SaveCalendar response message
 *
 * `result` is the value the msdyn_SaveCalendar action returns (see {@link msdyn_SaveCalendarResult}).
 */
export class msdyn_SaveCalendarResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveCalendarResult) {
    super("msdyn_SaveCalendar");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SaveCalendarResponse {
    return new msdyn_SaveCalendarResponse(data as msdyn_SaveCalendarResult);
  }
}
