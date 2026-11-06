import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSummaryBookings action
 */
export interface msdyn_GetSummaryBookingsResponse {
  SummaryBookings: string;
}

/**
 * Parameters of the msdyn_GetSummaryBookings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSummaryBookingsActionParameters {
  ResourceIds: string;
  StartDate: string;
  EndDate: string;
  TimeZoneCode?: number;
  Timescale: number;
  ConsiderAppointments?: boolean;
  ConsiderFirstDayOfWeekSettings?: boolean;
}

/**
 * msdyn_GetSummaryBookings action
 *
 * Unbound action
 */
export class msdyn_GetSummaryBookingsAction implements Executable<msdyn_GetSummaryBookingsResponse> {
  constructor(public readonly parameters: msdyn_GetSummaryBookingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSummaryBookings`;

    const body = requestBody({
      ResourceIds: this.parameters.ResourceIds,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      TimeZoneCode: this.parameters.TimeZoneCode,
      Timescale: this.parameters.Timescale,
      ConsiderAppointments: this.parameters.ConsiderAppointments,
      ConsiderFirstDayOfWeekSettings: this.parameters.ConsiderFirstDayOfWeekSettings,
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
    if (response.status === 204) return {} as msdyn_GetSummaryBookingsResponse;
    return (await response.json()) as msdyn_GetSummaryBookingsResponse;
  }
}
