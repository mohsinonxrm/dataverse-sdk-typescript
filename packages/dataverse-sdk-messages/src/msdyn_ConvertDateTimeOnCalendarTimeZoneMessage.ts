import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConvertDateTimeOnCalendarTimeZoneResponse as msdyn_ConvertDateTimeOnCalendarTimeZoneResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ConvertDateTimeOnCalendarTimeZone message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertDateTimeOnCalendarTimeZoneRequestParameters {
  IsDateTimeTza: boolean;
  CalendarId: string;
  DateTime: string;
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
      IsDateTimeTza: this.Parameters.IsDateTimeTza,
      CalendarId: this.Parameters.CalendarId,
      DateTime: this.Parameters.DateTime,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ConvertDateTimeOnCalendarTimeZoneResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_ConvertDateTimeOnCalendarTimeZone response message
 */
export class msdyn_ConvertDateTimeOnCalendarTimeZoneResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConvertDateTimeOnCalendarTimeZoneResponseData) {
    super("msdyn_ConvertDateTimeOnCalendarTimeZone");
  }

  static fromResponse(data: unknown): msdyn_ConvertDateTimeOnCalendarTimeZoneResponse {
    return new msdyn_ConvertDateTimeOnCalendarTimeZoneResponse(
      responseObject<msdyn_ConvertDateTimeOnCalendarTimeZoneResponseData>(data)
    );
  }
}
