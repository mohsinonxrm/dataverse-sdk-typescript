import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSummaryBookingsResponse as msdyn_GetSummaryBookingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSummaryBookings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSummaryBookingsRequestParameters {
  ResourceIds: string;
  StartDate: string;
  EndDate: string;
  TimeZoneCode?: number;
  Timescale: number;
  ConsiderAppointments?: boolean;
  ConsiderFirstDayOfWeekSettings?: boolean;
}

/**
 * msdyn_GetSummaryBookings request message
 *
 * Web API Action: msdyn_GetSummaryBookings
 */
export class msdyn_GetSummaryBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSummaryBookingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSummaryBookingsRequestParameters>;

  constructor(parameters: msdyn_GetSummaryBookingsRequestParameters) {
    super("msdyn_GetSummaryBookings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSummaryBookings`;

    const body = requestBody({
      ResourceIds: this.Parameters.ResourceIds,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      TimeZoneCode: this.Parameters.TimeZoneCode,
      Timescale: this.Parameters.Timescale,
      ConsiderAppointments: this.Parameters.ConsiderAppointments,
      ConsiderFirstDayOfWeekSettings: this.Parameters.ConsiderFirstDayOfWeekSettings,
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

  async parseResponse(response: Response): Promise<msdyn_GetSummaryBookingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSummaryBookingsResponse.fromResponse({});
    return msdyn_GetSummaryBookingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSummaryBookings response message
 */
export class msdyn_GetSummaryBookingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSummaryBookingsResponseData) {
    super("msdyn_GetSummaryBookings");
  }

  static fromResponse(data: unknown): msdyn_GetSummaryBookingsResponse {
    return new msdyn_GetSummaryBookingsResponse(
      responseObject<msdyn_GetSummaryBookingsResponseData>(data)
    );
  }
}
