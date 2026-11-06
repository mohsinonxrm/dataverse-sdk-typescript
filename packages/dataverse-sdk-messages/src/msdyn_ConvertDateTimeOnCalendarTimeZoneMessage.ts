import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ConvertDateTimeOnCalendarTimeZone message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneRequestParameters {
  CalendarId: string;
  DateTime: string;
  IsDateTimeTza: boolean;
}

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone request message
 *
 * Web API Action: msdyn_ConvertDateTimeOnCalendarTimeZone
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConvertDateTimeOnCalendarTimeZoneRequestParameters>;

  constructor(parameters: msdyn_ConvertDateTimeOnCalendarTimeZoneRequestParameters) {
    super("msdyn_ConvertDateTimeOnCalendarTimeZone", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertDateTimeOnCalendarTimeZone`;

    const body = requestBody({
      CalendarId: this.Parameters.CalendarId,
      DateTime: this.Parameters.DateTime,
      IsDateTimeTza: this.Parameters.IsDateTimeTza,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ConvertDateTimeOnCalendarTimeZoneResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ConvertDateTimeOnCalendarTimeZone action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneResult {
  "@odata.context"?: string;
  DateTimeConversionResult: string;
}

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone response message
 *
 * `result` is the value the msdyn_ConvertDateTimeOnCalendarTimeZone action returns (see {@link msdyn_ConvertDateTimeOnCalendarTimeZoneResult}).
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertDateTimeOnCalendarTimeZoneResult) {
    super("msdyn_ConvertDateTimeOnCalendarTimeZone");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ConvertDateTimeOnCalendarTimeZoneResponse {
    return new msdyn_ConvertDateTimeOnCalendarTimeZoneResponse(
      data as msdyn_ConvertDateTimeOnCalendarTimeZoneResult
    );
  }
}
