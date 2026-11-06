import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ConvertDateTimeOnCalendarTimeZone action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneResponse {
  "@odata.context"?: string;
  DateTimeConversionResult: string;
}

/**
 * Parameters of the msdyn_ConvertDateTimeOnCalendarTimeZone action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneActionParameters {
  CalendarId: string;
  DateTime: string;
  IsDateTimeTza: boolean;
}

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone action
 *
 * Unbound action
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneAction implements Executable<msdyn_ConvertDateTimeOnCalendarTimeZoneResponse> {
  constructor(
    public readonly parameters: msdyn_ConvertDateTimeOnCalendarTimeZoneActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertDateTimeOnCalendarTimeZone`;

    const body = requestBody({
      CalendarId: this.parameters.CalendarId,
      DateTime: this.parameters.DateTime,
      IsDateTimeTza: this.parameters.IsDateTimeTza,
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
    return (await response.json()) as msdyn_ConvertDateTimeOnCalendarTimeZoneResponse;
  }
}
