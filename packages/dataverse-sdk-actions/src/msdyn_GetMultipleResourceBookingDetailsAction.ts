import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetMultipleResourceBookingDetails action
 */
export interface msdyn_GetMultipleResourceBookingDetailsResponse {
  BookingDetailResult: string;
}

/**
 * msdyn_GetMultipleResourceBookingDetails action
 *
 * Unbound action
 */
export class msdyn_GetMultipleResourceBookingDetailsAction implements Executable<msdyn_GetMultipleResourceBookingDetailsResponse> {
  constructor(
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly timescale: number,
    public readonly schedulerSettings: string,
    public readonly targets: string,
    public readonly considerAppointments: boolean,
    public readonly ignoreTimeZone: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetails`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      Timescale: this.timescale,
      SchedulerSettings: this.schedulerSettings,
      Targets: this.targets,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMultipleResourceBookingDetailsResponse> {
    const data = await response.json();
    return data as msdyn_GetMultipleResourceBookingDetailsResponse;
  }
}
