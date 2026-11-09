import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_DeleteCalendarResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DeleteCalendar action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DeleteCalendarResult {
  "@odata.context"?: string;
  InnerCalendarIds: string;
}

/**
 * msdyn_DeleteCalendar response message
 *
 * `result` is the value the msdyn_DeleteCalendar action returns (see {@link msdyn_DeleteCalendarResult}).
 */
export class msdyn_DeleteCalendarResponse extends OrganizationResponse {
  constructor(public result: msdyn_DeleteCalendarResult) {
    super("msdyn_DeleteCalendar");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DeleteCalendarResponse {
    return new msdyn_DeleteCalendarResponse(data as msdyn_DeleteCalendarResult);
  }
}
