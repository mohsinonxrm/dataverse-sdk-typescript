import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResourceBookingDetails action
 */
export interface msdyn_GetResourceBookingDetailsResponse {
  BookingDetailResult: string;
}

/**
 * msdyn_GetResourceBookingDetails action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bookableresource)
 */
export class msdyn_GetResourceBookingDetailsAction implements Executable<msdyn_GetResourceBookingDetailsResponse> {
  constructor(
    public readonly bookableresourceId: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly timescale: number,
    public readonly schedulerSettings: string,
    public readonly considerAppointments: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresources(${this.bookableresourceId})/Microsoft.Dynamics.CRM.msdyn_GetResourceBookingDetails`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      Timescale: this.timescale,
      SchedulerSettings: this.schedulerSettings,
      ConsiderAppointments: this.considerAppointments,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingDetailsResponse> {
    const data = await response.json();
    return data as msdyn_GetResourceBookingDetailsResponse;
  }
}
