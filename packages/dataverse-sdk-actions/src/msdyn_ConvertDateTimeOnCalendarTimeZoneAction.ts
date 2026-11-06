import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ConvertDateTimeOnCalendarTimeZone action
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneResponse {
  DateTimeConversionResult: string;
}

/**
 * Parameters of the msdyn_ConvertDateTimeOnCalendarTimeZone action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneActionParameters {
  IsDateTimeTza: boolean;
  CalendarId: string;
  DateTime: string;
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
      IsDateTimeTza: this.parameters.IsDateTimeTza,
      CalendarId: this.parameters.CalendarId,
      DateTime: this.parameters.DateTime,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ConvertDateTimeOnCalendarTimeZoneResponse;
    return (await response.json()) as msdyn_ConvertDateTimeOnCalendarTimeZoneResponse;
  }
}
