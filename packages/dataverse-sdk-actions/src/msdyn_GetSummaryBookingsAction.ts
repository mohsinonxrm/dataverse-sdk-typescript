import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSummaryBookings action
 */
export interface msdyn_GetSummaryBookingsResponse {
  SummaryBookings: string;
}

/**
 * msdyn_GetSummaryBookings action
 *
 * Unbound action
 */
export class msdyn_GetSummaryBookingsAction implements Executable<msdyn_GetSummaryBookingsResponse> {
  constructor(
    public readonly resourceIds: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly timeZoneCode: number,
    public readonly timescale: number,
    public readonly considerAppointments: boolean,
    public readonly considerFirstDayOfWeekSettings: boolean
  ) {}

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
    return data as msdyn_GetSummaryBookingsResponse;
  }
}
