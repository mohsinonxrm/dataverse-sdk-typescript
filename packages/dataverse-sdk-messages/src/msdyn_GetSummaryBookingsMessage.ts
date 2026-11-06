import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSummaryBookingsResponse as msdyn_GetSummaryBookingsResponseData } from "./types/index.js";

/**
 * msdyn_GetSummaryBookings request message
 *
 * Web API Action: msdyn_GetSummaryBookings
 */
export class msdyn_GetSummaryBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSummaryBookingsResponse>
{
  constructor(
    public resourceIds: string,
    public startDate: string,
    public endDate: string,
    public timeZoneCode: number | undefined,
    public timescale: number,
    public considerAppointments?: boolean,
    public considerFirstDayOfWeekSettings?: boolean
  ) {
    super("msdyn_GetSummaryBookings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSummaryBookings`;

    const body: Record<string, unknown> = {
      ResourceIds: this.resourceIds,
      StartDate: this.startDate,
      EndDate: this.endDate,
      TimeZoneCode: this.timeZoneCode,
      Timescale: this.timescale,
      ConsiderAppointments: this.considerAppointments,
      ConsiderFirstDayOfWeekSettings: this.considerFirstDayOfWeekSettings,
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

  async parseResponse(response: Response): Promise<msdyn_GetSummaryBookingsResponse> {
    const data = await response.json();
    return msdyn_GetSummaryBookingsResponse.fromResponse(data);
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
